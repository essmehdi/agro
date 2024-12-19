"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/lib/backend/auth";
import { saveLoginToken } from "@/lib/storage";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => login(username, password),
    onSuccess: (loginResponse) => {
      saveLoginToken(loginResponse.token);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/events");
    },
    onError: () => {
      setError("Invalid username or password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    mutation.mutate({ username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md border border-neutral-100 w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-choco-cosmos">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-drab-brown"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-ochre focus:border-ochre"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-drab-brown"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-ochre focus:border-ochre"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-ochre text-white font-semibold rounded-md hover:bg-ochre-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ochre"
        >
          Login
        </button>
      </form>
    </div>
  );
}
