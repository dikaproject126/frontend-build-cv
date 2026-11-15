import { XIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

const DashboardView = () => {
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [title, setTitle] = useState('')

  const handleCreateResume = async (e) => {
    e.preventDefault();
    console.log(title);
    setShowCreateResume(false);
  }

  const OpenCreateResume = () => { setShowCreateResume(true) };

  const CloseCreateResume = () => { setShowCreateResume(false); setTitle('');};

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
      </div>
      {/* Dialog */}
      {showCreateResume && (
        <form onSubmit={handleCreateResume} onClick={CloseCreateResume}
        className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center">
          <div onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-lg w-full rounded-lg max-w-sm p-6">
            <h2 className="text-xl font-bold mt-4 mb-2">Create a Resume</h2>
            <input type="text" placeholder="Enter Resume Title" onChange={(e) => setTitle(e.target.value)} value={title} className="w-full mb-2 px-3 py-3 focus:border-indigo-600 ring-indigo-600 border-1 rounded-lg"/>
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