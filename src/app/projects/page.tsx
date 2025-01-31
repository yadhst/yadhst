import { type Metadata } from "next";
import { BackpackIcon } from "@radix-ui/react-icons";

import Projects from "./_components/projects";
import SectionContainer from "@/components/sections/section/container";
import Section from "@/components/sections/section";
import SectionHeader from "@/components/sections/section/header";
import SectionContent from "@/components/sections/section/content";

export const metadata: Metadata = {
    title: "Projects",
};

export default function ProjectsPage() {
    return (
        <SectionContainer>
            <Section>
                <SectionHeader
                    title="Projects"
                    description="What I've been working on"
                    icon={<BackpackIcon />}
                    border
                />
                <SectionContent>
                    <Projects />
                </SectionContent>
            </Section>
        </SectionContainer>
    );
}
