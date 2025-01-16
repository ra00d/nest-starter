import { LoaderPinwheel } from "lucide-react";

export const LoadingPage = ({ size = "64" }: { size?: string }) => {
	return (
		<div className="size-full flex items-center justify-center flex-1">
			<LoaderPinwheel className="animate-spin" size={size} />
		</div>
	);
};
