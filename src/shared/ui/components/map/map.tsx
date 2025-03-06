import { YMaps, Map as MapComponent, Placemark, Circle } from '@pbe/react-yandex-maps';
import { Loading } from '../loading/loading';

export type MapProps = {
    coordinates: number[] | null;
    radiusKm?: number; // Новый пропс для радиуса в километрах
};

export const Map = ({ coordinates, radiusKm }: MapProps) => {
    if (!coordinates) {
        return <Loading size='loading-lg' color='text-primary' type='loading-infinity' />;
    }
    
    // Конвертируем радиус из километров в метры для отображения на карте
    const radiusMeters = (radiusKm ?? 0) * 1000;

    return (
        <YMaps
            query={{
                apikey: import.meta.env.VITE_YM_API_KEY,
            }}
        >
            <div className='border border-base-300 bg-base-100 rounded-box p-4'>
                <MapComponent
                    state={{ center: coordinates, zoom: 17 }}
                    width={'100%'}
                    height={'250px'}
                >
                    <Placemark geometry={coordinates} />
                    {radiusMeters > 0 && (
                        <Circle
                            geometry={[coordinates, radiusMeters]}
                            options={{
                                draggable: false,
                                fillColor: 'rgba(0, 123, 255, 0.3)', // Полупрозрачный синий цвет
                                strokeColor: 'rgba(0, 123, 255, 0.7)',
                                strokeWidth: 2,
                            }}
                        />
                    )}
                </MapComponent>
            </div>
        </YMaps>
    );
};
