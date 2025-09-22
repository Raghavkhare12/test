import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { email, password } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    // Your register logic here
    console.log('Register attempt', formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="email" value={email} onChange={onChange} required placeholder="Email" />
      <input type="password" name="password" value={password} onChange={onChange} required placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;