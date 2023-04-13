import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function TeacherDashboard(){
    useEffect(()=>{
        document.title='Dashboard';
    });

    const [dashboardData, setDashboardData]=useState([]);
    const teacher_id=localStorage.getItem('teacher_id');

    useEffect(()=>{
        // fetch courses
        try{
            axios.get(baseUrl+'/teacher/dashboard/'+teacher_id).then((res)=>{
                console.log(res);
                setDashboardData(res.data);
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
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='card boarder-primary shadow border border-0'>
                                <center>
                                <h5 className='card-header bg-primary text-white'>Total Courses</h5>
                                <div className='card-body'>
                                    <h3><Link to="/teacher-courses">{dashboardData.total_teacher_courses}</Link></h3>
                                </div>
                                </center>
                            </div>
                        </div>
                        
                        <div className='col-md-4'>
                            <div className='card boarder-primary shadow border border-0'>
                                <center>
                                <h5 className='card-header bg-success text-white'>Total Students</h5>
                                <div className='card-body'>
                                    <h3><Link to="/user-list">{dashboardData.total_teacher_students}</Link></h3>
                                </div>
                                </center>
                            </div>
                        </div>

                        <div className='col-md-4'>
                            <div className='card boarder-primary shadow border border-0'>
                                <center>
                                <h5 className='card-header bg-info text-white'>Total Chapters</h5>
                                <div className='card-body'>
                                    <h3><Link to="/teacher-courses">{dashboardData.total_teacher_chapters}</Link></h3>
                                </div>
                                </center>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TeacherDashboard;