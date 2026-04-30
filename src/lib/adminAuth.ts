export const ADMIN_SESSION_KEY = 'heliohub-admin-session';
export const ADMIN_SESSION_DURATION_MS = 2 * 60 * 60 * 1000;
export const ADMIN_USERNAME = 'heliohub';
export const ADMIN_PASSWORD = 'admin2024';

export type AdminSession = {
  username: string;
  loggedInAt: number;
  expiresAt: number;
};

export function createAdminSession(): AdminSession {
  const loggedInAt = Date.now();
  return {
    username: ADMIN_USERNAME,
    loggedInAt,
    expiresAt: loggedInAt + ADMIN_SESSION_DURATION_MS
  };
}

export function readAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;

  const raw = window.sessionStorage.getItem(ADMIN_SESSION_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<AdminSession>;
    if (
      parsed.username !== ADMIN_USERNAME ||
      typeof parsed.loggedInAt !== 'number' ||
      typeof parsed.expiresAt !== 'number'
    ) {
      return null;
    }

    if (Date.now() >= parsed.expiresAt) {
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }

    return parsed as AdminSession;
  } catch {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    return null;
  }
}

export function storeAdminSession(session: AdminSession) {
  window.sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
