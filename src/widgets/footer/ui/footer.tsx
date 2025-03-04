import { FC } from "react";
import { Home } from "./components/home";
import { Category } from "./components/category";
import { Chat } from "./components/chat";
import { InfoSquare } from "./components/info-square";
import { useLocation } from "react-router-dom";

export const Footer: FC = () => {
    const location = useLocation();

    const getIconColor = (path: string) => {
        return location.pathname === path ? 'text-primary' : 'text-default';
    };

    return (
        <div className="bg-base-100 w-full py-2 px-4 flex justify-between items-center fixed z-100 bottom-0 left-0">
            <div className={getIconColor('/account')}>
                <Home />
            </div>
            <div className={getIconColor('/category')}>
                <Category />
            </div>
            <div className={getIconColor('/chat')}>
                <Chat />
            </div>
            <div className={getIconColor('/info')}>
                <InfoSquare />
            </div>
        </div>
    );
}