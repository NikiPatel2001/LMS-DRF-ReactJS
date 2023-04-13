import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api';

function Header() {
    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus');
    const studentLoginStatus=localStorage.getItem('studentLoginStatus');
    const [pagesData,setpagesData]=useState([]);
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/pages/')
            .then((res)=>{
                setpagesData(res.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fs-1 fw-bolder" to="/"><img src='logo5.png' className="navbar-brand" height="80" /></Link>
                <Link className="navbar-brand fs-1 fw-bolder" to="/">StepUp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link active fs-3" aria-current="page" to="/">Home</Link>
                        {/* {pagesData && pagesData.map((row,index)=>
                             <Link className="nav-link  fs-3" aria-current="page" to={`/page/${row.id}/${row.url}`}>(row.title)</Link>
                        )} */}
                        <Link className="nav-link fs-3" aria-current="page" to="/about-us">AboutUs</Link>
                        <Link className="nav-link fs-3" aria-current="page" to="/contact-us">ContactUs</Link>

                        <Link className="nav-link fs-3" to="/all-courses">Courses</Link>
                        {/* <a className="nav-link fs-3" href="#">Teachers</a> */}
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle fs-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Teacher
                            </a>
                            <ul class="dropdown-menu">
                                {teacherLoginStatus!='true' && 
                                    <>
                                    <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
                                    <li><Link className="dropdown-item" to="/teacher-register">Register</Link></li>
                                    </>
                                }
                                {teacherLoginStatus=='true' && 
                                    <>
                                    <li><Link class="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                                    <li><Link class="dropdown-item" to="/teacher-logout">Logout</Link></li>
                                    </>
                                }
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle fs-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                User
                            </a>
                            <ul class="dropdown-menu">
                                {studentLoginStatus!='true' && 
                                    <>
                                    <li><Link className="dropdown-item" to="/student-login">Login</Link></li>
                                    <li><Link className="dropdown-item" to="/student-register">Register</Link></li>
                                    </>
                                }
                                {studentLoginStatus=='true' && 
                                    <>
                                    <li><Link class="dropdown-item" to="/student-dashboard">Dashboard</Link></li>
                                    <li><Link class="dropdown-item" to="/student-logout">Logout</Link></li>
                                    </>
                                }
                            </ul>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    );
  }
  
  export default Header;
  