"use client";

import { useCurrentUser } from "@/contexts/current-user-context";
import { useMessage } from "../../../_contexts/message-context";
import MessageForm from "../../message-form";
import ReplyList from "./reply-list";

export default function MessageReplies() {
    const { currentUser } = useCurrentUser();
    const { message, replyFormOpened, setReplyFormOpened } = useMessage();

    return (
        <div className="mt-3 flex flex-col gap-6 empty:hidden">
            {replyFormOpened && !!currentUser && (
                <MessageForm
                    referenceId={message.id}
                    closeReply={() => setReplyFormOpened(false)}
                />
            )}
            {!!message._count.replies && <ReplyList />}
        </div>
    );
}
