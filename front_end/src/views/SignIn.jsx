import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'

const SignIn=()=>{
    const signIn=async()=>{
        event.preventDefault()
        let email=document.getElementById("signInEmail").value
        let password=document.getElementById("signInPassword").value
        console.log(email, password)
        let myResponse=await axios.post('signIn/',{
          'email':email,
          'password':password
        })
        console.log(myResponse.data)
        if (myResponse.data["signIn"]==true){
          window.location.href="/"
        }
        else{
            alert("Invalid Login")
            window.location.reload()
        }
      }

    return(
        <form onSubmit={signIn}>
        Enter Your Email:
        <br/>
        <input id='signInEmail' placeholder='email' />
        <br/>
        <br/>
        Enter Your Password:
        <br/>
        <input id='signInPassword' placeholder='password' type="password"/>
        <br/>
        <br/>
        <button  className="button" onClick={signIn}>Sign In</button>
        </form>
    )
}
export default SignIn