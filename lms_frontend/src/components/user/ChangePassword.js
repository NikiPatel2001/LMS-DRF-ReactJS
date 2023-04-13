import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';

function ChangePassword(){
    useEffect(()=>{
        document.title='Change Password';
    });

    const[studentData, setStudentData]=useState({
        'password':'',
    });

    const student_id=localStorage.getItem('student_id');  
    const handleChange=(event)=>{
        // console.log(event.target.name, event.target.value)
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    }

    // submit form
    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append('password', studentData.password)
       
        try{
            axios.post(baseUrl+'/student/change-password'+student_id+'/', studentFormData).then((response)=>{
                if(response.status==200 || response.status==201){
                    window.location.href='/student-logout';
                }else{
                    alert('OOPS....soms error occurs');
                } 
            });
        }  
        catch(error){
            console.log("error...... ",error);
            setStudentData({'status':'error'})
        }  
    }

    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus!='true'){
        window.location.href='/student-login';
    }

    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <Sidebar />
                </aside>
            
                <section className='col-md-9'>
                    <div className='card shadow border border-0'>
                        <h5 className='card-header'>Change Password</h5> 
                        <div className='card-body '>
                            <div class="mb-3 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">New Password</label>
                                <div class="col-sm-10">
                                <input type="password" name='password' value={studentData.password} onChange={handleChange} class="form-control" id="inputPassword" />
                                </div>
                            </div>
                            <button className='btn btn-dark' onClick={submitForm}>Update</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ChangePassword;