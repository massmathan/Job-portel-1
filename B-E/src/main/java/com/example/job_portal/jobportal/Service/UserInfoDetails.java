package com.example.job_portal.jobportal.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.job_portal.jobportal.module.User;

public class UserInfoDetails implements UserDetails {

    private String username;
    private String password; 
    private Collection<? extends GrantedAuthority> authorities;

   public UserInfoDetails(User user) {
        this.username = user.getUserName();
        this.password = user.getPassword();
        this.authorities = Arrays.stream(user.getRoles().split(","))
        .map(String::trim)
        .map(SimpleGrantedAuthority::new)
        .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password; 
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; 
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; 
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; 
    }

    @Override
    public boolean isEnabled() {
        return true; 
    }
}
