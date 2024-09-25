import Image from "next/image";

type SkillProps = {
    name: string;
    iconUrl: string;
};
export default function SkillCard({ name, iconUrl }: SkillProps) {
    return (
        <div className="flex flex-wrap items-center gap-2.5 rounded-lg border border-border bg-secondary p-2.5 text-secondary-foreground">
            <div className="flex items-center">
                <Image
                    alt="icon"
                    src={iconUrl}
                    width={20}
                    height={20}
                    unoptimized
                />
            </div>
            <div className="flex items-center">
                <span className="text-xs font-medium">{name}</span>
            </div>
        </div>
    );
}
