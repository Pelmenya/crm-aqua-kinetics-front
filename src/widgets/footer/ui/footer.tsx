import { FC } from "react";
import { Home } from "./components/home";
import { Category } from "./components/category";
import { Chat } from "./components/chat";
import { InfoSquare } from "./components/info-square";
import { useLocation } from "react-router-dom";
import { Link } from "@/app/link/link";

export const Footer: FC = () => {
    const location = useLocation();

    const getIconColor = (path: string) => {
        return location.pathname.split('/').includes(path) ? 'text-primary' : 'text-default';
    };

    return (
        <div className="bg-base-100 w-full py-2 px-4 flex justify-between items-center fixed z-100 bottom-0 left-0">
            <Link to='/account' className={getIconColor('account')}>
                <Home />
            </Link>
            <Link to='/catalog' className={getIconColor('catalog')}>
                <Category />
            </Link>
            <div className={getIconColor('chat')}>
                <Chat />
            </div>
            <div className={getIconColor('info')}>
                <InfoSquare />
            </div>
        </div>
    );
}