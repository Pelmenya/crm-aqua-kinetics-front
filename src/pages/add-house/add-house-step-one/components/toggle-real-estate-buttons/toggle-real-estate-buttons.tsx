import { FC } from "react";

export const ToggleRealEstateButtons: FC<{ active: string, onToggle: (type: "house" | "apartment") => void }> = ({ active, onToggle }) => {
    return (
        <div className="w-full flex items-center">
            <div className="join w-full bg-base-100">
                <button
                    className={`btn join-item min-w-[50%] ${active === "house" ? "btn-primary" : "btn-primary btn-outline"}`}
                    onClick={() => onToggle("house")}
                >
                    Частный дом
                </button>
                <button
                    className={`btn join-item min-w-[50%] ${active === "apartment" ? "btn-primary" : "btn-primary btn-outline"}`}
                    onClick={() => onToggle("apartment")}
                >
                    Квартира
                </button>
            </div>
        </div>
    );
};
