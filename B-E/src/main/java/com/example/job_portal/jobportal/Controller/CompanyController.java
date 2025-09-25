package com.example.job_portal.jobportal.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.job_portal.jobportal.Service.CompanyService;
import com.example.job_portal.jobportal.module.Companies;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService; 
    }


    @PostMapping("/create")
    public ResponseEntity<?> createCompany(@RequestParam String companyName,
                                        @RequestParam String address,
                                        @RequestParam String website,
                                        @RequestParam String description,
                                        @RequestParam("logo") MultipartFile logoFile) {
        try {
            String msg = companyService.create(companyName, address, website, description, logoFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(msg);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editCompany(@PathVariable int id,
                                        @RequestParam String companyName,
                                        @RequestParam String address,
                                        @RequestParam String website,
                                        @RequestParam String description,
                                        @RequestParam(value = "logo", required = false) MultipartFile logoFile) {
        try {
            String msg = companyService.editCompany(id, companyName, address, website, description, logoFile);
            return ResponseEntity.ok(msg);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCompanies(@PathVariable  Integer id) {
        try {
            companyService.deleteCompanies(id);
            return ResponseEntity.ok("All companies deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting companies: " + e.getMessage());
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Companies> getCompanies(@PathVariable Integer id) {
        Companies companies = companyService.getCompanies(id);
        return ResponseEntity.ok(companies);
    }

     @GetMapping("/getAll")
    public ResponseEntity<List<Companies>> getAllCompanies() {
        List<Companies> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }


    // @GetMapping("/uploads/{filename:.+}")
    // public ResponseEntity<Resource> getLogo(@PathVariable String filename) {
    //     try {
    //         Path uploadDir = Paths.get("uploads");
    //         Path file = uploadDir.resolve(filename).normalize();

    //         Resource resource = new UrlResource(file.toUri());
    //         if (!resource.exists()) {
    //             return ResponseEntity.notFound().build();
    //         }

    //         String contentType = Files.probeContentType(file);

    //         return ResponseEntity.ok()
    //                 .contentType(MediaType.parseMediaType(contentType != null ? contentType : "application/octet-stream"))
    //                 .body(resource);

    //     } catch (IOException e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    //     }
    // }
    

}
