'use client';

import Button from '@components/Button';
import { classNames } from '@helpers/index';
import { useRef, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

type SelectTypes = {
  label?: string;
  ctaLabel?: string;
  name: string;
  accept?: string;
  multiple?: boolean;
  class?: string;
  fetching?: boolean;
  ctaClass?: string;
  callBack?: (...args: any[]) => void;
  children?: React.ReactNode;
};

export default function FileUpload(props: SelectTypes) {
  const [file, setFile] = useState<any>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) {
      return props.callBack?.();
    }

    const fileData = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      url: URL.createObjectURL(file),
    };

    setFile(fileData);
    props.callBack?.({ data: fileData, file });
  };

  return (
    <section
      className={classNames(
        'flex flex-1 flex-col gap-5 h-fit min-w-48',
        props.class
      )}
    >
      {props.label && (
        <h3 className="block text-sm font-medium">{props.label}</h3>
      )}
      <div className="flex flex-row gap-5 w-full">
        <input
          type="file"
          value={file.value ?? ''}
          onChange={handleChange}
          name={props.name}
          ref={inputRef}
          accept={props.accept ?? '.jpg, .jpeg, .png'}
          multiple={props.multiple}
          hidden
        />
        {!file.name && (
          <Button
            onClick={() => inputRef.current?.click()}
            title={props.children ? undefined : props.ctaLabel || 'Select File'}
            class={classNames('w-fit', props.ctaClass)}
            fetching={props.fetching}
          >
            {props.children}
          </Button>
        )}
        {file.name && (
          <div className="flex flex-1 flex-row items-center gap-10">
            <section className="relative">
              <section className="relative w-20 h-20 overflow-hidden">
                <Image src={file.url} alt={file.name} fill />
              </section>
              <Button
                style="ghost"
                class="absolute -top-5 -right-5 w-fit"
                onClick={() => {
                  setFile('');
                  props.callBack?.({ data: undefined, file: undefined });
                }}
              >
                <section className="bg-slate-400 rounded-full p-1 bg-opacity-50">
                  <XCircleIcon className="h-5 w-5" />
                </section>
              </Button>
            </section>
            <section className="flex flex-col gap-1">
              <span className="truncate text-xs text-gray-800">
                {file.name}
              </span>
              <span className="text-xs text-gray-500">{file.size} bytes</span>
              <span className="text-xs text-gray-500">
                {fileType(file.type)}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(file.lastModified).toDateString()}
              </span>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}

function fileType(type?: string) {
  return `Type: ${type?.split('/')?.[1] ?? ''}`;
}
