import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Authentication from './components/Authentication';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ItemDetail from './components/ItemDetail';
import Packing from './components/Packing';
import Arrangement from './components/Arrangement';
import Role from './components/Role';


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId='515126925342-kd21in450v253eu5svfufa4ijdqve074.apps.googleusercontent.com'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Navigate to='/foodItems' />} />
          <Route exact path='/foodItems' element={<Home />} />
          <Route exact path='/foodItems/search' element={<Home />} />
          <Route exact path='/role' element={<Role />} />
          <Route exact path='/auth' element={!user ? <Authentication /> : <Navigate to='/foodItems' />} />
          <Route exact path='/foodItems/:id' element={<ItemDetail />} />
          <Route exact path='/packing' element={<Packing />} />
          <Route exact path='/arrangement' element={<Arrangement />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App