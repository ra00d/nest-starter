import { ErrorPage } from "@/components/ui/error-page";
import { LoadingPage } from "@/components/ui/loading-page";
import {
	QueryClient,
	QueryKey,
	UndefinedInitialDataOptions,
	useQuery,
} from "@tanstack/react-query";

export const useAdvincedQuery = <
	TQueryFnData = unknown,
	TError = Error,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(
	options: UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
	client?: QueryClient | undefined,
) => {
	const query = useQuery<TQueryFnData, TError, TData, TQueryKey>(
		options,
		client,
	);
	return {
		...query,
		isLoadingOrError: query.isLoading || query.isError,
		loadingOrError: query.isLoading ? (
			<LoadingPage />
		) : (
			<ErrorPage
				error={
					query?.error
						? (query.error as any)?.message
						: "sorry something went wrong"
				}
			/>
		),
	};
};
