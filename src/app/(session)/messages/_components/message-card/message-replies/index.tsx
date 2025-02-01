"use client";

import { useCurrentUser } from "@/contexts/current-user-context";
import { useMessage } from "../../../_contexts/message-context";
import MessageForm from "../../message-form";
import ReplyList from "./reply-list";
import { Show } from "@/components/utilities/conditional";

export default function MessageReplies() {
    const { currentUser } = useCurrentUser();
    const { message, replyFormOpened, setReplyFormOpened } = useMessage();

    return (
        <div className="mt-3 flex flex-col gap-6 empty:hidden">
            <Show when={replyFormOpened && !!currentUser}>
                <MessageForm
                    referenceId={message.id}
                    closeReply={() => setReplyFormOpened(false)}
                />
            </Show>
            <Show when={!!message._count.replies}>
                <ReplyList />
            </Show>
        </div>
    );
}
