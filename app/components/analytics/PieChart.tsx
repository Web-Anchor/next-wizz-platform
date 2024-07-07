'use client';

import { Pie, RadialBar } from '@ant-design/plots';
import { NoDataSkeleton, PieSkeleton } from '@components/Skeleton';
import { classNames } from '@helpers/index';

type Props = {
  header?: string;
  title?: string;
  description?: string;
  data?: { type?: string; value?: number }[];
  style?: 'spectral';
  labelPosition?: 'outside' | 'spider';
  loading?: boolean;
  class?: string;
  type: 'pie' | 'radial' | 'column-chart';
};

const spectral = {
  color: {
    palette: 'spectral',
    offset: (t: number) => t * 0.8 + 0.1,
  },
};

export default function PieChart(props: Props): React.ReactElement | null {
  const hasData = !!props.data?.length;

  const pieConfig = {
    data: props.data,
    angleField: 'value',
    colorField: 'name',
    legend: false,
    innerRadius: 0.6,
    labels: [
      {
        text: (props: any) => {
          return capitalize(notDefined(props?.name));
        },
        style: { fontSize: 14, fontWeight: 'bold' },
        position: props?.labelPosition,
      },
      {
        text: 'value',
        style: {
          fontSize: 14,
          dy: 14,
        },
      },
    ],
    style: {
      stroke: '#fff',
      inset: 1,
      radius: 10,
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: props.title,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 16,
          fontStyle: 'bold',
        },
      },
    ],
    scale: props?.style === 'spectral' ? spectral : undefined,
  };
  const radialConfig = {
    data: convertObjUnknownValue(props.data),
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
  const columnChartConfig = {
    data: convertObjUnknownValue(props.data),
    xField: 'name',
    yField: 'value',
    label: {
      text: (d: { value: number }) => {
        return `${(d.value * 100).toFixed(1)}%`;
      },
      textBaseline: 'bottom',
    },
    axis: {
      y: {
        labelFormatter: '.0%',
      },
    },
    style: {
      // 圆角样式
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  };
  // console.log('📊 PieChart', props.data);

  return (
    <section
      className={classNames(
        'relative max-w-md rounded-lg shadow-md p-4 bg-slate-100 bg-opacity-25',
        props.class
      )}
    >
      <div
        className={classNames(
          'flex lg:hidden absolute left-0 top-0 z-10 items-center justify-center w-full h-[340px]'
        )}
      />
      {props?.header && (
        <header className="flex items-center justify-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {props.header}
          </h2>
        </header>
      )}
      <section className="mx-auto w-[340px] h-[340px]">
        {props.loading && <PieSkeleton />}
        {props.type === 'pie' && hasData && !props.loading && (
          <Pie {...pieConfig} />
        )}
        {props.type === 'column-chart' && hasData && !props.loading && (
          <RadialBar {...columnChartConfig} />
        )}
        {props.type === 'radial' && hasData && !props.loading && (
          <RadialBar {...radialConfig} />
        )}
        {!hasData && !props.loading && <NoDataSkeleton />}
      </section>

      {props?.description && (
        <p className="text-center text-gray-600 font-semibold text-sm mt-2">
          {props.description}
        </p>
      )}
    </section>
  );
}

function notDefined(value: any) {
  const input =
    value === 'undefined' ||
    value === 'null' ||
    value === undefined ||
    value === null ||
    value === '';

  return input ? 'Other' : value;
}

function capitalize(value: string) {
  return value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function convertObjUnknownValue(input?: { name?: string; value?: number }[]) {
  return input?.map((item) => {
    return {
      name: notDefined(item?.name),
      value: item?.value || 0,
    };
  });
}
