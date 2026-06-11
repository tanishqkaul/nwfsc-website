import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import News from './pages/News.jsx'
import Photos from './pages/Photos.jsx'
import Committee from './pages/Committee.jsx'
import AdminLayout from './admin/AdminLayout.jsx'
import Dashboard from './admin/Dashboard.jsx'
import Announce from './admin/Announce.jsx'
import PhotosAdmin from './admin/PhotosAdmin.jsx'
import MembersAdmin from './admin/MembersAdmin.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="announce" element={<Announce />} />
          <Route path="photos" element={<PhotosAdmin />} />
          <Route path="committee" element={<MembersAdmin />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}
