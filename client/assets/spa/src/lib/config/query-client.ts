import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			networkMode: "online",
			throwOnError(error, query) {
				if (error.name === "AxiosError") {
					const apiError = error as AxiosError;

					if (apiError.response?.status === 403)
						window.location.href = "/login";
				}
				return false;
			},
			retry: 2,

			staleTime: 0,
		},
	},
});
