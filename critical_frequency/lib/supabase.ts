import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgjengudzfickgomjqmz.supabase.co';
// Supabase switched off legacy JWT keys (anon, service_role) for this project on 6 Jul 2026: any 'eyJ…' key is dead.
// The publishable key is public by design; RLS policies restrict access.
const supabaseAnonKey = 'sb_publishable_cpUwnfcJuvnjrJjmLdZpXw_jJIOa8aB';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Campaign signup function for Critical Frequency initiative
export async function submitCampaignSignup(data: {
  name: string;
  email: string;
  roles?: string[];
  feedback?: string;
}) {
  const { error } = await supabase
    .from('campaign_signups')
    .insert({
      name: data.name,
      email: data.email,
      roles: data.roles || [],
      feedback: data.feedback || '',
      source: 'critical-frequency',
    });

  if (error) {
    console.error('Signup error:', error);
    throw error;
  }

  return { success: true };
}
