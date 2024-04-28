'use client';

import ChargesTable from '@app/components/ChargesTable';
import { useCharges } from '@hooks/index';

export default function Page() {
  const { data, charges, isLoading } = useCharges({});
  console.log('🧾 Charges', data, charges);

  return (
    <section className="flex flex-col">
      <ChargesTable charges={charges} />
    </section>
  );
}
