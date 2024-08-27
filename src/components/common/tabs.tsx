import React, { createContext, useContext, useState, ReactNode, ReactElement, FunctionComponent } from 'react';
import classNames from "classnames";
import Button from "./button";

interface TabContextProps {
    activeTab: number;
    setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

const useTabs = (): TabContextProps => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error('useTabs must be used within a TabProvider');
    }
    return context;
};

interface TabGroupProps {
    children: ReactElement[];
}

const TabGroup: FunctionComponent<TabGroupProps> = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);
    const tabListChildren = children.filter(child => (child.type as any).tabComponentType === 'TabList');
    const tabPanelsChildren = children.filter(child => (child.type as any).tabComponentType === 'TabPanels');

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="w-full h-auto flex">
                {tabListChildren}
            </div>
            <div className="w-full h-auto flex">
                {tabPanelsChildren}
            </div>
        </TabContext.Provider>
    );
};

interface TabListProps {
    children: ReactNode;
}

interface ExtendedTabListProps extends TabListProps {
    tabComponentType?: string;
}

const TabList: FunctionComponent<ExtendedTabListProps> = ({ children }) => {
    const { setActiveTab } = useTabs();
    const childrenWithProps = React.Children.map(children, (child, index) =>
        React.cloneElement(child as ReactElement, { index, onClick: () => setActiveTab(index) })
    );

    const _className = classNames(
        'w-full flex',
        'border-black border-2 bg-pink-200',
        'rounded-md',
        'items-center justify-center'
    );

    return <div className={_className}>{childrenWithProps}</div>;
};

interface TabProps {
    children: ReactNode;
    index?: number;
    onClick?: () => void;
}

const Tab: FunctionComponent<TabProps> = ({ children, index, onClick }) => (
    <Button
        buttonText={children}
        rounded='md'
        size='sm'
        color='cyan'
        callback={onClick}
        className='m-2'
        index={index}
    />
);

interface TabPanelsProps {
    children: ReactNode;
}

interface ExtendedTabPanelsProps extends TabPanelsProps {
    tabComponentType?: string;
}

const TabPanels: FunctionComponent<ExtendedTabPanelsProps> = ({ children }) => {
    const { activeTab } = useTabs();
    return <div className="w-full mt-2 p-4">{React.Children.toArray(children)[activeTab]}</div>;
};

interface TabPanelProps {
    children: ReactNode;
}

const TabPanel: FunctionComponent<TabPanelProps> = ({ children }) => <div>{children}</div>;

// Extend the Tab component with additional properties
interface TabComponent extends FunctionComponent<TabProps> {
    Group: FunctionComponent<TabGroupProps>;
    List: FunctionComponent<ExtendedTabListProps>;
    Panels: FunctionComponent<ExtendedTabPanelsProps>;
    Panel: FunctionComponent<TabPanelProps>;
}

const TabComponent: TabComponent = Tab as TabComponent;

TabComponent.Group = TabGroup;
TabComponent.List = TabList;
TabComponent.Panels = TabPanels;
TabComponent.Panel = TabPanel;

(TabComponent.List as any).tabComponentType = 'TabList';
(TabComponent.Panels as any).tabComponentType = 'TabPanels';

export default TabComponent;
