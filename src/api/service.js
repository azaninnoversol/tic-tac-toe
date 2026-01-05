import { supabase } from './supabase';

const RegisterUser = async (email, password, username) => {
  const { data, error } = await supabase?.auth.signUp({
    email,
    password,
  });

  const jwtToken = data?.session?.access_token;

  if (error || !data?.user) {
    return {
      data,
      success: error?.code,
      message: error?.message || 'Invalid Error',
      status: error?.status,
    };
  }

  const userId = data?.user?.id;

  const { data: profileData, error: profileError } = await supabase
    .from('users')
    .insert([{ uuid: userId, username, email, userCode: password }])
    .select()
    .single();

  if (profileError) {
    return { success: false, message: profileError.message };
  }

  return {
    success: true,
    token: jwtToken,
    data: { user: data.user, profile: profileData },
  };
};

const SignInUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const jwtToken = data?.session?.access_token;

    if (error || !data.user) {
      return { success: false, message: error?.message || 'Login failed' };
    }

    const userId = data.user.id;

    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('uuid', userId)
      .single();

    if (profileError) {
      return { success: true, data: { user: data.user } };
    }

    return {
      success: true,
      token: jwtToken,
      data: { user: data.user, profile: profileData },
    };
  } catch (err) {
    return { success: false, message: err.message || 'Something went wrong' };
  }
};

export { RegisterUser, SignInUser };
