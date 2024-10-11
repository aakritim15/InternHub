import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      console.error('Passwords do not match');
    } else {
      console.log('Form submitted:', formData);
    }
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#f4f4f4',
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    large: {
      fontSize: '2.5rem',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '1rem',
    },
    textPrimary: {
      color: '#007bff',
    },
    lead: {
      fontSize: '1.2rem',
      textAlign: 'center',
      marginBottom: '1rem',
      color: '#6c757d',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    input: {
      width: '100%',
      padding: '0.8rem',
      fontSize: '1rem',
      border: '1px solid #ced4da',
      borderRadius: '5px',
      backgroundColor: '#fff',
      transition: 'all 0.3s ease',
      marginBottom: '0.5rem',
    },
    inputFocus: {
      borderColor: '#007bff',
      outline: 'none',
      boxShadow: '0 0 5px rgba(0, 123, 255, 0.3)',
    },
    submitButton: {
      width: '100%',
      padding: '0.8rem',
      fontSize: '1.2rem',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    submitButtonHover: {
      backgroundColor: '#0056b3',
    },
    formText: {
      fontSize: '0.9rem',
      color: '#6c757d',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.large, ...styles.textPrimary }}>Sign Up</h1>
      <p style={styles.lead}>
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={name}
            onChange={onChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            value={email}
            onChange={onChange}
            style={styles.input}
          />
          <small style={styles.formText}>
            This site uses Gravatar so if you want a profile image, use a Gravatar email
          </small>
        </div>
        <div style={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            required
            value={password}
            onChange={onChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            required
            value={password2}
            onChange={onChange}
            style={styles.input}
          />
        </div>
        <input
          type="submit"
          value="Register"
          style={styles.submitButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
        />
      </form>
    </div>
  );
};

export default Signup;
