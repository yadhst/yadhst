import { Children, isValidElement } from "react";

type ShowProps = {
    children: React.ReactNode;
    when: boolean;
    fallback?: React.ReactNode;
};
export function Show({ children, when, fallback }: ShowProps) {
    return when ? children : (fallback ?? null);
}

type ShowElseProps = Omit<ShowProps, "fallback">;
export function ShowElse({ children, when }: ShowElseProps) {
    return <Show when={when}>{children}</Show>;
}

type OtherwiseProps = Omit<ShowProps, "when" | "fallback">;
export function Otherwise({ children }: OtherwiseProps) {
    return <Show when={true}>{children}</Show>;
}

export function Conditional({ children }: { children: React.ReactNode }) {
    let renderedChildren: React.ReactNode = null;

    Children.forEach(children, (child) => {
        if (isValidElement(child) && renderedChildren === null) {
            const props = child.props as ShowProps;
            if (child.type === Show && props.when) {
                renderedChildren = child;
            } else if (child.type === ShowElse && props.when) {
                renderedChildren = child;
            } else if (child.type === Otherwise) {
                renderedChildren = child;
            }
        }
    });

    return renderedChildren;
}
