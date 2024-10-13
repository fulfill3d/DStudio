interface DropdownItemType {
    id: number;
    name: string;
}

export interface IDropdownType {
    title: string;
    list: DropdownItemType[];
    color?: "violet" | "pink" | "red" | "orange" | "yellow" | "lime" | "cyan";
    className?: string;
    onClick: (id: number) => void;
}
