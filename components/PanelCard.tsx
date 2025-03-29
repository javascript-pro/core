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
      <div className="border rounded-md p-6 hover:shadow-md transition cursor-pointer">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </Link>
  );
}
