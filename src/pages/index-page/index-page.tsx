import { type FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';
import LogoWhite from './logo_white_english_description.png';
import LogoBlack from './logo_black_english_description.png';
import { miniApp, useSignal } from '@telegram-apps/sdk-react';

export const IndexPage: FC = () => {
	const isDark = useSignal(miniApp.isDark);
	return (
		<Page back={false}>
			<div className='p-4 bg-base-100 w-[100vw] h-[100vh] flex items-center justify-center'>
				<Link to="/welcome-page">
					{isDark ? <img src={LogoWhite} alt='Logo Aqua Kinetics' /> :<img src={LogoBlack} alt='Logo Aqua Kinetics' />}
				</Link>
			</div>
		</Page>
	);
};
