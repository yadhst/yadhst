import { type Metadata } from "next";
import Link from "next/link";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";

import BlurFade from "@/components/magicui/blur-fade";
import ShortAboutMe from "./_components/short-about-me";
import Socials from "./_components/socials";
import {
    SectionContainer,
    Section,
    SectionHeader,
    SectionContent,
    SectionTitle,
    SectionIcon,
    SectionDescription,
} from "@/components/layouts/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Home ─ Yadhst",
};

export default function HomePage() {
    return (
        <SectionContainer>
            <Section>
                <SectionContent>
                    <div className="flex flex-col gap-2">
                        <div>
                            <BlurFade delay={0.15}>
                                <h1 className="text-2xl font-bold before:content-['👋_']">
                                    Hi, I&apos;m Fayyadh Abdurrohman
                                </h1>
                            </BlurFade>
                        </div>
                        <BlurFade delay={0.15 * 2}>
                            <ShortAboutMe />
                        </BlurFade>
                    </div>
                    <BlurFade delay={0.15 * 3}>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" asChild>
                                <Link href="/about">More About Me</Link>
                            </Button>
                            {/* <Button variant="outline" asChild>
                            <Link href="/resume">Resume</Link>
                        </Button> */}
                        </div>
                    </BlurFade>
                </SectionContent>
            </Section>
            <Section>
                <BlurFade delay={0.15 * 4}>
                    <SectionHeader border>
                        <SectionTitle
                            icon={<SectionIcon as={EnvelopeClosedIcon} />}
                        >
                            Contact
                        </SectionTitle>
                        <SectionDescription>
                            Let&apos;s get in touch
                        </SectionDescription>
                    </SectionHeader>
                </BlurFade>
                <BlurFade delay={0.15 * 5}>
                    <SectionContent>
                        <Socials />
                    </SectionContent>
                </BlurFade>
            </Section>
        </SectionContainer>
    );
}
