import { type Metadata } from "next";
import { IdCardIcon, GearIcon } from "@radix-ui/react-icons";

import AboutMe from "./_components/about-me";
import Skills from "./_components/skills";
import SectionContainer from "@/components/sections/section/container";
import Section from "@/components/sections/section";
import SectionHeader from "@/components/sections/section/header";
import SectionContent from "@/components/sections/section/content";

export const metadata: Metadata = {
    title: "About",
};

export default function AboutPage() {
    return (
        <SectionContainer>
            <Section>
                <SectionHeader
                    title="About Me"
                    description="A little about me"
                    icon={<IdCardIcon />}
                    border
                />

                <SectionContent>
                    <AboutMe />
                </SectionContent>
            </Section>
            <Section>
                <SectionHeader
                    title="Tech Stack"
                    description="Things I've been working with"
                    icon={<GearIcon />}
                    border
                />
                <SectionContent>
                    <Skills />
                </SectionContent>
            </Section>
        </SectionContainer>
    );
}
