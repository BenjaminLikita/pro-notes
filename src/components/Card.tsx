import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";


export type Note = {
    id: number;
    title: string;
    body: string;
}

const Card = ({id, title, body}: Note) => {
  const {deleteNote} = useAppContext()
  return (
    <div className="relative w-[100%] h-[100%]">
      <Link to={`/${id}`} className='bg-gradient-to-b from-[#1a2939] to-[#0d0e0f] h-[250px] block rounded-lg shadow-lg p-5 space-y-5 hover:opacity-70 transition-all duration-300 cursor-pointer'>
        <h2 className="line-clamp-2 font-semibold text-lg">{title}</h2>      
        <p className="line-clamp-4 text-sm">{body}</p>
      </Link>
      <button onClick={() => deleteNote(id)} className="absolute bottom-5 right-5 bg-[#e01616] p-3 rounded-full isolate hover:scale-105"><Trash /></button>
    </div>
  )
}

export default Card
