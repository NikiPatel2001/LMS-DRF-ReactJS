import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const siteUrl='http://127.0.0.1:8000/';
const baseUrl='http://127.0.0.1:8000/api';
function CourseDetail(){
    useEffect(()=>{
        document.title='Course Details';
    });

    const[courseData,setCourseData]=useState([]);
    const[chapterData,setChapterData]=useState([]);
    const[teacherData,setTeacherData]=useState([]);
    const[relatedcourseData,setRelatedCourseData]=useState([]);
    const[techListData,setTechListData]=useState([]);
    const[userLoginStatus, setUserLoginStatus]=useState();
    const[enrollStatus, setEnrollStatus]=useState();
    const[ratingStatus, setRatingStatus]=useState();
    const[avgRating, setAvgRating]=useState(0);
    const[favouriteStatus, setFavouriteStatus]=useState();
    const[courseViews, setCourseViews]=useState([]);
    let{course_id} = useParams();
    const student_id=localStorage.getItem('student_id');

    // Fetch course when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/course/'+course_id).then((res)=>{
                console.log(res);
                setCourseData(res.data);
                setChapterData(res.data.course_chapters);
                setTeacherData(res.data.teacher);
                // setRelatedCourseData(JSON.parse(res.data.related_videos));
                setTechListData(res.data.tech_list);
                if(res.data.course_rating!='' && res.data.course_rating!=null){
                    setAvgRating(res.data.course_rating);
                }
            });

            // update view
            axios.get(baseUrl+'/update-view/'+course_id).then((res)=>{
                setCourseViews(res.data.views);
            })
        }
        catch(error){
            console.log(error);
        }

        // fetch fetch enroll status
        try{
            axios.get(baseUrl+'/fetch-enroll-status/'+student_id+'/'+course_id).then((res)=>{
                if(res.data.bool==true){
                    setRatingStatus('success');
                }
            });
        }
        catch(error){
            console.log(error);
        }

        // fetch rating status
        try{
            axios.get(baseUrl+'/fetch-rating-status/'+student_id+'/'+course_id).then((res)=>{
                if(res.data.bool==true){
                    setEnrollStatus('success');
                }
            });
        }
        catch(error){
            console.log(error);
        }

        // fetch favourite status
        try{
            axios.get(baseUrl+'/fetch-favourite-status/'+student_id+'/'+course_id).then((res)=>{
                if(res.data.bool==true){
                    setFavouriteStatus('success');
                }
                else{
                    setEnrollStatus('');
                }
            });
        }
        catch(error){
            console.log(error);
        }

        const studentLoginStatus=localStorage.getItem('studentLoginStatus');
        if(studentLoginStatus=='true'){
            setUserLoginStatus('success');
        }
    },[]);

    // enroll in the course
    const enrollCourse = ()=>{
        const courseFormData=new FormData();
        courseFormData.append('course', course_id);
        courseFormData.append('student', student_id);

        try{
            axios.post(baseUrl+'/student-enroll-course/', courseFormData).then((response)=>{
                if(response.status==200 || response.status==201){
                    Swal.fire({
                        title: 'You have enrolled successfully in this course!',
                        icon: 'success',
                        toast: true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar: true,
                        showConfirmButton:false
                    });
                    setEnrollStatus('success');
                }
            });
        }
        catch(error){
            console.log(error);
        }
    }

    // mark favourite course with heart icon
    const markasFavourite=()=>{
        const _favFormData = new FormData();
        _favFormData.append('course', course_id);
        _favFormData.append('student', student_id);
        _favFormData.append('status', true);
        try{
            axios.post(baseUrl+'/student-add-favourite-course/', _favFormData).then((res)=>{
                if(res.status==200 || res.status==201){
                    Swal.fire({
                        title: 'Course Added To Favourite List!',
                        icon: 'success',
                        toast: true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar: true,
                        showConfirmButton:false
                    });
                    // setEnrollStatus('success');
                }
                setEnrollStatus('success');
                window.location.reload();
            })
        }
        catch(error){
            console.log(error);
        }
    }
    // end

    // remove favourite course with heart icon
    const removeFavourite=()=>{
        const _favFormData = new FormData();
        _favFormData.append('course', course_id);
        _favFormData.append('student', student_id);
        _favFormData.append('status', true);
        try{
            axios.post(baseUrl+'/student-remove-favourite-course/'+course_id+'/'+student_id, _favFormData).then((res)=>{
                if(res.status==200 || res.status==201){
                    Swal.fire({
                        title: 'Course Removed From Favourite List!',
                        icon: 'success',
                        toast: true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar: true,
                        showConfirmButton:false
                    });
                }
                setEnrollStatus('');
                window.location.reload();
            })
        }
        catch(error){
            console.log(error);
        }
    }
    // end

    // add rating 
    const[ratingData, setRatingData]=useState({
        rating:'',
        reviews:''
    });

    const handleChange=(event)=>{
        setRatingData({
            ...ratingData,
            [event.target.name]:event.target.value
        });
    }

    const formSubmit=()=>{
        const _formData=new FormData();
        _formData.append('course', course_id);
        _formData.append('student', student_id);
        _formData.append('rating', ratingData.rating);
        _formData.append('reviews', ratingData.reviews);

        try{
            axios.post(baseUrl+'/course-rating/', _formData).then((response)=>{
                if(response.status===200 || response.status===201){
                    Swal.fire({
                       title: 'You Rated Successfully!',
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
            console.log(error);
        }
    }

    return(
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-4'>
                    <img src={courseData.featured_img} className="img-thumbnail" alt={courseData.title} />
                </div>

                <div className='col-8'>
                    <h3>{courseData.title}</h3>
                    <p>{courseData.description}</p>
                    <p className='fw-bold'>Course By: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
                    <p className='fw-bold'>Techs: &nbsp; 
                        {techListData.map((tech, index)=>
                            <>
                                <Link className='badge badge-pill text-dark bg-warning ms-2' to={`/category/${tech.trim()}`}>{tech.trim()}</Link>
                            </>
                        )}
                    </p>
                    <p className='fw-bold'>Duration: 3 Hours 30 Minutes</p>
                    <p className='fw-bold'>Total Enrolled: {courseData.total_enrolled_students} Student(s)</p>
                    <p className='fw-bold'>
                        Views: {courseViews}
                    </p>
                    <p className='fw-bold'>
                        Rating: {avgRating}/5
                        {
                            enrollStatus=='success' && userLoginStatus=='success' && 
                            <>
                            {
                                ratingStatus!='success' &&
                                <button className='btn btn-success ms-2' data-bs-toggle="modal" data-bs-target="#ratingModal">Rating</button>
                            }
                            {
                                ratingStatus=='success' &&
                                <small className='badge text-dark bg-light ms-2'>You already rated this course!</small>
                            }

                            <div className="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Rate For {courseData.title}</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className='mb-3'>
                                                <label className='form-label'>Rating</label>
                                                <select onChange={handleChange} className='form-control' name='rating'>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                            <div className='mb-3'>
                                                <label className='form-label'>Review</label>
                                                <textarea onChange={handleChange} className='form-control' name='reviews' rows='5'></textarea>
                                            </div>
                                            <button type='button' onClick={formSubmit} className='btn btn-dark'>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            </>
                        }  
                    </p>
                    {
                        enrollStatus=='success' && userLoginStatus=='success' &&
                        <p><span>You are already enrolled in this course!</span></p>  
                    }    
                    {
                        userLoginStatus=='success' && enrollStatus!='success' &&
                        <p><button onClick={enrollCourse} type="button" className='btn btn-success '>Enroll In The Course</button></p>  
                    }
                    {
                        userLoginStatus=='success' && favouriteStatus != 'success' &&
                        <p><button title='Add To Your Favourie Course' onClick={markasFavourite} type="button" className='btn btn-outline-danger '><i className='bi bi-heart-fill'></i></button></p>  
                    }
                    {
                        userLoginStatus=='success' && favouriteStatus == 'success' &&
                        <p><button title='Remove From Your Favourie Course' onClick={removeFavourite} type="button" className='btn btn-danger '><i className='bi bi-heart-fill'></i></button></p>  
                    }  
                    {
                        userLoginStatus!=='success' &&
                        <p><Link to="/student-login" className='btn btn-success'>Login To Enroll In Course</Link></p>  
                    }
                                 
                </div>
            </div>
            {/* Course Videos */}
            { enrollStatus=='success' && userLoginStatus=='success' &&
                <div className="card mt-4">
                    <div className="card-header">
                        <h4>Course Chapters</h4>
                    </div>
                    <ul className="list-group list-group-flush" >
                        {chapterData.map((chapter, index) =>
                            <li className="list-group-item" key={chapter.id}>{chapter.title} 
                                <span className='float-end'>
                                    <span className='me-5'>{chapter.chapter_duration}</span>
                                    <button type='button' className='btn btn-sm btn-danger' data-bs-toggle="modal" data-bs-target="#videoModal1"><i className='bi bi-youtube'> Watch</i></button>
                                </span>
                                {/* Video Modal Start */}
                                <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Video 1</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className='ratio ratio-16x9'>
                                                    <iframe src={chapter.video} title={chapter.title} allowFullScreen></iframe>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Video Modal End */}
                            </li>
                        )}
                    </ul>
                </div>
            }
            {/* <h2 className="pb-1 mt-4 mb-4">Related Courses</h2>
            <div className="row mb-4">
                {relatedcourseData.map((rcourse,index) => 
                    <div className="col-md-3">
                        <div className="card">
                            <Link target="__blank" to={`/detail/${rcourse.pk}`}><img src={`${siteUrl}media/${rcourse.fields.featured_img}`} className="card-img-top" alt={rcourse.fields.title} /></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link></h5>
                            </div>
                        </div>
                    </div>
                )}
            </div> */}
        </div>
    );
}

export default CourseDetail;