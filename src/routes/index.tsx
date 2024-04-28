import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../page/home'
import Index from '../page'

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
        <Route path='v1' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
