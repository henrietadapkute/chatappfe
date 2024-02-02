import { useState, useRef } from 'react';

import { signUp } from '../../utilities/users-service'
import { Button, Form } from 'react-bootstrap'

export default function SignUpForm({ setUser }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  })

  const [validated, setValidated] = useState(false)
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmRef = useRef()
  const errorRef = useRef()

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      error: ''
    })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const form = evt.currentTarget
    console.log(form.checkValidity())
    if (!form.checkValidity()) {
      evt.stopPropagation()
    } else {
      const user = await signUp({
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
      setUser(user)
    }
    setValidated(true)
    console.log('check')
  }

  const disable = formData.password !== formData.confirm

  return (
    <>
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
        <Form.Control required isInvalid={confirmRef.current.value === passwordRef.current.value} type="password" placeholder="Confirm password" ref={confirmRef} />
      </Form.Group>
      <Button type="submit">Create User</Button>
    </Form>
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <label>Confirm</label>
          <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
          <button type="submit" disabled={disable}>SIGN UP</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{formData.error}</p>
    </div>
    </>
  );

}