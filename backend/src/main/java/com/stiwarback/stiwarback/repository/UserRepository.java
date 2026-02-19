package com.stiwarback.stiwarback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stiwarback.stiwarback.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {}
