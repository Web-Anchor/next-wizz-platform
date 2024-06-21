'use server';

import { generateId } from '@helpers/index';
import axios from 'axios';

type FileType = {
  name?: string;
  path?: string;
  type?: string;
} & File;

export async function upload(file?: FileType): Promise<any> {
  try {
    if (!file) {
      throw new Error('File is required');
    }

    const { type } = file;
    const extension = type?.split('/').pop();
    const id = generateId();
    const url = `https://storage.bunnycdn.com/${process.env.BUNNYCDN_STORAGE_ZONE_NAME}/${id}.${extension}`;

    const arrayBuffer = await file.arrayBuffer();

    const { data } = await axios.put(url, arrayBuffer, {
      headers: {
        'Content-Type': type,
        AccessKey: process.env.BUNNYCDN_STORAGE_ACCESS_KEY!,
      },
    });
    console.log('📂 File uploaded successfully completed', data);

    return {
      data,
      url: `https://${process.env.BUNNYCDN_STORAGE_CDN_NAME}.b-cdn.net/${id}.${extension}`,
    };
  } catch (error: any) {
    console.error('Error uploading file:', error);

    return {
      error: error?.message,
    };
  }
}
