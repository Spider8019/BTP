import './App.css'
import AllRoutes from './routes/AllRoutes'
import _ from 'lodash'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AllRoutes />
    </QueryClientProvider>
  )
}

export default App
