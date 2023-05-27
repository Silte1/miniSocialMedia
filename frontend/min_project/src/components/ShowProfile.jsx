import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
// React bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ShowProfile () {


    const [profileData, setProfileData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newName, setNewName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newAvatar, setNewAvatar] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [showName, setShowName] = useState(false);
    const [showUsername, setShowUsername] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showProfilePic, setShowProfilePic] = useState(false);
    // const [saveText, setSaveText] = useState(true);



    const showFormForUpdate = (par) => {

        if (showForm === false) { setShowForm(true) }
        par(prevPar => !prevPar)
    }

    const navigation = useNavigate()


    const handleReset = () => {
        setNewName("")
        setNewUsername("")
        setNewAvatar("")
        setOldPassword("")
        setNewPassword("")
        setShowForm(false)
        setShowName(false)
        setShowUsername(false)
        setShowPassword(false)
        setShowProfilePic(false)
    }



    const updateProfile = async () => {
        if (!newName && !newUsername && !newAvatar && !newPassword && !oldPassword) {
            return
        } else {
            try {
                const formData = new FormData();
                if (newName !== "") {
                    formData.append("newName", newName);
                }
                if (newUsername !== "") {
                    formData.append("newUsername", newUsername);
                }
                if (newAvatar !== "") {
                    formData.append("newAvatar", newAvatar);
                }
                if (newAvatar !== "") {
                    formData.append("newPassword", newPassword);
                } if (newAvatar !== "") {
                    formData.append("oldPassword", oldPassword);
                }
                // for (const value of formData.values()) {
                //     console.log(value);
                // }
                for (const pair of formData.entries()) {
                    console.log(`${pair[0]}, ${pair[1]}`);
                }
                const response = await fetch(`http://localhost:3001/me/changes/:id`, {
                    method: "POST",
                    body: formData,
                    credentials: 'include'

                });
                console.log("response:", response)
                // if (response.status === 200) {
                //     navigation("/secrets/showPost")
                // }

            } catch (error) {
                console.log(error);
            }
        }

    };


    const handleChanges = (e) => {
        e.preventDefault();
        updateProfile();
        handleReset()
    };

    // FETCH PROFILE
    useEffect(() => {
        let isMounted = true;

        const fetchProfile = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`http://localhost:3001/me`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": `Bearer ${token}`
                    },
                    credentials: 'include'
                });
                if (!isMounted) return; // Cancel the request if the component has unmounted

                if (response.ok) {
                    const data = await response.json()
                    setProfileData(data)
                    console.log(profileData)
                }
                else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                console.error(error);
                // TODO: Handle errors more gracefully
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();

        return () => {
            isMounted = false;
        };
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!profileData) {
        return <p>No data found.</p>;
    }

    return (
        <Container className='container d-flex  w-100 justify-content-evenly gap-1' style={{ height: "90vh" }}>
            <Form action='#' method='' className=" d-flex flex-column  align-items-center justify-content-between w-40 bg-light p-1 rounded" style={{ height: "80vh", width: "30rem" }}>
                <div className='mb-1 d-flex flex-column justify-content-center w-100 align-items-center'>
                    <img src={profileData.profilePicture} className="rounded d-block w-50 rounded-circle" alt="..." />
                    <button type="button" className="btn btn-info w-100" onClick={() => { showFormForUpdate(setShowProfilePic) }}>Change profile picture</button>
                </div>
                <div className='mb-1 d-flex flex-column justify-content-center align-items-center w-100 text-black '>
                    <p  >Your name: {profileData.name} </p>
                    <button type="button" className="btn btn-info w-100" onClick={() => { showFormForUpdate(setShowName) }}>Change name</button>
                </div>
                <div className='mb-1 d-flex flex-column justify-content-center align-items-center w-100 text-black '>
                    <p>Your username: {profileData.username}</p>
                    <button type="button" className="btn btn-info w-100" onClick={() => { showFormForUpdate(setShowUsername) }}>Change username</button>
                </div>
                <div className='mb-1 d-flex flex-column justify-content-center align-items-center w-100 text-black '>
                    <button type="button" className="btn btn-info w-100" onClick={() => { showFormForUpdate(setShowPassword) }}>Change password</button>

                </div>
            </Form>

            {showForm && <Form action="/me/changes" method='post' onSubmit={(e) => handleChanges(e)}
                className=" d-flex flex-column  align-items-center justify-content-between w-40 bg-light p-1 rounded"
                style={{ height: "80vh", width: "30rem" }}>

                {showProfilePic && <input className='w-100 text-light form-control' type="file" name="" id="" placeholder='choose a new profile picture'
                    onChange={(e) => { if (e.target.files.length > 0) setNewAvatar(e.target.files[0]) }} style={{ height: "fitContent" }} />}

                {showName && <input className='w-100 form-control' type="text" name="" id="" placeholder='new name'
                    onChange={(e) => setNewName(e.target.value)} value={newName} style={{ height: "fitContent" }} />}

                {showUsername && <input className='w-100 form-control' type="text" name="" id="" placeholder='new username'
                    onChange={(e) => setNewUsername(e.target.value)} value={newUsername} />}

                {showPassword && <div className='w-100'>
                    <input className='w-100 form-control' type="password" name="" id="" placeholder='Enter your old password'
                        onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} />
                    <input className='w-100 form-control' type="password" name="" id="" placeholder='Enter your new password'
                        onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                </div>}


                <button type="submit" className="btn btn-info w-100">Save changes</button>
            </Form>}

        </Container>
    );
}
