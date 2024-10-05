import React from 'react'

const Signup = () => {
  return (
    <div>
        <div>
            <Alert/>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="Name" name="name" required value={name} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" required value={email} onChange={onChange} />
                        <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Password" name="password" minLength="6" required value={password} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Confirm Password" name="password2" minLength="6" required value={password2} onChange={onChange} />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
            </section>
        </div>
    </div>
  )
}

export default Signup