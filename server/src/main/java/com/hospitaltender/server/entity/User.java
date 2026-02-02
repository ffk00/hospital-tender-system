package com.hospitaltender.server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {
    
    @Id
    //TODO: @sequencegenerator vs @generatedvalue tarzı bir şey ekle.
    private Long id;
    private String firstName;
    private String lastName;
    private String title;
}
