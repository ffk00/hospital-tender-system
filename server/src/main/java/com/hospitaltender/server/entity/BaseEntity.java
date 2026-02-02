package com.hospitaltender.server.entity;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;


@MappedSuperclass
@Setter //we have @data in our other entities i hope this is not redundant
@Getter
@ToString 
public class BaseEntity implements Serializable {

    private Date createdAt;
    private User createdBy;
    private Date updatedAt;
    private User updatedBy;

}
