const BASE_URL = "https://hotelmanagementbackend-1.onrender.com/api"

//register

export const registerUser = async (data)=>{
    try {
        const res = await fetch(`${BASE_URL}/users/register`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result

    } catch (error) {
        
    }
}

//login
export const loginUser = async (data)=>{
    try {
        const res = await fetch(`${BASE_URL}/users/login`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result

    } catch (error) {
        
    }
}