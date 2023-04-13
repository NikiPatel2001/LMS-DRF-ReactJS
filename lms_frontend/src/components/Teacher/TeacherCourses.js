import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function TeacherCourses(){
    useEffect(()=>{
        document.title='Courses';
    });

    const[courseData, setCourseData]=useState([]);
    const teacher_id=localStorage.getItem('teacher_id');
    // console.log(teacher_id);

    // Fetch course when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/teacher-courses/'+teacher_id)
            .then((res)=>{
                setCourseData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);
    // console.log(courseData);
    
    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card shadow border border-0'>
                        <h5 className='card-header'>My Courses</h5>
                        <div className='card-body'>
                            <table className='table table-bordered table-striped '>
                                <thead className='table-dark '>
                                    <tr className='table-dark'>
                                        <th scope="col">Name</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Total Enrolled</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseData.map((course, index) =>
                                    <tr className='table-primary'>
                                        <td>
                                            <Link to={"/all-chapters/"+course.id}>{course.title}</Link>
                                            <hr />
                                            {course.course_rating &&
                                                <span>Rating: {course.course_rating}/5 </span>
                                            }
                                            {!course.course_rating &&
                                                <span>Rating: 0/5 </span>
                                            }   
                                        </td>
                                        <td><img src={course.featured_img} width="80" className='rounded' alt={course.title} /></td>
                                        <td><Link to={'/enrolled-students/'+course.id} >{course.total_enrolled_students}</Link></td>
                                        <td>
                                            <Link to={"/edit-course/"+course.id} className='btn btn-secondary'>Edit </Link>
                                            <Link to={"/add-chapter/"+course.id} className='btn btn-secondary ms-2'>Add Chapter</Link>
                                            <button className='btn btn-secondary ms-2' type='submit'>Delete</button>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TeacherCourses;