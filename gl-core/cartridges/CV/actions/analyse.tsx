import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../';

export const analyse =
  (): any => async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const state = getState();
      const job = state.cv?.job || '';
      const cv = state.cv?.tailored || '';

      if (!job || !cv) {
        throw new Error('Missing job description or tailored CV in state.');
      }

      const AIResponse = await fetch('/api/cv/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job, cv }),
      });

      const json = await AIResponse.json();

      if (!AIResponse.ok) {
        throw new Error(json.error || 'Failed to analyse CV');
      }

      const [matchOverview, ...rest] = json.result.split(
        'Optimized CV (Markdown)',
      );
      const matchText = matchOverview.replace(/^.*Match Overview/i, '').trim();
      const markdownCV = rest.join('Optimized CV (Markdown)').trim();

      dispatch(setUbereduxKey({ key: 'matchOverview', value: matchText }));
      dispatch(setUbereduxKey({ key: 'optimisedMarkdown', value: markdownCV }));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
