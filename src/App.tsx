import { RouterProvider } from 'react-router'
import './App.scss'
import { router } from './router/router'
import { useState } from 'react';
import { ThemeContext, type Theme, type ThemeContextProps } from './contexts/ThemeContext';


function App() {
  const [theme, setTheme] = useState<Theme>('dark');
          
  const context: ThemeContextProps = {theme, setTheme};

  return (
    <ThemeContext.Provider value={context}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
    
  )
}

export default App
