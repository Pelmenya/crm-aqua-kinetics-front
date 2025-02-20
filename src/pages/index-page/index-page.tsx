import { useEffect, type FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

import { miniApp, useSignal } from '@telegram-apps/sdk-react';

export const IndexPage: FC = () => {

	const isDark = useSignal(miniApp.isDark);

  useEffect(() => {
    // Update the data-theme attribute based on isDark value
    const theme = isDark === true ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, [isDark]);

	return (
		<Page back={false}>

			<div className='p-4 bg-base-300'>
				<Link to="/init-data">
					<div className="card bg-base-100 shadow-sm">
						<figure>
							<img
								src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
								alt="Shoes" />
						</figure>
						<div className="card-body">
							<h2 className="card-title">Card Title</h2>
							<input type="checkbox" value="synthwave" className="toggle theme-controller" />
							<p>{isDark === true ? 't' : "f"}</p>
							<p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
							<div className="card-actions justify-end">
								<button className="btn btn-primary">Buy Now</button>
							</div>
						</div>
					</div>
				</Link>
			</div>
		</Page>
	);
};
