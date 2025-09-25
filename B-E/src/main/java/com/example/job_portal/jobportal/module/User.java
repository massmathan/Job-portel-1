package com.example.job_portal.jobportal.module;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="Users")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long  id;

  
    
    @Column(name="username" , nullable=false,unique=true)
    private String username;

    @Column(name="password", nullable=false)
    private String password;

    private String roles;

    public User() {
        
    }

    public User(Long id, String password, String roles, String username) {
        this.id = id;
        this.password = password;
        this.roles = roles;
        this.username = username;
    }

    public Long  getId() {
        return id;
    }

    public void setId(Long  id) {
        this.id = id;
    }

    public String getUserName() {
        return username;
    }

    public void setUserName(String userName) {
        this.username = userName;
    }

   
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}
