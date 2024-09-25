import {
    useMutation,
    useQueryClient,
    type UseMutationOptions,
    type QueryKey,
} from "@tanstack/react-query";

import { type QueryData } from "../_lib/utils";

type UseMessageMutationOptions<TData, TError, TVariables, TContext> =
    UseMutationOptions<
        TData,
        TError,
        TVariables,
        TContext & { previousQueryData?: QueryData }
    > & {
        queryKey: QueryKey;
        invalidate?: boolean;
    };
export default function useMessageMutation<
    TData,
    TError,
    TVariables,
    TContext,
>({
    queryKey,
    invalidate = true,
    onMutate,
    onError,
    onSettled,
    ...options
}: UseMessageMutationOptions<TData, TError, TVariables, TContext>) {
    const queryClient = useQueryClient();
    return useMutation({
        ...options,
        async onMutate(variables) {
            await queryClient.cancelQueries({ queryKey });
            return onMutate?.(variables);
        },

        async onError(error, variables, context) {
            if (context?.previousQueryData) {
                queryClient.setQueryData(queryKey, context.previousQueryData);
            }

            return onError?.(error, variables, context);
        },

        async onSettled(data, error, variables, context) {
            if (invalidate) {
                await queryClient.invalidateQueries({ queryKey });
            }

            return onSettled?.(data, error, variables, context);
        },
    });
}
