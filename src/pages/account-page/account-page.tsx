import { Page } from "@/shared/ui/components/page/page"
import { FC } from "react"
import { AccountHeader } from "./components/account-header/account-header"

export const AccountPage: FC = () => {

    return (
        <Page back={true}>
            <div className="w-full h-full">
                <AccountHeader title="Личный кабинет" />
            </div>
        </Page>

    )
}