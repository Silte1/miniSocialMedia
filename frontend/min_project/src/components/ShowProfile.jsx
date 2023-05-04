import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'


export default function ShowProfile () {


    const [profileData, setProfileData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newName, setNewName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newAvatar, setNewAvatar] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [showForm, setShowForm] = useState(true);
    const [showName, setShowName] = useState(true);
    const [showUsername, setShowUsername] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const [showProfilePic, setShowProfilePic] = useState(true);


    const showFormForUpdate = (par) => {
        if (sho) {
            par(true)
        }
    }

    const navigation = useNavigate()


    const handleReset = () => {
        setNewName("")
        setNewUsername("")
        setNewAvatar("")
        setOldPassword("")
        setNewPassword("")
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

                const response = await fetch(`http://localhost:3001/me/update`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        //   "Authorization": `Bearer ${token}`
                    },
                    // credentials: 'include',
                    body: formData
                });
                if (response.status === 200) {
                    navigation("/secrets/showPost")
                }

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
        <div className='container d-flex align-items-center w-100 justify-content-center ' style={{ height: "90vh" }}>
            <form action='#' method='get' className=" d-flex flex-column  align-items-center justify-content-between border border-light w-25 bg-light h-75" >
                <div className='mb-1 d-flex flex-column justify-content-center w-100'>
                    <img src={profileData.profilePicture} className="rounded d-block w-100" alt="..." />
                    <button type="button" className="btn btn-info">Change profile picture</button>
                </div>
                <div className='mb-1 d-flex flex-column justify-content-center align-items-center w-100 text-black '>
                    <p  >Your name: {profileData.name} </p>
                    <button type="button" className="btn btn-info w-100">Change name</button>
                </div>
                <div className='mb-1 d-flex flex-column justify-content-center align-items-center w-100 text-black '>
                    <p>Your username: {profileData.username}</p>
                    <button type="button" className="btn btn-info w-100">Change username</button>
                </div>
                <div className='mb-1 d-flex flex-column justify-content-center align-items-center w-100 text-black '>
                    <button type="button" className="btn btn-info w-100">Change password</button>

                </div>
            </form>
            {showForm && <form action='#' method='post' onSubmit={(e) => handleChanges(e)} className=" d-flex flex-column  align-items-center justify-content-between border border-light w-25 bg-light h-75">

                {showProfilePic && <input type="file" name="" id="" placeholder='choose a new profile picture'
                    onChange={(e) => { if (e.target.files.length > 0) setNewAvatar(e.target.files[0]) }} />}

                {showName && <input type="text" name="" id="" placeholder='change your name here'
                    onChange={(e) => setNewName(e.target.value)} value={newName} />}

                {showUsername && <input type="text" name="" id="" placeholder='change your username here'
                    onChange={(e) => setNewUsername(e.target.value)} value={newUsername} />}

                {showPassword && <div>
                    <input type="text" name="" id="" placeholder='Enter your old password'
                        onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} />
                    <input type="text" name="" id="" placeholder='Enter your new password'
                        onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                </div>}


                <button type="button" className="btn btn-info ">Save changes</button>
            </form>}
        </div>
    );
}
