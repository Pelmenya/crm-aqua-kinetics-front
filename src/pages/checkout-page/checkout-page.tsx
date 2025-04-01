import { Page } from "@/shared/ui/components/page/page";
import { FC } from "react";

export const CheckoutPage: FC = () => {

    return (
        <Page back={true} className="bg-base-300 pt-2 flex flex-col justify-between gap-6">
            <h1 className="block w-full text-center pb-4 text-lg font-bold">Оформление</h1>
            <div className="w-full px-4 pb-4">
                <button className="btn btn-primary w-full">Оформить</button>
            </div>
        </Page>
    )
} 