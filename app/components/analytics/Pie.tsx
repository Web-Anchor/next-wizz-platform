'use client';

import { Pie as PieChart } from '@ant-design/plots';
import { classNames } from '@helpers/index';

type Props = {
  title?: string;
  data?: { type?: string; value?: number }[];
};

export default function Pie(props: Props): React.ReactElement {
  const config = {
    data: props.data,
    angleField: 'value',
    colorField: 'name',
    legend: false,
    innerRadius: 0.6,
    labels: [
      {
        text: 'name',
        style: { fontSize: 10, fontWeight: 'bold' },
      },
      {
        text: 'value',
        style: {
          fontSize: 9,
          dy: 12,
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
          fontSize: 20,
          fontStyle: 'bold',
        },
      },
    ],
    // scale: {
    //   color: {
    //     palette: 'spectral',
    //     offset: (t: number) => t * 0.8 + 0.1,
    //   },
    // },
  };

  return <PieChart {...config} />;
}
