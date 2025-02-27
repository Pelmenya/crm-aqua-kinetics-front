import { Page } from "@/shared/ui/components/page/page"
import { FC } from "react"
import { AccountHeader } from "./components/account-header/account-header"
import { UserInfo } from "./components/user-info/user-info"

export const AccountPage: FC = () => {

    return (
        <Page back={true}>
            <div className="w-full h-full px-4 gap-2">
                <AccountHeader title="Личный кабинет" />
                <UserInfo />
            </div>
        </Page>

    )
}