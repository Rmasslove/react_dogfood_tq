import React from 'react' // Импорт компонента
import ReactDOM from 'react-dom/client' // Импорт компонента
import './index.css' // Импорт компонента стилей
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App' // Импорт компонента

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App /* компонент App *//>
    </QueryClientProvider>
  </React.StrictMode>,
)
