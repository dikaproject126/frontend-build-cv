import { Link, useNavigate } from "react-router"
import { useAuthStore } from "../stores/authStore"
import { Power } from "lucide-react"
import api from "../configs/axios"

const Header = () => {
  const { user, removeUserData } = useAuthStore()

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {})
      removeUserData()
      alert("Logout Successfull")
      navigate('/')
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="shadow bg-indigo-300">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 text-slate-800 transition-all">
        {/* Logo */}
        <Link to={"/"}>
          <h2 className="text-xl text-black font-bold">Resume</h2>
        </Link>
        {/* Logout */}
        <div className="flex gap-2 items-center space-x-4">
          <p className="max-sm:hidden">Hallo, {user.name}</p>

          <button onClick={handleLogout} className="bg-red-400 hover:bg-red-600 border border-gray-300 px-7 py-2 rounded-full active:scale-95 transition-all cursor-pointer"><Power size={18} strokeWidth={3} /></button>
        </div>
      </nav>
    </div>
  )
}

export default Header