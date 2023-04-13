import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function TeacherLogin(){
    useEffect(()=>{
        document.title='Teacher Login';
    });
    const [teacherLoginData, setTeacherloginData]=useState({
        email: '',
        password: ''
    });

    const[errorMsg, setErrorMsg]=useState('');

    const handleChange=(event)=>{
        setTeacherloginData({
            ...teacherLoginData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        // console.log(teacherLoginData);
        const teacherFormData= new FormData;
        teacherFormData.append('email',teacherLoginData.email)
        teacherFormData.append('password',teacherLoginData.password)
        try{
            axios.post(baseUrl+'/teacher-login',teacherFormData).then((res)=>{
                // console.log(response.data);
                if(res.data.bool==true){
                    localStorage.setItem('teacherLoginStatus',true);
                    localStorage.setItem('teacher_id',res.data.teacher_id);
                    window.location.href='/teacher-dashboard';
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
    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus');
    if(teacherLoginStatus=='true'){
        window.location.href='/teacher-dashboard';
    }

    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                    <div className='card shadow border border-0'>
                        <h3 className='card-header'>Teacher Login</h3>
                        <div className='card-body'>
                            {errorMsg && <p className='alert alert-danger'>{errorMsg}</p>}
                            {/* <form> */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" value={teacherLoginData.email} className="shadow border border-0 form-control" name='email' onChange={handleChange} id="exampleInputEmail1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" value={teacherLoginData.password} className="shadow border border-0 form-control" name='password' onChange={handleChange} id="exampleInputPassword1" />
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

export default TeacherLogin;