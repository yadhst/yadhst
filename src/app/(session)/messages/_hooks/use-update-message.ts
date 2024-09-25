import { MESSAGE_QUERY_KEYS } from "../_lib/constants";
import { updateMessage } from "../_actions/message";
import useMessageMutation from "./use-message-mutation";
import useMessageCacheQuery from "./use-message-cache-query";

type UseUpdateMessageOptions = {
    referenceId?: string | null;
    invalidate?: boolean;
};
export default function useUpdateMessage({
    referenceId,
    invalidate = true,
}: UseUpdateMessageOptions) {
    const messageCache = useMessageCacheQuery();
    const queryKey = !!referenceId
        ? [...MESSAGE_QUERY_KEYS, { referenceId }]
        : MESSAGE_QUERY_KEYS;

    return useMessageMutation({
        queryKey,
        invalidate,
        mutationFn: updateMessage,
        onMutate(variables) {
            const [, queryData] = messageCache.getQueryData({ queryKey });
            const indicator =
                "content" in variables
                    ? "isEditing"
                    : "pinnedAt" in variables
                      ? "isPinning"
                      : "isUpdating";

            messageCache.setMessage(
                (m) => m.id === variables.id,
                (m) => ({
                    ...m,
                    ...variables,
                    isOptimistic: true,
                    [indicator]: true,
                })
            );

            return {
                previousQueryData: queryData,
            };
        },
    });
}
