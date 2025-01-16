import { AxiosResponse } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function getResponseErrors(res: AxiosResponse, setError: any) {
	const errors = res?.data?.errors;
	if (errors?.length > 0) {
		errors?.map((error: any) => {
			for (const key in error) {
				if (error.hasOwnProperty(key)) {
					setError(key, {
						type: "manual",
						message: error[key],
					});
				}
			}
		});
	} else {
		for (const key in errors) {
			if (errors.hasOwnProperty(key)) {
				console.log(errors[key]);
				setError(key, {
					type: "manual",
					message: errors[key],
				});
			}
		}
	}
}
