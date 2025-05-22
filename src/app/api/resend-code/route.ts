import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendVerificationEmail } from '@/lib/email';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  // 1. Generate a new 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // 2. Store the code in Supabase
  const { error } = await supabase.from('email_verifications').insert([
    { email, code, used: false }
  ]);
  if (error) {
    return NextResponse.json({ error: 'Failed to store verification code.' }, { status: 500 });
  }

  // 3. Send the code via email
  try {
    await sendVerificationEmail(email, code);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to send verification email.' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Verification code resent.' });
} 