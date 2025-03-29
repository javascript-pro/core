import Link from 'next/link';
import Image from 'next/image';

type PanelCardProps = {
  title: string;
  description: string;
  href: string;
  image: string;
};

export function PanelCard({ title, description, href, image }: PanelCardProps) {
  return (
    <Link href={href}>
      <div className="relative h-full min-h-[200px] rounded-md overflow-hidden border border-gray-200 hover:shadow-md hover:border-gray-300 transition duration-200 cursor-pointer">
        {/* Image fills the card */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />

        {/* Overlay to darken the image slightly for readability (optional tweak) */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Text content */}
        <div className="relative z-10 p-6 flex flex-col justify-end h-full">
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded">
            <h3 className="text-2xl font-bold text-white bg-black/80 p-2 rounded">
              {title}
            </h3>

            <p className="text-sm text-white bg-black/70 p-2 rounded">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
