import { LoginResponse } from "../types";
import { BASE_URL } from "./common";

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(BASE_URL + "/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Invalid username or password");
  }
  return await response.json();
}
