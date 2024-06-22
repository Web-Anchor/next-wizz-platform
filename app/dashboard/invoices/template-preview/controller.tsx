'use client';

import Wrapper from '@app/components/Wrapper';
import { Spinner } from '@app/components/Skeleton';
import { useBuildTemplate } from '@hooks/useTemplates';
import { useSearchParams } from 'next/navigation';
import PageHeadings from '@app/components/PageHeadings';

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id')!;
  const { html, isLoading } = useBuildTemplate({ id });

  return (
    <Wrapper>
      <Spinner hidden={!isLoading} />
      {!isLoading && html && (
        <div
          className="w-full h-full overflow-auto max-w-4xl mx-auto p-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}

      {!html && (
        <PageHeadings
          title="Invoice Template Not Found"
          description="No template found for the selected invoice. Please save the template to view it here."
          slogan="Create, Save, and Preview Your Invoice Template."
        />
      )}
    </Wrapper>
  );
}
