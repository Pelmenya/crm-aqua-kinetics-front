import { Page } from "@/shared/ui/components/page/page"
import { FC } from "react"
import { AccountHeader } from "./components/account-header/account-header"
import { UserInfo } from "./components/user-info/user-info"
import { Outlet } from "react-router-dom"
import { useRoleBasedNavigation } from "@/shared/lib/hooks/use-role-based-navigation"

export const AccountPage: FC = () => {
    useRoleBasedNavigation('/account'); // передаем базовый путь

    return (
        <Page back={false} footer={true}>
            <div className="w-full h-full px-4 gap-2 bg-base-300 pb-16">
                <AccountHeader title="Личный кабинет" />
                <UserInfo />
                <Outlet />
            </div>
        </Page>

    )
}