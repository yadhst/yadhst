import style from "./style.module.scss";

export default function SectionContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className={style.section_container}>{children}</div>;
}
