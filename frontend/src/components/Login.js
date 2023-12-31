import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { API_URL } from '../service';
export default function Login(props) {
    let navigate = useNavigate()
    const [credentials,setCredentials]=useState({email:"",password:""});
    
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
      body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
            //save the user and redirect user
            localStorage.setItem('token',json.authtoken);
            //if credentials are correct then we are redirecting the user to home page by useing useNavigate() hook .
            navigate("/");
          }
          else{
            props.showAlert("Invalid details","danger")
          }

    }
    const onChange = (e) => {
       setCredentials({...credentials,[e.target.name]:e.target.value});
    
    }
      
    return (
        <div className='mt-4'>
            <h2 style={{}}>Login to continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"  value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange}/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
