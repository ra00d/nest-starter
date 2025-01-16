import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";

export const ErrorPage = ({ error }: { error: ReactNode }) => {
	return (
		<div className="size-full flex items-center justify-center flex-1">
			<div className="flex items-center justify-center flex-col">
				<AlertCircle color="red" size="64" />
				<h1 className="text-3xl font-bold text-center text-red-500">{error}</h1>
			</div>
		</div>
	);
};
