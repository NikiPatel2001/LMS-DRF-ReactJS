import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function RecommendedCourses(){
    useEffect(()=>{
        document.title='Recommended Courses';
    });

    const[courseData, setCourseData]=useState([]);
    const studentId=localStorage.getItem('student_id');

    // Fetch students when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/fetch-recommended-courses/'+studentId)
            .then((res)=>{
                setCourseData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    return(
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <Sidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Recommended Courses</h5>
                        <div className='card-body'>
                            <table className='table table-bordered table-striped'>
                                <thead className='table-dark'>
                                    <tr className='table-dark'>
                                        <th scope="col">Name</th>
                                        <th scope="col">Technologies</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseData.map((row,index) =>
                                        <tr className='table-primary'>
                                            <td><Link to={"/detail/"+row.course.id}>{row.course.title}</Link></td>
                                            <td>{row.course.techs}</td>
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

export default RecommendedCourses;