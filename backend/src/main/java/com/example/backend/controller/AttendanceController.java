package com.example.backend.controller;

import com.example.backend.model.Attendance;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @GetMapping
    public List<Attendance> getAttendanceLogs() {
        return List.of(
            new Attendance("1", "1", LocalDate.now(), LocalTime.of(9, 0), LocalTime.of(18, 0), "Present"),
            new Attendance("2", "2", LocalDate.now(), LocalTime.of(9, 15), LocalTime.of(18, 0), "Late"),
            new Attendance("3", "3", LocalDate.now().minusDays(1), LocalTime.of(9, 5), LocalTime.of(17, 30), "Present")
        );
    }
}
