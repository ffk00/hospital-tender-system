package com.hospitaltender.server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="employee")
@Data
public class Employee {
    
    @Id
    Long empId;
    String firstName;
    String lastName;
    String password;
}
