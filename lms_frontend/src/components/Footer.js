import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-dark text-center text-white mt-3">
            {/* <!-- Grid container --> */}
            <div className="container p-4 pb-0">
                {/* <!-- Section: Social media --> */}
                <section className="mb-4">
                    {/* <!-- Facebook --> */}
                    <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com" role="button"><i className="bi bi-facebook"></i></a>

                    {/* <!-- Youtube --> */}
                    <a className="btn btn-outline-light btn-floating m-1" href="https://www.youtube.com/@patelniki" role="button"><i className="bi bi-youtube"></i></a>

                    {/* <!-- Google --> */}
                    <a className="btn btn-outline-light btn-floating m-1" href="https://www.google.com/" role="button"><i className="bi bi-google"></i></a>

                    {/* <!-- Instagram --> */}
                    <a className="btn btn-outline-light btn-floating m-1" href="https://instagram.com/code_helper_85?igshid=YmMyMTA2M2Y" role="button"><i className="bi bi-instagram"></i></a>

                    {/* <!-- Linkedin --> */}
                    <a className="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/in/niki-patel-01a612212/" role="button"><i className="bi bi-linkedin"></i></a>

                    {/* <!-- Github --> */}
                    <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/NikiPatel2001" role="button"><i className="bi bi-github"></i></a>
                </section>
                {/* <!-- Section: Social media --> */}
            </div>
            {/* <!-- Grid container --> */}

            {/* <!-- Copyright --> */}
            <div className="text-center p-3 fs-5" >
                © 2022 Copyright: StepUp | For Your Career
            </div>
            {/* <!-- Copyright --> */}
        </footer>      
    )
};   

export default Footer;
  