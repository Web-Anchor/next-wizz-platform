'use client';

import CustomerTable from '@app/components/CustomerTable';
import Wrapper from '@app/components/Wrapper';
import { useUser } from '@clerk/nextjs';
import { useCustomers } from '@hooks/customers';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const params = useSearchParams();
  const { user } = useUser();
  const { customers, data, isLoading } = useCustomers({});
  console.log('🧾 Customers', data);

  return (
    <Wrapper>
      <CustomerTable customers={customers} />
    </Wrapper>
  );
}
