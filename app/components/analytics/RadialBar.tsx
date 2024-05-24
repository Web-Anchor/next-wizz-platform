'use client';

import { RadialBar as RadialBarChart } from '@ant-design/plots';
import { PieSkeleton } from '@components/Skeleton';
import { classNames } from '@helpers/index';

type Props = {
  title?: string;
  data?: { type?: string; value?: number }[];
  style?: 'spectral';
  labelPosition?: 'outside' | 'spider';
  loading?: boolean;
  class?: string;
};

export default function RadialBar(props: Props): React.ReactElement | null {
  const config = {
    data: props.data,
    xField: 'name',
    yField: 'value',
    startAngle: Math.PI * 0.5,
    maxAngle: 270, //最大旋转角度,
    radius: 1,
    innerRadius: 0.2,
    legend: false,
    axis: { y: false },
    tooltip: {
      items: ['count'],
    },
    sizeField: 10,
    annotations: [
      {
        type: 'text',
        style: {
          text: props.title,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 12,
          fontStyle: 'bold',
        },
      },
    ],
  };

  if (props?.loading) {
    return (
      <section className={classNames('m-auto', props.class)}>
        <PieSkeleton />
      </section>
    );
  }
  if (!props?.data?.length) return null;

  return (
    <section className={classNames('relative', props.class)}>
      <div
        className={classNames(
          'flex lg:hidden absolute left-0 top-0 z-10 items-center justify-center w-[360px] h-[360px]',
          props.class
        )}
      />
      <RadialBarChart {...config} />
    </section>
  );
}
