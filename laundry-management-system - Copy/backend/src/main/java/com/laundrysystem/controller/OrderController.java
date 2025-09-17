package com.laundrysystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laundrysystem.dto.OrderRequest;
import com.laundrysystem.model.Order;
import com.laundrysystem.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Place order with JSON body (userId, status, service, quantity)
    @PostMapping
    public Order placeOrderFromBody(@RequestBody OrderRequest orderRequest) {
        System.out.println("[DEBUG] Incoming orderRequest: userId=" + orderRequest.getUserId() + ", status=" + orderRequest.getStatus() + ", service=" + orderRequest.getService() + ", quantity=" + orderRequest.getQuantity());
        if (orderRequest.getUserId() == null || orderRequest.getService() == null || orderRequest.getService().isEmpty() || orderRequest.getQuantity() <= 0) {
            throw new IllegalArgumentException("userId, service, and quantity are required and must be valid");
        }
        String status = orderRequest.getStatus() != null ? orderRequest.getStatus() : "PENDING";
        String service = orderRequest.getService();
        int quantity = orderRequest.getQuantity();
        return orderService.placeOrder(orderRequest.getUserId(), status, service, quantity);
    }

    // Place order with default PENDING status
    @PostMapping("/{userId}")
    public Order placeOrder(@PathVariable Long userId) {
        return orderService.placeOrder(userId);
    }

    // Place order with custom status
    @PostMapping("/{userId}/{status}")
    public Order placeOrderWithStatus(@PathVariable Long userId, @PathVariable String status) {
        return orderService.placeOrder(userId, status);
    }

    // Get orders by status
    @GetMapping("/status/{status}")
    public List<Order> getOrdersByStatus(@PathVariable String status) {
        return orderService.getOrdersByStatus(status);
    }

    // Get all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // Get orders for a user by email
    @GetMapping(params = "email")
    public List<Order> getOrdersByEmail(@org.springframework.web.bind.annotation.RequestParam String email) {
        System.out.println("[DEBUG] Fetching orders for email: " + email);
        return orderService.getOrdersByUserEmail(email);
    }
}
