'use client';

import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const path = usePathname();
  const crumbs = path?.split('/')?.filter(Boolean);

  return (
    <div className="max-w-xs text-sm breadcrumbs">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        {crumbs?.map((part, index) => {
          return (
            <li key={index}>
              <a
                href={path
                  .split('/')
                  .slice(0, index + 1)
                  .join('/')}
              >
                {part}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
