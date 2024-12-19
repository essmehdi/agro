import { WarningCircle } from "@phosphor-icons/react";

type ErrorProps = {
	message: string;
	className?: string;
}

export default function Error({ message, className }: ErrorProps) {
	return (
		<div className={`text-neutral-600 space-y-3 ${className}`}>
			<WarningCircle size={30} className="block mx-auto" />
			<p className="max-w-md text-center mx-auto text-lg">
				{message}
			</p>
		</div>
	)
}