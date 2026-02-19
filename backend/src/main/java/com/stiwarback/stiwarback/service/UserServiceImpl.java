package com.stiwarback.stiwarback.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.stiwarback.stiwarback.entity.Role;
import com.stiwarback.stiwarback.entity.User;
import com.stiwarback.stiwarback.repository.RoleRepository;
import com.stiwarback.stiwarback.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public User createUser(User user, List<Integer> rolesIds) {

        List<Role> roles = roleRepository.findAllById(rolesIds);
        if (roles.size() != rolesIds.size()) {
            throw new RuntimeException("Uno o más roles no existen");
        }

        Set<Role> rolesSet = roles.stream().collect(Collectors.toSet());
        user.setRoles(rolesSet);

        return userRepository.save(user);
    }

    @Override
    public User getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No existe ese Usuario"));
    }
}
