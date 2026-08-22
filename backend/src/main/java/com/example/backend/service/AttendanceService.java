package com.example.backend.service;

import com.example.backend.model.Attendance;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceService {
    private final List<Attendance> attendanceLogs = new ArrayList<>();

    public AttendanceService() {
        attendanceLogs.add(new Attendance("1", "1", LocalDate.now(), LocalTime.of(9, 0), LocalTime.of(18, 0), "Present"));
        attendanceLogs.add(new Attendance("2", "2", LocalDate.now(), LocalTime.of(9, 15), LocalTime.of(18, 0), "Late"));
        attendanceLogs.add(new Attendance("3", "3", LocalDate.now().minusDays(1), LocalTime.of(9, 5), LocalTime.of(17, 30), "Present"));
    }

    public List<Attendance> getAllAttendanceLogs() {
        return attendanceLogs;
    }

    public List<Attendance> getAttendanceByEmployeeId(String employeeId) {
        return attendanceLogs.stream()
                .filter(a -> a.getEmployeeId().equals(employeeId))
                .collect(Collectors.toList());
    }

    public Attendance checkIn(String employeeId) {
        Attendance record = new Attendance(
            String.valueOf(attendanceLogs.size() + 1),
            employeeId,
            LocalDate.now(),
            LocalTime.now(),
            null,
            "Present"
        );
        attendanceLogs.add(record);
        return record;
    }

    public Attendance checkOut(String employeeId) {
        for (Attendance record : attendanceLogs) {
            if (record.getEmployeeId().equals(employeeId) && record.getDate().equals(LocalDate.now()) && record.getCheckOutTime() == null) {
                record.setCheckOutTime(LocalTime.now());
                return record;
            }
        }
        return null;
    }
}
