'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { downloadFile } from '@helpers/index';
import { useFormStatus } from 'react-dom';
import Button from '@app/components/Button';

export default function Actions(props: {
  id?: string;
  hasUpdates?: boolean;
  resetCallBack?: () => void;
}) {
  const [state, setState] = useState<{ fetching?: string }>({});
  const router = useRouter();

  async function downloadPDF() {
    try {
      setState((prev) => ({ ...prev, fetching: 'download' }));
      // LEGACY: '/api/v1/templates/puppet-pdf-gen'
      const { data } = await axios.post('/api/v1/templates/puppet-pdf-gen', {
        id: props?.id,
      });
      const url = data?.url;
      console.log('🔗 URL', url);

      // --------------------------------------------------------------------------------
      // 📌  Download PDF
      // --------------------------------------------------------------------------------
      await downloadFile({
        url,
        name: props?.id,
        classBack: (props) => {
          console.log('🚀 Progress', props);
        },
      });

      // --------------------------------------------------------------------------------
      // 📌  Delete PDF on the server
      // --------------------------------------------------------------------------------
      const del = await axios.post('/api/v1/delete-file', {
        url,
      });
      console.log('🚮 Delete', del);

      toast?.success('Document downloaded successfully!');
    } catch (error: any) {
      toast?.error(
        error?.message || 'An error occurred while downloading the document.'
      );
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  async function preview() {
    try {
      if (!props.id) throw new Error('Please add a template first to preview!');

      router.push(`/dashboard/invoices/template-preview?id=${props.id}`);
    } catch (error: any) {
      toast?.error(
        error?.message || 'An error occurred while previewing the document.'
      );
    }
  }

  const { pending } = useFormStatus();

  return (
    <div className="card-actions justify-end">
      <Button title="Save" type="submit" fetching={pending} />
      <Button
        style="secondary"
        onClick={downloadPDF}
        disabled={pending || props.hasUpdates}
        fetching={state?.fetching === 'download'}
      >
        <section className="flex flex-row gap-2">
          <svg
            className="flex-shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          <p>Sample PDF</p>
        </section>
      </Button>
      <Button
        title="Preview"
        style="ghost"
        onClick={preview}
        disabled={pending || props.hasUpdates}
      />
      <Button
        title="Reset"
        style="ghost"
        onClick={() => props?.resetCallBack?.()}
        disabled={pending || props.hasUpdates}
      />
    </div>
  );
}
