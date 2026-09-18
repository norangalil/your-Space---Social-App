import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Setting from './pages/Settings/Setting'
import NotFound from './pages/NotFound/NotFound'
import Profile from './pages/Profile/Profile'
import Layout from './components/Layout/Layout'
import Signup from './pages/Signup/Signup'
import { Toaster } from 'sonner'
import UserProvider from "./pages/context/user.context";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
function App() {
  return (
    <>

<UserProvider>

  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>

      <Route index element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
    } />
      <Route path="/Settings" element={
    <ProtectedRoute>
<Setting />
    </ProtectedRoute>
    
    } />
      <Route path="/Profile" element={
          <ProtectedRoute>
<Profile />
          </ProtectedRoute>

    } 
      />
      {/* <Route path="/Notifications" element={
        <ProtectedRoute>
<Notifications />
        </ProtectedRoute>

    } /> */}
    </Route>
      <Route path="*" element={<NotFound />} />

    <Route path="/Login" element={<Login />} />
<Route path="/Signup" element={<Signup />} />

  </Routes>
</BrowserRouter>
<Toaster position='top-right'/>
</UserProvider>


    </>
  )
}

export default App
