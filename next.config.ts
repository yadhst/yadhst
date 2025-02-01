import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    experimental: {
        mdxRs: true,
        typedRoutes: true,
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                hostname: "skillicons.dev",
            },
            {
                hostname: "lh3.googleusercontent.com",
            },
            {
                hostname: "api.microlink.io",
            },
        ],
    },
};

const withMDX = createMDX({
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
    },
});

export default withMDX(nextConfig);
