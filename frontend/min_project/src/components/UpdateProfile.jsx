
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Profile () {
    const [newName, setNewName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newAvatar, setNewAvatar] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigation = useNavigate()

    const handleReset = () => {
        setNewName("")
        setNewUsername("")
        setNewAvatar("")
    }


    const postData = async () => {
        if (newName === "" && newUsername === "" && newAvatar === "") {
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

                const response = await fetch(`http://localhost:3001/me/update`, {
                    method: "POST",
                    body: formData,
                });
                if (response.status === 200) {
                    navigation("/secrets/post")
                }

            } catch (error) {
                console.log(error);
            }
        }

    };


    const handleRegister = (e) => {
        e.preventDefault();
        postData();
        handleReset()
    };

    return (
        <div>Profile</div>
    )
}
