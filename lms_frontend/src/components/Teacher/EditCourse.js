import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import TeacherSidebar from './TeacherSidebar';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';
// const courseUrl='http://127.0.0.1:8000/api/course/';
function EditCourse(){
    useEffect(()=>{
        document.title='Add Course';
    });
    const[cats, setCats]=useState([]);
    const[courseData, setCourseData]=useState({
        category:'',
        // 'teacher':'',
        title:'',
        description:'',
        prev_img:'',
        featured_img:'',
        techs:''
    });

    // Fetch categories when page load
    const{course_id}=useParams();
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/category')
            .then((res)=>{
                setCats(res.data);
            });
        }
        catch(error){
            console.log(error);
        }

        // Fetch current course data
        try{
            axios.get(baseUrl+'/teacher-course-detail/'+course_id)
            .then((response)=>{
                setCourseData({
                    category: response.data.category,
                    title: response.data.title,
                    description: response.data.description,
                    prev_img: response.data.featured_img,
                    techs: response.data.techs,
                    featured_img: ''
                });
            });
        }
        catch(error){
            console.log(error);
        }
        // End
    },[]);
    // console.log(cats);

    const handleChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.files[0]
        });
    }

    const formSubmit=()=>{
        const _courseFormData=new FormData();
        _courseFormData.append('category', courseData.category);
        _courseFormData.append('teacher', 1);
        _courseFormData.append('title', courseData.title);
        _courseFormData.append('description', courseData.description);
        if(courseData.featured_img!=''){
            _courseFormData.append('featured_img', courseData.featured_img, courseData.featured_img.name);
        }
        _courseFormData.append('techs', courseData.techs);

        try{
            axios.put(baseUrl+'/teacher-course-detail/'+course_id, _courseFormData).then((response)=>{
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
                window.location.reload();
                // console.log(response.data);
                // window.location.href='/add-course';
                // setCourseData({
                //     'category':'',
                //     // 'teacher':'',
                //     'title':'',
                //     'description':'',
                //     'featured_img':'',
                //     'techs':''
                // });
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
                        <h5 className='card-header'>Edit Course</h5>
                        <div className='card-body'>
                            {/* <form> */}
                                <div className='mb-3'>
                                    <label for="title" className='form-label'>Category</label>
                                    <select name='category' value={courseData.category} onChange={handleChange} className='shadow border border-0 form-control'>
                                        {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option>})}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label for="title" className='form-label'>Title</label>
                                    <input value={courseData.title} type="text" name='title' onChange={handleChange} id="title" className='shadow border border-0 form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label for="description" className='form-label'>Description</label>
                                    <textarea value={courseData.description} name='description' id='description' onChange={handleChange} className='shadow border border-0 form-control'></textarea>
                                </div>
                                <div className='mb-3'>
                                    <label for="video" className='form-label'>Featured Image</label>
                                    <input type="file" name='featured_img' id="featured_img" onChange={handleFileChange}  className='shadow border border-0 form-control' />
                                    {courseData.prev_img &&
                                        <center><img className='mt-2' src={courseData.prev_img} width="200" /></center>
                                    }
                                </div>
                                <div className='mb-3'>
                                    <label for="description" className='form-label'>Technologies</label>
                                    <textarea value={courseData.techs} name='techs' id='techs' className='shadow border border-0 form-control' onChange={handleChange} placeholder='Python, Java, PHP, React JS, etc...'></textarea>
                                </div>
                                <button type='submit' onClick={formSubmit} className='btn btn-dark'>Submit</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default EditCourse;