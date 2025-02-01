import { type Metadata } from "next";
import Link from "next/link";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";

import ShortAboutMe from "./_components/short-about-me";
import Socials from "./_components/socials";
import SectionContainer from "@/components/sections/section/container";
import Section from "@/components/sections/section";
import SectionHeader from "@/components/sections/section/header";
import SectionContent from "@/components/sections/section/content";
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
                        <h1 className="text-2xl font-bold before:content-['👋_']">
                            Hi, I&apos;m Fayyadh Abdurrohman
                        </h1>
                        <ShortAboutMe />
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="secondary" asChild>
                            <Link href="/about">More About Me</Link>
                        </Button>
                    </div>
                </SectionContent>
            </Section>
            <Section>
                <SectionHeader
                    title="Contact"
                    description="Let's get in touch"
                    icon={<EnvelopeClosedIcon />}
                    border
                />
                <SectionContent>
                    <Socials />
                </SectionContent>
            </Section>
        </SectionContainer>
    );
}
