import { Link } from "react-router-dom"
import Card from "../components/Card"
import { Plus } from "lucide-react"
import useAppContext from "../hooks/useAppContext"


const Homepage = () => {
    const {notes} = useAppContext()
    document.title = "Pro Notes"
  return (
    <div className='space-y-5'>
        <div>
            <span className="text-sm">Welcome to Pro Notes</span>
            <h1 className="text-3xl font-bold">Write to your Hearts Content...</h1>
        </div>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            <Link to={"/create"} className='bg-[#35414f] grid place-items-center rounded-lg shadow-lg hover:opacity-80 h-[250px] transition-all duration-300'>
                <h2 className="flex items-center gap-3 text-xl font-semibold"><Plus /> Add Notes</h2>
            </Link>
            {
                !notes?.length ? (
                    <h1 className="font-bold text-xl text-center">No Notes Available...</h1>
                ): (
                    notes.map(note => (
                        <Card key={note.id} {...note} />
                    ))
                )
            }
        </div>
    </div>
  )
}

export default Homepage
