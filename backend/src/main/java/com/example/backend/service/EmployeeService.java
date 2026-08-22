package com.example.backend.service;

import com.example.backend.model.Employee;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    private final List<Employee> employees = new ArrayList<>();

    public EmployeeService() {
        employees.add(new Employee("1", "John", "Doe", "john.doe@example.com", "Engineering", "Software Engineer", "Active"));
        employees.add(new Employee("2", "Jane", "Smith", "jane.smith@example.com", "HR", "HR Manager", "Active"));
        employees.add(new Employee("3", "Bob", "Johnson", "bob.johnson@example.com", "Marketing", "Marketing Lead", "Active"));
    }

    public List<Employee> getAllEmployees() {
        return employees;
    }

    public Optional<Employee> getEmployeeById(String id) {
        return employees.stream().filter(e -> e.getId().equals(id)).findFirst();
    }

    public Employee addEmployee(Employee employee) {
        employees.add(employee);
        return employee;
    }

    public boolean deleteEmployee(String id) {
        return employees.removeIf(e -> e.getId().equals(id));
    }
}
