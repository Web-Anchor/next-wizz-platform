import Layout from '@components/Layout';
import { buildTemplate, getTemplate } from '@server/templates';

export default async function Page() {
  const template = await getTemplate({ templateName: 'template-one.hbs' });
  const html = await buildTemplate({ data: {}, template });

  return (
    <Layout>
      <div
        className="w-full h-full overflow-auto max-w-4xl mx-auto p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  );
}
