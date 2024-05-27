import { Fragment } from 'react';
import { Dialog as DialogUI, Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Button from './Button';

type Props = {
  children?: React.ReactNode;
  open?: boolean;
  callBack?: () => void;
};

export default function Dialog({
  children,
  open,
  callBack,
}: Props): React.ReactElement {
  return (
    <Transition.Root show={!!open} as={Fragment}>
      <DialogUI className="relative z-50" onClose={() => callBack?.()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full lg:justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogUI.Panel className="mx-auto -mt-16 lg:-mt-10">
                <Button
                  onClick={callBack}
                  style="ghost"
                  class="sticky top-0 lg:translate-x-[-3rem] z-10 translate-y-[1rem] w-full text-gray-400 hover:text-gray-500"
                >
                  <XCircleIcon
                    className="h-10 w-10 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    aria-hidden="true"
                  />
                </Button>
                <section className="p-5 h-full">{children}</section>
              </DialogUI.Panel>
            </Transition.Child>
          </div>
        </div>
      </DialogUI>
    </Transition.Root>
  );
}
