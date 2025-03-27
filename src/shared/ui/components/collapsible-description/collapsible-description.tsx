import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';

export const CollapsibleDescription: FC<{ description: string }> = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const descriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (descriptionRef.current) {
            const lineHeight = parseInt(window.getComputedStyle(descriptionRef.current).lineHeight);
            const maxHeight = lineHeight * 2; // Высота для двух строк
            if (descriptionRef.current.scrollHeight <= maxHeight) {
                setIsButtonVisible(false); // Если текста меньше или равно двум строкам, кнопка скрыта
            }
        }
    }, []);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="relative overflow-hidden" style={{ transition: 'max-height 0.3s ease-in-out' }} ref={descriptionRef}>
                <div
                    className={cn('transition-opacity duration-300 ease-in-out', {
                        'max-h-full opacity-100': isExpanded,
                        'max-h-[4rem] opacity-75': !isExpanded
                    })}
                >
                    <p className="line-clamp-none text-sm">{description}</p>
                </div>
                {!isExpanded && isButtonVisible && (
                    <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-base-100 to-transparent transition-opacity duration-300 ease-in-out"></div>
                )}
            </div>
            {isButtonVisible && (
                <button
                    className={cn('btn btn-link btn-xs flex items-center w-full transition-all duration-300 ease-in-out', {
                        'mt-1': isExpanded,
                        'mt-[-0.5rem]': !isExpanded
                    })}
                    onClick={toggleDescription}
                >
                    <span className={cn('transform transition-transform duration-300 ease-in-out', {
                        'rotate-180': isExpanded,
                        'rotate-0': !isExpanded
                    })}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </button>
            )}
        </div>
    );
};

