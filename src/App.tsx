import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Cars from './pages/Cars'
import Accounting from './pages/Accounting'
import FloatingButtons from './components/FloatingButtons';
import DriverDetails from './pages/DriverDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/accounting/driver/:id" element={<DriverDetails />} />
          </Routes>
        </main>
        <FloatingButtons />
        <Footer />
      </div>
    </Router>
  )
}

export default App
