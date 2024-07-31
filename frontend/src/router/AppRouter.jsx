import { Routes, Route } from 'react-router-dom';
import { NoteRoutes } from '../notes/routes/NoteRoutes';
import { HomePage } from '../notes/pages/HomePage';

export const AppRouter = () => {
  return (
   <Routes> 
    
      {/* Home  */}
    <Route path='/' element={ <HomePage />} />
        {/* Notes App */}
    <Route path='/*' element={ <NoteRoutes /> }/>
    
   </Routes>
  )
}
