import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import SignUp from '../components/Auth/SignUp';
import SignIn from '../components/Auth/SignIn';
import CompanyForm from '../components/Company/CompanyForm';
import JobPostForm from '../components/Job/JobPostForm';
import CompanyTable from '../components/Company/CompanyList';
import JobList from '../components/Job/JobList';


function appRouters(){
    
    return (
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/company-list" element={<CompanyTable />} />
            <Route path="/company-form" element={<CompanyForm />} />
            <Route path="/company-form/:id" element={<CompanyForm />} />
            <Route path="/job-form" element={<JobPostForm/>} />
            <Route path="/job-list" element={<JobList/>} />
            <Route path="/job-form/:id" element={<JobPostForm/>} />
          </Routes>
    );
        
};

export default appRouters;