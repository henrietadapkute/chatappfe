import { useState, useRef } from 'react';

import { signUp } from '../../utilities/users-service'
import { Button, Form } from 'react-bootstrap'

export default function SignUpForm({ setUser }) {

  const [validated, setValidated] = useState(false)
  const [passwordMismatch, setPasswordMismatch] = useState(false)

  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmRef = useRef()
  const errorRef = useRef()

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const form = evt.currentTarget
    const isPasswordMismatch = passwordRef.current.value !== confirmRef.current.value
    setPasswordMismatch(isPasswordMismatch)

    if (form.checkValidity() && !isPasswordMismatch) {
      setValidated(true);
      try {
        const user = await signUp({
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value
        });
        setUser(user);
      } catch (error) {
        // Handle sign up error here
      }
    } else {
      evt.stopPropagation();
      setValidated(true);
    }
  };
  return (
    <>
    <h1>Sign Up</h1>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control required type="text" placeholder="Enter username" ref={usernameRef}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control required type="email" placeholder="Enter email" ref={emailRef} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" placeholder="Enter password" ref={passwordRef} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control required isInvalid={passwordMismatch} type="password" placeholder="Confirm password" ref={confirmRef} />
        <Form.Control.Feedback type="invalid">Passwords must match</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Create User</Button>
    </Form>
    </>
    )
}