import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Routing from './routes/Routing'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
