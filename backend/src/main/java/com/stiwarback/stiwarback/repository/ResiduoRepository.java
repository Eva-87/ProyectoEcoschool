package com.stiwarback.stiwarback.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.stiwarback.stiwarback.entity.Residuo;
import com.stiwarback.stiwarback.entity.ResiduoStatus;

@Repository
public interface ResiduoRepository extends JpaRepository<Residuo, Integer> {

    List<Residuo> findByStatus(ResiduoStatus status);

    long countByTypeAndStatus(String type, ResiduoStatus status);

    @Query("SELECT r.type, COUNT(r) FROM Residuo r GROUP BY r.type")
    List<Object[]> countByType();
}
