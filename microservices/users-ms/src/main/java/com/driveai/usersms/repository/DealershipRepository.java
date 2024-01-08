package com.driveai.usersms.repository;

import com.driveai.usersms.model.Address;
import com.driveai.usersms.model.Dealership;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DealershipRepository extends CrudRepository<Dealership, Integer> {
    List<Dealership> findByIsDeleted(boolean isDeleted);

    @Query("SELECT d FROM Dealership d JOIN FETCH d.users u JOIN FETCH d.address WHERE u.id = :agaId AND u.user_type = 'AGA'")
    List<Dealership> findDealershipsByAutomotiveGroupAdminId(@Param("agaId") int agaId);

    @Query(value = "SELECT * FROM dealership WHERE id in (\n" +
            "\tSELECT dealership_id FROM user_dealership WHERE user_id = (\n" +
            "\t\tSELECT id FROM user WHERE user_type = 'AGA' AND id IN (\n" +
            "\t\t\tSELECT user_id FROM user_automotive_group WHERE automotive_group_id = 9\n" +
            "\t\t)\n" +
            "\t) AND dealership_id NOT IN (\n" +
            "\t\tSELECT dealership_id FROM user_dealership WHERE user_id IN (\n" +
            "\t\t\tSELECT id FROM user WHERE user_type = 'MANAGER'\n" +
            "\t\t)\n" +
            "\t)\n" +
            ")", nativeQuery = true)
    Optional<List<Dealership>>findDealership_WO_ManagerByAutomotiveGroupId(@Param("agaId") int agaId);

    @Query("SELECT d FROM Dealership d JOIN FETCH d.users u WHERE u.id = :managerId AND u.user_type = 'MANAGER'")
    Dealership findDealershipByManagerId(@Param("managerId") int managerId);

    @Query(value = "SELECT * from dealership WHERE id IN (SELECT dealership_id FROM user_dealership WHERE user_id = " +
            "(SELECT id FROM user WHERE id = ?1 AND user_type = 'MANAGER'))", nativeQuery = true)
    Optional<List<Dealership>> findDealershipsUnderManager(@Param("managerId") int managerId);

    // query to get all dealerships by automotive group id
    List<Dealership> findDealershipsByAutomotiveGroupId(@Param("agaId") int agaId);

    // link userid to dealershipid through user_dealership table
    @Modifying(clearAutomatically = true)
    @Query(value = "INSERT INTO user_dealership (user_id, dealership_id) VALUES (?1, ?2)", nativeQuery = true)
    void linkUserToDealership(Integer userId, Integer dealershipId);

    @Modifying(clearAutomatically = true)
    @Query(value = "DELETE FROM user_dealership WHERE " +
            "user_id = ?1 AND dealership_id = ?2", nativeQuery = true)
    void deleteUserFromDealership(Integer userId, Integer dealershipId);
}


