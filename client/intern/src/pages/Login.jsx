

export const Login = () => {
   
  return (
    <div>
    <section className="container">
<h1 className="large text-primary">Log In</h1>

<form className="form" onSubmit={e => onSubmit(e)}>

<div className="form-group">
 <input type="email" placeholder="Email Address" name="email" required  onChange={e=> onChange(e)} />

</div>
<div className="form-group">
 <input
   type="password"
   placeholder="Password"
   name="password"
   minLength="6"
   required  onChange={e=> onChange(e)}
 />
</div>

<input type="submit" className="btn btn-primary"  />
</form>
<p className="my-1">
Don't have an account? Sign Up
</p>
</section>
</div>
  )
}



const mapStateToProps = state =>({
    isAuthenticate: state.auth.isAuthenticated
})
export default  (Login)