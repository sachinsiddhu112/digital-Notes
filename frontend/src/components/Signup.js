import React ,{useState} from 'react'
import { useNavigate} from 'react-router-dom';
import { API_URL } from '../service';


export default function Signup(props) {
  let navigate = useNavigate()
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
  const handleSubmit =async (e)=>{

    e.preventDefault();
    const {name,email,password}=credentials;
    const response = await fetch(`${API_URL}/api/auth/createuser`, {
   
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
  body:JSON.stringify({name,email,password})
      });
      const json=await response.json();
      console.log(json);
      if(json.success){
        //save the user and redirect user
        localStorage.setItem('token',json.authtoken);
        //if credentials are correct then we are redirecting the user to home page by useing useNavigate() hook .
        navigate("/");
        props.showAlert("Your account is created succesfully","success")
      }
      else{
       props.showAlert("Invalid credentials","danger")
      }

}
const onChange = (e) => {
   setCredentials({...credentials,[e.target.name]:e.target.value});

}
  return (
    <div className='container mt-3 mx-5'>
      <h2 className='mb-5'> Create your accout before using Notbook</h2>
    <form onSubmit={handleSubmit }>
      <div className="mb-3 row mx-4">
        <label htmlFor="name" className="col-sm-2 col-htmlForm-label">Name</label>
        <div className="col-sm-10">
          <input type="text"  className="htmlForm-control-plaintext" id="name" name="name"  onChange={onChange}  required minLength={5}/>
        </div>
      </div>
      <div className="mb-3 row mx-4" >
        <label htmlFor="email" className="col-sm-2 col-htmlForm-label">Email</label>
        <div className="col-sm-10">
          <input type="text"  className="htmlForm-control-plaintext" id="email" name="email"  onChange={onChange} required/>
        </div>
      </div>
      <div className="mb-3 row mx-4">
        <label htmlFor="password" className="col-sm-2 col-htmlForm-label">Password</label>
        <div className="col-sm-10">
          <input type="password" className="htmlForm-control" id="password" name="password" onChange={onChange} required minLength={5}/>
        </div>
      </div>
      <div className="mb-3 row mx-4">
        <label htmlFor="cpassword" className="col-sm-2 col-htmlForm-label">Confirm Password</label>
        <div className="col-sm-10">
          <input type="password" className="htmlForm-control" id="cpassword" name="cpassword" required minLength={5} onChange={onChange}/>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mx-4" >Submit</button>
    </form>
    </div>
  )
}
