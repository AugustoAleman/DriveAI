package com.driveai.salesprocessms.repository;

import com.driveai.salesprocessms.dto.CommissionsLogDto;
import com.driveai.salesprocessms.model.CommissionsLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public interface CommissionsLogRepository extends JpaRepository<CommissionsLog, Integer> {
}
