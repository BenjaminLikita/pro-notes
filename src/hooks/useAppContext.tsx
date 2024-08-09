import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Note } from '../components/Card'

type NoteType = {
  notes: Note[],
  getNote: (id: number) => Note | undefined
  addNote: (note: Note) => void
  updateNote: (id: number, note: Omit<Note, "id">) => void
  deleteNote: (id: number) => void
}
const AppContext = createContext<NoteType | undefined>(undefined)


const useAppContext = () => {
  const context = useContext(AppContext)
  if(!context) throw new Error("Notes COntext has somethig wrong")
    return context
}

export const AppContextProvider = ({children}: {children: ReactNode}) => {

    const [notes, setNotes] = useState<Note[]>(() => {
      const notes = localStorage.getItem("notes")
      return notes ? JSON.parse(notes) : []
    })

    const getNote = (id: number) => {
      const note = notes?.find(note => note.id === id)
      return note
    }
  
    const addNote = (note: Note) => {
      const newNotes = notes ? [...notes, note] : [note]
      setNotes(newNotes)
      // localStorage.setItem('notes', JSON.stringify(newNotes))
    }
    const updateNote = (id: number, noteBody: Omit<Note, "id">) => {
      // const foundNote = notes.find(note => note.id === id)
      const updatedNotes = notes.map(note => {
        if(note.id === id) return {...note, ...noteBody}
        else return note
      })
      setNotes(updatedNotes)
      // localStorage.setItem('notes', JSON.stringify(newNotes))
    }
    
    const deleteNote = (id: number) => {
      const newNotes = notes?.filter(note => note.id !== id)!
      setNotes(newNotes)
      // localStorage.setItem('notes', JSON.stringify(newNotes))
    }

    useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

  return (
    <AppContext.Provider value={{notes, getNote, addNote, deleteNote, updateNote}}>
      {children}
    </AppContext.Provider>
  )
}

export default useAppContext
