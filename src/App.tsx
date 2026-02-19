import { RouterProvider } from 'react-router';
import './App.scss';
import { router } from './router/router';
import { enableArrayMethods } from 'immer';
import { ConfigProvider } from 'antd';

enableArrayMethods();

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token, affects wide range
          colorPrimary: '#5e4ae3',
          colorInfo: '#5e4ae3',
          borderRadiusLG: 10,
          colorError: '#ff6060',
          colorSuccess: '#31a91d',
          fontSize: 16,
          colorBorderSecondary: '#01040088',
          fontSizeHeading2: 32,

          // Derived token, affects narrow range
          // colorBgContainer: '#f6ffed',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
