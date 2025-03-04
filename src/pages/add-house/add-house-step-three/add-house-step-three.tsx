import { FC, useCallback } from "react";
import { WaterIntakePoint } from "./components/water-intake-point/water-intake-point";
import { Toilet } from "./components/toilet";
import { Sink } from "./components/sink";
import { Bath } from "./components/bath";
import { WashhingMachine } from "./components/washing-machine";
import { DishWasher } from "./components/dishwasher";
import { ShowerCabin } from "./components/shower-cabin";
import { getRealEstateState, getWaterIntakePointCount } from "../model/real-estate-selectors";
import { decrementWaterIntakePoint, incrementWaterIntakePoint } from "../model/real-estate-slice";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { TCreateRealEstate, useCreateRealEstateMutation } from "../api/real-estate-api";
import { useAppSelector } from "@/shared/lib/hooks/use-app-selector";
import { useAppDispatch } from "@/shared/lib/hooks/use-app-dispatch";

export const AddHouseStepThree: FC = () => {
    const dispatch = useAppDispatch();
    const lp = useLaunchParams();
    const authKey = lp.initDataRaw;

    // Получаем количество каждой точки водоразбора
    const toiletCount = useAppSelector(getWaterIntakePointCount('toilet'));
    const sinkCount = useAppSelector(getWaterIntakePointCount('sink'));
    const bathCount = useAppSelector(getWaterIntakePointCount('bath'));
    const washingMachineCount = useAppSelector(getWaterIntakePointCount('washingMachine'));
    const dishWasherCount = useAppSelector(getWaterIntakePointCount('dishWasher'));
    const showerCabinCount = useAppSelector(getWaterIntakePointCount('showerCabin'));

    // Получаем состояние недвижимости из Redux
    const realEstateState = useAppSelector(getRealEstateState);
    
    const realEstateData: TCreateRealEstate = {
        ...realEstateState,
        coordinates: realEstateState.coordinates ? {
            type: 'Point',
            coordinates: [realEstateState.coordinates.longitude, realEstateState.coordinates.latitude]
        } : null
    };

    // Используем мутацию для создания объекта недвижимости
    const [createRealEstate] = useCreateRealEstateMutation();

    // Обработчик для сохранения объекта недвижимости
    const handleSave = useCallback(async () => {
        try {
           const newRealEstateData = await createRealEstate({
                newRealEstate: realEstateData,
                authKey: authKey || '',
            }).unwrap();
            console.log("Данные успешно сохранены!", newRealEstateData);
        } catch (error) {
            console.error("Ошибка при сохранении данных:", error);
        }
    }, [createRealEstate, realEstateState, authKey]);

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
                ? <button onClick={handleSave} className="btn btn-primary">Сохранить</button>
                : <button disabled className="btn btn-primary">Сохранить</button>
            }
        </div>
    );
}
