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
      title: 'Work',
      description: 'Next.js',
      href: '/work/',
      image: '/jpg/work.jpg',
    },
    {
      title: 'Life',
      description: 'Aquaponics, Diving, Food',
      href: '/life/',
      image: '/jpg/life.jpg',
    },
    {
      title: 'Balance',
      description: 'Books, Blogs & Writing',
      href: '/balance/',
      image: '/jpg/balance.jpg',
    },
  ];

  return (
    <main>
      <section className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {panels.map((panel) => (
            <PanelCard key={panel.href} {...panel} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
