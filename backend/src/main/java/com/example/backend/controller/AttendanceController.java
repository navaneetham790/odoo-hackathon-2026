package com.example.backend.controller;

import com.example.backend.model.Attendance;
import com.example.backend.service.AttendanceService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping
    public List<Attendance> getAttendanceLogs() {
        return attendanceService.getAllAttendanceLogs();
    }

    @GetMapping("/employee/{employeeId}")
    public List<Attendance> getAttendanceByEmployee(@PathVariable String employeeId) {
        return attendanceService.getAttendanceByEmployeeId(employeeId);
    }

    @PostMapping("/check-in/{employeeId}")
    public Attendance checkIn(@PathVariable String employeeId) {
        return attendanceService.checkIn(employeeId);
    }

    @PostMapping("/check-out/{employeeId}")
    public Attendance checkOut(@PathVariable String employeeId) {
        return attendanceService.checkOut(employeeId);
    }
}
