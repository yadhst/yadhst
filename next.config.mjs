import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    experimental: {
        mdxRs: true,
        typedRoutes: true,
    },
    images: {
        remotePatterns: [
            {
                hostname: "skillicons.dev",
            },
            {
                hostname: "lh3.googleusercontent.com",
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
