import { Switch as SwitchUI } from '@headlessui/react';
import { classNames } from '@helpers/index';

type Props = {
  enabled?: boolean;
  disabled?: boolean;
  class?: string;
  onChange?: (enabled?: boolean) => void;
};

export default function Switch(props: Props) {
  return (
    <SwitchUI
      checked={props?.enabled ?? false}
      onChange={() => props?.onChange?.(!props?.enabled)}
      className={classNames(
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
        props?.enabled ? 'bg-indigo-600' : 'bg-gray-200',
        props.disabled && 'cursor-not-allowed opacity-50',
        props?.class
      )}
      disabled={props?.disabled}
    >
      <span
        aria-hidden="true"
        className={classNames(
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          props?.enabled ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </SwitchUI>
  );
}
