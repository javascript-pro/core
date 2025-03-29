'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState } from 'react';
import navItems from '#/public/globalNav.json';

type NavNode = {
  title: string;
  slug: string;
  order?: number;
  icon?: string;
  children?: NavNode[];
};

export function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const segment = useSelectedLayoutSegment();

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b lg:bottom-0 lg:z-auto lg:w-72">
      <div className="flex h-14 items-center px-4 py-4 lg:h-auto">
        <Link href="/" className="group flex w-full items-center gap-x-2.5" onClick={close}>
          <Image
            priority
            src="/svg/favicon_black.svg"
            width={40}
            height={40}
            alt="Goldlabel Core"
          />
        </Link>

        <div className="ml-auto lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <nav
        className={clsx(
          'flex-grow px-4 pb-12 pt-2 lg:block',
          isOpen ? 'block' : 'hidden lg:block'
        )}
      >
        <ul className="space-y-2 text-sm">
          {navItems.map((item: NavNode) => (
            <NavItem key={item.slug} item={item} depth={0} close={close} currentSegment={segment} />
          ))}
        </ul>
      </nav>
    </div>
  );
}

function NavItem({
  item,
  depth,
  close,
  currentSegment,
}: {
  item: NavNode;
  depth: number;
  close: () => void;
  currentSegment: string | null;
}) {
  const href = item.slug.startsWith('/') ? item.slug : `/${item.slug}`;
  const isActive = currentSegment === item.slug.split('/').pop();

  return (
    <li>
      <Link
        href={href}
        onClick={close}
        className={clsx(
          'block rounded px-2 py-1 hover:bg-gray-800 hover:text-white',
          isActive ? 'bg-gray-800 text-white' : '',
          depth > 0 && `ml-${Math.min(depth * 4, 12)}`
        )}
      >
        {item.title}
      </Link>

      {item.children && item.children.length > 0 && (
        <ul className="mt-1 space-y-1">
          {item.children.map((child) => (
            <NavItem
              key={child.slug}
              item={child}
              depth={depth + 1}
              close={close}
              currentSegment={currentSegment}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
