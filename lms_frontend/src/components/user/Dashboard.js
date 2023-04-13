import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function Dashboard(){
    useEffect(()=>{
        document.title='Student-Dashboard';
    });

    const [dashboardData, setDashboardData]=useState([]);
    const student_id=localStorage.getItem('student_id');

    useEffect(()=>{
        // fetch courses
        try{
            axios.get(baseUrl+'/student/dashboard/'+student_id).then((res)=>{
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
                    <Sidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='card boarder-primary shadow border border-0'>
                                <center>
                                <h5 className='card-header bg-primary text-white'>Enrolled Courses</h5>
                                <div className='card-body'>
                                    <h3><Link to="/my-courses">{dashboardData.enrolled_courses}</Link></h3>
                                </div>
                                </center>
                            </div>
                        </div>
                        
                        <div className='col-md-6'>
                            <div className='card boarder-primary shadow border border-0'>
                                <center>
                                <h5 className='card-header bg-success text-white'>Favourite Courses</h5>
                                <div className='card-body'>
                                    <h3><Link to="/favourite-courses">{dashboardData.favourite_courses}</Link></h3>
                                </div>
                                </center>
                            </div>
                        </div>

                        {/* <div className='col-md-4'>
                            <div className='card boarder-primary'>
                                <center>
                                <h5 className='card-header bg-info text-white'>Total Chapters</h5>
                                <div className='card-body'>
                                    <h3><Link to="/teacher-courses">{dashboardData.total_teacher_chapters}</Link></h3>
                                </div>
                                </center>
                            </div>
                        </div> */}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Dashboard;