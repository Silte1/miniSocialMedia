import React from "react"
import { useNavigate } from "react-router-dom";

// Material ui
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
//

export default function Home () {
    const navigation = useNavigate()
    return (
        <Container maxWidth="sm" >
            <h1>Welcome to min-social-Media</h1>
            <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
            >
                <Button variant='contained' color="success" size="medium" onClick={() => navigation("/register")}>
                    Sign up
                </Button>
                <Button variant='contained' size="medium" onClick={() => navigation("/login")}>Login</Button>
            </ButtonGroup>
        </Container>
    )


}