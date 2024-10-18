import { Inter, Poppins, Arizonia } from "next/font/google";

export const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-inter",
});

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const arizonia = Arizonia({
    subsets: ["latin"],
    weight: ["400"],
});
