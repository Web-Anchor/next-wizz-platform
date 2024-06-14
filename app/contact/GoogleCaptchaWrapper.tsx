'use client';

import { ReCaptchaProvider } from 'next-recaptcha-v3';
import React from 'react';

export default function GoogleCaptchaWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReCaptchaProvider
      useEnterprise
      reCaptchaKey={process?.env?.NEXT_PUBLIC_RE_CAPTCHA_SITE_KEY!}
    >
      {children}
    </ReCaptchaProvider>
  );
}
