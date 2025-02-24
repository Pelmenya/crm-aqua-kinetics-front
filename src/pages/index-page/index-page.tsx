import { type FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';
import Logo from './logo-aquaphor-ru.svg';

export const IndexPage: FC = () => {

	return (
		<Page back={false}>
			<div className='p-4 bg-primary w-[100vw] h-[100vh] flex items-center justify-center'>
				<Link to="/welcome-page">
					<img src={Logo} alt='Logo Aquaphor' />
				</Link>
			</div>
		</Page>
	);
};
