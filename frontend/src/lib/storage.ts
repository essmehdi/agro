export function saveLoginToken(token: string): void {
  localStorage.setItem("login_token", token);
}

export function getLoginToken(): string {
  return localStorage.getItem("login_token") ?? "";
}

export function getTokenHeader(): { Authorization: string } {
  return { Authorization: `Token ${getLoginToken()}` };
}