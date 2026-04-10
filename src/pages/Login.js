import { useState } from "react"
import {loginUser} from "../api/api"
function Login({setScreen}){

    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState("")

    const handleSubmit= async(e)=>{
        e.preventDefault();

        if(!form.email || !form.password){
            setErrors("All fields are required")
        }

        if(form.password < 6){
            setErrors("Password should have alteast 6 characters")
        }

        try {
            await loginUser(form);
            alert("User Login Successful")
            setScreen("home")
        } catch (error) {
            setErrors(error)
        }
    }
    

return(

    <>
      <div className="h-screen flex justify-center items-center bg-green-300">
            {errors && <p className="text-red-500 mb-2">{errors}</p>}
             <form className="bg-white p-10 rounder-md " onSubmit={handleSubmit}>
                <h2 className="text-2xl text-bold mb-2 " >Login</h2>
                  <input
                   type="email"
                    placeholder="Enter email"
                    className="w-full p-2 mb-2 border rounded-md"
                    onChange={(e)=>setForm({
                        ...form,
                        email : e.target.value
                    })}
                  
                  />
                    <input
                     type="password"
                    placeholder="Enter Password"
                    className="w-full p-2 mb-2 border rounded-md"
                    onChange={(e)=>setForm({
                        ...form,
                        password : e.target.value
                    })}
                    />
                      <button className="w-full bg-green-500 text-white text-center rounded-md p-2 cursor-pointer mb-2"> Login</button>
                      <p className="text-center text-gray-600">
                        Don't have an account? <span className="text-blue-500 cursor-pointer font-bold hover:underline" onClick={()=> setScreen("register")}>Register</span>
                      </p>
             </form>

        </div>
    </>
)
}
export default Login