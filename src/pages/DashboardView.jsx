import { XIcon, PlusIcon, FilePenLineIcon, TrashIcon, PencilIcon } from 'lucide-react'
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
      const response = await api.post("/resume", { title })
      setResumes((currentResumes) => [...currentResumes, response.data.resume])

      alert("Berhasil buat Resume")

      setTitle("")

      setShowCreateResume(false);
      getAllResume()
    } catch (error) {
      setErrorMsg(error.response.data.message || 'Gagal membuat resume');
    }

  }

  const getAllResume = async () => {
    const response = await api.get('/resume')
    setResumes(response.data.resume)
  }

  const deleteResume = async (resumeId) => {
    const confirmed = window.confirm("Are you sure want to delete this Resume?")
    if (confirmed) {
      try {
        await api.delete(`/resume/${resumeId}`)
        setResumes((currentResumes) => currentResumes.filter((resume) => resume._id !== resumeId))
      } catch (error) {
        window.alert(error.response?.data?.message || error.message || 'Gagal menghapus resume')
      }
    }
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
                    <p className='absolute bottom-1 left-0 right-0 text-sm text-slate-600 group-hover:text-slate-700 transition-all duration-300 px-2 text-center'>Update on {new Date(item.updatedAt).toLocaleDateString()}</p>
                    <div onClick={(e) => e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                      <span onClick={() => deleteResume(item._id)} className='relative group/action'>
                        <TrashIcon aria-label='Hapus' className='size-8 p-2 hover:bg-white/50 rounded transition-colors text-red-500'/>
                        <span className='pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/action:opacity-100'>Hapus</span>
                      </span>
                      <span className='relative group/action'>
                        <PencilIcon aria-label='Edit' className='size-8 p-2 hover:bg-white/50 rounded transition-colors text-indigo-600'/>
                        <span className='pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/action:opacity-100'>Edit</span>
                      </span>
                    </div>
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