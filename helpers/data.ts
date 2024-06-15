import {
  ChartPieIcon,
  DocumentDuplicateIcon,
  UserIcon,
  HomeIcon,
  UsersIcon,
  LinkIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

export function menuNav(props: { path?: string; hidden?: string[] }) {
  let menu = [
    {
      name: 'Feature Request',
      href: '/dashboard/new-features',
      initial: 'F',
      current: props.path === '/dashboard/new-features',
      isHidden: false,
    },
    {
      name: 'Help & Support',
      href: '/dashboard/support',
      initial: 'H',
      current: props.path === '/dashboard/support',
      isHidden: false,
    },
    {
      name: 'Subscriptions',
      href: '/dashboard/subscriptions',
      initial: 'S',
      current: props.path === '/dashboard/subscriptions',
      isHidden: false,
    },
  ];
  if (props.hidden) {
    menu = menu.filter((item) => !props?.hidden?.includes(item.href));
  }

  return menu;
}

export function mainNav(props: {
  path?: string;
  hidden?: string[];
  count?: { href: string; count: string }[]; // Update the type of 'count' property to 'string | undefined'
}) {
  let menu = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      current: props.path === '/dashboard',
      isHidden: false,
    },
    {
      name: 'Charges',
      href: '/dashboard/charges',
      icon: CurrencyDollarIcon,
      count: undefined,
      current: props.path === '/dashboard/charges',
      isHidden: false,
    },
    {
      name: 'Customers',
      href: '/dashboard/customers',
      icon: UsersIcon,
      count: undefined,
      current: props.path === '/dashboard/customers',
      isHidden: false,
    },
    {
      name: 'Templates',
      href: '/dashboard/invoices',
      icon: DocumentDuplicateIcon,
      count: '1',
      current: props.path === '/dashboard/invoices',
      isHidden: false,
    },
    {
      name: 'Stripe API keys',
      href: '/dashboard/stripe',
      icon: LinkIcon,
      count: undefined,
      current: props.path === '/dashboard/stripe',
      isHidden: false,
    },
    {
      name: 'Reports',
      href: '/dashboard/reports',
      icon: ChartPieIcon,
      count: undefined,
      current: props.path === '/dashboard/reports',
      isHidden: false,
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: UserIcon,
      count: undefined,
      current: props.path === '/dashboard/profile',
      isHidden: false,
    },
  ];
  if (props.hidden) {
    menu = menu.filter((item) => !props?.hidden?.includes(item.href));
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
