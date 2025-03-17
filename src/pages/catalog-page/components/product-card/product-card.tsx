import { FC } from 'react';
import { TProduct, useDownloadImageQuery, useGetProductImagesQuery } from '@/features/moy-sklad/api/moy-sklad-api';

export const ProductCard: FC<{ product: TProduct }> = ({ product }) => {
  // Получаем изображения
  const { data: images, error, isLoading } = useGetProductImagesQuery(product.id);
  // Всегда вызываем хук для загрузки изображения, но с условием `skip`
  const mainImage = images?.[0];
  const downloadHref = mainImage?.meta.downloadHref || '';
  const { data: imageBlob, isLoading: isImageLoading } = useDownloadImageQuery(downloadHref, {
    skip: !mainImage,
  });
  const imageUrl = imageBlob ? URL.createObjectURL(imageBlob) : null;
  // Убедитесь, что состояние рендеринга не изменяет количество вызовов хуков
  if (isLoading) return <div>Loading images...</div>;
  if (error) return <div>Error loading images</div>;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        {isImageLoading ? (
          <div>Loading image...</div>
        ) : imageUrl ? (
          <img className="w-full h-auto max-h-48" src={imageUrl} alt={mainImage?.title || 'Product image'} />
        ) : (
          <div>No Image Available</div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Купить</button>
        </div>
      </div>
    </div>
  );
};
