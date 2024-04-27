'use client';

import Button from '@app/components/Button';
import StripeKeys from '@app/components/StripeKeys';
import Wrapper from '@app/components/Wrapper';
import { useStripeKeys } from '@hooks/stripe-keys';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data, isLoading } = useStripeKeys({});
  const router = useRouter();

  function redirectToStripe() {
    // router.push('https://docs.stripe.com/keys#obtain-api-keys');
    window.open('https://docs.stripe.com/keys#obtain-api-keys', '_blank');
  }
  console.log('StripeKeys', data);

  return (
    <Wrapper>
      <StripeKeys keys={data} fetching={isLoading} />

      <div className="flex flex-col gap-5">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          Restricted API key
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Create a restricted API key
        </h1>

        <div className="card w-fill bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              A restricted API key only allows the level of access that you
              specify.
            </h2>
            <p>To create a restricted API key:</p>

            <section className="flex flex-col gap-2 text-xs font-medium text-slate-500 text-justify">
              <p>Open the API keys page.</p>
              <p>
                You can create a restricted key from scratch or start by cloning
                an existing restricted key.
              </p>
              <p>
                To create a restricted key from scratch, click Create restricted
                key. In this case, the default value for all permissions is
                None. To clone an existing key, in the row for the key you want
                to clone, click the overflow menu (), then select Duplicate
                key…. In this case, the default value for each permission is its
                value in the cloned key.
              </p>
              <p>
                In the Key name field, enter a name. If you cloned an existing
                key, the default name is the cloned key’s name.
              </p>
              <p>
                For each resource you want the new key to access, select the
                permission for this key to allow. If you use Connect, you can
                also select the permission for this key to allow when accessing
                connected accounts. Available permissions are None, Read, or
                Write.
              </p>
              <p>Click Create key.</p>
              <p>
                Stripe sends a verification code to your email address or in a
                text message. (As with any email or text message, it might not
                arrive immediately.) Enter the code in the dialog. If the dialog
                doesn’t continue automatically, click Continue.
              </p>
              <p>
                The dialog displays the new key value. Copy it by clicking it.
              </p>
              <p>Save the key value. You can’t retrieve it later.</p>
              <p>
                In the Add a note field, enter the location where you saved the
                key and click Done.
              </p>
            </section>

            <Button
              title="Stripe API docs"
              style="ghost"
              onClick={redirectToStripe}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
