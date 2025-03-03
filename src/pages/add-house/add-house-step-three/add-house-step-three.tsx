import { Link } from "@/processes/link/link";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WaterIntakePoint } from "./components/water-intake-point/water-intake-point";
import { Toilet } from "./components/toilet";
import { Sink } from "./components/sink";
import { Bath } from "./components/bath";
import { WashhingMachine } from "./components/washing-machine";
import { DishWasher } from "./components/dishwasher";
import { ShowerCabin } from "./components/shower-cabin";
import { getWaterIntakePointCount } from "../model/real-estate-selectors";
import { decrementWaterIntakePoint, incrementWaterIntakePoint } from "../model/real-estate-slice";

export const AddHouseStepThree: FC = () => {
    const dispatch = useDispatch();

    // Получаем количество каждой точки водоразбора
    const toiletCount = useSelector(getWaterIntakePointCount('toilet'));
    const sinkCount = useSelector(getWaterIntakePointCount('sink'));
    const bathCount = useSelector(getWaterIntakePointCount('bath'));
    const washingMachineCount = useSelector(getWaterIntakePointCount('washingMachine'));
    const dishWasherCount = useSelector(getWaterIntakePointCount('dishWasher'));
    const showerCabinCount = useSelector(getWaterIntakePointCount('showerCabin'));

    return (
        <div className="w-full h-full pt-6 pb-4 px-4 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Точки водоразбора</h3>
                <WaterIntakePoint
                    name="Унитаз или биде"
                    count={toiletCount}
                    onIncrement={() => dispatch(incrementWaterIntakePoint('toilet'))}
                    onDecrement={() => dispatch(decrementWaterIntakePoint('toilet'))}
                >
                    <Toilet />
                </WaterIntakePoint>
                <WaterIntakePoint
                    name="Раковина"
                    count={sinkCount}
                    onIncrement={() => dispatch(incrementWaterIntakePoint('sink'))}
                    onDecrement={() => dispatch(decrementWaterIntakePoint('sink'))}
                >
                    <Sink />
                </WaterIntakePoint>
                <WaterIntakePoint
                    name="Ванная"
                    count={bathCount}
                    onIncrement={() => dispatch(incrementWaterIntakePoint('bath'))}
                    onDecrement={() => dispatch(decrementWaterIntakePoint('bath'))}
                >
                    <Bath />
                </WaterIntakePoint>
                <WaterIntakePoint
                    name="Стиральная машина"
                    count={washingMachineCount}
                    onIncrement={() => dispatch(incrementWaterIntakePoint('washingMachine'))}
                    onDecrement={() => dispatch(decrementWaterIntakePoint('washingMachine'))}
                >
                    <WashhingMachine />
                </WaterIntakePoint>
                <WaterIntakePoint
                    name="Посудомоечная машина"
                    count={dishWasherCount}
                    onIncrement={() => dispatch(incrementWaterIntakePoint('dishWasher'))}
                    onDecrement={() => dispatch(decrementWaterIntakePoint('dishWasher'))}
                >
                    <DishWasher />
                </WaterIntakePoint>
                <WaterIntakePoint
                    name="Душевая кабина"
                    count={showerCabinCount}
                    onIncrement={() => dispatch(incrementWaterIntakePoint('showerCabin'))}
                    onDecrement={() => dispatch(decrementWaterIntakePoint('showerCabin'))}
                >
                    <ShowerCabin />
                </WaterIntakePoint>
            </div>
            {(
                toiletCount
                || sinkCount
                || bathCount
                || washingMachineCount
                || dishWasherCount
                || showerCabinCount)
                ? <Link to='/account' className="btn btn-primary">Сохранить</Link>
                : <button disabled className="btn btn-primary">Сохранить</button>
            }
        </div>
    );
}
