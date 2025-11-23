import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Predict from './pages/Predict'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Predict></Predict>
  </StrictMode>,
)
