import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials missing. Returning a mock client.')
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: { message: 'Supabase not configured' } }),
        signOut: async () => {},
      },
      from: () => ({
        select: () => ({ order: () => ({ data: [], error: null }) }),
        insert: () => ({ select: () => ({ data: [{}], error: null }) }),
        update: () => ({ eq: () => ({ eq: () => ({ select: () => ({ data: [{}], error: null }) }) }) }),
        delete: () => ({ eq: () => ({ eq: () => ({ error: null }) }) }),
      })
    }
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
