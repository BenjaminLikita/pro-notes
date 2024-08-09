import { Link } from 'react-router-dom'
import CreateEditForm from '../components/CreateEditForm'
import { Home } from 'lucide-react'

const Create = () => {
  return (
    <div>
        <Link className='bg-white border rounded-lg px-3 py-2 flex gap-1 items-center w-max text-[#35414f] hover:bg-transparent hover:text-white transition-all duration-300 mb-5' to={"/"}><Home />Go Home</Link>
        <CreateEditForm mode={"create"} />
    </div>
  )
}

export default Create
