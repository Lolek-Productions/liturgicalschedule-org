import { createServerClient as createSupabaseServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { User } from '@supabase/supabase-js';

interface UserResponse {
  user: User | null;
  error: Error | null;
}

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  
  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookie = await cookieStore.get(name);
          return cookie?.value;
        },
        async set(name: string, value: string, options: any) {
          try {
            await cookieStore.set({ 
              name, 
              value, 
              ...options,
              // Ensure the cookie is httpOnly and secure in production
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
            });
          } catch (error) {
            console.error('Error setting cookie:', error);
          }
        },
        async remove(name: string, options: any) {
          try {
            await cookieStore.set({ 
              name, 
              value: '', 
              ...options, 
              maxAge: 0 
            });
          } catch (error) {
            console.error('Error removing cookie:', error);
          }
        },
      },
    }
  );
}

export async function getCurrentUser(): Promise<UserResponse> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting current user:', error);
      return { user: null, error };
    }
    
    return { user, error: null };
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return { 
      user: null, 
      error: error instanceof Error ? error : new Error('Unknown error occurred') 
    };
  }
}
