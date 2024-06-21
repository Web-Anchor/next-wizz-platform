import { auth, currentUser } from '@clerk/nextjs/server';
import Layout from '@components/Layout';
import { dbUserTemplate } from '@server/db-user-template';
import { dbUser } from '@server/db-usser';
import { buildTemplate, getTemplate } from '@server/templates';

export default async function Page(props: { searchParams: { id: string } }) {
  // const { userId } = auth();
  // const user = await dbUser({ id: userId! });
  // const templates = await dbUserTemplate({ id: user.id });
  const dbTemplate = await dbUserTemplate({ id: props.searchParams.id });
  console.log('🧾 Templates: ', props, dbTemplate);

  const template = await getTemplate({ templateName: 'template-one.hbs' });
  const html = await buildTemplate({ data: dbTemplate, template });

  return (
    <Layout>
      <div
        className="w-full h-full overflow-auto max-w-4xl mx-auto p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  );
}
