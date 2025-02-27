import { getRole } from "@/entities/user/lib/get-role";
import { getUserState } from "@/entities/user/model/user-selectors";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { FC } from "react";

export const UserInfo: FC = () => {
    const { user } = useAppSelector(getUserState);

    return (
        <div className="flex gap-6 py-4">
            <div className="avatar">
                <div className="w-16 rounded-full">
                    <img className="avatar" src={user?.photo_url} alt={user?.username} />
                </div>
            </div>
            <div>
                <p className="font-bold text-xl">{user?.first_name} {user?.last_name}</p>
                <p className="text-min">{getRole(user?.role)}</p>
            </div>
        </div>
    )
}