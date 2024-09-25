import { type Metadata } from "next";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

import BlurFade from "@/components/magicui/blur-fade";
import MessageForm from "./_components/message-form";
import MessageList from "./_components/message-list";
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
    title: "Messages",
};

export default function MessagesPage() {
    return (
        <SectionContainer>
            <Section>
                <BlurFade delay={0.15}>
                    <SectionHeader border>
                        <SectionTitle
                            icon={<SectionIcon as={PaperPlaneIcon} />}
                        >
                            Messages
                        </SectionTitle>
                        <SectionDescription>
                            Leave your impressions or thoughts about me or this
                            website.
                        </SectionDescription>
                    </SectionHeader>
                </BlurFade>
                <SectionContent>
                    <div className="flex flex-col gap-10">
                        <BlurFade delay={0.15 * 2}>
                            <MessageForm />
                        </BlurFade>
                        <BlurFade delay={0.15 * 3}>
                            <MessageList />
                        </BlurFade>
                    </div>
                </SectionContent>
            </Section>
        </SectionContainer>
    );
}
