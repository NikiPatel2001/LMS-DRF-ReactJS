import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';

function TeacherChangePassword(){
    useEffect(()=>{
        document.title='Change Password';
    });

    const[teacherData, setTeacherData]=useState({
        'password':'',
    });

    const teacher_id=localStorage.getItem('teacher_id');  
    const handleChange=(event)=>{
        // console.log(event.target.name, event.target.value)
        setTeacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    }

    // submit form
    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append('password', teacherData.password)
       
        try{
            axios.post(baseUrl+'/teacher/change-password'+teacher_id+'/', teacherFormData).then((response)=>{
                if(response.status==200 || response.status==201){
                    window.location.href='/teacher-logout';
                }else{
                    alert('OOPS....soms error occurs');
                } 
            });
        }  
        catch(error){
            console.log("error...... ",error);
            setTeacherData({'status':'error'})
        }  
    }

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus!='true'){
        window.location.href='/teacher-login';
    }

    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
            
                <section className='col-md-9'>
                    <div className='card shadow border border-0'>
                        <h5 className='card-header'>Change Password</h5> 
                        <div className='card-body'>
                            <div class="mb-3 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">New Password</label>
                                <div class="col-sm-10">
                                <input type="password" name='password' value={teacherData.password} onChange={handleChange} class="form-control" id="inputPassword" />
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

export default TeacherChangePassword;