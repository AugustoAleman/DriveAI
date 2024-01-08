import { ReactNode } from "react";

export interface FooterProps {
    /**
     * Footer background color, default: theme.palette.primary.main
     */
    colorBackground?: string;
    /**
     * Color of all text in the footer, default: theme.palette.background.default
     */
    colorText?: string;
    /**
     * Color of all social media icons and links: theme.palette.accent.main
     */
    colorLineAndSocialMedia?: string;
}

interface Link {
    name: string;
    url: string;
}
export interface FooterLinkProps {
    title: string;
    link: Link[];
}
export interface FooterSocialMedialProps {
    pathLogo: () => ReactNode;
    url: string;
}

export interface ColorsProps {
    colorBackground: string;
    colorText: string;
    colorLineAndSocialMedia: string;
}