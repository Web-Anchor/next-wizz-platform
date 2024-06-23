'use client';

import Switch from './Switch';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import Button from './Button';
import { maxLength } from '@config/index';
import { useTemplates } from '@hooks/index';
import { CustomField, Template } from '@appTypes/index';
import { Spinner } from './Skeleton';
import { SectionWrapper } from './Wrapper';
import axios from 'axios';
import { classNames, downloadFile } from '@helpers/index';
import { invoiceTemplate } from '@server/invoice-db-template';
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash';

type Table = {
  title: string;
  description: string;
  typeKey: string;
  maxLength: number;
  type: string;
  isSetKey: string;
};

const table: Table[] = [
  {
    title: 'Company Name',
    description:
      'Company name is the name of the company that appears on the invoice.',
    typeKey: 'companyName',
    maxLength: maxLength?.customField,
    type: 'text',
    isSetKey: 'isCompanyName',
  },
  {
    title: 'Company Logo',
    description: 'Company logo is that appears on the invoice.',
    typeKey: 'imgUrl',
    maxLength: maxLength?.comment,
    type: 'file',
    isSetKey: 'isImgUrl',
  },
  {
    title: 'Invoice Header',
    description:
      'Invoice header text is the text that appears at the top of the page.',
    typeKey: 'header',
    maxLength: maxLength?.message,
    type: 'text',
    isSetKey: 'isHeader',
  },
  {
    title: 'Memo',
    description:
      'Memo text is the text that appears above the invoice pricing section.',
    typeKey: 'memo',
    maxLength: maxLength?.message,
    type: 'textarea',
    isSetKey: 'isMemo',
  },
  {
    title: 'Footer',
    description:
      'Footer text is the text that appears at the bottom of the invoice.',
    typeKey: 'footer',
    maxLength: maxLength?.message,
    type: 'textarea',
    isSetKey: 'isFooter',
  },
  {
    title: 'Custom Fields',
    description:
      'Custom fields are additional fields you can add to your invoice.',
    typeKey: 'customFields',
    maxLength: maxLength?.customField,
    type: 'object',
    isSetKey: 'isCustomFields',
  },
];

export default function InvoiceTable(props: { hidden?: boolean }) {
  const BASE_STATE = {
    header: '',
    memo: '',
    footer: '',
    customFields: { 0: { value: '' } },
    isHeader: false,
    isMemo: false,
    isFooter: false,
    isCustomFields: false,
    isCompanyName: false,
    isLogoUrl: false,
  };

  const [state, setState] = useState<{
    customFields: { [key: string]: CustomField };
    [key: string]: any; // state types
  }>(BASE_STATE);
  const inputRef = useRef<HTMLInputElement>(null);
  // TODO: implement multi ref for mapped input objects

  const router = useRouter();
  const { templates, count, isLoading } = useTemplates({});
  const TEMPLATE = templates?.[0];
  // console.log('inputRefs', inputRefs);

  useEffect(() => {
    // --------------------------------------------------------------------------------
    // 📌  Update state with templates data
    // --------------------------------------------------------------------------------
    if (templates) {
      setState((prev) => ({
        ...prev,
        isHeader: !!TEMPLATE?.header,
        isMemo: !!TEMPLATE?.memo,
        isFooter: !!TEMPLATE?.footer,
        isCustomFields: !!Object.keys(TEMPLATE?.customFields || {}).length,
        isCompanyName: !!TEMPLATE?.companyName,
        isImgUrl: !!TEMPLATE?.imgUrl,
        imgUrl: TEMPLATE?.imgUrl,
        customFields: TEMPLATE?.customFields || { 0: { value: '' } },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templates]);

  const handleChange = (key: number, value: string) => {
    setState((prevState) => ({
      ...prevState,
      customFields: {
        ...prevState.customFields,
        [key]: {
          value,
        },
      },
    }));
  };

  const addCustomField = () => {
    const customFields = { ...state.customFields };

    customFields[Object.keys(customFields).length] = { value: '' };
    setState((prevState) => ({ ...prevState, customFields }));
  };

  function removeCustomField(key: number) {
    setState((prev) => {
      let shallowFields = { ...prev.customFields }; // Create a shallow copy of customFields
      delete shallowFields[key];

      const reindexedCustomFields = Object.keys(shallowFields).reduce(
        (acc, curr, index) => {
          acc[index] = shallowFields[curr];
          return acc;
        },
        {} as { [key: number]: CustomField }
      );

      return {
        ...prev,
        customFields: reindexedCustomFields, // Update customFields with the modified copy
      };
    });
  }

  async function downloadPDF() {
    try {
      setState((prev) => ({ ...prev, fetching: 'download' }));
      const { data } = await axios.post('/api/v1/templates/puppet-pdf-gen', {
        id: TEMPLATE?.id,
      });
      const url = data?.url;
      console.log('🔗 URL', url);

      await downloadFile({
        url,
        name: TEMPLATE?.id,
        classBack: (props) => {
          console.log('🚀 Progress', props);
        },
      });

      toast?.success('Document downloaded successfully!');
    } catch (error) {
      toast?.error('An error occurred while downloading the document.');
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  async function preview() {
    try {
      router.push(`/dashboard/invoices/template-preview?id=${TEMPLATE.id}`);
    } catch (error: any) {
      toast?.error(`Please add a template first to preview!`);
    }
  }

  function SubmitActions() {
    const { pending } = useFormStatus();

    return (
      <div className="card-actions justify-end">
        <Button
          title="Save"
          type="submit"
          fetching={pending}
          disabled={isLoading}
        />
        <Button
          style="secondary"
          onClick={downloadPDF}
          disabled={pending || isLoading}
          fetching={state?.fetching === 'download'}
        >
          <section className="flex flex-row gap-2">
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            <p>Sample PDF</p>
          </section>
        </Button>
        <Button
          title="Preview"
          style="ghost"
          onClick={preview}
          disabled={pending || isLoading}
        />
        <Button
          title="Reset"
          style="ghost"
          onClick={() => setState(BASE_STATE)}
          disabled={pending || isLoading}
        />
      </div>
    );
  }

  const debouncedHandleChange = debounce((cKey: number, value: string) => {
    handleChange(cKey, value);
    inputRef?.current?.focus();
  }, 300);

  if (props.hidden) {
    return null;
  }

  return (
    <SectionWrapper>
      <form
        action={async (formData) => {
          const { status } = await invoiceTemplate(formData);
          if (status === 200) {
            toast?.success('Invoice template saved successfully!');
          } else {
            toast?.error(
              'An error occurred while saving the invoice template.'
            );
          }
        }}
        className={classNames(
          'relative flex flex-col gap-5',
          !!state?.fetching && 'opacity-50'
        )}
      >
        <Spinner hidden={!isLoading} />

        {table?.map((item: Table, key: number) => {
          const hasValue = (state?.[item?.isSetKey] as boolean) ?? false;
          const value =
            (state?.[item?.typeKey] ||
              (TEMPLATE?.[item?.typeKey as keyof Template] as string)) ??
            '';

          return (
            <SectionWrapper key={key} class="gap-2">
              <div className="flex flex-row gap-5 justify-between">
                <label>
                  {item?.title}
                  <span className="text-xs ml-1 text-gray-400">
                    {item?.maxLength} characters max
                  </span>
                </label>

                <Switch
                  enabled={hasValue}
                  onChange={() =>
                    setState((prev) => ({
                      ...prev,
                      [item?.isSetKey]: !prev[item?.isSetKey],
                    }))
                  }
                />
                <input
                  type="checkbox"
                  name={item?.isSetKey}
                  checked={hasValue}
                  className="hidden"
                  onChange={() => {}}
                />
              </div>
              <p className="text-xs text-gray-500">{item?.description}</p>

              <SectionWrapper class="gap-2" hidden={!hasValue}>
                {item?.type === 'textarea' && (
                  <textarea
                    name={item?.typeKey}
                    placeholder={`Add ${item?.title}`}
                    defaultValue={value}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    maxLength={item?.maxLength}
                  />
                )}

                {item?.type === 'text' && (
                  <input
                    type="text"
                    name={item?.typeKey}
                    placeholder={`Add ${item?.title}`}
                    defaultValue={value}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    maxLength={item?.maxLength}
                  />
                )}

                {item?.type === 'file' && (
                  <section className="flex flex-row gap-10 mt-5">
                    <input
                      type="file"
                      ref={inputRef}
                      name={item?.typeKey}
                      placeholder={`Add ${item?.title}`}
                      defaultValue={state?.[item?.typeKey] as string}
                      className="hidden w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          setState((prev) => ({
                            ...prev,
                            imgUrl: URL.createObjectURL(file),
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            lastModified: file.lastModified,
                          }));
                        }

                        if (!file) {
                          setState((prev) => ({
                            ...prev,
                            imgUrl: undefined,
                            name: undefined,
                            size: undefined,
                            type: undefined,
                            lastModified: undefined,
                          }));
                        }
                      }}
                    />
                    <div
                      className={classNames(
                        'flex flex-row items-center gap-10',
                        !state?.imgUrl && 'hidden'
                      )}
                    >
                      <section className="relative">
                        {state?.imgUrl && (
                          <section className="relative w-20 h-20 overflow-hidden rounded-md">
                            <Image
                              src={state?.imgUrl}
                              alt={TEMPLATE?.companyName ?? 'Company Logo'}
                              className="object-cover w-full h-full"
                              fill
                              sizes="(min-width: 640px) 640px, 100vw"
                            />
                          </section>
                        )}
                        <Button
                          style="ghost"
                          class="absolute -top-5 -right-5 w-fit"
                          onClick={() => {
                            setState((prev) => ({
                              ...prev,
                              imgUrl: undefined,
                            }));
                          }}
                        >
                          <section className="bg-slate-400 rounded-full p-1 bg-opacity-50">
                            <XCircleIcon className="h-5 w-5" />
                          </section>
                        </Button>
                      </section>

                      <section
                        className={classNames(
                          'flex flex-col gap-1',
                          !state.type && 'hidden'
                        )}
                      >
                        <span className="truncate text-xs text-gray-800">
                          {state.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {fileSize(state.size)} MB
                        </span>
                        <span className="text-xs text-gray-500">
                          {fileType(state.type)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(state.lastModified).toDateString()}
                        </span>
                      </section>
                    </div>

                    <Button
                      title={state?.imgUrl ? 'Change Logo' : 'Add Logo'}
                      style="primary"
                      onClick={() => inputRef.current?.click()}
                    />
                  </section>
                )}

                {item?.type === 'object' && (
                  <section className="flex flex-col gap-5">
                    {Object.values(state?.customFields)?.map((value, cKey) => {
                      const uniqueKey = uuidv4();

                      return (
                        <div
                          key={uniqueKey}
                          className="flex flex-row gap-2 items-center"
                        >
                          <input
                            name={item?.typeKey + '-' + cKey}
                            type="text"
                            placeholder="Define a custom field value"
                            defaultValue={value?.value}
                            onChange={(e) => {
                              debouncedHandleChange(cKey, e.target.value);
                            }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            maxLength={item?.maxLength}
                          />
                          <Button
                            title="Remove"
                            style="ghost"
                            hide={
                              Object.keys?.(state?.customFields)?.length === 1
                            }
                            onClick={() => removeCustomField(cKey)}
                          />
                        </div>
                      );
                    })}

                    <div className="card-actions justify-start">
                      <Button
                        title="Add custom field"
                        style="ghost"
                        onClick={addCustomField}
                      />
                    </div>
                  </section>
                )}
              </SectionWrapper>
            </SectionWrapper>
          );
        })}

        <SubmitActions />
      </form>
    </SectionWrapper>
  );
}

function fileType(type?: string) {
  return `Type: ${type?.split('/')?.[1] ?? ''}`;
}

function fileSize(size: number) {
  return (size / (1024 * 1024)).toFixed(2);
}
