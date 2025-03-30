'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

function Params() {
  const searchParams = useSearchParams()!;

  return searchParams.toString().length !== 0 ? (
    <div className="px-2 text-gray-500">
      <span>?</span>
      {Array.from(searchParams.entries()).map(([key, value], index) => {
        return (
          <React.Fragment key={key}>
            {index !== 0 ? <span>&</span> : null}
            <span className="px-1">
              <span className="animate-[highlight_1s_ease-in-out_1]">
                {key}
              </span>
              <span>=</span>
              <span className="animate-[highlight_1s_ease-in-out_1]">
                {value}
              </span>
            </span>
          </React.Fragment>
        );
      })}
    </div>
  ) : null;
}

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase());
}

export function AddressBar() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <div className="my-2">
      <div className="height-200"></div>

      <div className="flex items-center gap-x-2 p-3.5 lg:px-5 lg:py-3">
        <div className="flex gap-x-1 text-sm font-medium items-center">
          {pathname !== '/' && (
            <>
              <Link
                href="/"
                className="flex items-center gap-1 px-2 text-black hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 1.707a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 9.414V17a1 1 0 001 1h3a1 1 0 001-1v-4h2v4a1 1 0 001 1h3a1 1 0 001-1V9.414l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span>Home</span>
              </Link>
              <span>/</span>
            </>
          )}

          {segments.map((segment, index) => {
            const href = '/' + segments.slice(0, index + 1).join('/');
            const isLast = index === segments.length - 1;
            const label = formatSegment(segment);

            return (
              <React.Fragment key={href}>
                {index > 0 && <span>/</span>}
                {isLast ? (
                  <span className="px-1 text-gray-700">{label}</span>
                ) : (
                  <Link
                    href={href}
                    className="px-1 text-black hover:underline"
                  >
                    {label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}

          <Suspense>
            <Params />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
