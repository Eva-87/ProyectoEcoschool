package com.stiwarback.stiwarback.service;

import org.springframework.stereotype.Service;

import com.stiwarback.stiwarback.entity.Role;
import com.stiwarback.stiwarback.repository.RoleRepository;


@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role createRole(Role role) {
        return roleRepository.save(role);
    }
}
