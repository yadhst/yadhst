import style from "./style.module.css";
import { cn } from "@/lib/utils";

const COLOR = "hsl(var(--foreground) / 0.03)";
const SIZE = "20px";
export default function GridBlurryBlob() {
    return (
        <div
            className="pointer-events-none absolute inset-0 -z-50 size-full"
            style={{
                backgroundImage: `linear-gradient(${COLOR} 1px, transparent 1px), linear-gradient(to right, ${COLOR} 1px, transparent 1px)`,
                backgroundSize: `${SIZE} ${SIZE}`,
            }}
        >
            <div className={cn(style.blurryBlob)}></div>
        </div>
    );
}
