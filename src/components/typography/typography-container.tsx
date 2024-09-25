export default function TypographyContainer({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <div className="prose max-w-none dark:prose-invert">{children}</div>;
}
