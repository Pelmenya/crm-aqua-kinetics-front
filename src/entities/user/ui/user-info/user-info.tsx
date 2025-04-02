import { getRole } from "@/entities/user/lib/get-role";
import { getUserState } from "@/entities/user/model/user-selectors";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import { getUserLocation } from "../../lib/get-user-location";
import { EUserComponentLocation } from "../../model/e-user-component-location";
import  { initDataUser  } from "@telegram-apps/sdk-react";


export const UserInfo: FC = () => {
    const location = useLocation();
    const { user } = useAppSelector(getUserState);
    
    const tgUser = initDataUser(); // Нужен для фотки

    const userLocation = getUserLocation(location);

    return (
        <>
            {userLocation === EUserComponentLocation.ACCOUNT
                ? <div className="flex gap-6 py-4">
                    <img className="avatar w-18 h-18 rounded-full" src={tgUser?.photoUrl} alt={user?.username} />
                    <div>
                        <p className="font-semibold text-xl">{user?.first_name} {user?.last_name}</p>
                        <p className="text-min opacity-50">{getRole(user?.role)}</p>
                    </div>
                </div>
                : userLocation === EUserComponentLocation.CHECKOUT ?
                    <div className="flex gap-4 py-4">
                        <img className="avatar w-10 h-10 rounded-full" src={tgUser?.photoUrl} alt={user?.username} />
                        <div>
                            <p className="font-semibold">{user?.first_name} {user?.last_name}</p>
                            <p className="text-min opacity-50">{user?.phone}</p>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}