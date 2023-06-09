import {Link} from 'react-router-dom';

function Sidebar(){
    return(
        <div className='card shadow border border-0'>
            <div className='list-group list-group-flush'>
                <Link to='/student-dashboard' className='list-group-item list-group-item-action bg-dark text-white'>Dashboard</Link>
                <Link to='/my-courses' className='list-group-item list-group-item-action'>My Courses</Link>
                <Link to='/favourite-courses' className='list-group-item list-group-item-action'>Favourtie Courses</Link>
                {/* <Link to='/recommended-courses' className='list-group-item list-group-item-action'>Recommended Courses</Link> */}
                <Link to='/profile-setting' className='list-group-item list-group-item-action'>Profile Setting</Link>
                <Link to='/change-password' className='list-group-item list-group-item-action'>Change Password</Link>
                <Link to='/student-logout' className='list-group-item list-group-item-action text-danger'>Logout</Link>
            </div>
        </div>
    )
}

export default Sidebar;