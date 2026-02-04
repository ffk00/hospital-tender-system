package com.hospitaltender.server.repository;

import com.hospitaltender.server.entity.TenderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TenderItemRepository extends JpaRepository<TenderItem, Long> {

    List<TenderItem> findByTenderId(Long tenderId);

    List<TenderItem> findByItemNameContainingIgnoreCase(String itemName);
}
