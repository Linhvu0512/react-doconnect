import { createContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import QuestionDetails from './components/QuestionDetails/QuestionDetails';
import Questions from './components/Questions/Questions';
import { CreatePost } from './components/Dashboard/CreatePost/CreatePost';
import Dashboard from './components/Dashboard/Dashboard';
import Overview from './components/Dashboard/Overview/Overview';
import PostList from './components/Dashboard/PostList/PostList';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import SignUp from './components/SignUp/SignUp';
import useFirebase from './hooks/useFirebase';
import RequiredAuth from './utilities/RequiredAuth';
export const AuthContext = createContext(null)
function App() {
  const location = useLocation();
  const {isAuth, user} = useFirebase();
  
  
  
  return (
    <>
    <AuthContext.Provider value={{isAuth, user}}>
    {!location.pathname.includes('dashboard') && !location.pathname.includes('QuestionDetails') && <Header /> }
     <Toaster position="top-center" reverseOrder={false} />
     <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/home' element={<Home />} />
         <Route path='/questions' element={<Questions />} />
         <Route path='/questionDetails' element={<QuestionDetails />} />
         {isAuth &&  <Route path='/dashboard' element={<RequiredAuth><Dashboard /></RequiredAuth>} >
             <Route index="1" path='overview' element={<Overview />} />
             <Route path='create-post' element={<CreatePost />} />
             <Route path='post-lists' element={<PostList />} />
         </Route>}
        
         <Route path='/login' element={<Login />} />
         <Route path='/sign-up' element={<SignUp />}/>
         <Route path='*' element={<NotFound />} />
     </Routes>
     </AuthContext.Provider>
    </>
  );
}

export default App;
