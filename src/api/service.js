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

const getLoggedInUser = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      return {
        success: false,
        message: 'User not logged in',
        data: null,
      };
    }

    const email = session?.user?.email;
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError) {
      return {
        success: false,
        message: userError.message || 'User not found in table',
        data: null,
      };
    }

    return {
      success: true,
      message: 'User fetched successfully',
      data: userData,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || 'Something went wrong',
    };
  }
};

const updateUser = async updates => {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError || !session)
      return { success: false, message: 'User not logged in' };

    const userId = session.user.id;
    let tableUpdates = {};

    if (updates?.password) {
      const { error: pwError } = await supabase.auth.updateUser({
        password: updates.password,
      });
      if (pwError) return { success: false, message: pwError.message };
    }

    if (updates?.email) {
      const { error: emailError } = await supabase.auth.updateUser({
        email: updates.email,
      });
      if (emailError) return { success: false, message: emailError.message };
      tableUpdates.email = updates.email;
    }

    if (updates?.username) tableUpdates.username = updates.username;

    if (Object.keys(tableUpdates).length > 0) {
      const { data, error } = await supabase
        .from('users')
        .update(tableUpdates)
        .eq('uuid', userId)
        .select()
        .single();
      if (error) return { success: false, message: error.message };
      return { success: true, message: 'Profile updated successfully', data };
    }

    return { success: true, message: 'No changes detected' };
  } catch (err) {
    return { success: false, message: err.message || 'Something went wrong' };
  }
};

export { RegisterUser, SignInUser, getLoggedInUser, updateUser };
