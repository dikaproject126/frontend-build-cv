import { Outlet } from "react-router";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <>
        <Header/>
        <Outlet/>
        <h1>Footer</h1>
    </>
  )
}

export default MainLayout