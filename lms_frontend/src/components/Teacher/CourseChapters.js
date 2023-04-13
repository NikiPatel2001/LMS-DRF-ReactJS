import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl='http://127.0.0.1:8000/api';

function CourseChapters(){
    useEffect(()=>{
        document.title='Course Chapters';
    });

    const[chapterData, setChapterData]=useState([]);
    const[totalResult, setTotalResult]=useState(0);
    const {course_id}=useParams();
    // console.log(teacher_id);

    // Fetch course when page load
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/course-chapters/'+course_id)
            .then((res)=>{
                setTotalResult(res.data.length);
                setChapterData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    // delete data
    const handleDeleteClick = (chapter_id) => {
        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to delete this data?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton: true
        }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/chapter/'+chapter_id)
                    .then((res)=>{
                        Swal.fire('Success!','Data has been deleted.');
                        try{
                            axios.get(baseUrl+'/course-chapters/'+course_id)
                            .then((res)=>{
                                setTotalResult(res.data.length);
                                setChapterData(res.data);
                            });
                        }
                        catch(error){
                            console.log(error);
                        }
                    });
                }
                catch(error){
                    Swal.fire('error','Data has not been deleted!!!');
                }
            }
            else{
                Swal.fire('error','Data has not been deleted!!!');
            }
        });
    }

    return(
        <div className='m-4 mt-4'>
            <div className='row'>
                <aside className='col-md-2'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-10'>
                    <div className='card shadow border border-0'>
                        <h5 className='card-header'>All Chapters ({totalResult}) <Link className='btn btn-dark float-end' to={'/add-chapter/'+course_id}>Add Chapter</Link></h5>
                        <div className='card-body'>
                            <table className='table table-bordered table-striped'>
                                <thead className='table-dark'>
                                    <tr className='table-dark'>
                                        <th scope="col">Title</th>
                                        <th scope="col">Video</th>
                                        <th scope="col">Remarks</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chapterData.map((chapter, index) =>
                                    <tr className='table-primary'>
                                        <td><Link to={'/edit-chapter/'+chapter.id}>{chapter.title}</Link></td>
                                        <td>
                                            <video controls width="230">
                                                <source src={chapter.video.url} type="video/mp4"/>
                                            </video>
                                        </td>
                                        <td>{chapter.remarks}</td>
                                        <td>
                                            <Link to={'/edit-chapter/'+chapter.id} className='btn btn-secondary' type='submit'><i class="bi bi-pencil-square"></i> </Link>

                                            <button onClick={()=>handleDeleteClick(chapter.id)} to={"/delete-chapter/"+chapter.id} className='btn btn-secondary ms-2' type='submit'><i class="bi bi-trash-fill"></i></button>
                                        </td>
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

export default CourseChapters;