'use client';

import CustomerTable from '@app/components/CustomerTable';
import { useUser } from '@clerk/nextjs';
import { useCustomers } from '@hooks/customers';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const params = useSearchParams();
  const { user } = useUser();
  const { customers, data, isLoading } = useCustomers({});
  console.log('🧾 Customers', data);

  return (
    <section className="flex flex-col">
      <CustomerTable customers={customers} />
    </section>
  );
}
