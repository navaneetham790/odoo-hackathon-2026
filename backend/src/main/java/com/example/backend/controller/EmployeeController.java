package com.example.backend.controller;

import com.example.backend.model.Employee;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @GetMapping
    public List<Employee> getAllEmployees() {
        return List.of(
            new Employee("1", "John", "Doe", "john.doe@example.com", "Engineering", "Software Engineer", "Active"),
            new Employee("2", "Jane", "Smith", "jane.smith@example.com", "HR", "HR Manager", "Active"),
            new Employee("3", "Bob", "Johnson", "bob.johnson@example.com", "Marketing", "Marketing Lead", "Active")
        );
    }
}
