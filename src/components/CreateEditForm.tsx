import React, { useEffect } from 'react'
import { Check, Mic, MicOff } from 'lucide-react'
import { useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import useAppContext from '../hooks/useAppContext'
import { Note } from './Card'


type IMode = {
    mode: 'create' | 'edit'

}



const CreateEditForm = ({mode}: IMode) => {
    const [title, setTitle] = useState<string>('')
    const [body, setBody] = useState<string>('')
    const [note, setNote] = useState<Note>()
    const [micClickedError, setMicClickedError] = useState(false)

    const navigate = useNavigate()

    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

    const startListening = () => {
      if(!browserSupportsSpeechRecognition) setMicClickedError(true)
      SpeechRecognition.startListening({ continuous: true })
    }
    const stopListening = () => {
      SpeechRecognition.stopListening()
      setBody(prev => prev + ' ' + transcript)
      resetTranscript()
    }

    const {getNote, addNote, updateNote} = useAppContext()
    const {id} = useParams()

    useEffect(() => {
        if(mode === 'edit') {
          const note = getNote(parseInt(id!))
          setNote(note)
          setTitle(note?.title!)
          setBody(note?.body!)
        }
        
    }, [mode, getNote, id])
    
    if(mode === "edit" && !note) return <h1 className='font-bold text-3xl'>Note does not Exist...</h1>
    const submitHandler = (e: React.FormEvent) => {
      e.preventDefault()
      if(mode === "create"){
        addNote({
          id: Date.now(),
          title,
          body
        })
      } else{
        updateNote(note?.id!, {
          title,
          body
        })
      }
      navigate("/")
    }

  return (
    <div className="space-y-5">
        <h1 className="font-bold text-3xl">{mode === "edit" ? "Edit Note" : "Create New Note"}</h1>
        <hr />
      <form className="space-y-5" onSubmit={submitHandler}>
        <input required className="bg-transparent border rounded-lg p-3 block w-full"  type="text" placeholder="Note Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea required className="bg-transparent border rounded-lg p-3 block w-full" placeholder="Body" value={body} rows={5} onChange={(e) => setBody(e.target.value)}></textarea>
        {listening && <p>Listening...</p>}
        {micClickedError && <p>Browser does not support Speech Recognition</p>}
        {listening && <p>{transcript}</p>}
        <div className='flex items-center gap-5'>
          {
            listening ? (
              <button type='button' onClick={stopListening} className='border p-2 rounded-full hover:bg-white hover:text-[#0d1829] transition-all duration-300'><MicOff /></button>
            ) : (
              <button type='button' onClick={startListening} className='border p-2 rounded-full hover:bg-white hover:text-[#0d1829] transition-all duration-300'><Mic /></button>
            )
          }
          <button type="submit" className="bg-white rounded-lg py-2 px-4 text-[#0d1829] hover:bg-transparent hover:text-white transition-all duration-300 border flex gap-1 items-center"><Check /> {mode === "edit" ? "Save" : "Create"}</button>
        </div>
      </form>
    </div>
  )
}

export default CreateEditForm
