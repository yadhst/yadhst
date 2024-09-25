"use client";

import { useMessage } from "../../../../_contexts/message-context";

export default function ReplyItem() {
    const { setReplyFormOpened } = useMessage();

    return (
        <button
            type="button"
            className="rounded-lg border border-border px-4 py-1 text-xs transition-colors duration-150 hover:bg-border"
            onClick={() => setReplyFormOpened((prev) => !prev)}
        >
            Reply
        </button>
    );
}
