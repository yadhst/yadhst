import { createPreviewLinkURL } from "@/lib/utils";
import ProjectCard from "@/components/cards/project-card";

const projects = [
    {
        title: "Personal Website",
        description: "My personal website built with Next.js and TailwindCSS.",
        cover: createPreviewLinkURL("https://yadh.vercel.app/", 312, 384),
        tags: ["website", "nextjs", "tailwindcss", "framer-motion"],
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
    {
        title: "Blog",
        description:
            "A blog featuring unique insights, history, and in-depth exploration of diverse topics, from intriguing concepts to random thoughts, inviting readers to broaden their perspectives.",
        cover: createPreviewLinkURL("https://yadh-blog.vercel.app/", 312, 384),
        tags: ["website", "sveltekit", "tailwindcss"],
        links: [
            {
                label: "View",
                href: "https://yadh-blog.vercel.app/" as unknown as URL,
            },
            {
                label: "Repository",
                href: "https://github.com/yadhst/blog" as unknown as URL,
            },
        ],
    },
];

export default function Projects() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project) => (
                <div key={project.title}>
                    <ProjectCard key={project.title} {...project} />
                </div>
            ))}
        </div>
    );
}
