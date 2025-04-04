import { FC, useEffect, useState } from "react"
import { CardService } from "../../../../pages/account-page/components/card-service/card-service"
import { Base } from "@/shared/ui/components/base/base"
import { Link } from "@/app/link/link";
import { Location } from "@/shared/ui/icons/loacation";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useGetAccountServiceByUserQuery } from "../../api/account-service-api";
import { Loading } from "@/shared/ui/components/loading/loading";
import { Profile } from "@/shared/ui/icons/profile";
import { daysOfWeek } from "@/shared/lib/helpers/days-of-week";
import { getDayByIdx } from "@/shared/lib/helpers/get-day-by-idx";
import { Area } from "@/shared/ui/icons/area";

export const AccountService: FC = () => {
    const [isProfile, setIsProfile] = useState(false);
    const [isLocation, setIsLocation] = useState<boolean>(false); // заполнен адрес
    const [isCalendar, setIsCalendar] = useState<boolean>(false); // заполнены рабочие дни


    const lp = useLaunchParams();
    const authKey = lp.initDataRaw || '';

    const { data: accountServiceFromBack, isLoading, isFetching } = useGetAccountServiceByUserQuery(authKey, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (accountServiceFromBack) {
            if (Boolean(accountServiceFromBack?.carModel)
                || Boolean(accountServiceFromBack?.carNumber)
                || Boolean(accountServiceFromBack?.workDays?.length)) {
                setIsProfile(true);
            }
            if (accountServiceFromBack?.address) {
                setIsLocation(true);
            }
            if (accountServiceFromBack?.workDays) { // null не пройдет
                setIsCalendar(true);
            }
        }
    }, [accountServiceFromBack])

    return (
        <div className="flex flex-col gap-2">
            {isCalendar ?
                <Base>
                    <Link to="/service-calendar" className="flex flex-col items-center gap-2">
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.4186 2.603C16.3728 2.26247 16.0831 2 15.7326 2C15.3503 2 15.0403 2.31236 15.0403 2.69767V3.46902H8.96814V2.69767L8.96182 2.603C8.91598 2.26247 8.62632 2 8.27583 2C7.89348 2 7.58353 2.31236 7.58353 2.69767V3.48634C4.74655 3.68173 3 5.51992 3 8.48579V16.9041C3 20.0872 4.95834 22 8.09625 22H15.9036C19.0453 22 20.9999 20.1193 20.9999 16.9744V8.48579C21.009 5.51886 19.268 3.68119 16.4249 3.48626V2.69767L16.4186 2.603ZM15.0403 4.86437V5.75887L15.0466 5.85354C15.0925 6.19407 15.3821 6.45654 15.7326 6.45654C16.115 6.45654 16.4249 6.14418 16.4249 5.75887V4.88499C18.4935 5.0571 19.622 6.30274 19.6153 8.48365V8.88768H4.38461V8.48579C4.38461 6.30626 5.51925 5.05798 7.58353 4.88513V5.75887L7.58985 5.85354C7.63569 6.19407 7.92535 6.45654 8.27583 6.45654C8.65818 6.45654 8.96814 6.14418 8.96814 5.75887V4.86437H15.0403ZM4.38461 10.283V16.9041C4.38461 19.3067 5.71352 20.6047 8.09625 20.6047H15.9036C18.2946 20.6047 19.6153 19.3338 19.6153 16.9744L19.6153 10.283H4.38461ZM16.8012 13.2183C16.8012 12.833 16.4912 12.5206 16.1089 12.5206L16.0064 12.527C15.6685 12.5732 15.408 12.8651 15.408 13.2183C15.408 13.6036 15.718 13.916 16.1089 13.916L16.2028 13.9096C16.5407 13.8634 16.8012 13.5715 16.8012 13.2183ZM12.0128 12.5206C12.3951 12.5206 12.7051 12.833 12.7051 13.2183C12.7051 13.5715 12.4446 13.8634 12.1067 13.9096L12.0128 13.916C11.6219 13.916 11.3119 13.6036 11.3119 13.2183C11.3119 12.8651 11.5724 12.5732 11.9103 12.527L12.0128 12.5206ZM8.60043 13.2183C8.60043 12.833 8.29047 12.5206 7.90812 12.5206L7.80563 12.527C7.46772 12.5732 7.20727 12.8651 7.20727 13.2183C7.20727 13.6036 7.51722 13.916 7.89957 13.916L8.00207 13.9096C8.33998 13.8634 8.60043 13.5715 8.60043 13.2183ZM16.1089 16.136C16.4912 16.136 16.8012 16.4484 16.8012 16.8337C16.8012 17.1869 16.5407 17.4788 16.2028 17.525L16.1089 17.5314C15.718 17.5314 15.408 17.219 15.408 16.8337C15.408 16.4805 15.6685 16.1886 16.0064 16.1424L16.1089 16.136ZM12.7051 16.8337C12.7051 16.4484 12.3951 16.136 12.0128 16.136L11.9103 16.1424C11.5724 16.1886 11.3119 16.4805 11.3119 16.8337C11.3119 17.219 11.6219 17.5314 12.0128 17.5314L12.1067 17.525C12.4446 17.4788 12.7051 17.1869 12.7051 16.8337ZM7.90812 16.136C8.29047 16.136 8.60043 16.4484 8.60043 16.8337C8.60043 17.1869 8.33998 17.4788 8.00207 17.525L7.89957 17.5314C7.51722 17.5314 7.20727 17.219 7.20727 16.8337C7.20727 16.4805 7.46772 16.1886 7.80563 16.1424L7.90812 16.136Z" fill="currentColor" />
                        </svg>
                        <p className="text-min opacity-50">Открыть календарь</p>
                    </Link>
                </Base>
                : null
            }
            <div className="flex flex-col gap-2">
                <div className="grid gap-2 grid-cols-2">
                    <CardService title="Установки" status="Еще нет установок" />
                    <CardService title="Рейтинг" status="Еще нет рейтинга" />
                </div>
                <Link to="/service-location" >
                    <CardService title="Ваша локация"
                        fullWidth={true}
                        status={
                            isLoading || isFetching ?
                                <Loading color="text-primary" size="loading-xs" type="loading-infinity" />
                                :
                                accountServiceFromBack?.address
                                    ? accountServiceFromBack.address
                                    : "Укажите локацию"
                        }>
                        <Location />
                    </CardService>
                </Link>
                {isLocation ?
                    <Link to='/service-area'>
                        <CardService
                            fullWidth={true}
                            title="Зоны обслуживания"
                            status="Еще нет зон обслуживания"
                        >
                            <Area />
                        </CardService>
                    </Link> : null}
                {isLocation ?
                    <Link to="/service-profile" >
                        <CardService
                            fullWidth={true}
                            title="Ваш профиль"
                            statusText={!isProfile}
                            status={
                                isLoading || isFetching
                                    ? <Loading color="text-primary" size="loading-xs" type="loading-infinity" />
                                    : isProfile
                                        ?
                                        <>
                                            <p className="text-min opacity-50">
                                                {accountServiceFromBack?.carModel && accountServiceFromBack?.carModel}
                                                {" "}
                                                {accountServiceFromBack?.carNumber && accountServiceFromBack?.carNumber}
                                            </p>
                                            {accountServiceFromBack?.workDays && <div className="flex space-x-2 pt-1">
                                                {daysOfWeek.map((day) => (
                                                    <button
                                                        type="button"
                                                        key={day}
                                                        className={`p-2 btn btn-xs btn-outline opacity-90 ${accountServiceFromBack?.workDays?.some(d => d.dayOfWeek === day) ? 'btn-warning' : ''}`}
                                                    >
                                                        <span className="text-ex-min">
                                                            {getDayByIdx(day)}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                            }
                                        </>
                                        : "Укажите режим работы, авто, номер авто"
                            }
                        >
                            <Profile />
                        </CardService>
                    </Link>
                    : null}
            </div>
        </div >
    )
}
