import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// hydrateRoot, not createRoot: dist/index.html already contains the fully
// rendered markup (see scripts/prerender.mjs), so React attaches to it rather
// than throwing it away and re-creating the DOM. The tree below must stay
// identical to the one in src/entry-server.jsx.
hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <App />
  </StrictMode>,
)
