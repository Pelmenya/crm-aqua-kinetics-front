import { Link } from "@/processes/link/link";
import { FC } from "react";

export const AddHouseStepThree: FC = () => {

    return (
        <div className="w-full h-full pt-6 pb-4 px-4 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Точки водоразбора</h3>
                
            </div>
            <Link to='/account' className="btn btn-primary">Сохранить</Link>
        </div>
    )
}