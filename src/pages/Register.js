import { useState } from "react"
import {registerUser} from "../api/api"
function Register({setScreen}){

    const [form, setForm ]= useState({
        name:"",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState("")

    const handleSubmit= async (e) =>{
        e.preventDefault();

        if(!form.name || !form.email || !form.password || !form.confirmPassword){
            setErrors("All fields are required")
            return
        }

        if(form.password <6){
            setErrors("Password should have atleast 6 characters")
            return
        }

        if(form.password !== form.confirmPassword){
            setErrors("Password mismatch")
            return
        }

        try {
             await registerUser(form)
             alert("Registration Succesfull")
             setScreen("login")
            
        } catch (error) {
            setErrors(error)
        }


    }

    return(
        <>
        <div className="h-screen flex justify-center items-center bg-green-300">
            {errors && <p className="text-red-500 mb-2">{errors}</p>}
             <form className="bg-white p-10 rounder-md " onSubmit={handleSubmit}>
                <h2 className="text-2xl text-bold mb-2 " >Register</h2>
                <input 
                    type="text"
                    placeholder="Enter name"
                    className="w-full p-2 mb-2 border rounded-md"
                    onChange={(e)=>setForm({
                        ...form,
                        name : e.target.value
                    })}
                />
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
                      <input
                       type="password"
                    placeholder="Confirm Password"
                    className="w-full p-2 mb-2 border rounded-md"
                    onChange={(e)=>setForm({
                        ...form,
                        confirmPassword : e.target.value
                    })}
                      />
                      <button className="w-full bg-green-500 text-white text-center rounded-md p-2 cursor-pointer mb-2"> Register</button>
                      <p className="text-blue-500 text-center cursor-pointer"
                        onClick={()=> setScreen("login")}
                      >
                        
                        back to login</p>
             </form>

        </div>
        </>
    )



}
export default Register