import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';
const courseUrl='http://127.0.0.1:8000/api/course/';
function AddCourse(){
    useEffect(()=>{
        document.title='Add Course';
    });
    const[cats, setCats]=useState([]);
    const[courseData, setCourseData]=useState({
        'category':'',
        // 'teacher':'',
        'title':'',
        'description':'',
        'featured_img':'',
        'techs':''
    });

    // Fetch categories when page load
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
        const teacher_id=localStorage.getItem('teacher_id');
        const courseFormData=new FormData();
        courseFormData.append('category', courseData.category);
        courseFormData.append('teacher', teacher_id);
        courseFormData.append('title', courseData.title);
        courseFormData.append('description', courseData.description);
        courseFormData.append('featured_img', courseData.featured_img, courseData.featured_img.name);
        courseFormData.append('techs', courseData.techs);

        try{
            axios.post(courseUrl, courseFormData).then((response)=>{
                // console.log(response.data);
                window.location.href='/add-course';
                setCourseData({
                    'category':'',
                    // 'teacher':'',
                    'title':'',
                    'description':'',
                    'featured_img':'',
                    'techs':''
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
                        <h5 className='card-header'>Add Course</h5>
                        <div className='card-body'>
                            {/* <form> */}
                                <div className='mb-3'>
                                    <label for="title" className='form-label'>Category</label>
                                    <select name='category' onChange={handleChange} className='shadow border border-0 form-control'>
                                        {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option>})}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label for="title" className='form-label'>Title</label>
                                    <input type="text" name='title' onChange={handleChange} id="title" className='shadow border border-0 form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label for="description" className='form-label'>Description</label>
                                    <textarea name='description' id='description' onChange={handleChange} className='shadow border border-0 form-control'></textarea>
                                </div>
                                <div className='mb-3'>
                                    <label for="video" className='form-label'>Featured Image</label>
                                    <input type="file" name='featured_img' id="featured_img" onChange={handleFileChange}  className='shadow border border-0 form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label for="description" className='form-label'>Technologies</label>
                                    <textarea name='techs' id='techs' className='shadow border border-0 form-control' onChange={handleChange} placeholder='Python, Java, PHP, React JS, etc...'></textarea>
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

export default AddCourse;