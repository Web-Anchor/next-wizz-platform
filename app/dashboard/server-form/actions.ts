'use server';

export async function serverUpload(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const file = formData.get('file') as File;

    console.log('name:', name);
    console.log('file:', file);

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
