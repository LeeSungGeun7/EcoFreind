const isDev = process.env.NODE_ENV === 'development';

export const EF_DOMAIN = isDev
  ? 'http://localhost:8000'
  : 'https://backend-deno-sjdz3b63yq-du.a.run.app';


export const getSessionId = () => {
    const session = localStorage.getItem('session_id');
    if (!session) return null;
    const parse = JSON.parse(session);
    return parse.session_id || null;
};