import { getRole } from "@/entities/user/lib/get-role";
import { getUserState } from "@/entities/user/model/user-selectors";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { FC } from "react";

export const UserInfo: FC = () => {
    const { user } = useAppSelector(getUserState);

    return (
        <div className="flex gap-6 py-4">
            <img className="avatar w-18 h-18 rounded-full" src={user?.photo_url} alt={user?.username} />
            <div>
                <p className="font-semibold text-xl">{user?.first_name} {user?.last_name}</p>
                <p className="text-min opacity-50">{getRole(user?.role)}</p>
            </div>
        </div>
    )
}