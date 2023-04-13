import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api/course';
function AllCourses(){
    useEffect(()=>{
        document.title='All Courses';
    });

    const[courseData, setCourseData]=useState([]);

    // console.log(teacher_id);
    // Fetch course when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl)
            .then((res)=>{
                setCourseData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    return(
        <div className='container mt-3'>
            {/* Latest Corses */}
            <h2 className="pb-1 mb-4 fw-bold">Latest Courses</h2>
            <div className="row mb-4">
                {courseData && courseData.map((course, index)=>
                    <div className="col-md-3 mb-4">
                        <div className="card shadow border border-0">
                            <Link to={`/detail/${course.id}`}><img height="300" width="350" src={course.featured_img} className="card-img-top" alt={course.title} /></Link>
                            <div className="card-body">
                            <h5 className="card-title text-center"><Link className='badge badge-pill text-dark bg-light fs-5 btn' to={`/detail/${course.id}`}>{course.title}</Link></h5>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* End Latest Courses */}
        </div>
    )
}

export default AllCourses;