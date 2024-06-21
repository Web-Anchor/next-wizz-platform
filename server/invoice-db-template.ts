'use server';

import { upload } from '@server/file-upload-bunnycdn';

export async function invoiceTemplate(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const file = formData.get('file') as File;
    console.log('file:', file);

    const { url } = await upload(file);
    console.log('📂 LInk', url);

    const data = Array.from(formData.entries()).map((entry) => {
      const [key, value] = entry;
      return { key, value };
    });

    console.log('📂 file:', file);
    // console.log('name:', name);

    // const res = await fetch('/api/v1/generate-presigned-url', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     fileType: file.type,
    //     fileName: name,
    //   }),
    // });
  } catch (error) {
    console.log('Error uploading file:', error);
  }
}
