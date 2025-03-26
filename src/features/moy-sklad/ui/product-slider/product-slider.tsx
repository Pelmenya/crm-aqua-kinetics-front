import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; // Импортируем стили для пагинации
import { Pagination } from 'swiper/modules'; // Импортируем модуль пагинации из 'swiper/modules'
import { useGetProductImagesQuery, useDownloadImageQuery } from '../../api/moy-sklad-api';
import { base64ToBlob } from '@/shared/lib/helpers/base64-to-blob';
import { FC } from 'react';

const ImageComponent: FC<{ downloadHref: string }> = ({ downloadHref }) => {
    const { data: imageBase64, isLoading } = useDownloadImageQuery(downloadHref, {
        skip: !downloadHref,
    });

    if (isLoading || !imageBase64) {
        return <div className="flex items-center justify-center h-full">Загрузка...</div>;
    }

    const blob = base64ToBlob(imageBase64);
    const imageUrl = URL.createObjectURL(blob);

    return <img className="max-h-58" src={imageUrl} alt="Product" />;
};

export const ProductSlider: FC<{ id: string }> = ({ id }) => {
    const { data: images, error, isLoading } = useGetProductImagesQuery(id);

    if (isLoading) {
        return <div>Загрузка изображений...</div>;
    }

    if (error) {
        return <div>Не удалось загрузить изображения</div>;
    }

    if (!images || images.length === 0) {
        return <div>Изображения отсутствуют</div>;
    }

    return (
        <div className="flex justify-center items-center h-80 pb-16 gradient-bg overflow-hidden">
            <Swiper
                modules={[Pagination]} // Подключаем модуль пагинации
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }} // Включаем пагинацию и делаем точки кликабельными
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex justify-center items-center h-72 overflow-hidden">
                            <ImageComponent downloadHref={image.meta.downloadHref} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
