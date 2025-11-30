import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgjengudzfickgomjqmz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnamVuZ3VkemZpY2tnb21qcW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTI3NjcsImV4cCI6MjA3MTE4ODc2N30.kYQ2oFuQBGmu4V_dnj_1zDMDVsd-qpDZJwNvswzO6M0';

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
