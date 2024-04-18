import { SignedIn } from '@clerk/nextjs';

export default function Home() {
  return (
    <section>
      <SignedIn />
    </section>
  );
}
