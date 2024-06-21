'use client';

import Button from '@app/components/Button';
import AuthLayout from '@components/AuthLayout';
import { serverUpload } from './actions';

export default function Page() {
  return (
    <AuthLayout>
      <form className="flex flex-col gap-10" action={serverUpload}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />

        {/* file */}
        <label htmlFor="file">File</label>
        <input id="file" name="file" type="file" />

        <Button type="submit">Submit</Button>
      </form>
    </AuthLayout>
  );
}
