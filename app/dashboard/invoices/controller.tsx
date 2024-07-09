'use client';

import PageHeadings from '@app/components/PageHeadings';
import Wrapper, { SectionWrapper } from '@app/components/Wrapper';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import Pricing from '@app/components/Pricing';
import { TableSkeleton } from '@app/components/Skeleton';
import { CustomField, Template } from '@appTypes/index';
import { useTemplates, useSubscription } from '@hooks/index';
import { classNames } from '@helpers/index';
import Button from '@app/components/Button';
import { debounce } from 'lodash';
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { invoiceTemplate } from '@server/invoice-db-template';
import { v4 as uuidv4 } from 'uuid';
import { maxLength } from '@config/index';
import Switch from '@components/Switch';
import Actions from './actions';
import { mutate } from 'swr';

type Table = {
  title: string;
  description: string;
  typeKey: string;
  maxLength?: number;
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

export const BASE_STATE = {
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

export default function Page() {
  const [state, setState] = useState<{
    customFields: { [key: string]: CustomField };
    [key: string]: any; // state types
  }>(BASE_STATE);
  const inputRef = useRef<HTMLInputElement>(null);
  const mounted = useRef<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const { advanced, isLoading } = useSubscription({});
  const { templates, isLoading: isTemplateLoading } = useTemplates({});
  const loading = isLoading || isTemplateLoading;
  const TEMPLATE = templates?.[0];

  useEffect(() => {
    // --------------------------------------------------------------------------------
    // 📌  Update state with templates data
    // --------------------------------------------------------------------------------

    if (TEMPLATE && !mounted.current) {
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
      mounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TEMPLATE]);

  const handleChange = (key: number, value: string) => {
    setState((prevState) => ({
      ...prevState,
      customFields: {
        ...prevState.customFields,
        [key]: {
          value,
        },
      },
      hasUpdates: true,
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

  async function resetTemplate() {
    try {
      setState(BASE_STATE);
      formRef.current?.reset(); // Reset form

      await new Promise((resolve) => setTimeout(resolve, 100));
      formRef.current?.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true }) // Trigger form submit
      );
    } catch (error) {
      toast?.error('An error occurred while resetting the form.');
    }
  }

  async function removeImgAction() {
    try {
      setState((prev) => ({ ...prev, imgUrl: undefined }));

      const formData = await new FormData(formRef.current!);
      formData.set('isImgUrl', 'off');

      const { status } = await invoiceTemplate(formData);
      console.log('🚫 Remove image status:', status);
      if (status === 200) {
        toast?.success('Image removed successfully!');
      }
    } catch (error) {
      toast?.error('An error occurred while resetting the form.');
    }
  }

  const debouncedHandleChange = debounce((cKey: number, value: string) => {
    handleChange(cKey, value);
  }, 300);

  return (
    <Wrapper class="max-w-4xl">
      {!advanced && !isLoading && (
        <>
          <PageHeadings
            title={
              <p className="text-center mt-2 text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">
                Upgrade to access advanced features and unlock premium invoice
                templates.
              </p>
            }
          />
          <Pricing hideTiers={['Freelancer']} />
        </>
      )}
      <PageHeadings
        title="Invoice Templates. Personalize Your Brand, Impress Your Clients."
        description="Discover a collection of customizable invoice templates on our platform to elevate your brand identity and create professional invoices effortlessly. Tailor your invoices to reflect your unique style, enhance client interactions, and make a lasting impression. Personalize your billing documents with ease and professionalism."
        slogan="Crafting Elegance, Sealing Deals - Your Invoices, Your Brand!"
      />

      {loading && <TableSkeleton cardClass="h-[148px]" />}
      {advanced && !loading && (
        <form
          ref={formRef}
          action={async (formData) => {
            try {
              setState((prev) => ({ ...prev, fetching: 'submit' }));
              const { status } = await invoiceTemplate(formData);
              if (status === 200) {
                toast?.success('Invoice template saved successfully!');
                mutate(`/api/v1/templates`);
              }
              if (status !== 200) {
                toast?.error(
                  'An error occurred while saving the invoice template.'
                );
              }
            } catch (error) {
              toast?.error(
                'An error occurred while saving the invoice template.'
              );
            } finally {
              setState((prev) => ({
                ...prev,
                hasUpdates: false,
                fetching: undefined,
              }));
            }
          }}
          className={classNames(
            'relative flex flex-col gap-5',
            !!state?.fetching && 'opacity-50'
          )}
        >
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
                    <section
                      className={classNames('text-xs ml-1 text-gray-400')}
                    >
                      {item?.type === 'file'
                        ? 'Upto 10MB'
                        : `${item?.maxLength} characters max`}
                    </section>
                  </label>

                  <Switch
                    enabled={hasValue}
                    onChange={() =>
                      setState((prev) => ({
                        ...prev,
                        [item?.isSetKey]: !prev[item?.isSetKey],
                        hasUpdates: true,
                      }))
                    }
                    disabled={!!state?.fetching}
                  />
                  <input
                    type="checkbox"
                    name={item?.isSetKey}
                    checked={hasValue}
                    className="hidden"
                    onChange={() =>
                      setState((prev) => ({ ...prev, hasUpdates: true }))
                    }
                  />
                </div>
                <section className="text-xs text-gray-500">
                  {item?.description}
                </section>

                <SectionWrapper class="gap-2" hidden={!hasValue}>
                  {item?.type === 'textarea' && (
                    <textarea
                      name={item?.typeKey}
                      placeholder={`Add ${item?.title}`}
                      defaultValue={value}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      maxLength={item?.maxLength}
                      onChange={() =>
                        setState((prev) => ({ ...prev, hasUpdates: true }))
                      }
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
                      onChange={() =>
                        setState((prev) => ({ ...prev, hasUpdates: true }))
                      }
                    />
                  )}

                  {item?.type === 'file' && (
                    <section className="flex flex-row gap-10 mt-5">
                      <input
                        type="file"
                        ref={inputRef}
                        name={item?.typeKey}
                        placeholder={`Add ${item?.title}`}
                        className="hidden w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (file) {
                            console.log('📂 File found. State update', file);
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
                            console.log('🚫 File not found. Clearing state.');
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
                          {value && (
                            <section className="relative w-20 h-20 overflow-hidden rounded-md">
                              <Image
                                src={value}
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
                            onClick={removeImgAction}
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
                          <section className="truncate max-w-32 text-xs text-gray-800">
                            {state.name}
                          </section>
                          <section className="text-xs text-gray-500">
                            {fileSize(state.size)} MB
                          </section>
                          <section className="text-xs text-gray-500">
                            {fileType(state.type)}
                          </section>
                          <section className="text-xs text-gray-500">
                            {new Date(state.lastModified).toDateString()}
                          </section>
                        </section>
                      </div>

                      <Button
                        title={
                          <p className="text-nowrap">
                            {state?.imgUrl ? 'Change Logo' : 'Add Logo'}
                          </p>
                        }
                        style="primary"
                        onClick={() => inputRef.current?.click()}
                      />
                    </section>
                  )}

                  {item?.type === 'object' && (
                    <section className="flex flex-col gap-5">
                      {Object.values(state?.customFields)?.map(
                        (value, cKey) => {
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
                                onBlur={(e) => {
                                  debouncedHandleChange(cKey, e.target.value);
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                maxLength={item?.maxLength}
                              />
                              <Button
                                title="Remove"
                                style="ghost"
                                hide={
                                  Object.keys?.(state?.customFields)?.length ===
                                  1
                                }
                                onClick={() => removeCustomField(cKey)}
                              />
                            </div>
                          );
                        }
                      )}

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

          <Actions
            id={TEMPLATE?.id}
            resetCallBack={resetTemplate}
            hasUpdates={state?.hasUpdates}
          />
        </form>
      )}
      {!advanced && !isLoading && <Pricing />}
    </Wrapper>
  );
}

function fileType(type?: string) {
  return `Type: ${type?.split('/')?.[1] ?? ''}`;
}

function fileSize(size: number) {
  return (size / (1024 * 1024)).toFixed(2);
}
