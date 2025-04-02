import { RealEstate } from "@/entities/real-estate/ui/real-estate/real-estate";
import { Page } from "@/shared/ui/components/page/page";
import { FC } from "react";

export const CheckoutPage: FC = () => {

    return (
        <Page back={true} className="bg-base-300 pt-2 flex flex-col justify-between gap-6 px-4">
            <div>
            <h1 className="block w-full text-center pb-4 text-lg font-bold">Оформление</h1>
            <RealEstate />
            </div>
            <div className="w-full pb-4">
                <button className="btn btn-primary w-full">Оформить</button>
            </div>
        </Page>
    )
} 