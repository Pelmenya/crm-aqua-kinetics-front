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
        <nav className="text-sm px-4 py-2">
            <ul className='flex flex-wrap gap-2'>
                {items.map((item, index) => (
                    <li className="badge" key={index}>
                        {item.path ? (
                            <Link to={item.path}>{item.name}</Link>
                        ) : (
                            <span>{item.name}</span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
