import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const baseUrl='http://127.0.0.1:8000/api/contact/';

function ContactUs(){
    useEffect(()=>{
        document.title='Contact Us';
    });
    // Use State
    const[ContactData, setContactData]=useState({
        'full_name':'',
        'email':'',
        'query_msg':'',
        'status':''
    });
    // Change element value
    const handleChange=(event)=>{
        setContactData({
            ...ContactData,
            [event.target.name]:event.target.value
        });
    }
    // end

    // submit form
    const submitForm=()=>{
        const contactFormData=new FormData();
        contactFormData.append('full_name', ContactData.full_name)
        contactFormData.append('email', ContactData.email)
        contactFormData.append('query_msg', ContactData.query_msg)
       
        try{
            axios.post(baseUrl, contactFormData).then((response)=>{
                setContactData({
                    'full_name':'',
                    'email':'',
                    'query_msg':'',
                    'status':'success'
                    });
            });
        }
        catch(error){
            console.log("error...... ",error);
            setContactData({'status':'error'})
        }  
    }
    // end
     const listStyle={
         'list-style':'none'
     }
    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-7'>
                    {ContactData.status=='success' && <p className='alert alert-success'>Thanks For your contacting Us!</p>}
                    {!ContactData.status=='error' && <p className='alert alert-danger'>Something Wrong Happended!</p>}
                    <div className='card shadow border border-0'>
                        <h3 className='card-header shadow border border-0'>Contact Us</h3>
                        <div className='card-body shadow border border-0'>
                            {/* <form> */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label ">Full Name</label>
                                    <input value={ContactData.full_name} onChange={handleChange} type="text" name='full_name' className="form-control shadow border border-0" id="exampleInputEmail1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input value={ContactData.email} onChange={handleChange} type="email" name='email' className="form-control shadow border border-0" id="exampleInputEmail1"/>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Query</label>
                                    <textarea rows="10" value={ContactData.query_msg} onChange={handleChange} name='query_msg' className='form-control shadow border border-0'></textarea>
                                  
                                </div>
                            
                                <button onClick={submitForm} type="submit" className="btn btn-dark">Send</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
                <div className='col-4 offset-1'>
                    <h3 className='border-bottom'>Address</h3>
                    <ul className='m-0 p-0' style={listStyle}>
                        <li>
                            <label className='fw-bold'>Address:</label>
                            <span className='ms-2'> 50,Green Avnue,New Delhi</span>
                        </li>

                        <li>
                            <label className='fw-bold'>Mobile No:</label>
                            <span className='ms-2'> 9098765645</span>
                        </li>
                       
                        <li>
                            <label className='fw-bold'>Phone:</label>
                            <span className='ms-2'> 079-27265424</span>
                        </li>
                   
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ContactUs;