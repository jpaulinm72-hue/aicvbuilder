import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, title, content } = await req.json();

    const cvData = {
      user_id: user.id,
      title: title || 'Untitled CV',
      content: content,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (id) {
      result = await supabase
        .from('cvs')
        .update(cvData)
        .eq('id', id)
        .eq('user_id', user.id) // Security: ensure user owns the CV
        .select();
    } else {
      result = await supabase
        .from('cvs')
        .insert([cvData])
        .select();
    }

    if (result.error) throw result.error;

    return NextResponse.json({ success: true, data: result.data[0] });
  } catch (error) {
    console.error('Save CV Error:', error);
    return NextResponse.json({ error: 'Failed to save CV' }, { status: 500 });
  }
}
