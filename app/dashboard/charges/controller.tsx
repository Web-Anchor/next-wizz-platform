'use client';

import ChargesTable from '@app/components/ChargesTable';
import Wrapper from '@app/components/Wrapper';
import { useCharges } from '@hooks/index';

export default function Page() {
  const { data, charges, isLoading } = useCharges({});
  console.log('🧾 Charges', data, charges);

  return (
    <Wrapper>
      <ChargesTable charges={charges} />
    </Wrapper>
  );
}
