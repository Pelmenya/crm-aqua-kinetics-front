import { Section, Cell, List } from '@telegram-apps/telegram-ui';
import { useEffect, type FC } from 'react';
import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { usePostAuthMutation } from '@/servises/auth-api';

export const IndexPage: FC = () => {
  const lp = useLaunchParams();
//  const { data } = useGetAuthQuery('');
  const [postAuth, { data, error }] = usePostAuthMutation();

  useEffect(() => {
    if (lp.initDataRaw) {
      postAuth(lp.initDataRaw).catch(console.error);
    }
  }, [lp.initDataRaw, postAuth]);

  useEffect(() => {
    if (data) {
      console.log('Данные пользователя:', data);
    }
    if (error) {
      console.error('Ошибка авторизации:', error);
    }
  }, [data, error]);

  return (
    <Page back={false}>
      <List>
        <Section
          header="Функции"
          footer="Вы можете использовать эти страницы, чтобы узнать больше о функциях, предоставляемых Telegram Mini Apps и другими полезными проектами"
        >
          <Link to="/ton-connect">
            <Cell
              before={<img className='w-96' src='https://t.me/i/userpic/320/PepDtR1JePTqzchugRLo0ThAYYExhT8ocmgscSchMaM.svg' /> }
              subtitle="Подключите ваш кошелек TON"
            >
              <pre>{data ? JSON.stringify(data, null, 2) : 'Нет данных о пользователе'}</pre>
              <pre>{lp.initDataRaw}</pre>
            </Cell>
          </Link>
        </Section>
        <Section
          header="Данные запуска приложения"
          footer="Эти страницы помогают разработчикам узнать больше о текущей информации о запуске"
        >
          <Link to="/init-data">
            <Cell subtitle="Данные пользователя, информация о чате, технические данные">Init Data</Cell>
          </Link>
          <Link to="/launch-params">
            <Cell subtitle="Идентификатор платформы, версия Mini Apps и т.д.">Параметры запуска</Cell>
          </Link>
          <Link to="/theme-params">
            <Cell subtitle="Информация о палитре приложения Telegram">Параметры темы</Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
};
