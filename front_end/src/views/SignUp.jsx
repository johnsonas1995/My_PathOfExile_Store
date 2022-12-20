import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'

const SignUp=()=>{
    const signUp=async()=>{
        event.preventDefault()
        let email=document.getElementById("signUpEmail").value
        let password=document.getElementById("signUpPassword").value
        console.log(email, password)
        let myResponse=await axios.post('signUp/',{
          'email':email,
          'password':password
        })
        if(myResponse.data['signup']==true){
            window.location.href="/signIn"
        }
        else{
            alert("incorrect input")
            window.location.reload()
        }
    }

    return(
        <div>
            <h4>Create Account</h4>
            <form onSubmit={signUp}>
            Enter Your Email:
            <br/>
            <input className="form-control" id='signUpEmail' placeholder='email' />
            <br/>
            <br/>
            Create Your Password:
            <br/>
            <input className="form-control" id='signUpPassword' placeholder='password' type="password" />
            <br/>
            <br/>
            <button  className="button" onClick={signUp}>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp