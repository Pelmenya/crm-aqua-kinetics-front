import { FC } from "react";
import cartIsEmpty from './cart-is-empty.png';

export const CartIsEmpty: FC = () => {
    return (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center">
            <img src={cartIsEmpty} alt="Пустая корзина" />
            <p className="font-semibold opacity-50 w-full text-center">Ой! Ваша корзина пуста</p>
        </div>
    )
}