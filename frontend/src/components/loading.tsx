import { CircleNotch } from "@phosphor-icons/react";

type LoadingProps = {
  className?: string;
};

export default function Loading({ className }: LoadingProps) {

  return <div className={`flex justify-center ${className}`}>
	<CircleNotch size={30} className="animate-spin" />
  </div>;
}
