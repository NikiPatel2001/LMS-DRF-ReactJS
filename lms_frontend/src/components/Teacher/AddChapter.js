import {Link} from 'react-router-dom';
import {useEffect, useState, } from 'react';
import TeacherSidebar from './TeacherSidebar';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
const chapterUrl='http://127.0.0.1:8000/api/chapter/';
function AddChapter(){
    // let{course_id} = useParams();

    useEffect(()=>{
        document.title='Add Chapter';
    });

    const[chapterData, setChapterData]=useState({
        'title':'',
        'description':'',
        'video':'',
        'remarks':''
    });

    // const[videoDuration, setVideoDuration]=useState();

    const handleChange=(event)=>{
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=>{
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.files[0]
        });
    }

    let {course_id}=useParams();

    const formSubmit=()=>{
        const chapterFormData=new FormData();
        chapterFormData.append('course', course_id);
        chapterFormData.append('title', chapterData.title);
        chapterFormData.append('description', chapterData.description);
        chapterFormData.append('video', chapterData.video, chapterData.video.name);
        // chapterFormData.append('video_duration', videoDuration)
        chapterFormData.append('remarks', chapterData.remarks);

        try{
            axios.post(chapterUrl , chapterFormData).then((response)=>{
                window.location.href='/add-chapter/'+course_id;
                setChapterData({
                    // 'course':'',
                    // 'teacher':'',
                    'title':'',
                    'description':'',
                    'video':'',
                    'remarks':''
                });

                if(response.status===200 || response.status===201){
                    Swal.fire({
                       title: 'Data has been added',
                       icon: 'success',
                       toast: true,
                       timer: 10000,
                       position: 'top-right',
                       timerProgressBar: true,
                       showConfirmButton: false 
                    });
                }
                // console.log(response.data);
            });
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside> 
                <div className='col-9'>
                    <div className='card shadow border border-0'>
                        <h5 className='card-header'>Add Chapter</h5>
                        <div className='card-body'>
                            {/* <form> */}
                                <div className='mb-3'>
                                    <label for="title" className='form-label'>Title</label>
                                    <input type="text" name='title' onChange={handleChange} id="title" className='shadow border border-0 form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label for="description" className='form-label'>Description</label>
                                    <textarea className='shadow border border-0 form-control' name='description' onChange={handleChange} id="description"></textarea>
                                </div>
                                <div className='mb-3'>
                                    <label for="video" className='form-label'>Video</label>
                                    <input type="file" name='video' onChange={handleFileChange} id="video" className='shadow border border-0 form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label for="description" className='form-label'>Remarks</label>
                                    <textarea name='remarks' onChange={handleChange} className='shadow border border-0 form-control' placeholder='This video is focused on basic introduction.'></textarea>
                                </div>
                                <button type='button' onClick={formSubmit} className='btn btn-dark'>Submit</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default AddChapter;