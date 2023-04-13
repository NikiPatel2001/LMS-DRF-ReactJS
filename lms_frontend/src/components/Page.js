import axios from 'axios';
import {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

const baseUrl='http://127.0.0.1:8000/api';

function Page(){
    return(
        <body className="d-flex h-100 text-center text-white bg-white mt-4">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <main className="px-3 shadow">
                    <h1 className='text-dark mt-4'>Who We Are? & What For We Are?</h1>
                    <p className="fs-4 text-muted text-dark">We are all very different. We were born in different cities, at different times, we love different music, food, movies. But we have something that unites us all. It is our company. We are its heart. We are not just a team, we are a family.</p>
                    <h1 className='text-dark mt-4'>Our Thoughts</h1>
                    <p className="fs-4 text-muted text-dark">“It’s time to step up to the plate and get passionate about your work commit to making eLearning courses that don't bore people to tears, but instead inspire and motivate them to learn a new skill, change a certain behavior, or improve their performance.”</p>
                    <p className="fs-4 text-muted text-dark">“eLearning is changing. And, we will see new models, new technologies and designs emerge. So, let’s drop the “e” – or at least give it a new and wider definition.”</p>
                    <p className="lead">
                        <Link to="/contact-us" className="btn btn-lg mb-4 btn-secondary text-light fw-bold border-0 shadow bg-dark">Contact Us</Link>
                    </p>
                </main>
                <center>
                <div className="container row mt-4 row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div className="col">
                        <div className="card shadow border border-0">
                            <img className="bd-placeholder-img card-img-top" width="100" height="225" src='/s1.jpg' role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" />
                            <div className="card-body">
                                <h4 className='fw-bold text-dark'>Niki Patel - Developer</h4>
                                <p className="card-text text-muted text-dark">“Bad programmers worry about the code. Good programmers worry about data structures and their relationships.”</p>
                                <p></p>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card shadow border border-0">
                            <img className="bd-placeholder-img card-img-top" width="100" height="225" src='/s1.jpg' role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" />
                            <div className="card-body">
                                <h4 className='fw-bold text-dark'>Hasti Patel - Developer</h4>
                                <p className="card-text text-muted text-dark">“Your mind is programmable - if you're not programming your mind, else will program it for you.”</p>
                                <p></p>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card shadow border border-0">
                            <img className="bd-placeholder-img card-img-top" width="100" height="225" src='/s1.jpg' role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" />
                            <div className="card-body">
                                <h4 className='fw-bold text-dark'>Riddhi Patel - Developer</h4>
                                <p className="card-text text-muted text-dark">"Without requirements or design, programming is the art of adding bugs to an empty text file."</p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
                </center>
            </div>
            
        </body>
    )
}

export default Page;