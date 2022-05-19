import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import SubjectGeneratorPage from './components/SubjectGeneratorPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ForumPage from './components/ForumPage';
import SubmitPost from './components/SubmitPost';
import QuizPage from './components/QuizPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/' element={
            <PrivateRoute>  
              <HomePage/>
            </PrivateRoute>
            } />
          <Route path='/subject_generator' element={
            <PrivateRoute>
              <SubjectGeneratorPage/>
            </PrivateRoute>
            } />
          <Route path='/forum' element={<PrivateRoute>
            <ForumPage/>
          </PrivateRoute>} />
          <Route path='/submit' element={<PrivateRoute>
            <SubmitPost/>
          </PrivateRoute>} />
          <Route path='/quiz' element={<PrivateRoute>
            <QuizPage/>
          </PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;