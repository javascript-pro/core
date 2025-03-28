import Image from 'next/image';
import { PanelCard } from '#/components/PanelCard';
import { Footer } from '#/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Goldlabel Core',
  description: 'A clean foundation for custom, professional web apps.',
};

export default function Home() {

  const panels = [
    {
      title: 'App One',
      description: 'Explore the first app',
      href: '/apps/app1',
    },
    {
      title: 'App Two',
      description: 'Details about the second app',
      href: '/apps/app2',
    },
  ];

  return (
    <main>
      <section className="relative">
        <Image
          
          src="/jpg/hero.jpg"
          alt="Hero"
          width="1200"
          height="330"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Goldlabel Core</h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-8 px-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {panels.map((panel) => (
            <PanelCard key={panel.href} {...panel} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
