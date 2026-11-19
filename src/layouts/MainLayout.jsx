<<<<<<< HEAD
import { Navigate, Outlet } from "react-router";
import Header from "../components/Header";
import { useAuthStore } from "../stores/authStore"

const MainLayout = () => {
  const { isAuthentication } = useAuthStore()

  return isAuthentication ? (
    <>
        <Header/>
        <Outlet/>
    </>
  ) : (
    <Navigate to={"/login"} replace />
=======
import { Outlet } from "react-router";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <>
        <Header/>
        <Outlet/>
        <h1>Footer</h1>
    </>
>>>>>>> origin/main
  )
}

export default MainLayout