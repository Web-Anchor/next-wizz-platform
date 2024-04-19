import { UserProfile } from '@clerk/nextjs';

export default function Page() {
  return (
    <section>
      <p>Dashboard</p>
      <UserProfile />
    </section>
  );
}
