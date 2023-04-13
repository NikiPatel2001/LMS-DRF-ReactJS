import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api/student/';
function Register(){
    useEffect(()=>{
        document.title='Register';
    });

    const[studentData, setStudentData]=useState({
        'full_name':'',
        'email':'',
        'password':'',
        'username':'',
        'interested_categories':'',
        'status':''
    });

    // Change element value
    const handleChange=(event)=>{
        // console.log(event.target.name, event.target.value)
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    }
    // console.log(teacherData);
    // end

    // submit form
    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append('full_name', studentData.full_name)
        studentFormData.append('email', studentData.email)
        studentFormData.append('password', studentData.password)
        studentFormData.append('username', studentData.username)
        studentFormData.append('interested_categories', studentData.interest)

        try{
            axios.post(baseUrl, studentFormData).then((response)=>{
                setStudentData({
                    'full_name':'',
                    'email':'',
                    'password':'',
                    'username':'',
                    'interested_categories':'',
                    'status':'success'
                });
            });
        }
        catch(error){
            console.log(error);
            setStudentData({'status':'error'})
        }  
    }
    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus=='true'){
        window.location.href='/student-dashboard';
    }
    // end

    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                    {studentData.status=='success' && <p className='alert alert-success'>Thanks For Your Registration!</p>}
                    {/* {studentData.status=='' && <p className='text-danger'>Required To Fill All The Fields!</p>} */}
                    {!studentData.status=='error' && <p className='alert alert-danger'>Something Wrong Happended!</p>}
                    <div className='card shadow border border-0'>
                        <h3 className='card-header'>User Registration</h3>
                        <div className='card-body'>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Full Name</label>
                                <input type="text" value={studentData.full_name} onChange={handleChange} name='full_name' className="shadow border border-0 form-control" id="exampleInputEmail1"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email</label>
                                <input type="email" value={studentData.email} onChange={handleChange} name='email' className="shadow border border-0 form-control" id="exampleInputEmail1"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Username</label>
                                <input type="text" value={studentData.username} onChange={handleChange} name='username' className="shadow border border-0 form-control" id="exampleInputEmail1"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" value={studentData.password} onChange={handleChange} name='password' className="shadow border border-0 form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Interests</label>
                                <textarea value={studentData.interest} onChange={handleChange} className='shadow border border-0 form-control' name='interest'></textarea>
                                <div id="interestHelp" class="form-text">PHP, Python, JavaScript, etc...</div>
                            </div>
                            
                            <button type="submit" onClick={submitForm} className="btn btn-primary">Signup</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;