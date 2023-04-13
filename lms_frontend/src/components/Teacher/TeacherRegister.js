import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api/teacher/';

function TeacherRegister(){
    useEffect(()=>{
        document.title='Register';
    });
    // Use State
    const[teacherData, setTeacherData]=useState({
        'full_name':'',
        'email':'',
        'password':'',
        'qualification':'',
        'mobile_no':'',
        'skills':'',
        'status':''
    });
    // Change element value
    const handleChange=(event)=>{
        // console.log(event.target.name, event.target.value)
        setTeacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    }
    // console.log(teacherData);
    // end

    // submit form
    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append('full_name', teacherData.full_name)
        teacherFormData.append('email', teacherData.email)
        teacherFormData.append('password', teacherData.password)
        teacherFormData.append('qualification', teacherData.qualification)
        teacherFormData.append('mobile_no', teacherData.mobile_no)
        teacherFormData.append('skills', teacherData.skills)

        try{
            axios.post(baseUrl, teacherFormData).then((response)=>{
                setTeacherData({
                    'full_name':'',
                    'email':'',
                    'password':'',
                    'qualification':'',
                    'mobile_no':'',
                    'skills':'',
                    'status':'success'
                });
            });
        }
        catch(error){
            console.log("error...... ",error);
            setTeacherData({'status':'error'})
        }  
    }
    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus=='true'){
        window.location.href='/teacher-dashboard';
    }
    // end
    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                    {teacherData.status=='success' && <p className='alert alert-success'>Thanks For Your Registration!</p>}
                    {!teacherData.status=='error' && <p className='alert alert-danger'>Something Wrong Happended!</p>}
                    <div className='card shadow border border-0'>
                        <h3 className='card-header'>Teacher Registration</h3>
                        <div className='card-body'>
                            {/* <form> */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Full Name</label>
                                    <input value={teacherData.full_name} onChange={handleChange} type="text" name='full_name' className="shadow border border-0 form-control" id="exampleInputEmail1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input value={teacherData.email} onChange={handleChange} type="email" name='email' className="shadow border border-0 form-control" id="exampleInputEmail1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input value={teacherData.password} onChange={handleChange} type="password" name='password' className="shadow border border-0 form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Qualification</label>
                                    <input value={teacherData.qualification} onChange={handleChange} type="text" name='qualification' className="shadow border border-0 form-control" id="exampleInputEmail1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Mobile No.</label>
                                    <input value={teacherData.mobile_no} onChange={handleChange} type="number" name='mobile_no' className="shadow border border-0 form-control" id="exampleInputEmail1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Skills</label>
                                    <textarea value={teacherData.skills} onChange={handleChange} name='skills' className='shadow border border-0 form-control'></textarea>
                                    <div id="interestHelp" class="form-text">PHP, Python, JavaScript, etc...</div>
                                </div>
                            
                                <button onClick={submitForm} type="submit" className="btn btn-primary">Signup</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherRegister;