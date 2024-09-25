"use client";

import { useState, useEffect, type ComponentProps } from "react";
import dayjs from "dayjs";
import relativeTimePlugin from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTimePlugin);

type TimeAgoProps = Omit<
    ComponentProps<"time">,
    "dateTime" | "title" | "children"
> & {
    dateTime: Date | number;
};
export default function TimeAgo({ dateTime, ...props }: TimeAgoProps) {
    const date = dayjs(dateTime);
    const unit = getUnitFactor(date.toDate());
    const [relativeTime, setRelativeTime] = useState<string>(
        unit === "week" ? date.format("MMM DD, YYYY") : date.fromNow()
    );

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | undefined;
        function tick() {
            if (timeoutId) clearTimeout(timeoutId);
            if (unit === "week")
                return setRelativeTime(date.format("MMM DD, YYYY"));
            setRelativeTime(date.fromNow());

            const ms = Math.round(
                Math.abs(
                    dayjs().second(0).add(1, unit).toDate().getTime() -
                        Date.now()
                )
            );

            timeoutId = setTimeout(() => tick(), ms);
        }

        tick();
        return () => timeoutId && clearTimeout(timeoutId);
    }, [date, unit]);

    return (
        <time
            dateTime={date.toISOString()}
            title={date.format("dddd DD/MM/YYYY h:mm:ss A")}
            data-live
            {...props}
        >
            {relativeTime}
        </time>
    );
}

function getUnitFactor(date: Date) {
    const now = dayjs();
    const units = ["week", "day", "hour", "minute"] as const;

    return units.find((unit) => now.diff(date, unit) > 0) ?? "minute";
}
