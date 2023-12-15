import './App.css'
import AllRoutes from './routes/AllRoutes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'primereact/resources/themes/vela-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

const queryClient = new QueryClient({})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AllRoutes />
    </QueryClientProvider>
  )
}

export default App
