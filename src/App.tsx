import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cars from './pages/Cars'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import FloatingButtons from './components/FloatingButtons';

const cars = [
  {
    name: 'Mercedes Classe C',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    price: 120,
    category: 'Berline de luxe',
    seats: 5,
    transmission: 'Automatique'
  },
  {
    name: 'BMW Série 3',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    price: 110,
    category: 'Berline sportive',
    seats: 5,
    transmission: 'Automatique'
  },
  {
    name: 'Audi A4',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
    price: 115,
    category: 'Berline premium',
    seats: 5,
    transmission: 'Automatique'
  }
]

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
        </Routes>
        <FloatingButtons />
      </div>
    </Router>
  )
}

export default App
