import { type Metadata } from "next";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

import MessageForm from "./_components/message-form";
import MessageList from "./_components/message-list";
import SectionContainer from "@/components/sections/section/container";
import Section from "@/components/sections/section";
import SectionHeader from "@/components/sections/section/header";
import SectionContent from "@/components/sections/section/content";

export const metadata: Metadata = {
    title: "Messages",
};

export default function MessagesPage() {
    return (
        <SectionContainer>
            <Section>
                <SectionHeader
                    title="Messages"
                    description="Feel free to reach out! I'd love to hear things from you"
                    icon={<PaperPlaneIcon />}
                    border
                />
                <SectionContent>
                    <div className="flex flex-col gap-10">
                        <MessageForm />
                        <MessageList />
                    </div>
                </SectionContent>
            </Section>
        </SectionContainer>
    );
}
