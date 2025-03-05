import { CardService } from "../../../card-service/card-service"

export const Services = () => {

    return (
        <div className="pt-4 flex flex-col gap-2 w-full">
            <div className="grid gap-2 grid-cols-2">
                <CardService title="История заказов" status="Заказов нет" />
                <CardService title="Сервисный центр" status="Сообщений нет" />
            </div>
            <CardService title="Инструкции и руководства" />
            <CardService title="Гарантийные талоны" />
        </div>)

}