import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, code: string) {
  await resend.emails.send({
    from: 'noreply@yourdomain.com', // Replace with your verified sender
    to,
    subject: 'Your Verification Code',
    html: `<p>Your verification code is: <strong>${code}</strong></p>`,
  });
} 