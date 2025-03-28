import { FC, useState, useEffect } from 'react';
import { useGetProductQuery } from "@/features/moy-sklad/api/moy-sklad-api";
import { ProductSlider } from "@/features/moy-sklad/ui/product-slider/product-slider";
import { Page } from "@/shared/ui/components/page/page";
import { useParams } from "react-router-dom";
import { CollapsibleDescription } from '@/shared/ui/components/collapsible-description/collapsible-description';
import { Loading } from '@/shared/ui/components/loading/loading';
import { CatalogHeader } from '@/widgets/catalog-header/catalog-header';
import { ServicesList } from '@/features/moy-sklad/ui/service-list/service-list';
// import { Cart } from '@/shared/ui/icons/cart';
// import { Counter } from '@/shared/ui/components/counter/counter';

export const ProductPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: product, error: errorProduct, isLoading: isLoadingProduct } = useGetProductQuery(id || '');

    // Управление состоянием продукта
    //const [productCount, setProductCount] = useState<number>(0);

    // Управление состоянием для всех сервисов
    const [serviceStates, setServiceStates] = useState<Record<string, { count: number; checked: boolean }>>({});

    // Функции для управления состоянием продукта
    /*
        const handleProductIncrement = () => setProductCount(productCount + 1);
    
        const handleProductDecrement = () => {
            setProductCount((state) => Math.max(state - 1, 0));
        };
     */
    // Функции для управления состоянием сервисов
    const handleIncrement = (serviceId: string) => {
        setServiceStates((prevState) => ({
            ...prevState,
            [serviceId]: {
                ...prevState[serviceId],
                count: prevState[serviceId].count + 1
            }
        }));
    };

    const handleDecrement = (serviceId: string) => {
        setServiceStates((prevState) => {
            const newCount = Math.max(prevState[serviceId].count - 1, 0);
            return {
                ...prevState,
                [serviceId]: {
                    ...prevState[serviceId],
                    count: newCount,
                    checked: newCount > 0 // Сбрасываем checked, если count становится 0
                }
            };
        });
    };

    const handleCheckboxChange = (serviceId: string) => {
        setServiceStates((prevState) => {
            const newChecked = !prevState[serviceId]?.checked;
            return {
                ...prevState,
                [serviceId]: {
                    count: newChecked ? 1 : 0,
                    checked: newChecked
                }
            };
        });
    };

    useEffect(() => {
        // Инициализация состояния для всех сервисов при загрузке продукта
        if (product?.servicesIds) {
            const initialState = product.servicesIds.reduce((acc, serviceId) => {
                acc[serviceId] = { count: 0, checked: false };
                return acc;
            }, {} as Record<string, { count: number; checked: boolean }>);
            setServiceStates(initialState);
        }
    }, [product?.servicesIds]);

    if (isLoadingProduct) {
        return (
            <Loading
                className="w-full h-full flex items-center justify-center"
                color="text-primary"
                size="loading-xs"
                type="loading-infinity"
            />
        );
    }

    if (errorProduct) return <div>Error loading product: {id}</div>;

    return (
        <Page className="relative">
            <CatalogHeader title='' className='absolute top-0 left-0 text-base-100' />
            {product
                ? <div className='flex flex-col justify-between'>
                    <div>
                        <ProductSlider id={product.id} />
                        <div className="bg-base-100 rounded-t-lg p-4 mt-[-2rem] flex flex-col items-end gap-4">
                            <div className='flex flex-col items-end gap-4'>
                                <h1 className="text-xl opacity-80">{product?.name}</h1>
                            </div>
                            {product?.description && <CollapsibleDescription description={product.description} />}
                            {/*                             <div className='flex-grow'>
                                {productCount === 0 ? (
                                    <button className='btn btn-primary' onClick={handleProductIncrement}>
                                        {"Добавить в "}
                                        <Cart />
                                    </button>
                                ) : (
                                    <Counter
                                        count={productCount}
                                        onIncrement={handleProductIncrement}
                                        onDecrement={handleProductDecrement}
                                        minCount={0}
                                    />
                                )}
                            </div>
 */}
                            {product?.servicesIds && (
                                <ServicesList
                                    servicesIds={product.servicesIds}
                                    serviceStates={serviceStates}
                                    onIncrement={handleIncrement}
                                    onDecrement={handleDecrement}
                                    onCheckboxChange={handleCheckboxChange}
                                />
                            )}
                        </div>
                    </div>
                </div>
                : null
            }
        </Page>
    );
};
