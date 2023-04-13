import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';

function ProfileSetting(){
    useEffect(()=>{
        document.title='Student Profile Setting';
    });

    const[studentData, setStudentData]=useState({
        'full_name':'',
        'email':'',
        'username':'',
        'interested_categories':'',
        'prev_img':'',
        'profile_img':'',
        'status':''
    });
    const student_id=localStorage.getItem('student_id');
    useEffect(()=>{
        // Fetch current teacher data
        try{
            axios.get(baseUrl+'/student/'+student_id)
            .then((response)=>{
                setStudentData({
                    full_name: response.data.full_name,
                    email: response.data.email,
                    username: response.data.username,
                    interested_categories: response.data.interested_categories,
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
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=>{
        setStudentData({
            ...studentData,
            [event.target.name]:event.target.files[0]
        });
    }

    // submit form
    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append('full_name', studentData.full_name)
        studentFormData.append('email', studentData.email)
        studentFormData.append('username', studentData.username)
        studentFormData.append('interested_categories', studentData.interested_categories)
        if(studentData.profile_img!=''){
            studentFormData.append('profile_img', studentData.profile_img, studentData.profile_img.name);
        }

        try{
            axios.put(baseUrl+'/student/'+student_id+'/', studentFormData).then((response)=>{
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
                        <h5 className='card-header'>Profile Setting</h5> 
                        <div className='card-body'> 
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Full Name</label>
                                <div class="col-sm-10">
                                <input name='full_name' value={studentData.full_name} onChange={handleChange} type="text" readonly class="shadow border border-0 form-control" id="staticEmail" />
                                </div>
                            </div>             
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                <input name='email' value={studentData.email} onChange={handleChange} type="text" readonly class="shadow border border-0 form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Username</label>
                                <div class="col-sm-10">
                                <input name='username' value={studentData.username} onChange={handleChange} type="text" readonly class="shadow border border-0 form-control" id="staticEmail" />
                                </div>
                            </div>  
                            <div className='mb-3 row'>
                                <label for="video" className='form-label'>Profile Image</label>
                                <div class="col-sm-10">
                                    <input type="file" name='profile_img' id="video" onChange={handleFileChange}  className='shadow border border-0 form-control' />
                                    
                                    {studentData.prev_img &&
                                        <center><img className='mt-2' src={studentData.prev_img} width="200" alt={studentData.full_name} /></center>
                                    }
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Interest Area</label>
                                <div class="col-sm-10"><textarea name='interested_categories' value={studentData.interested_categories} onChange={handleChange} className='shadow border border-0 form-control'></textarea>Python, Java, JS, PHP, .Net etc...
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

export default ProfileSetting;