import { MESSAGE_QUERY_KEYS } from "../_lib/constants";
import { createMessage } from "../_actions/message";
import { createTemporaryMessage } from "../_lib/utils";
import useMessageMutation from "./use-message-mutation";
import useMessageCacheQuery from "./use-message-cache-query";
import { useCurrentUser } from "@/contexts/current-user-context";

type UseCreateMessageOptions = {
    referenceId?: string | null;
    invalidate?: boolean;
};
export default function useCreateMessage({
    referenceId,
    invalidate = true,
}: UseCreateMessageOptions) {
    const messageCache = useMessageCacheQuery();
    const { currentUser } = useCurrentUser();

    const queryKey = !!referenceId
        ? [...MESSAGE_QUERY_KEYS, { referenceId }]
        : MESSAGE_QUERY_KEYS;

    return useMessageMutation({
        queryKey,
        invalidate,
        mutationFn: createMessage,
        onMutate(variables) {
            const [, queryData] = messageCache.getQueryData({ queryKey });
            const temporaryMessage = createTemporaryMessage(
                variables.content,
                currentUser!,
                referenceId
            );

            messageCache.addMessage({ queryKey }, temporaryMessage);
            if (referenceId) {
                messageCache.addRepliesCount((m) => m.id === referenceId);
            }

            return {
                previousQueryData: queryData,
                temporaryId: temporaryMessage.id,
            };
        },

        onError() {
            if (referenceId) {
                messageCache.subtractRepliesCount((m) => m.id === referenceId);
            }
        },

        onSuccess(data, variables, context) {
            if (referenceId) {
                messageCache.setMessage(
                    (m) => m.id === context.temporaryId,
                    () => data
                );
            }
        },
    });
}
