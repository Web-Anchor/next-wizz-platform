import {
  ChartPieIcon,
  DocumentDuplicateIcon,
  UserIcon,
  HomeIcon,
  UsersIcon,
  LinkIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowsPointingOutIcon,
} from '@heroicons/react/24/outline';
import { limitedTime } from './components';

export function menuNav(props: {
  path?: string;
  hidden?: string[];
  show?: string[];
}) {
  let menu = [
    {
      name: 'Feature Request',
      href: '/dashboard/new-features',
      initial: 'F',
      current: props.path === '/dashboard/new-features',
    },
    {
      name: 'Help & Support',
      href: '/dashboard/support',
      initial: 'H',
      current: props.path === '/dashboard/support',
    },
    {
      name: 'Subscriptions',
      href: '/dashboard/subscriptions',
      initial: 'S',
      current: props.path === '/dashboard/subscriptions',
    },
  ];

  // --------------------------------------------------------------------------------
  // 📌  Navigation accessibility
  // --------------------------------------------------------------------------------
  if (props.hidden) {
    menu = menu.filter((item) => !props?.hidden?.includes(item.href));
  }
  if (props.show) {
    menu = menu.filter((item) => props?.show?.includes(item.href));
  }

  return menu;
}

type Menu = {
  name: string | React.ReactNode;
  href: string;
  icon: any;
  count?: string | undefined;
  current: boolean;
};

export function mainNav(props: {
  path?: string;
  hidden?: string[];
  show?: string[];
  count?: { href: string; count: string }[]; // Update the type of 'count' property to 'string | undefined'
  basic?: boolean;
  advanced?: boolean;
}) {
  let menu: Menu[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      current: props.path === '/dashboard',
    },
    {
      name: 'Charges',
      href: '/dashboard/charges',
      icon: CurrencyDollarIcon,
      count: undefined,
      current: props.path === '/dashboard/charges',
    },
    {
      name: 'Customers',
      href: '/dashboard/customers',
      icon: UsersIcon,
      count: undefined,
      current: props.path === '/dashboard/customers',
    },
    {
      name: 'Templates',
      href: '/dashboard/invoices',
      icon: DocumentDuplicateIcon,
      count: '1',
      current: props.path === '/dashboard/invoices',
    },
    {
      name: 'Portal Components',
      href: '/dashboard/portal',
      icon: ArrowsPointingOutIcon,
      count: undefined,
      current: props.path === '/dashboard/portal',
    },
    {
      name: 'Stripe API keys',
      href: '/dashboard/stripe',
      icon: LinkIcon,
      count: undefined,
      current: props.path === '/dashboard/stripe',
    },
    {
      name: 'Reports',
      href: '/dashboard/reports',
      icon: ChartPieIcon,
      count: undefined,
      current: props.path === '/dashboard/reports',
    },
    {
      name: limitedTime({ title: 'Analytics', message: 'Limited Time Only!' }), //'Analytics',
      href: '/dashboard/analytics',
      icon: ChartBarIcon,
      count: undefined,
      current: props.path === '/dashboard/analytics',
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: UserIcon,
      count: undefined,
      current: props.path === '/dashboard/profile',
    },
  ];

  // --------------------------------------------------------------------------------
  // 📌  Navigation accessibility
  // --------------------------------------------------------------------------------
  if (props.hidden) {
    menu = menu.filter((item) => !props?.hidden?.includes(item.href));
  }
  if (props.show) {
    menu = menu.filter((item) => props?.show?.includes(item.href));
  }

  if (props.count) {
    menu = menu.map((item) => {
      const count = props?.count?.find((c) => c.href === item.href);
      return {
        ...item,
        count: count?.count,
      };
    });
  }

  return menu;
}

export function showMainNavRoutes(props: {
  active?: boolean;
  basic?: boolean;
  advanced?: boolean;
  pro?: boolean;
}) {
  const BASE = ['/dashboard', '/dashboard/stripe', '/dashboard/profile'];
  const ACTIVE_BASE = [
    ...BASE,
    '/dashboard/charges',
    '/dashboard/customers',
    '/dashboard/reports',
  ];

  if ((props.pro && props.active) || (props.advanced && props.active)) {
    return [
      ...ACTIVE_BASE,
      '/dashboard/invoices',
      '/dashboard/portal',
      '/dashboard/analytics',
    ];
  }

  if (props.active && props.basic) {
    return [...ACTIVE_BASE, '/dashboard/analytics'];
  }

  return BASE;
}

export function showMenuNavRoutes(props: {
  active?: boolean;
  basic?: boolean;
  advanced?: boolean;
  pro?: boolean;
}) {
  const BASE = ['/dashboard/support', '/dashboard/subscriptions'];
  console.log('🚧  props ', props);

  if ((props.pro && props.active) || (props.advanced && props.active)) {
    return [...BASE, '/dashboard/new-features'];
  }

  return BASE;
}
