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
            window.location.href="/#/signIn"
        }
        else{
            alert("incorrect input")
            window.location.reload()
        }
    }

    return(
        <form onSubmit={signUp}>
        <input id='signUpEmail' placeholder='email' />
        <input id='signUpPassword' placeholder='password' />
        <button onClick={signUp}>Sign Up</button>
        </form>
    )
}

export default SignUp