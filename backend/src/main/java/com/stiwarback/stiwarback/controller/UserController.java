package com.stiwarback.stiwarback.controller;

import org.springframework.web.bind.annotation.*;

import com.stiwarback.stiwarback.UserCreateRequest;
import com.stiwarback.stiwarback.entity.User;
import com.stiwarback.stiwarback.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody UserCreateRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setClassroom(request.getClassroom());

        return userService.createUser(user, request.getRolesIds());
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable int id) {
        return userService.getUserById(id);
    }
}
