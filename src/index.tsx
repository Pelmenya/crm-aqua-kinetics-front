import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import { Root } from '@/components/Root.tsx';
import { EnvUnsupported } from '@/components/EnvUnsupported.tsx';
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
