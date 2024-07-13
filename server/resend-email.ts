'use server';

import { Resend } from 'resend';

type Email = {
  from?: string;
  to: string[];
  subject?: string;
  html?: string;
  text?: string;
  attachments?: { filename: string; content: Buffer }[];
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function email(props: Email): Promise<any> {
  try {
    // --------------------------------------------------------------------------------
    // 📌  Sent email to the client
    // --------------------------------------------------------------------------------
    const fallBackText = props.html ? undefined : props.text || 'invoicio.io';
    const { data, error } = await resend.emails.send({
      from: 'invoicio.io <info@invoicio.io>',
      to: props.to,
      subject: props.subject || 'invoicio.io',
      // react: EmailTemplate({ firstName: 'John' }),
      html: props.html,
      text: fallBackText!,
      attachments: props.attachments,
    });
    console.log('📧 Email Sent to:', props.to);

    return { data, error };
  } catch (error: any) {
    console.log('Error uploading file:', error?.message);
  }
}
