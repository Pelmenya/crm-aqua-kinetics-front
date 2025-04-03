import { FC, useState } from 'react';
import { YMaps, Map, Polyline, Polygon } from '@pbe/react-yandex-maps';

// Компонент карты
export const MapWithPolyline: FC = () => {
    const [lineCoords, setLineCoords] = useState<number[][]>([]);
    const [polygonCoords, setPolygonCoords] = useState<number[][] | null>(null);

    // Начальные координаты центра карты
    const mapState = {
        center: [55.751574, 37.573856], // Москва
        zoom: 10,
    };

    // Обработчик кликов по карте для добавления точек
    const handleMapClick = (event: ymaps.IEvent) => {
        const coords = event.get('coords');
        setLineCoords([...lineCoords, coords]);
    };

    // Замыкание линии в полигон
    const handleCloseLine = () => {
        if (lineCoords.length > 2) {
            setPolygonCoords([...lineCoords, lineCoords[0]]);
        }
    };

    // Очистка линии и полигона
    const handleClear = () => {
        setLineCoords([]);
        setPolygonCoords(null);
    };

    return (
        <YMaps query={{
            apikey: import.meta.env.VITE_YM_API_KEY,
        }}
        >
            <div>
                <Map defaultState={mapState} width="100%" height="calc(100vh - 120px)" onClick={handleMapClick}>
                    <Polyline
                        geometry={lineCoords}
                        options={{
                            strokeColor: '#0000FF',
                            strokeWidth: 3,
                        }}
                    />
                    {polygonCoords && (
                        <Polygon
                            geometry={[polygonCoords]}
                            options={{
                                fillColor: '#00FF0088',
                                strokeColor: '#0000FF',
                                strokeWidth: 3,
                            }}
                        />
                    )}
                </Map>
                <div className="pt-4 group">
                    <button className="group-item btn btn-primary" onClick={handleCloseLine}>Замкнуть линию</button>
                    <button className="group-item btn btn-primary" onClick={handleClear}>Очистить</button>
                </div>
            </div>
        </YMaps>
    );
};
