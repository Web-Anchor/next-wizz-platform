import { UserProfile } from '@clerk/nextjs';

export default function Home() {
  return (
    <section>
      <p>Dashboard</p>
      <UserProfile />
    </section>
  );
}
