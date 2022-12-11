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
            alert("incorrect input")
            window.location.reload()
        }
      }

    return(
        <form onSubmit={signIn}>
        <input id='signInEmail' placeholder='email' />
        <input id='signInPassword' placeholder='password' type="password"/>
        <button onClick={signIn}>Sign In</button>
        </form>
    )
}
export default SignIn