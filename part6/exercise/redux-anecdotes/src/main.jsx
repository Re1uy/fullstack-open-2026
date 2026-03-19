import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
