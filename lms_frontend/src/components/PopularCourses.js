import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';
function PopularCourses(){
    useEffect(()=>{
        document.title='Popular Courses';
    });

    const[courseData, setCourseData]=useState([]);

     // Fetch course when page load
     useEffect(()=>{
        try{
            axios.get(baseUrl+'/popular-courses/?all=1')
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
            <h2 className="pb-1 mb-4">Popular Courses</h2>
            <div className="row mb-4">
                {courseData && courseData.map((row, index)=>
                    <div className="col-md-3 mb-4">
                        <div className="card shadow border border-0">
                            <Link to={`/detail/${row.course.id}`}><img height="300" width="350" src={row.course.featured_img} className="card-img-top" alt={row.course.title} /></Link>
                            <div className="card-body">
                                <h5 className="card-title text-center"><Link className='badge badge-pill text-dark bg-light fs-6 btn' to={`/detail/${row.course.id}`}>{row.course.title}</Link></h5>
                            </div>
                            <div className='card-footer bg-dark text-light'>
                                <div className='title'>
                                    <span>Rating: {row.rating}/5</span>
                                    <span className='float-end'>Views: {row.course.course_views}</span>
                                </div>
                            </div>
                        </div>
                    </div>    
                )}
            </div>
            {/* End Latest Courses */}
            {/* Pagination Start */}
            {/* <nav aria-label='Page navigation example mt-5'>
                <ul className='pagination justify-content-center'>
                    <li className='page-item'><a className='page-link' href='#'>Previous</a></li>
                    <li className='page-item'><a className='page-link' href='#'>1</a></li>
                    <li className='page-item'><a className='page-link' href='#'>2</a></li>
                    <li className='page-item'><a className='page-link' href='#'>3</a></li>
                    <li className='page-item'><a className='page-link' href='#'>Next</a></li>
                </ul>
            </nav> */}
            {/* Pagination End */}
        </div>
    )
}

export default PopularCourses;