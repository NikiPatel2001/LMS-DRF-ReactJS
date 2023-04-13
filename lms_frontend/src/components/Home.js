import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';
function Home() {
    useEffect(()=>{
        document.title='StepUp | Home';
    });

    const[courseData, setCourseData]=useState([]);
    const[popularCourseData, setPopularCourseData]=useState([]);
    const[popularTeacherData, setPopularTeacherData]=useState([]);
    const[testimonialData, setTestimonialData]=useState([]);
    // console.log(testimonialData);
    // Fetch course when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/course/?result=4')
            .then((res)=>{
                setCourseData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    // Fetch popular course when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/popular-courses/?popular=1')
            .then((res)=>{
                setPopularCourseData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    // Fetch popular teachers when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/popular-teachers/?popular=1')
            .then((res)=>{
                setPopularTeacherData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    // Fetch student testimonial when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/student-testimonial/')
            .then((res)=>{
                setTestimonialData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    return (
        <body class="h-100 bg-light bg-gradient">
            <div id="carouselExampleSlidesOnly" class="shadow-sm m-4 mb-4 carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="/n1.jpg" class="d-block w-100" height="350" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="/n2.jpg" class="d-block w-100" height="350" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="/n3.jpg" class="d-block w-100" height="350" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="/n4.jpg" class="d-block w-100" height="350" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src="/n5.jpg" class="d-block w-100" height="350" alt="..." />
                    </div>
                </div>
            </div>

            <div className='container mt-4'>
                {/* Slider for home page design */}
                    
                {/* End Slider */}
                {/* Latest Corses */}
                    <h2 className="pb-1 mb-4 fw-bold">Latest Courses <Link to="/all-courses" className="float-end btn btn-dark"><h5 className='fw-bold'>See All</h5></Link></h2>
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

                {/* Popular Courses */}
                    <h2 className="pb-1 mb-4 mt-5 fw-bold">Popular Courses <Link to="/popular-courses" className="float-end btn btn-dark"><h5 className='fw-bold'>See All</h5></Link></h2>
                    <div className="row mb-4">
                        {popularCourseData && popularCourseData.map((row, index)=>
                            <div className="col-md-3">
                                <div className="card shadow border border-0">
                                    <Link to={`/detail/${row.course.id}`}><img height="300" width="350" src={row.course.featured_img} className="card-img-top" alt={row.course.title} /></Link>
                                    <div className="card-body">
                                        <h5 className="card-title text-center"><Link className="badge badge-pill text-dark bg-light fs-6 btn" to={`/detail/${row.course.id}`}>{row.course.title}</Link></h5>
                                    </div>
                                    <div className='card-footer bg-dark text-light'>
                                        <div className='title'>
                                            <span className='fw-bold'>Rating: {row.rating}/5</span>
                                            <span className='float-end fw-bold'>Views: {row.course.course_views}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                {/* End Popular Courses */}

                {/* Popular Teachers */}
                    <h2 className="pb-1 mb-4 mt-5 fw-bold">Popular Teachers <Link to="/popular-teachers" className="float-end btn btn-dark"><h5 className='fw-bold'>See All</h5></Link></h2>
                    <div className="row mb-4">
                        {popularTeacherData && popularTeacherData.map((teacher, index)=>
                        <div className="col-md-3">
                            <div className="card shadow border border-0">
                            <Link to={`/teacher-detail/${teacher.id}`}><img height="250" width="350" src={teacher.profile_img} className="card-img-top" alt={teacher.full_name} /></Link>
                                <div className="card-body">
                                    <h5 className="card-title fw-bold text-center">Name: <Link className='text-primary fs-5' to={`/teacher-detail/${teacher.id}`}>{teacher.full_name}</Link></h5>
                                </div>
                                <div className='card-footer bg-dark text-light'>
                                    <div className='title'>
                                        <span className='fw-bold'>Total Courses: {teacher.total_teacher_courses}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                {/* End Popular Teachers */}

                {/* Student Testimonial */}
                    <h2 className="pb-1 mb-4 mt-5">Student Testimonial</h2>
                    <div id="carouselExampleIndicators" className="carousel slide bg-dark text-white py-5" data-bs-ride="true">
                        <div className="carousel-indicators">
                            {testimonialData && testimonialData.map((row, index)=>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? "active":""}></button>
                            )}
                        </div>
                        <div className="carousel-inner">
                            {testimonialData && testimonialData.map((row, i)=>
                            <div className={i===0 ? "carousel-item text-center active": "carousel-item text-center"}>
                                <figure className="text-center">
                                    <blockquote className="blockquote">
                                        <p>{row.reviews}</p>
                                    </blockquote>
                                    <figcaption className="blockquote-footer">
                                        {row.course.title}&nbsp;<cite title="Source Title">{row.student.full_name}</cite>
                                    </figcaption>
                                </figure>
                            </div>
                            )}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                {/* End Student Testimonial */}
            </div>

            <div className='m-4'>
                <center>
                <img src="/i1.jpg" class="rounded mx-auto d-block shadow border border-0" alt="..."/>
                </center>
            </div>
        </body>
        
  );
}

export default Home;
