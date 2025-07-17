// gl-core/lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInviteEmail(
  to: string,
  link: string,
  displayName?: string,
) {
  const from = process.env.EMAIL_FROM || 'no-reply@goldlabel.pro';

  const subject = 'Welcome to Goldlabel – Set your password';
  const html = `
    <p>Hello${displayName ? ' ' + displayName : ''},</p>
    <p>You’ve been invited to Goldlabel. Click below to set your password and get started:</p>
    <p><a href="${link}" target="_blank">Set Your Password</a></p>
    <p>If you didn’t expect this, you can ignore this email.</p>
  `;

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    throw new Error(error.message || 'Failed to send invite email');
  }

  return data;
}
