"use client";

import { MAX_MESSAGE_CONTENT_LENGTH } from "../../_lib/constants";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

export default function TextEditor({
    className,
    ...props
}: React.ComponentProps<typeof Textarea>) {
    return (
        <Textarea
            className={cn("min-h-[138px] w-full resize-none", className)}
            minRows={6}
            maxLength={MAX_MESSAGE_CONTENT_LENGTH}
            required
            {...props}
        />
    );
}
