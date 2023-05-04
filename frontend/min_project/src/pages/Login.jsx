import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./Login.css"

// react bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
// import axios from "axios"


export default function Login () {
    const navigation = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")



    const postData = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/login`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, password: password }),
                credentials: "include"

            });
            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('userId', data.userId)
            }
            if (response.status === 200) {
                navigation(`/secrets/showPost`)
            }
            if (response.status === 404) {
                alert("Your username is maybe wrong. Please check it again ! ")
            }
            if (response.status === 401) {
                alert("Please check your password!")
            }

        } catch (error) {
            console.log(error);
        }

    };




    return (
        <Container >
            <Form className="loginFormContainer " onSubmit={(e) => postData(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Form.Text className="text-light">
                        We'll never share your email with anyone else!
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )


}