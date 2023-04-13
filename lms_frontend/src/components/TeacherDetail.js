import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function TeacherDetail(){
    useEffect(()=>{
        document.title='Teacher Detail';
    });

    const[teacherData,setTeacherData]=useState([]);
    const[courseData,setCourseData]=useState([]);
    const[skillList,setSkillList]=useState([]);
    let{teacher_id} = useParams();

    // Fetch course when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/teacher/'+teacher_id).then((res)=>{
                console.log(res);
                setTeacherData(res.data);
                setCourseData(res.data.teacher_courses);
                setSkillList(res.data.skill);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    return(
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-4'>
                    <img src={teacherData.profile_img} className="img-thumbnail" alt="Teacher Image" />
                </div>

                <div className='col-8'>
                    <h3>{teacherData.full_name}</h3>
                    <p>{teacherData.detail}</p>
                    <p className='fw-bold'>Skills: 
                        {skillList.map((skill, index)=>
                            <>
                                <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`} className="badge badge-pill text-dark bg-warning ms-2">{skill.trim()}</Link>
                            </>
                        )}
                    </p>
                    <p className='fw-bold'>Qualification: {teacherData.qualification}</p>
                    <p className='fw-bold'>Total Courses: {teacherData.total_teacher_courses}</p>   
                    <p className='fw-bold'>Contact: {teacherData.email}</p>                 
                </div>
            </div>
            {/* Course List */}
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Course List</h4>
                </div>
                <div className="list-group list-group-flush">
                    {courseData.map((course, index)=>
                        <Link to={`/detail/${course.id}`} className='list-group-item list-group-item-action'>{course.title}</Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TeacherDetail;