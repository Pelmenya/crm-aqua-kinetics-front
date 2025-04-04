import { FC, useState, useCallback } from 'react';
import { YMaps, Map, Polyline, Polygon, Placemark } from '@pbe/react-yandex-maps';
import { useDispatch, useSelector } from 'react-redux';
import { addWorkDayArea, removeWorkDayArea, resetAreas, setGeneralArea, WorkDayArea } from '../model/service-area-slice';
import { TRootState } from '@/app/store/store';
import { polygon as turfPolygon, booleanContains, booleanPointInPolygon, point } from '@turf/turf';
import { TCoordinates } from '../model/service-area-slice';
import { PolygonEditorModal } from './poligon-editor-modal';

type TProps = {
    coordinates: TCoordinates;
};

export const MapWithPolylineEditor: FC<TProps> = ({ coordinates }) => {
    const dispatch = useDispatch();
    const generalArea = useSelector((state: TRootState) => state.serviceArea.generalArea);
    const workDayAreas = useSelector((state: TRootState) => state.serviceArea.workDayAreas);

    const [lineCoords, setLineCoords] = useState<number[][]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWorkDay, setSelectedWorkDay] = useState<WorkDayArea | null>(null);

    const mapState = {
        center: [coordinates.latitude, coordinates.longitude],
        zoom: 12, // Увеличен зум для лучшей видимости
    };

    const handleMapClick = useCallback((event: ymaps.IEvent) => {
        const coords = event.get('coords');
        console.log('Clicked coordinates:', coords); // Отладочный вывод

        if (generalArea.length > 0) {
            const p = point(coords);
            const generalAreaTurf = turfPolygon([generalArea]);

            if (!booleanPointInPolygon(p, generalAreaTurf)) {
                console.error("Точка выходит за пределы главного полигона");
                return;
            }
        }

        setLineCoords((prevCoords) => {
            if (prevCoords.length > 0 && areCoordsClose(prevCoords[0], coords)) {
                handleCloseLine();
                return prevCoords;
            }
            return [...prevCoords, coords];
        });
    }, [lineCoords, generalArea]);

    const handleCloseLine = useCallback(() => {
        if (lineCoords.length > 2) {
            const newPolygon = [...lineCoords, lineCoords[0]];

            if (!generalArea.length) {
                dispatch(setGeneralArea(newPolygon));
            } else {
                const newPolygonTurf = turfPolygon([newPolygon]);
                const generalAreaTurf = turfPolygon([generalArea]);

                if (booleanContains(generalAreaTurf, newPolygonTurf)) {
                    setSelectedWorkDay({ day: '', coordinates: newPolygon, color: '#FF000088', name: '' });
                    setIsModalOpen(true);
                } else {
                    console.error("Новый полигон выходит за пределы общего ареала");
                }
            }
            setLineCoords([]);
        }
    }, [lineCoords, dispatch, generalArea]);

    const handleClear = useCallback(() => {
        dispatch(resetAreas());
        setLineCoords([]);
    }, [dispatch]);

    const handleUndo = useCallback(() => {
        setLineCoords((prevCoords) => prevCoords.slice(0, -1));
    }, []);

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedWorkDay(null);
    };

    const handleModalSave = (workDayData: WorkDayArea) => {
        if (workDayData.coordinates.length > 2) {
            dispatch(addWorkDayArea(workDayData));
        } else {
            console.error("Недостаточно точек для создания полигона");
        }
        handleModalClose();
    };

    const handleWorkDayRemove = (day: string) => {
        dispatch(removeWorkDayArea(day));
        handleModalClose();
    };

    const areCoordsClose = (coords1: number[], coords2: number[], tolerance: number = 0.0001) => {
        const [lat1, lng1] = coords1;
        const [lat2, lng2] = coords2;
        return Math.abs(lat1 - lat2) < tolerance && Math.abs(lng1 - lng2) < tolerance;
    };

    return (
        <YMaps query={{ apikey: import.meta.env.VITE_YM_API_KEY }}>
            <div>
                <Map defaultState={mapState} width="100%" height="calc(100vh - 80px)" onClick={handleMapClick}>
                    {generalArea.length > 0 && (
                        <Polygon
                            geometry={[generalArea]}
                            options={{
                                fillColor: '#00FF0088',
                                strokeColor: '#0000FF',
                                strokeWidth: 3,
                                fillOpacity: 0.1,
                            }}
                            onClick={handleMapClick}
                        />
                    )}
                    <Polyline
                        geometry={lineCoords}
                        options={{
                            strokeColor: '#0000FF',
                            strokeWidth: 3,
                            strokeStyle: 'solid',
                        }}
                    />
                    {lineCoords.map((coord, index) => (
                        <Placemark
                            key={index}
                            geometry={coord}
                            options={{
                                preset: 'islands#redCircleIcon', // Используем предустановленный стиль
                                iconColor: '#FF0000', // Цвет точек (если нужен)
                            }}
                        />
                    ))}
                    {workDayAreas.map((area, index) => (
                        <Polygon
                            key={index}
                            geometry={[area.coordinates]}
                            options={{
                                fillColor: area.color,
                                strokeColor: '#FF0000',
                                strokeWidth: 3,
                                fillOpacity: 0.5,
                            }}
                            onClick={(e: ymaps.IEvent) => {
                                if (lineCoords.length === 0) {
                                    setSelectedWorkDay(area);
                                    setIsModalOpen(true);
                                } else {
                                    handleMapClick(e);
                                }
                            }}
                        />
                    ))}
                </Map>
                <div className="pt-4 group space-x-2">
                    <button className="btn btn-primary w-[30%]" onClick={handleCloseLine}>Замкнуть линию</button>
                    <button className="btn btn-secondary w-[30%]" onClick={handleClear}>Очистить</button>
                    <button className="btn btn-secondary w-[30%]" onClick={handleUndo}>Отменить действие</button>
                </div>
            </div>
            {isModalOpen && selectedWorkDay && (
                <PolygonEditorModal
                    isOpen={isModalOpen}
                    workDay={selectedWorkDay}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                    onRemove={() => handleWorkDayRemove(selectedWorkDay.day)}
                />
            )}
        </YMaps>
    );
};
