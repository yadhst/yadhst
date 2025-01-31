import style from "./style.module.scss";
import { cn } from "@/lib/utils";

export default function SectionContent({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn(style.section_content, className)}>{children}</div>
    );
}
