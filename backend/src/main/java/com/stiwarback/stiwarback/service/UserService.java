package com.stiwarback.stiwarback.service;

import java.util.List;

import com.stiwarback.stiwarback.entity.User;

public interface UserService {

    User createUser(User user, List<Integer> rolesIds);

    User getUserById(int id);
}
