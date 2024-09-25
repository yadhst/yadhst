import { MESSAGE_QUERY_KEYS } from "../_lib/constants";
import { deleteMessage } from "../_actions/message";
import useMessageMutation from "./use-message-mutation";
import useMessageCacheQuery from "./use-message-cache-query";

type UseDeleteMessageOptions = {
    referenceId?: string | null;
    invalidate?: boolean;
};
export default function useDeleteMessage({
    referenceId,
    invalidate = true,
}: UseDeleteMessageOptions) {
    const messageCache = useMessageCacheQuery();
    const queryKey = !!referenceId
        ? [...MESSAGE_QUERY_KEYS, { referenceId }]
        : MESSAGE_QUERY_KEYS;

    return useMessageMutation({
        queryKey,
        invalidate,
        mutationFn: deleteMessage,
        onMutate(variables) {
            const [, queryData] = messageCache.getQueryData({ queryKey });
            messageCache.setMessage(
                (m) => m.id === variables.id,
                (m) => ({
                    ...m,
                    isOptimistic: true,
                    isDeleting: true,
                })
            );

            return {
                previousQueryData: queryData,
            };
        },

        onSuccess(_, variables) {
            messageCache.removeMessage(
                { predicate: (m) => m.id === variables.id },
                variables.id
            );

            if (referenceId) {
                messageCache.subtractRepliesCount((m) => m.id === referenceId);
            }
        },
    });
}
