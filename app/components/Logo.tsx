import Link from 'next/link';

// https://github.com/gilbarbara/logos/tree/main/logos
// https://svg.io/

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center">
      <img
        className="h-8 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
    </Link>
  );
}
