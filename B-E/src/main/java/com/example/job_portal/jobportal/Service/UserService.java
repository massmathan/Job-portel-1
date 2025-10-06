package com.example.job_portal.jobportal.Service;



import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.job_portal.jobportal.DTO.UserInfoDetails;
import com.example.job_portal.jobportal.Repository.UserRepository;
import com.example.job_portal.jobportal.module.User;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;


    public UserService(UserRepository userRepository,PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    

    public User create(User userInfo) {
        userInfo.setPassword(encoder.encode(userInfo.getPassword())); 
        return userRepository.save(userInfo);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new UserInfoDetails(user); 
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public Long userCount(){
        return userRepository.count();
    }

    public User getUser(Long id){
        return userRepository.findById(id).orElse(null); 
    }
}


