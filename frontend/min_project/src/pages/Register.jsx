import React, { useState } from 'react'
import { useNavigate } from 'react-router';


import "./Register.css"

// Material ui
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// React bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Register () {
    const navigation = useNavigate()
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [avatar, setAvatar] = useState("")




    const handleReset = () => {
        setName("")
        setUsername("")
        setPassword("")
        setAvatar()
    }



    const postData = async () => {
        if (!name || !username || !password || !avatar) {
            alert("Please fill all the field")
        }
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("username", username);
            formData.append("password", password);
            formData.append("profilePicture", avatar);

            const response = await fetch(`http://localhost:3001/register`, {
                method: "POST",
                body: formData,
            });
            if (response.status === 200) {
                navigation("/login")
            }

        } catch (error) {
            console.log(error);
        }

    };


    const handleRegister = (e) => {
        e.preventDefault();
        postData();
        handleReset()
    };

    return (
        <Container style={{ width: '30vw' }}>
            <Form className='registrationFormContainer' onSubmit={(event) => handleRegister(event)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name='username' placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} value={username} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <Form.Text className="text-muted">
                        Write characters like Aa 1 .% ...
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label onchange="showPreview(event)" > Upload profile picture</Form.Label>
                    <Form.Control type="file" name='profilePicture' placeholder="profile picture" onChange={(e) => { if (e.target.files.length > 0) setAvatar(e.target.files[0]) }} />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </Container>
    )
}
