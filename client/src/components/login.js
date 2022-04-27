import React, { useReducer, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function onSubmit(event) {
        console.log("Submitted...");
        event.preventDefault();
    }

    return (
        <div className="Login">
            <Form onSubmit={onSubmit}>
            <Form.Group size="lg" controlId="email" className="input-container">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group size="lg" controlId="password" className="input-container">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
                <Button 
                    block size="lg" 
                    type="submit" 
                    className="button-container" 
                    disabled={!validateForm()}
                >LOGIN</Button>
                 <p> Register for a  account? <a href=" Registration"> Register </a>.</p>
            </Form>
        </div>
    );
}
