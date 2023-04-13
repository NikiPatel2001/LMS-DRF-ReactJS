import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
function EditChapter(){

    useEffect(()=>{
        document.title='Edit Chapter';
    });

    const[chapterData,setChapterData]=useState({
        course:'',
        title:'',
        description:'',
        prev_video:'',
        video:'',
        remarks:''
    });

    const{chapter_id}=useParams();
    // Fetch chapter data when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/chapter/'+chapter_id)
            .then((response)=>{
                setChapterData({
                    course: response.data.course,
                    title: response.data.title,
                    description: response.data.description,
                    prev_video: response.data.video,
                    remarks: response.data.remarks,
                    video: ''
                });
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

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

    const formSubmit=()=>{
        const _chapterFormData=new FormData();
        _chapterFormData.append('course', chapterData.course);
        _chapterFormData.append('title', chapterData.title);
        _chapterFormData.append('description', chapterData.description);
        if(chapterData.video!=''){
            _chapterFormData.append('video', chapterData.video, chapterData.video.name);
        }
        _chapterFormData.append('remarks', chapterData.remarks);

        try{
            axios.put(baseUrl+'/chapter/'+chapter_id, _chapterFormData).then((response)=>{
                if(response.status==200){
                    Swal.fire({
                        title: 'Data has been updated',
                        icon: 'success',
                        toast: true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar: true,
                        showConfirmButton:false
                    });
                }
                // console.log(response);
                // window.location.href='/edit-chapter/1';
                setChapterData({
                    // 'course':'',
                    // 'teacher':'',
                    'title':'',
                    'description':'',
                    'video':'',
                    'remarks':''
                });
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
                        <h5 className='card-header'>Edit Chapter</h5>
                        <div className='card-body'>
                            <form>
                                <div className='mb-3'>
                                    <label for="title" className='form-label'>Title</label>
                                    <input type="text" value={chapterData.title} name='title' onChange={handleChange} id="title" className='shadow border border-0 form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label for="description" className='form-label'>Description</label>
                                    <textarea className='shadow border border-0 form-control' value={chapterData.description} name='description' onChange={handleChange} id="description"></textarea>
                                </div>
                                <div className='mb-3'>
                                    <label for="video" className='form-label'>Video</label>
                                    <input type="file" name='video' onChange={handleFileChange} id="video" className='shadow border border-0 form-control' />
                                    {chapterData.prev_video &&
                                        <video controls width="100%" height="242" className='mt-2'>
                                            <source src={chapterData.prev_video} type="video/mp4"/>
                                        </video>
                                    }
                                </div>
                                <div className='mb-3'>
                                    <label for="description" className='form-label'>Remarks</label>
                                    <textarea value={chapterData.remarks} name='remarks' onChange={handleChange} className='shadow border border-0 form-control' placeholder='This video is focused on basic introduction.'></textarea>
                                </div>
                                <button type='button' onClick={formSubmit} className='btn btn-dark'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default EditChapter;