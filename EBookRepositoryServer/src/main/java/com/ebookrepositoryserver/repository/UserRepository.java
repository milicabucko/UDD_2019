package com.ebookrepositoryserver.repository;

import com.ebookrepositoryserver.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
}
