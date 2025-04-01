import { FC } from "react";
import cartIsEmpty from './cart-is-empty.png';

export const CartIsEmpty: FC = () => {
    return (
        <img src={cartIsEmpty} alt="Пустая корзина" />
    )
}