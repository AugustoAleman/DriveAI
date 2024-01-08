package com.driveai.usersms.repository;

import com.driveai.usersms.model.AutomotiveGroup;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface AutomotiveGroupRepository extends CrudRepository<AutomotiveGroup, Integer> {
    List<AutomotiveGroup> findByIsDeleted(boolean isDeleted);

    @Modifying
    @Query(value = "INSERT INTO user_automotive_group (user_id, automotive_group_id) VALUES (:userId, :automotiveGroupId)", nativeQuery = true)
    void assignUserToAutomotiveGroup(@Param("userId") int userId, @Param("automotiveGroupId") int automotiveGroupId);

    @Modifying
    @Query(value = "DELETE FROM user_automotive_group WHERE user_id = :userId AND automotive_group_id = :automotiveGroupId", nativeQuery = true)
    void unassignUserFromAutomotiveGroup(@Param("userId") int userId, @Param("automotiveGroupId") int automotiveGroupId);

    @Query(value = "SELECT COUNT(*) FROM user u JOIN user_automotive_group uag ON u.id = uag.user_id WHERE uag.automotive_group_id = :automotiveGroupId AND u.user_type = 'AGA'", nativeQuery = true)
    int countAGAUsersInAutomotiveGroup(@Param("automotiveGroupId") int automotiveGroupId);


}
