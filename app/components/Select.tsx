import { Fragment, useEffect, useState } from 'react';
import {
  Listbox,
  Transition,
  ListboxOption,
  ListboxOptions,
  Label,
  ListboxButton,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '@helpers/index';

type Props = {
  data: { key: string | number; value: string }[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  name?: string;
  disabled?: boolean;
  onChange?: (value?: string) => void;
};

export default function Select(props: Props) {
  const [selected, setSelected] = useState();
  const placeholder = props.placeholder || 'Select an option';

  useEffect(() => {
    props?.onChange?.(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <section>
      <Listbox
        name={props?.name}
        disabled={props?.disabled}
        value={selected}
        onChange={setSelected}
      >
        {({ open }) => (
          <>
            {props.label && (
              <Label className="block text-sm font-medium leading-6 text-gray-800 mb-2">
                {props.label}
              </Label>
            )}
            <div className="relative">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <span className="block truncate">
                  {selected ?? placeholder}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {props?.data?.map((item, key) => (
                    <ListboxOption
                      key={key}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-800',
                          'relative cursor-default select-none py-2 pl-8 pr-4'
                        )
                      }
                      value={item?.value}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate'
                            )}
                          >
                            {item?.value}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 left-0 flex items-center pl-1.5'
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </section>
  );
}
