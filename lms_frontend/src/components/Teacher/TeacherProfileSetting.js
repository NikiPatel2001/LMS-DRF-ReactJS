import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';

function TeacherProfileSetting(){
    useEffect(()=>{
        document.title='Profile Setting';
    });

    const[teacherData, setTeacherData]=useState({
        'full_name':'',
        'email':'',
        'qualification':'',
        'mobile_no':'',
        'skills':'',
        'prev_img':'',
        'profile_img':'',
        'status':''
    });
    const teacher_id=localStorage.getItem('teacher_id');
    useEffect(()=>{
        // Fetch current teacher data
        try{
            axios.get(baseUrl+'/teacher/'+teacher_id)
            .then((response)=>{
                setTeacherData({
                    full_name: response.data.full_name,
                    email: response.data.email,
                    qualification: response.data.qualification,
                    mobile_no: response.data.mobile_no,
                    skills: response.data.skills,
                    prev_img: response.data.profile_img,
                    profile_img: ''
                });
            });
        }
        catch(error){
            console.log(error);
        }
        // End
    },[]);
    // Change element value
    const handleChange=(event)=>{
        // console.log(event.target.name, event.target.value)
        setTeacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=>{
        setTeacherData({
            ...teacherData,
            [event.target.name]:event.target.files[0]
        });
    }

    // submit form
    const submitForm=()=>{
        const teacherFormData=new FormData();
        teacherFormData.append('full_name', teacherData.full_name)
        teacherFormData.append('email', teacherData.email)
        teacherFormData.append('qualification', teacherData.qualification)
        teacherFormData.append('mobile_no', teacherData.mobile_no)
        teacherFormData.append('skills', teacherData.skills)
        if(teacherData.profile_img!=''){
            teacherFormData.append('profile_img', teacherData.profile_img, teacherData.profile_img.name);
        }

        try{
            axios.put(baseUrl+'/teacher/'+teacher_id+'/', teacherFormData).then((response)=>{
                if(response.status===200 || response.status===201){
                    Swal.fire({
                       title: 'Profile has been updated!',
                       icon: 'success',
                       toast: true,
                       timer: 3000,
                       position: 'top-right',
                       timerProgressBar: true,
                       showConfirmButton: false 
                    });
                }
                window.location.reload();
                
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
                        <h5 className='card-header'>Profile Setting</h5> 
                        <div className='card-body'> 
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Full Name</label>
                                <div class="col-sm-10">
                                <input name='full_name' value={teacherData.full_name} onChange={handleChange} type="text" readonly class="shadow border border-0 form-control" id="staticEmail" />
                                </div>
                            </div>             
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                <input name='email' value={teacherData.email} onChange={handleChange} type="text" readonly class="shadow border border-0 form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div className='mb-3 row'>
                                <label for="video" className='form-label'>Profile Image</label>
                                <div class="col-sm-10">
                                    <input type="file" name='featured_img' id="featured_img" onChange={handleFileChange}  className='shadow border border-0 form-control' />
                                
                                    {teacherData.prev_img &&
                                        <center><img className='mt-2' src={teacherData.prev_img} width="200" alt={teacherData.full_name} /></center>
                                    }
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Skills</label>
                                <div class="col-sm-10"><textarea name='skills' value={teacherData.skills} onChange={handleChange} className='shadow border border-0 form-control'></textarea>Python, Java, JS, PHP, .Net etc...
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Qualification</label>
                                <div class="col-sm-10"><textarea name='qualification' value={teacherData.qualification} onChange={handleChange} className='shadow border border-0 form-control'></textarea>BCA, MCA, B.Tech, M.tech, Msc.IT etc...
                                </div>
                            </div>

                            <button onClick={submitForm} className='btn btn-dark'>Update</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TeacherProfileSetting;