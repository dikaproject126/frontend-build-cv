import { XIcon, PlusIcon, FilePenLineIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '../configs/axios'

const DashboardView = () => {
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [title, setTitle] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [resumes, setResumes] = useState([])

  const handleCreateResume = async (e) => {
    e.preventDefault();
    try {
      await api.post("/resume", { title })

      alert("Berhasil buat Resume")

      setTitle("")

      setShowCreateResume(false);
    } catch (error) {
      setErrorMsg(error.response.data.message || 'Gagal membuat resume');
    }

  }

  const getAllResume = async () => {
    const response = await api.get('/resume')
    setResumes(response.data.resume)
  }

  useEffect(() => {
    getAllResume()
  }, [])
  const OpenCreateResume = () => { setShowCreateResume(true) };

  const CloseCreateResume = () => { setShowCreateResume(false); setTitle(''); };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
        <div className="flex">
          <button onClick={OpenCreateResume} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border-2 border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transation-all duration-300 cursor-pointer hover:font-bold">
            <PlusIcon className="size-11 transition-all duration-300 p-3 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>
        </div>
        <hr className='border-slate-400 my-6 sm-w-[350px]' />

        {/* list Resume */}
        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
          {!resumes.length ? (
            <h1 className='font-bold text-2xl'>Belum ada Resume</h1>
          ) : (
            <>
              {resumes.map((item) => {
                return (
                  <button key={item._id} className='relative w-full sm:w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer bg-indigo-400/50'>
                    <FilePenLineIcon className="size-7 group-hover:scale-105 transition-all" />
                    <p className="text-sm group-hover:scale-105 trasition-all text-center ">{item.title}</p>
                    <p className='absolute button-1 text-sm text-slate-600 group-hover:text-slate-700 transition-all duration-300 px-2 text-center'>Update on {new Date(item.updatedAt).toLocalDateString()}</p>
                  </button>
                )
              })}

            </>
          )}
        </div>
      </div>

      {/* Dialog */}
      {showCreateResume && (
        <form onSubmit={handleCreateResume} onClick={CloseCreateResume}
          className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center">
          <div onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-lg w-full rounded-lg max-w-sm p-6">
            <h2 className="text-xl font-bold mt-4 mb-2">Create a Resume</h2>
            {errorMsg && (
              <p className='bg-red-300 text-slate-100 text-center p-4'>
                {errorMsg}
              </p>
            )}
            <input type="text" placeholder="Enter Resume Title" onChange={(e) => setTitle(e.target.value)} value={title} className="w-full mb-2 px-3 py-3 focus:border-indigo-600 ring-indigo-600 border-1 rounded-lg" required />
            <button type="submit" className="w-full py-2 mt-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
              Create Resume
            </button>
            <XIcon onClick={CloseCreateResume} className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors" />
          </div>
        </form>
      )}

    </>
  )
}

export default DashboardView