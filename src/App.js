import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import SubjectGeneratorPage from './components/SubjectGeneratorPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/home' element={<HomePage/>} />
          <Route path='/subject_generator' element={<SubjectGeneratorPage/>} />      
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;