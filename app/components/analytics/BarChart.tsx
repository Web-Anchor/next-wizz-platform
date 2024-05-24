'use client';

import { Bar } from '@ant-design/plots';
import { classNames } from '@helpers/index';

type Props = {
  title?: string;
  data?: { type?: string; value?: number }[];
  style?: 'spectral';
  labelPosition?: 'outside' | 'spider';
  class?: string;
  loading?: boolean;
};

export default function BarChart(props: Props): React.ReactElement | null {
  const config = {
    data: props.data,
    xField: 'name',
    yField: 'value',
    sort: {
      reverse: true,
    },
    label: {
      text: 'value',
      formatter: '.1%',
      style: {
        textAnchor: (d: { frequency: string | number }) =>
          +d.frequency > 0.008 ? 'right' : 'start',
        fill: (d: { frequency: string | number }) =>
          +d.frequency > 0.008 ? '#fff' : '#000',
        dx: (d: { frequency: string | number }) =>
          +d.frequency > 0.008 ? -5 : 5,
      },
    },
    axis: {
      y: {
        labelFormatter: '.0%',
      },
    },
  };

  if (!props?.data?.length) return null;

  return (
    <section className={classNames('relative', props.class)}>
      <div
        className={classNames(
          'flex lg:hidden absolute left-0 top-0 z-10 items-center justify-center w-[360px] h-[360px]',
          props.class
        )}
      />
      <Bar {...config} />
    </section>
  );
}
