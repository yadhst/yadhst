import { cn } from "@/lib/utils";

export function SectionContainer({
    children,
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-10", className)} {...props}>
            {children}
        </div>
    );
}

export function Section({
    children,
    className,
    ...props
}: React.ComponentProps<"section">) {
    return (
        <section className={cn("flex flex-col gap-5", className)} {...props}>
            {children}
        </section>
    );
}

export function SectionHeader({
    children,
    className,
    border,
    ...props
}: React.ComponentProps<"div"> & { border?: boolean }) {
    return (
        <div
            className={cn(
                "flex flex-col gap-1",
                border &&
                    "after:mt-1 after:h-1.5 after:w-14 after:rounded-full after:bg-brand",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function SectionTitle({
    children,
    className,
    icon,
    ...props
}: React.ComponentProps<"h1"> & { icon?: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2">
            {!!icon && <div className="flex items-center">{icon}</div>}
            <div className="flex items-center">
                <h1 className={cn("text-xl font-medium", className)} {...props}>
                    {children}
                </h1>
            </div>
        </div>
    );
}

export function SectionIcon({
    as,
    className,
    ...props
}: React.ComponentProps<"svg"> & {
    as: React.ComponentType<{ className?: string }>;
}) {
    const Comp = as;
    return <Comp className={cn("size-5", className)} {...props} />;
}

export function SectionDescription({
    children,
    className,
    ...props
}: React.ComponentProps<"p">) {
    return (
        <div className="flex items-center">
            <p
                className={cn("text-sm text-muted-foreground", className)}
                {...props}
            >
                {children}
            </p>
        </div>
    );
}

export function SectionContent({
    children,
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-4", className)} {...props}>
            {children}
        </div>
    );
}
