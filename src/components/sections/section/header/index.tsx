import style from "./style.module.scss";
import { cn } from "@/lib/utils";
import { Show } from "@/components/utilities/conditional";

type SectionHeaderProps = {
    title: string;
    description: string;
    icon?: React.ReactNode;
    border?: boolean;
};
export default function SectionHeader({
    title,
    description,
    icon,
    border = true,
}: SectionHeaderProps) {
    return (
        <div className={cn(style.section_header, border && style.with_border)}>
            <div className={style.label}>
                <Show when={!!icon}>{icon}</Show>
                <h1 className={style.title}>{title}</h1>
            </div>
            <p className={style.description}>{description}</p>
        </div>
    );
}
