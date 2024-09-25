import ProjectCard from "@/components/cards/project-card";

const projects = [
    {
        title: "Personal Website",
        description: "My personal website built with Next.js and TailwindCSS.",
        coverImage: "/images/meta.jpeg",
        tags: ["Website", "Next.js", "TailwindCSS"],
        links: [
            {
                label: "View",
                href: "https://yadh.vercel.app/" as unknown as URL,
            },
            {
                label: "Repository",
                href: "https://github.com/yadhst/yadhst" as unknown as URL,
            },
        ],
    },
];

export default function Projects() {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {projects.map((project) => (
                <div key={project.title} className="lg:last:odd:col-span-2">
                    <ProjectCard key={project.title} {...project} />
                </div>
            ))}
        </div>
    );
}
