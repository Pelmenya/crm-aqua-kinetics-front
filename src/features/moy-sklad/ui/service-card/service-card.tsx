import { FC } from "react";
import { useGetServiceQuery } from "../../api/moy-sklad-api";
import { Base } from "@/shared/ui/components/base/base";

export const ServiceCard: FC<{ id: string }> = ({ id }) => {
    const { data: service } = useGetServiceQuery(id || '');
    return (
        <label htmlFor={id} className='text-min'>
            <Base className='px-4 gap-4 flex justify-start'>
                <input id={id} type="checkbox" className="checkbox checkbox-sm" />
                {service?.name}
            </Base>
        </label>
    )

}