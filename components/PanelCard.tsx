// components/PanelCard.tsx
import Link from 'next/link';

type PanelCardProps = {
  title: string;
  description: string;
  href: string;
};

export function PanelCard({ title, description, href }: PanelCardProps) {
  return (
    <Link href={href}>
      <div className="border rounded-md p-6 hover:shadow-md transition cursor-pointer bg-zinc-100 dark:bg-zinc-800">
        <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">{title}</h3>
        <p className="text-sm text-black dark:text-zinc-300">{description}</p>
      </div>
    </Link>
  );
}
