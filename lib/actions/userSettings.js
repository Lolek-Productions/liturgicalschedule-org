'use server';

import { supabase } from '@/lib/supabaseClient';

// Get user's selected parish
export async function getUserSettings(userId) {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('selected_parish_id')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error;
    }

    return { 
      data: data || { selected_parish_id: null }, 
      error: null 
    };
  } catch (error) {
    console.error('Error getting user settings:', error);
    return { data: null, error: error.message };
  }
}

// Update user's selected parish
export async function updateSelectedParish(userId, parishId) {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .upsert(
        { 
          id: userId, 
          selected_parish_id: parishId,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'id' }
      )
      .select('selected_parish_id')
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error updating selected parish:', error);
    return { data: null, error: error.message };
  }
}
