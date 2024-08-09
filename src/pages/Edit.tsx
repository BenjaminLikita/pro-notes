import { Link, useParams } from 'react-router-dom'
import CreateEditForm from '../components/CreateEditForm'
import { ArrowLeft } from 'lucide-react'

const Edit = () => {
  const {id} = useParams()
  return (
    <div>
      <Link className='bg-white border rounded-lg px-3 py-2 flex gap-1 items-center w-max text-[#35414f] hover:bg-transparent hover:text-white transition-all duration-300 mb-5' to={`/${id}`}><ArrowLeft />Go Back</Link>
      <CreateEditForm mode={"edit"} />
    </div>
  )
}

export default Edit
