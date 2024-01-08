import { ReactNode } from 'react';

export interface ActionMenuItem {
    text: string;
    icon: ReactNode;
}

export interface ActionMenuProps {
    title: string;
    icon: ReactNode;
    items: ActionMenuItem[];
    onItemClick?: (index: number) => void;
    fontWeight?: number | string;
    color?: string;
    mt?: number | string;
    mr?: number | string;
    ml?: number | string;
    mb?: number | string;
    fontSize?: number | string;
}
