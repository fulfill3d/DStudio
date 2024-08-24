import React from "react";

export interface IButtonType {
    buttonText: string | React.ReactNode;
    rounded?: "none" | "md" | "full";
    size?: "sm" | "md" | "lg";
    color?: "violet" | "pink" | "red" | "orange" | "yellow" | "lime" | "cyan";
    disabled?: boolean;
    className?: string;
    callback?: () => void;
    index?: number;
}
