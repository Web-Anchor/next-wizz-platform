import { auth } from '@clerk/nextjs/server';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { subscription, validateActiveSubMiddleware } from '@lib/subscription';
import { bufferUpload, buildHTMLTemplate, generatePdfBuffer } from './helpers';

export async function POST(request: NextRequest) {
  auth().protect();

  try {
    const { userId } = auth();
    const body = await request.json();
    console.log('📦 Body: ', body);

    // --------------------------------------------------------------------------------
    // 📌  Validate & validate sub type
    // --------------------------------------------------------------------------------
    const { dbUser, subscription: userSub } = await subscription({ userId });
    validateActiveSubMiddleware({ status: userSub?.status });

    // --------------------------------------------------------------------------------
    // 📌  Build customers html template
    // --------------------------------------------------------------------------------
    const { html } = await buildHTMLTemplate({
      userId: dbUser?.id!,
      templateId: body.id,
    });

    const pdfBuffer = await generatePdfBuffer({ html });
    const url = await bufferUpload({ buffer: pdfBuffer, fileType: 'pdf' });

    return NextResponse.json({
      // url: url + `?version=${uuidv4()}`, // Browser caching bypass TODO: strip params from q when deleting a file
      url,
    });
  } catch (error: any) {
    console.error('🚨 error', error);
    return NextResponse.json(
      { error: error?.message },
      { status: error?.status || 500 }
    );
  }
}

async function callApiWithRetry(props: { html: string; uniqueId: string }) {
  const MAX_RETRIES = 3;
  const RETRY_INTERVAL = 500;

  let retries = 0;

  try {
    const { data } = await axios.post(
      process.env.NETLIFY_FUNCTIONS + '/puppet-pdf-gen',
      {
        html: props.html,
        id: props.uniqueId, // dbTemplate?.[0].id,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}`,
        },
      }
    );

    return data;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      retries++;
      console.log(`Retrying API call (${retries}/${MAX_RETRIES})...`);
      setTimeout(callApiWithRetry, RETRY_INTERVAL);
    } else {
      console.error('Max retries reached. Unable to call API.');
      throw new Error('Max retries reached. Unable to call API.');
    }
  }
}
