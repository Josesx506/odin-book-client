'use server';

async function getGitHubClientId() {
  return process.env.GITHUB_CLIENT_ID;
}

async function getGuestPassword() {
  return process.env.GUESTPSWD;
}

async function getSupabaseBucket() {
  return process.env.SUPABASE_BUCKET;
}

async function getGitHubOAuth() {
  const route = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`;
  return route;
}

export { getGitHubClientId, getGitHubOAuth, getGuestPassword, getSupabaseBucket };
