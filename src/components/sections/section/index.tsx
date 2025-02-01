import style from "./style.module.scss";
import BlurFade from "@/components/magicui/blur-fade";

export default function Section({ children }: { children: React.ReactNode }) {
    return (
        <BlurFade inView>
            <section className={style.section}>{children}</section>
        </BlurFade>
    );
}
