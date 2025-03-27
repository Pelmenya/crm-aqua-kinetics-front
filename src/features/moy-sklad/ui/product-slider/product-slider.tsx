import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination'; // Импортируем стили для пагинации

import { Pagination } from 'swiper/modules'; // Импортируем модуль пагинации из 'swiper/modules'
import { useGetProductImagesQuery } from '../../api/moy-sklad-api';
import { FC } from 'react';
import { Loading } from '@/shared/ui/components/loading/loading';
import { ProductSliderImageComponent } from './components/product-slider-image-component/product-slider-image-component';

export const ProductSlider: FC<{ id: string }> = ({ id }) => {
    const { data: images, error, isLoading } = useGetProductImagesQuery(id);

    if (isLoading) {
        return <Loading color="text-primary" size="loading-xs" type="loading-infinity" />;
    }

    if (error) {
        return <div>Не удалось загрузить изображения</div>;
    }

    return (
        <div className="flex justify-center items-center h-80 pb-16 gradient-bg overflow-hidden">
            {!images || images.length === 0 ?
                <div className="h-24 text-sm w-full flex items-center justify-center">No Image Available</div>
                :
                <Swiper
                    modules={[Pagination]} // Подключаем модуль пагинации
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }} // Включаем пагинацию и делаем точки кликабельными
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex justify-center items-center h-72 overflow-hidden">
                                <ProductSliderImageComponent downloadHref={image.meta.downloadHref} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>}
        </div>
    );
};
