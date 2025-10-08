// Global TypeScript type definitions

import { ReactNode } from 'react';

// Common React component types
export interface BaseComponentProps {
    children?: ReactNode;
    className?: string;
}

export interface PageProps {
    params: { [key: string]: string | string[] | undefined };
    searchParams: { [key: string]: string | string[] | undefined };
}

// Common UI component types
export interface ButtonProps extends BaseComponentProps {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    disabled?: boolean;
    onClick?: () => void;
}

export interface CardProps extends BaseComponentProps {
    title?: string;
    description?: string;
}

// Animation and interaction types
export interface AnimationProps {
    delay?: number;
    duration?: number;
    className?: string;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Re-export portfolio types for convenience
export * from './portfolio';