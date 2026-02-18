import { RouterProvider } from 'react-router';
import './App.scss';
import { router } from './router/router';
import { enableArrayMethods } from 'immer';

enableArrayMethods();

function App() {
  return <RouterProvider router={router} />;
}

export default App;
