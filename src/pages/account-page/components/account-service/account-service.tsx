import { FC } from "react"
import { CardService } from "../card-service/card-service"

export const AccountService: FC = () => {

    return (
        <div className="flex flex-col gap-2">
            <CardService title="Календарь" />
            <div className="grid gap-2 grid-cols-2">
                <CardService title="Установки" status="Еще нет установок" />
                <CardService title="Рейтинг" status="Еще нет рейтинга" />
            </div>
        </div>
    )
}