import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

import introSvg from './intro.svg';

export const IndexPage: FC = () => {
	return (
		<Page back={false}>
			<div>
				<Link to="/init-data">
					<img
						className='btn'
						alt="Telegram sticker"
						src={introSvg}
					/>
				</Link>
			</div>
		</Page>
	);
};
