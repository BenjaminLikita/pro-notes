import "regenerator-runtime"
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Create from './pages/Create'
import NotesViewPage from './pages/NotesViewPage'
import Edit from './pages/Edit'

function App() {

  return (
    <div className='w-[80%] m-auto py-20'>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/:id" element={<NotesViewPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
