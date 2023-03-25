import { BrowserRouter, Route, Routes,} from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';



function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/About' element={<About/>} />
          <Route path='/Cart' element={<Cart/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
