import { PropsWithChildren } from "react";

type BaseLayoutProps = {
  className?: string;
};

export default function BaseLayout({
  children,
  className,
}: PropsWithChildren<BaseLayoutProps>) {
  return (
    <div className={`${className}`}>
      <nav className="px-12 py-5">
        <h1 className="font-black text-black text-2xl">Evently</h1>
      </nav>
      {children}
    </div>
  );
}
