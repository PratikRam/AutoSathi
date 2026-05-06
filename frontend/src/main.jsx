import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './contexts/UserContext'
import { Toaster } from './components/ui/sonner'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContext>
      <App />
    </UserContext>
    <Toaster position="bottom-right" richColors={true} duration={5000} theme='light' />
  </BrowserRouter>
)
