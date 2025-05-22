import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();
  if (!email || !code) {
    return NextResponse.json({ error: 'Email and code are required.' }, { status: 400 });
  }

  // 1. Fetch the latest code for this email
  const { data, error } = await supabase
    .from('email_verifications')
    .select('*')
    .eq('email', email)
    .eq('code', code)
    .eq('used', false)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Invalid or expired code.' }, { status: 400 });
  }

  // 2. Check if code is expired (older than 10 min)
  const createdAt = new Date(data.created_at);
  if (Date.now() - createdAt.getTime() > 10 * 60 * 1000) {
    return NextResponse.json({ error: 'Code expired.' }, { status: 400 });
  }

  // 3. Mark code as used
  await supabase
    .from('email_verifications')
    .update({ used: true })
    .eq('id', data.id);

  // 4. Optionally, mark user as verified (update your user profile table as needed)
  // await supabase.from('profiles').update({ email_verified: true }).eq('email', email);

  return NextResponse.json({ message: 'Email verified.' });
}
