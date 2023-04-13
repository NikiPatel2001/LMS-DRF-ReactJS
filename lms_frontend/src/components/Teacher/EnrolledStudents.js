import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import TeacherSidebar from './TeacherSidebar';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function EnrolledStudents(){
    useEffect(()=>{
        document.title='Courses';
    });

    const[studentData, setStudentData]=useState([]);
    let{course_id} = useParams();
    // console.log(teacher_id);

    // Fetch course when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/fetch-enrolled-students/'+course_id)
            .then((res)=>{
                setStudentData(res.data);
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
                        <h5 className='card-header'>Enrolled Students</h5>
                        <div className='card-body'>
                            <table className='table table-bordered table-striped'>
                                <thead className='table-dark'>
                                    <tr className='table-dark'>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Interest Area</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentData.map((row, index) =>
                                    <tr className='table-primary'>
                                        <td>{row.student.full_name}</td>
                                        <td>{row.student.email}</td>
                                        <td>{row.student.username}</td>
                                        <td>{row.student.interested_categories}</td>
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

export default EnrolledStudents;