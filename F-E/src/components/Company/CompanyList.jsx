import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

function CompanyTable() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:8080/api/company/getAll") 
      .then((res) => {setCompanies(res.data); console.log(res.data)})
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this company?")) {
    axios
      .delete(`http://localhost:8080/api/company/delete/${id}`)
      .then(() => {
        setCompanies(companies.filter((c) => c.id !== id));
      })
      .catch((err) => console.error("Error deleting company:", err));
  }
};


const handleEdit = (id) => {
  navigate(`/company-form/${id}`);
};


  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Company List</h2>
      <div className="d-flex justify-content-end">
        <button className="btn btn-success mb-3" onClick={() => navigate('/company-form')}> Add Company </button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Actions</th>
            <th>Logo</th>
            <th>Company Name</th>
            <th>Address</th>
            <th>Website</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((company, index) => (
              <tr key={company.id}>
                <td>{index + 1}</td>
                 <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(company.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(company.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {company.logo ? (
                    <img
                      src={`http://localhost:8080/${company.logo}`}
                      alt="Logo"
                      style={{ width: "50px", height: "50px" }}
                    />
                  ) : (
                    "No logo"
                  )}
                </td>
                <td>{company.companyName}</td>
                <td>{company.address}</td>
                <td>
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    {company.website}
                  </a>
                </td>
                <td>{company.description}</td>
               
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No companies found.
              </td>
            </tr>
          )}
        </tbody>

      </Table>
    </div>
  );
}

export default CompanyTable;
