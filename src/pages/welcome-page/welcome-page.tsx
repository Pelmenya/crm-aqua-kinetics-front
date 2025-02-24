import { type FC } from 'react';

import { Page } from '@/components/Page.tsx';

import BGImage from './bg-image.png';
import Girl from './girl.png';
import Arc from './arc.svg';

export const WelcomePage: FC = () => {

	return (
		<Page back={true}>
			<div className='bg-base-100 mt-[-80px] w-[100vw - 10px] h-[100vh] flex items-center justify-center'>
				<div className='relative w-full'>
					<img src={BGImage} alt="Background" className='w-full' />
					<img className="absolute top-15 rounded-3xl left-10 z-1 h-[395px]" src={Girl} alt='Girl' />
					<img src={Arc} className='absolute z-2 top-95 left-0 w-full' />
					<div className='absolute text-primary text-3xl font-bold pl-4 top-100 z-3'>
						<p className='font-sans font-bold'>Добро</p>
						<p>пожаловать</p>
						<p className='text-base-content text-sm mt-2'>Рады помочь очистить воду</p>
					</div>
				</div>
				<div className='absolute top-130 w-full z-4 flex flex-col p-4 gap'>
					<button className='btn btn-primary'>
						Стать клиентом
					</button>
					<button className='btn'>
						Войти
					</button>
				</div>
			</div>
		</Page>
	);
};

/**
 * 
	return (
		<Page back={true}>
			<div className='bg-base-100 mt-[-80px] w-[100vw] h-[100vh] flex items-center justify-center'>
				<div className='relative'>
					<img src={BGImage} alt="Background" />
					<img className="absolute top-10 rounded-3xl left-10 z-1" src={Girl} alt='Girl' />
					<div className='absolute text-primary text-3xl font-bold bg-base-100 pl-4 bottom-0 z-0'>
						<p>Добро</p>
						<p>пожаловать</p>
					</div>
				</div>
			</div>

		</Page>
	);
 */