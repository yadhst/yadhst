// Source: https://phosphoricons.com/

type IconProps = React.ComponentProps<"svg"> & { size?: number };

export function Crown({ ...props }: IconProps) {
    return (
        <Svg {...props}>
            <path d="M239.75,90.81c0,.11,0,.21-.07.32L217,195a16,16,0,0,1-15.72,13H54.71A16,16,0,0,1,39,195L16.32,91.13c0-.11-.05-.21-.07-.32A16,16,0,0,1,44,77.39l33.67,36.29,35.8-80.29a1,1,0,0,0,0-.1,16,16,0,0,1,29.06,0,1,1,0,0,0,0,.1l35.8,80.29L212,77.39a16,16,0,0,1,27.71,13.42Z" />
        </Svg>
    );
}

export function ArrowBendUpRight({ ...props }: IconProps) {
    return (
        <Svg {...props}>
            <path d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H128a88.1,88.1,0,0,0-88,88,8,8,0,0,1-16,0A104.11,104.11,0,0,1,128,96h76.69L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66Z" />
        </Svg>
    );
}

function Svg({ children, size, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size ?? 32}
            height={size ?? 32}
            fill="currentColor"
            viewBox="0 0 256 256"
            {...props}
        >
            {children}
        </svg>
    );
}
