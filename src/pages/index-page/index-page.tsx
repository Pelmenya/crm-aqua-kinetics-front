import { type FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';
import { Breadcrumbs } from '@telegram-apps/telegram-ui';
import { BreadCrumbsItem } from '@telegram-apps/telegram-ui/dist/components/Navigation/Breadcrumbs/components/BreadCrumbsItem/BreadCrumbsItem';


export const IndexPage: FC = () => {

	return (
		<Page back={false}>
			<div className='p-4 bg-base-300 w-[100vw] h-[100vh]'>
				<Link to="/init-data">
					<Breadcrumbs divider="dot">
						<BreadCrumbsItem>
							First
						</BreadCrumbsItem>
						<BreadCrumbsItem>
							Second
						</BreadCrumbsItem>
						<BreadCrumbsItem>
							Third
						</BreadCrumbsItem>
					</Breadcrumbs>
				</Link>
			</div>
		</Page>
	);
};
