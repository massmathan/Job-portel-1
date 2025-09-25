package com.example.job_portal.jobportal.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.job_portal.jobportal.Repository.CompanyRepository;
import com.example.job_portal.jobportal.module.Companies;
import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
        
    private final Path uploadDir = Paths.get("uploads");


    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public String create(String companyName, String address, String website, String description, MultipartFile logoFile) {
        Companies company = new Companies();
        company.setCompanyName(companyName);
        company.setAddress(address);
        company.setWebsite(website);
        company.setDescription(description);

        if (logoFile != null && !logoFile.isEmpty()) {

            try {
            company = companyRepository.save(company);
            Path uploadDir = Paths.get("uploads");
            Files.createDirectories(uploadDir);

            String fileName = "logo_" + company.getId() + ".png";
            Path logoPath = uploadDir.resolve(fileName);
            Files.write(logoPath, logoFile.getBytes());

            company.setLogo("/uploads/" + fileName); 
            
            company = companyRepository.save(company);


            } catch (IOException e) {
                throw new RuntimeException("Failed to upload logo file", e);
            }
        }

        
        return "Company created successfully!";
    }

    
    public Path getLogoPath(String filename) {
        return uploadDir.resolve(filename).normalize();
    }

    public String getCompanyLogo(Integer id) {
        Companies company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with ID: " + id));

        String logo = company.getLogo();
        if (logo == null) {
            throw new RuntimeException("No logo found for company ID: " + id);
        }

        return logo;
    }

     public List<Companies> getAllCompanies() {
        List<Companies> companies = companyRepository.findAll();
        
        return companies; 
    }


    public void deleteCompanies(Integer id) {
        companyRepository.deleteById(id);
    }

    public Companies getCompanies(int id) {
        return companyRepository.findById(id).orElse(null); 
    }

     public String editCompany(int id,
                              String companyName,
                              String address,
                              String website,
                              String description,
                              MultipartFile logoFile) {

        Companies company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id " + id));

        company.setCompanyName(companyName);
        company.setAddress(address);
        company.setWebsite(website);
        company.setDescription(description);

        if (logoFile != null && !logoFile.isEmpty()) {
            try {
                Path uploadDir = Paths.get("uploads");
                Files.createDirectories(uploadDir);

                String fileName = "logo_" + company.getId() + ".png";
                Path logoPath = uploadDir.resolve(fileName);
                Files.write(logoPath, logoFile.getBytes());

                company.setLogo("/uploads/" + fileName);
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload logo file", e);
            }
        }

        companyRepository.save(company);
        return "Company edited successfully!";
    }

    
}
