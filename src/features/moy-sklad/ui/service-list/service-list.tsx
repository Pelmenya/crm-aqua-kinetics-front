import { FC } from "react";
import { ServiceCard } from "../service-card/service-card";

export type TServicesListProps = {
    servicesIds: string[];
    serviceStates: Record<string, { count: number; checked: boolean }>;
    onIncrement: (serviceId: string) => void;
    onDecrement: (serviceId: string) => void;
    onCheckboxChange: (serviceId: string) => void;
}

export const ServicesList: FC<TServicesListProps> = ({
    servicesIds,
    serviceStates,
    onIncrement,
    onDecrement,
    onCheckboxChange
}) => {
    return (
        <div className='grid grid-cols-1 gap-2'>
            {servicesIds.map(id => (
                <ServiceCard
                    key={id}
                    id={id}
                    count={serviceStates[id]?.count || 0}
                    checked={serviceStates[id]?.checked || false}
                    onIncrement={() => onIncrement(id)}
                    onDecrement={() => onDecrement(id)}
                    onCheckboxChange={() => onCheckboxChange(id)}
                />
            ))}
        </div>
    );
};
