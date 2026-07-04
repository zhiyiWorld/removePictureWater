import type {
  ParseRequest,
  ParseResponse,
  VerifyPasswordRequest,
  VerifyPasswordResponse,
} from '../../shared/types';

async function request<TResponse>(input: string, init: RequestInit): Promise<TResponse> {
  const response = await fetch(input, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });

  const payload = (await response.json()) as TResponse;

  if (!response.ok) {
    throw payload;
  }

  return payload;
}

export function verifyPassword(payload: VerifyPasswordRequest) {
  return request<VerifyPasswordResponse>('/api/verify-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function parseLink(payload: ParseRequest) {
  return request<ParseResponse>('/api/parse', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
