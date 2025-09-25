package com.example.job_portal.jobportal.Service;



import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

        public String create(User userInfo) {
        userInfo.setPassword(encoder.encode(userInfo.getPassword())); 
        userRepository.save(userInfo);
        return "User added successfully!";
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        return new UserInfoDetails(user); 
}


}


// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;
// import java.util.Arrays;
// import java.util.stream.Collectors;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;

// import com.example.job_portal.jobportal.Repository.UserRepository;
// import com.example.job_portal.jobportal.module.User;


// @Service
// public class UserService implements UserDetailsService {

// // public class UserService  {

//     private final UserRepository repository;
//     private final PasswordEncoder encoder;

//     @Autowired
//     public UserService(UserRepository repository, PasswordEncoder encoder) {
//         this.repository = repository;
//         this.encoder = encoder;
//     }

//        public String create(User userInfo) {
//         userInfo.setPassword(encoder.encode(userInfo.getPassword())); 
//         repository.save(userInfo);
//         return "User added successfully!";
//     }

//     // @Override
//     // public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//     //     User user = repository.findByEmail(username)
//     //         .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

//     //     return new org.springframework.security.core.userdetails.User(
//     //         user.getEmail(),
//     //         user.getPassword(),
//     //         Arrays.stream(Optional.ofNullable(user.getRoles()).orElse("").split(","))
//     //               .filter(role -> !role.isEmpty())
//     //               .map(SimpleGrantedAuthority::new)
//     //               .collect(Collectors.toList())
//     //     );
//     // }

// }

