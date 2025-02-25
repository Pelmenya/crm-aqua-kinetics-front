import { type FC } from 'react';

import { Link } from '@/processes/link/link';
import { Page } from '@/shared/ui/components/page/page';
import { Logo } from '@/shared/ui/components/logo/logo';


export const IndexPage: FC = () => {
	return (
		<Page back={false}>
			<Link to="/welcome-page">
					<Logo />
			</Link>
		</Page>
	);
};
