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
      <section className="relative w-full h-96">
        <Image
          src="/jpg/hero.jpg"
          alt="Hero"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Welcome to Goldlabel Core</h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-2xl font-semibold mb-8">Explore Our Apps</h2>
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
