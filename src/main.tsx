import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Game } from './components/Game.tsx'
import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Game />
  </StrictMode>,
)
