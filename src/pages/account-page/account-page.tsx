import { Page } from "@/shared/ui/components/page/page"
import { FC } from "react"
import { AccountHeader } from "./components/account-header/account-header"
import { UserInfo } from "./components/user-info/user-info"
import { RealEstate } from "./components/real-estate/real-estate"
import { Services } from "./components/services/services"

export const AccountPage: FC = () => {

    return (
        <Page footer={true}>
            <div className="w-full h-full px-4 gap-2 bg-base-300">
                <AccountHeader title="Личный кабинет" />
                <UserInfo />
                <RealEstate />
                <Services />
            </div>
        </Page>

    )
}