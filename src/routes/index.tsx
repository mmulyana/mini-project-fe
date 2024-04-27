import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../page/home'

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='v1'>
          <Route path='home' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
