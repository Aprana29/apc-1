package com.laundrysystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laundrysystem.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(String status);
    List<Order> findByUser(com.laundrysystem.model.User user);
}
