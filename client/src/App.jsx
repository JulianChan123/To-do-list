import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {TasksPage} from './pages/TaskPage'
import { TasksFormPage } from './pages/TaskFormPage'
import {Navigation} from './components/Navigation'
import {Toaster} from 'react-hot-toast'

function App(){
  return(
    <BrowserRouter>
      <Navigation  />

      <Routes>
        <Route path="/" element={<Navigate to ="/tasks" />}/>
        <Route path="/tasks" element={<TasksPage />}/>
        <Route path="/tasks-create" element={<TasksFormPage />}/>     
        <Route path="/tasks/:id" element={<TasksFormPage />}/>      
 
      </Routes>
      <Toaster/>
    </BrowserRouter>
  )
}

export default App