import { NotificationModal } from '@terradharitri/sdk-dapp/UI/NotificationModal';
import { SignTransactionsModals } from '@terradharitri/sdk-dapp/UI/SignTransactionsModals';
import { TransactionsToastList } from '@terradharitri/sdk-dapp/UI/TransactionsToastList';
import { DappProvider } from '@terradharitri/sdk-dapp/wrappers/DappProvider';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Layout } from 'components/Layout';
import { network } from 'config.devnet';
import { ContextProvider } from 'context';
import { PageNotFound } from 'pages/PageNotFound';
import { Unlock } from 'pages/Unlock';
import routes, { RouteType, routeNames } from 'routes';

export const App = () => (
  <BrowserRouter>
    <DappProvider
      environment={network.id}
      customNetworkConfig={{
        name: 'customConfig',
        apiTimeout: 6000,
        walletConnectV2ProjectId: '9b1a9564f91cb659ffe21b73d5c4e2d8'
      }}
    >
      <ContextProvider>
        <Layout>
          <TransactionsToastList />
          <SignTransactionsModals />
          <NotificationModal />

          <Routes>
            <Route path={routeNames.unlock} element={<Unlock />} />

            {routes.map((route: Omit<RouteType, 'title'>, index: number) => (
              <Route
                path={route.path}
                key={'route-key-' + index}
                element={<route.component />}
              />
            ))}

            <Route element={<PageNotFound />} />
          </Routes>
        </Layout>
      </ContextProvider>
    </DappProvider>
  </BrowserRouter>
);
