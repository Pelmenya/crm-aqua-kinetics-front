import { FC } from "react";
import cn from "classnames";

export const ButtonWithIcon: FC<{
    onClick: () => void;
    disabled?: boolean;
    icon: 'plus' | 'minus';
    className?: string
}> = ({
    onClick,
    disabled = false,
    icon,
    className = '',
}) => (
        <button className={cn('btn btn-xs btn-square btn-outline', { [className]: className })} onClick={onClick} disabled={disabled}>
            {icon === "plus" && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            )}
            {icon === "minus" && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
            )}
        </button>
    );


