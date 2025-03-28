import { Link } from '@/app/link/link';
import React from 'react';

export type TBreadcrumb = {
    name: string;
    path?: string;
}

export const Breadcrumbs: React.FC<{
    items: TBreadcrumb[];
}> = ({ items }) => {
    return (
        <div className="breadcrumbs text-sm px-4">
            <ul className='flex flex-wrap'>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.path ? (
                            <Link to={item.path}>{item.name}</Link>
                        ) : (
                            <span>{item.name}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
