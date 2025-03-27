import { FC } from "react"
import { ServiceCard } from "../service-card/service-card"

export const ServicesList: FC<{ servicesIds: string[] }> = ({ servicesIds }) => {
    return <div className='grid grid-cols-1 gap-2'>
        {servicesIds.map(id =>
            <ServiceCard key={id} id={id} />)
        }
    </div>
}