import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';
function PopularTeachers(){
    useEffect(()=>{
        document.title='Popular Teacher';
    });

    const[popularTeacherData, setPopularTeacherData]=useState([]);
    const[teacher, setTeacher]=useState(null); // this line means our teacher data is by default null we will set data
    useEffect(()=>{
        // console.log('component loaded....');
        axios.get(baseUrl+'/teacher/').then((response)=>{
            // console.log(response.data);
            setTeacher(response.data);
        });
    },[]);

    // fetch popular teachers
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
    console.log(teacher);
    return(
        <div className='container mt-3'>
            {/* Latest Corses */}
            <h2 className="pb-1 mb-4 mt-5 fw-bold">Popular Teachers <Link to="/popular-teachers" className="float-end btn btn-dark"><h5 className='fw-bold'>See All</h5></Link></h2>
            <div className="row mb-4">
                {popularTeacherData && popularTeacherData.map((teacher, index)=>
                <div className="col-md-3">
                    <div className="card">
                    <Link to={`/teacher-detail/${teacher.id}`}><img height="250" width="350" src={teacher.profile_img} className="card-img-top" alt={teacher.full_name} /></Link>
                        <div className="card-body">
                            <h5 className="card-title">Name: <Link to={`/teacher-detail/${teacher.id}`}>{teacher.full_name}</Link></h5>
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

export default PopularTeachers;