'use server';

import axios from 'axios';

export async function removeObj(url: string): Promise<any> {
  try {
    if (!url) {
      throw new Error('File URL is required');
    }

    const fileUrl = new URL(url);
    const { pathname } = fileUrl;

    const { data } = await axios.delete(
      `https://storage.bunnycdn.com/${process.env.BUNNYCDN_STORAGE_ZONE_NAME}${pathname}`,
      {
        headers: {
          'Content-Type': 'application/pdf',
          AccessKey: process.env.BUNNYCDN_STORAGE_ACCESS_KEY,
        },
      }
    );
    console.log('📂 File deleted successfully');

    return {
      message: 'File deleted successfully!',
    };
  } catch (error: any) {
    console.error('Error uploading file:', error);

    return {
      error: error?.message,
    };
  }
}
