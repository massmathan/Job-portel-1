import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AppRouters from './routes/AppRouters';

 

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="container">
          <Header/>
          <AppRouters/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
