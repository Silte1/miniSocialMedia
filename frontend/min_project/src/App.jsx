import * as React from "react"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,

} from "react-router-dom";
import './App.css';


////////////////////////////////////
import Home from './pages/Home';
import Register from "./pages/Register";
import Login from "./pages/Login"
import Secrets from "./pages/Secrets"
import Post from "./components/CreatePost"
import Profile from "./components/ShowProfile"
import Cookies from 'js-cookie'
import ShowPost from "./components/ShowPost";
import ShowMyPost from "./components/ShowMyPost";

function App () {
  const accessToken = Cookies.get('accessCookie');
  console.log(accessToken)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/secrets" element={<Secrets />}>
          <Route path="myPost" element={<ShowMyPost />} />
          <Route path="post" element={<Post />} />
          <Route path="showPost" element={<ShowPost />} />
          <Route path="me/:id" element={<Profile />} />
        </Route>

      </Route>
    )
  )
  return (
    <main className="App">

      <RouterProvider router={router} />
    </main>
  );
}

const Root = () => {

  return (
    <section className="appBody">
      <Outlet />
    </section>
  )
}

export default App;
