"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type RedirectProps = {
  to: string;
};

export default function Redirect({ to }: RedirectProps) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return <></>;
}
