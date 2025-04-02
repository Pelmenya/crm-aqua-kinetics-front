import { TServiceList } from "@/entities/cart/model/cart-slice";
import { FC } from "react";
import { ServicesItem } from "./services-item";

export const ServicesList: FC<{ services: TServiceList }> = ({ services }) => {

    return (
        <ul className="flex flex-col gap-1">
            {Object.keys(services).filter(service => services[service].checked).map(service => (
                <li key={service}>
                    <ServicesItem
                        service={services[service].service}
                        count={services[service].count}
                        checked={services[service].checked}
                    />
                </li>
            ))

            }
        </ul>
    )
}