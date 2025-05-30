// core/gl-core/cartridges/CV/actions/createPrompt.tsx

import { TUbereduxDispatch } from '../../../';
import { setUbereduxKey } from '../../../';
import { setCVKey } from '../';

export const createPrompt = (): any =>
  async (dispatch: TUbereduxDispatch, getState: () => any) => {
    try {
      const state = getState().redux;
      const { cv } = state;
      const { jd, cvMarkdown, viewpoint } = cv;
      const prompt1st = `
You are a senior React developer.

Evaluate the following CV against the provided job description and return a structured response titled "fit".

Start with a clear judgement: Are you a good fit for this role?

Immediately after your judgement, comment on the working arrangement. You have extensive experience working remotely in all possible scenarios and prefer to continue doing so. Hybrid working is acceptable, but if the role is permanent and strictly onsite, this should significantly reduce the overall fit. Be explicit about this tradeoff early in your response.

Then explain why or why not you are a good fit, covering:
- Relevant skills or experience that match the job description
- Strengths or advantages that make you particularly suitable
- Any major gaps or mismatches that may impact suitability

Respond as the candidate, in the first person. For example: "I am a strong candidate for this role because..."

---CV---
${cvMarkdown}

---Job Description---
${jd}
`.trim();

      const prompt3rd = `
You are a senior hiring consultant.

Evaluate the following CV against the provided job description and provide a structured response titled "fit".

Start with a clear judgement: Is this candidate a good fit for the role?

Immediately after your judgement, consider the working arrangement. This candidate has extensive experience working remotely in all possible scenarios and prefers to continue doing so. Hybrid working is acceptable, but if the role is permanent and strictly onsite, this should significantly reduce the overall fit. Be explicit about this tradeoff early in your response.

Then, explain why or why not the candidate is a good fit, addressing:
- Relevant skills or experience that match the job description
- Strengths or advantages that make this person particularly suitable
- Any major gaps or mismatches that may impact suitability

---CV---
${cvMarkdown}

---Job Description---
${jd}
`.trim();

      const prompt = viewpoint === 'first' ? prompt1st : prompt3rd;
      dispatch(setCVKey('prompt', prompt));
      dispatch(setCVKey('appMode', 'prompt'));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log("createPrompt error",  msg);
      dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
  };
