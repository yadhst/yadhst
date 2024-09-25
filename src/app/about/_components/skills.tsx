import SkillCard from "@/components/cards/skill-card";

const iconUrl = (id: string) => `https://skillicons.dev/icons?i=${id}`;
const skills = [
    {
        name: "Javascript",
        iconUrl: iconUrl("js"),
    },
    {
        name: "Typescript",
        iconUrl: iconUrl("ts"),
    },
    {
        name: "HTML5",
        iconUrl: iconUrl("html"),
    },
    {
        name: "CSS3",
        iconUrl: iconUrl("css"),
    },
    {
        name: "Bootstrap",
        iconUrl: iconUrl("bootstrap"),
    },
    {
        name: "TailwindCSS",
        iconUrl: iconUrl("tailwind"),
    },
    {
        name: "NodeJS",
        iconUrl: iconUrl("nodejs"),
    },
    {
        name: "ExpressJS",
        iconUrl: iconUrl("express"),
    },
    {
        name: "Markdown",
        iconUrl: iconUrl("md"),
    },
    {
        name: "ReactJS",
        iconUrl: iconUrl("react"),
    },
    {
        name: "NextJS",
        iconUrl: iconUrl("nextjs"),
    },
    {
        name: "MongoDB",
        iconUrl: iconUrl("mongodb"),
    },
    {
        name: "Firebase",
        iconUrl: iconUrl("firebase"),
    },
    {
        name: "VSCode",
        iconUrl: iconUrl("vscode"),
    },
    {
        name: "Figma",
        iconUrl: iconUrl("figma"),
    },
    {
        name: "Git",
        iconUrl: iconUrl("git"),
    },
];

export default function Skills() {
    return (
        <div className="grid grid-cols-2 gap-4 min-[900px]:grid-cols-3 lg:grid-cols-4">
            {skills.map((skill) => (
                <SkillCard key={skill.name} {...skill} />
            ))}
        </div>
    );
}
