import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function Login(){
    useEffect(()=>{
        document.title='Login';
    });

    const [studentLoginData, setStudentLoginData]=useState({
        email: '',
        password: ''
    });

    const[errorMsg, setErrorMsg]=useState('');

    const handleChange=(event)=>{
        setStudentLoginData({
            ...studentLoginData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        // console.log(teacherLoginData);
        const studentFormData= new FormData;
        studentFormData.append('email',studentLoginData.email)
        studentFormData.append('password',studentLoginData.password)
        try{
            axios.post(baseUrl+'/student-login',studentFormData).then((res)=>{
                // console.log(response.data);
                if(res.data.bool==true){
                    localStorage.setItem('studentLoginStatus',true);
                    localStorage.setItem('student_id',res.data.student_id);
                    window.location.href='/student-dashboard';
                }
                else{
                    setErrorMsg('Invalid Email or Password!!!')
                }
            });
        }
        catch(error){
            console.log(error);
        }
    }

    const studentLoginStatus=localStorage.getItem('studentLoginStatus');
    if(studentLoginStatus=='true'){
        window.location.href='/student-dashboard';
    }

    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                    <div className='card shadow border border-0'>
                        <h3 className='card-header'>User Login</h3>
                        <div className='card-body'>
                            {errorMsg && <p className='alert alert-danger'>{errorMsg}</p>}
                            {/* <form> */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" value={studentLoginData.email} className="form-control shadow border border-0 " id="exampleInputEmail1" onChange={handleChange} name='email' />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" value={studentLoginData.password} className="shadow border border-0 form-control" id="exampleInputPassword1" onChange={handleChange} name='password' />
                                </div>
                                {/* <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                                </div> */}
                                <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;