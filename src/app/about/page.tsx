import { type Metadata } from "next";
import { IdCardIcon, GearIcon } from "@radix-ui/react-icons";

import BlurFade from "@/components/magicui/blur-fade";
import AboutMe from "./_components/about-me";
import Skills from "./_components/skills";
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
    title: "About",
};

export default function AboutPage() {
    return (
        <SectionContainer>
            <Section>
                <BlurFade delay={0.15}>
                    <SectionHeader border>
                        <SectionTitle icon={<SectionIcon as={IdCardIcon} />}>
                            About Me
                        </SectionTitle>
                        <SectionDescription>
                            A little about me
                        </SectionDescription>
                    </SectionHeader>
                </BlurFade>
                <BlurFade delay={0.15 * 2}>
                    <SectionContent>
                        <AboutMe />
                    </SectionContent>
                </BlurFade>
            </Section>
            <Section>
                <BlurFade delay={0.15 * 3}>
                    <SectionHeader border>
                        <SectionTitle icon={<SectionIcon as={GearIcon} />}>
                            Tech
                        </SectionTitle>
                        <SectionDescription>
                            What I&apos;m using
                        </SectionDescription>
                    </SectionHeader>
                </BlurFade>
                <BlurFade delay={0.15 * 4}>
                    <SectionContent>
                        <Skills />
                    </SectionContent>
                </BlurFade>
            </Section>
        </SectionContainer>
    );
}
