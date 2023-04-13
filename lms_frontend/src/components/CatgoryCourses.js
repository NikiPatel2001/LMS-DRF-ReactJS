import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const baseUrl='http://127.0.0.1:8000/api';
function CatgoryCourses(){
    useEffect(()=>{
        document.title='Course Category';
    });

    const[courseData, setCourseData]=useState([]);
    const{category_slug} = useParams();
    // Fetch course when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/course/?category='+category_slug)
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
            <h2 className="pb-1 mb-4">{category_slug}</h2>
            <div className="row mb-4">
                {courseData && courseData.map((course, index)=>
                    <div className="col-md-3 mb-4">
                        <div className="card shadow border border-0">
                            <Link to={`/detail/${course.id}`}><img height="300" width="350" src={course.featured_img} className="card-img-top" alt={course.title} /></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
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

export default CatgoryCourses;