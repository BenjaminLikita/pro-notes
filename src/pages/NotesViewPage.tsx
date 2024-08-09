import { Link, useNavigate, useParams } from "react-router-dom";
import { Home } from "lucide-react";
import useAppContext from "../hooks/useAppContext";


const NotesViewPage = () => {

    const { id } = useParams()
    const {getNote, deleteNote} = useAppContext()
    const note = getNote(parseInt(id!))
    const navigate = useNavigate()
    if(!note) return <h1>Note does not Exist...</h1>
    if(note.title) document.title = note.title

    const deleteCurrentNote = () => {
      deleteNote(note.id)
      navigate("/")
    }

  return (
    <div className="space-y-5">
      <Link className='bg-white border rounded-lg px-3 py-2 flex gap-1 items-center w-max text-[#35414f] hover:bg-transparent hover:text-white transition-all duration-300 mb-5' to={"/"}><Home />Go Home</Link>
      <h1 className="font-bold text-3xl">{note?.title}</h1>
      <hr />
      <p>{note?.body}</p>
      <div className="flex gap-5">
        <Link className="border rounded-lg px-5 py-2 hover:bg-white hover:text-[#0d1829] transition-all duration-300" to={`/edit/${id}`}>Edit</Link>
        <button onClick={deleteCurrentNote} className="border bg-white rounded-lg px-5 py-2 text-[#0d1829] hover:text-white hover:bg-transparent transition-all duration-300">Delete</button>
      </div>
    </div>
  )
}

export default NotesViewPage
