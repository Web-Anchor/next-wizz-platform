import { classNames } from '@helpers/index';
import { SectionWrapper } from './Wrapper';
import { TIER_PLANS } from '@components/Pricing';
import { CheckIcon } from '@heroicons/react/20/solid';

type Props = {
  class?: string;
};

export default function Tiers(props: Props): React.ReactElement {
  return (
    <SectionWrapper class={classNames('flex-row flex-wrap gap-5', props.class)}>
      {TIER_PLANS?.map((tier, key) => (
        <section
          key={key}
          className={classNames(
            'flex flex-col gap-2 rounded-3xl p-8 ring-1 card w-full lg:w-72 bg-base-100 py-6 px-4',
            tier.featured
              ? 'bg-gray-900 bg-opacity-90 ring-gray-900'
              : 'ring-gray-200'
          )}
        >
          <h2
            className={classNames(
              'text-xl font-medium text-gray-800',
              tier.featured ? 'text-white' : ''
            )}
          >
            {tier.name}
          </h2>
          <p
            className={classNames(
              'text-sm text-gray-500',
              tier.featured ? 'text-white' : ''
            )}
          >
            {tier.description}
          </p>
          {tier.features.map((feature) => (
            <li
              key={feature}
              className={classNames(
                'flex text-sm gap-x-3',
                tier.featured ? 'text-white' : ''
              )}
            >
              <CheckIcon
                className={classNames(
                  tier.featured ? 'text-white' : 'text-indigo-600',
                  'h-6 w-5 flex-none'
                )}
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </section>
      ))}
    </SectionWrapper>
  );
}
