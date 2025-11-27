const API_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL ?? '/api';

export type LoginPayload = {
  identifier: string;
  password: string;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  gender?: string;
  dateOfBirth?: string;
  contact: string;
  password: string;
};

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  handle?: string;
  avatarUrl?: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

export type AuthSession = {
  user: AuthUser;
  tokens: AuthTokens;
};

type RequestOptions = RequestInit & {
  authToken?: string;
};

async function request<TResponse>(path: string, options: RequestOptions): Promise<TResponse> {
  const { authToken, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(headers ?? {}),
    },
    ...rest,
  });

  const data = (await response.json().catch(() => null)) as
    | { message?: string; error?: string }
    | TResponse
    | null;

  if (!response.ok) {
    const message = (data && ('message' in (data as any) ? (data as any).message : (data as any)?.error)) ||
      'Request failed';
    throw new Error(typeof message === 'string' ? message : 'Unable to complete request');
  }

  return data as TResponse;
}

export async function loginUser(payload: LoginPayload): Promise<AuthSession> {
  return request<AuthSession>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function registerUser(payload: RegisterPayload): Promise<AuthSession> {
  return request<AuthSession>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchProfile(authToken: string): Promise<AuthUser> {
  return request<AuthUser>('/auth/me', {
    method: 'GET',
    authToken,
  });
}
