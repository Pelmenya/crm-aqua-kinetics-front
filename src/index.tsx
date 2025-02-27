import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import { Root } from '@/components/root.tsx';
import { EnvUnsupported } from '@/components/env-unsupported.tsx';
import { init } from '@/init.ts';

import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.css';

// Mock the environment in case, we are outside Telegram.
import './mockEnv.ts';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './app/store/store.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
    // Configure all application dependencies.
    init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);
    //Пока так для запрета закрытия
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', () => {
            if (window.visualViewport) document.body.style.height = window.visualViewport.height + 'px';
        });
    }
    // This will ensure user never overscroll the page
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) window.scrollTo(0, 0);
    });

    root.render(
        <StrictMode>
            <ReduxProvider store={store}>
                <Root />
            </ReduxProvider>
        </StrictMode>,
    );
} catch (e) {
    root.render(<EnvUnsupported />);
}
