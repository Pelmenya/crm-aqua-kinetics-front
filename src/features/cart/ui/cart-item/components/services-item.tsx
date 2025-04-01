import { TServiceItem } from "@/features/cart/model/cart-slice";
import { useGetServiceQuery } from "@/features/moy-sklad/api/moy-sklad-api";
import { FC } from "react";

export const ServicesItem: FC<TServiceItem> = ({ service, count }) => {
    const { data } = useGetServiceQuery(service.id || '');

    return (
        <div className="badge badge-xs badge-ghost line-clamp-1">
            <span className="text-warning">{count}</span>
            <span className="text-ex-min"> - {
                data?.name

            }
            </span>
        </div>
    )
}