import { type Metadata } from "next";
import { BackpackIcon } from "@radix-ui/react-icons";

import BlurFade from "@/components/magicui/blur-fade";
import Projects from "./_components/projects";
import {
    SectionContainer,
    Section,
    SectionHeader,
    SectionContent,
    SectionTitle,
    SectionIcon,
    SectionDescription,
} from "@/components/layouts/section";

export const metadata: Metadata = {
    title: "Projects",
};

export default function ProjectsPage() {
    return (
        <SectionContainer>
            <Section>
                <BlurFade delay={0.15}>
                    <SectionHeader border>
                        <SectionTitle icon={<SectionIcon as={BackpackIcon} />}>
                            Projects
                        </SectionTitle>
                        <SectionDescription>
                            What I&apos;m doing
                        </SectionDescription>
                    </SectionHeader>
                </BlurFade>
                <SectionContent>
                    <Projects />
                </SectionContent>
            </Section>
        </SectionContainer>
    );
}
