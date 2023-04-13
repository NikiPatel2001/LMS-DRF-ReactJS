import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import About from './About';
import CourseDetail from './CourseDetail';
import Page from './Page';
import ContactUs from './ContactUs';
import {Routes as Switch, Route} from 'react-router-dom'; 
// Users import
import Login from './user/Login';
import Register from './user/Register';
import Dashboard from './user/Dashboard';
import FavouriteCourses from './user/FavouriteCourses';
import RecommendedCourses from './user/RecommendedCourses';
import MyCourses from './user/MyCourses';
import ProfileSetting from './user/ProfileSetting';
import ChangePassword from './user/ChangePassword';
// Teachers import
import TeacherLogin from './Teacher/TeacherLogin';
import TeacherRegister from './Teacher/TeacherRegister';
import TeacherDashboard from './Teacher/TeacherDashboard';
import AddCourse from './Teacher/AddCourse';
import TeacherCourses from './Teacher/TeacherCourses';
import TeacherChangePassword from './Teacher/TeacherChangePassword';
import TeacherProfileSetting from './Teacher/TeacherProfileSetting';
import UserList from './Teacher/UserList';
import TeacherDetail from './TeacherDetail';
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import PopularTeachers from './PopularTeachers';
import CatgoryCourses from './CatgoryCourses';
import TeacherLogout from './Teacher/TeacherLogout';
import AddChapter from './Teacher/AddChapter';
import CourseChapters from './Teacher/CourseChapters';
import EditChapter from './Teacher/EditChapter';
import EditCourse from './Teacher/EditCourse';
import TeacherSkillCourses from './TeacherSkillCourses';
import StudentLogout from './user/StudentLogout';
import EnrolledStudents from './Teacher/EnrolledStudents';

function Main() {
  return (
    <div className="App">
        <Header />
        <Switch>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/detail/:course_id' element={<CourseDetail />} />
            <Route path='/student-login' element={<Login />} />
            <Route path='/student-register' element={<Register />} />
            <Route path='/student-dashboard' element={<Dashboard />} />
            <Route path='/my-courses' element={<MyCourses />} />
            <Route path='/favourite-courses' element={<FavouriteCourses />} />
            <Route path='/recommended-courses' element={<RecommendedCourses />} />
            <Route path='/profile-setting' element={<ProfileSetting />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/teacher-login' element={<TeacherLogin />} />
            <Route path='/teacher-register' element={<TeacherRegister />} />
            <Route path='/teacher-dashboard' element={<TeacherDashboard />} />
            <Route path='/add-course' element={<AddCourse />} />
            <Route path='/teacher-courses' element={<TeacherCourses />} />
            <Route path='/enrolled-students/:course_id' element={<EnrolledStudents />} />
            <Route path='/teacher-profile-setting' element={<TeacherProfileSetting />} />
            <Route path='/teacher-change-password' element={<TeacherChangePassword />} />
            <Route path='/user-list' element={<UserList />} />
            <Route path='/teacher-detail/:teacher_id' element={<TeacherDetail />} />
            <Route path='/all-courses' element={<AllCourses />} />
            <Route path='/edit-chapter/:chapter_id' element={<EditChapter />} />
            <Route path='/edit-course/:course_id' element={<EditCourse />} />
            <Route path='/all-chapters/:course_id' element={<CourseChapters />} />
            <Route path='/popular-courses' element={<PopularCourses />} />
            <Route path='/popular-teachers' element={<PopularTeachers />} />
            <Route path='/category/:category_slug' element={<CatgoryCourses />} />
            <Route path='/teacher-logout' element={<TeacherLogout />} />
            <Route path='/student-logout' element={<StudentLogout />} />
            <Route path='/add-chapter/:course_id' element={<AddChapter />} />
            <Route path='/teacher-skill-courses/:skill_name/:teacher_id' element={<TeacherSkillCourses />} />
            <Route path='/about-us' element={<Page />}/>
            <Route path='/contact-us' element={<ContactUs />}/>
        </Switch>
        <Footer />
    </div>
  );
}

export default Main;
