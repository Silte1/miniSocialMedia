import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

import "./Secrets.css"




export default function Home () {
    // const [data, setData] = useState([])
    // const [isAuthenticate, setIsAuthenticate] = useState(true)
    const userId = localStorage.getItem('userId');

    const navigation = useNavigate()
    const logOutFunction = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/logout`, {
                credentials: 'include'
            });

            if (response.status === 200) {
                navigation(`/`)
            }
            if (response.status === 204) {
                alert("Sorry something run wrong")
            }



        } catch (error) {
            console.log(error);
        }

    };

    const addNewPost = () => {
        navigation(`/secrets/post`)

    }

    const showMyPost = () => {
        navigation(`/secrets/myPost`)
    }

    const showAllPost = () => {
        navigation(`/secrets/showPost`)

    }

    const showProfile = (e) => {
        e.preventDefault();
        navigation(`/secrets/me/${userId}`)

        // console.log(id)
    }

    return (
        <main className="container-fluid w-100" style={{ height: "100vh" }}>

            <nav className="navbar navbar-expand-lg bg-black h5" style={{ height: "10vh" }}>
                <div className="container-fluid">
                    <a className="navbar-brand text-light" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active text-light" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link text-light" onClick={() => { addNewPost() }}>new Post</span>
                            </li>

                            <li className="nav-item">
                                <span className='nav-link text-light' onClick={(e) => showMyPost(e)}>MyPost</span>
                            </li>
                            <li className="nav-item">
                                <span className='nav-link text-light' onClick={(e) => showAllPost(e)}>Posts</span>
                            </li>
                            <li className="nav-item">
                                <span className='nav-link text-light' onClick={(e) => showProfile(e)}>Profile</span>
                            </li>
                            <li className="nav-item">
                                <span className='nav-link text-light' onClick={(e) => logOutFunction(e)}>LogOut</span>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            <section>
                <Outlet />
            </section>

        </main>
    )
}
