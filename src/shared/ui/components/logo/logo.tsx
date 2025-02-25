import { FC } from "react";
import { miniApp, useSignal } from "@telegram-apps/sdk-react";
import LogoWhite from './logo_white_english_description.png';
import LogoBlack from './logo_black_english_description.png';

export const Logo: FC = () => {
	const isDark = useSignal(miniApp.isDark);

	return (
		<div className='p-4'>
			{isDark ? <img src={LogoWhite} alt='Logo Aqua Kinetics' /> : <img src={LogoBlack} alt='Logo Aqua Kinetics' />}
		</div>)

}