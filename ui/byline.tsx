import { VercelLogo } from '#/ui/vercel-logo';

export default function Byline() {
  return (
    <div className="rounded-lg p-px shadow-black/20">
      <div className="flex flex-col justify-between space-y-2 rounded-lg p-3.5 lg:px-5 lg:py-3">
        <div className="flex items-center gap-x-1.5">
          <div className="text-sm">By</div>
          <a href="https://goldlabel.pro" title="Vercel">
            
              Goldlabel
            
          </a>
        </div>

        <div className="text-sm text-gray-400">
          <a
            href="https://github.com/vercel/app-playground"
            target="_blank"
            rel="noreferrer"
          >
            View code
          </a>
          {' or '}
          <a
            href="https://vercel.com/templates/next.js/app-directory"
            target="_blank"
            rel="noreferrer"
          >
            deploy your own
          </a>
        </div>
      </div>
    </div>
  );
}
