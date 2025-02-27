import { themeParams, useSignal } from '@telegram-apps/sdk-react';
import type { FC } from 'react';
import { List } from '@telegram-apps/telegram-ui';

import { DisplayData } from '@/components/DisplayData/DisplayData.tsx';
import { Page } from '@/shared/ui/components/page/page';

export const ThemeParamsPage: FC = () => {
  const tp = useSignal(themeParams.state);
  console.log( Object
    .entries(tp))
  return (
    <Page>
      <List>
        <DisplayData
          rows={
            Object
              .entries(tp)
              .map(([title, value]) => ({
                title: title
                  .replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)
                  .replace(/background/, 'bg'),
                value,
              }))
          }
        />
      </List>
    </Page>
  );
};
