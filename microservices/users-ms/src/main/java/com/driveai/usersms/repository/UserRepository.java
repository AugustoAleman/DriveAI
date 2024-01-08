package com.driveai.usersms.repository;

import com.driveai.usersms.model.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    List<User> findAll();
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT u.dealerships FROM User u WHERE u.id = :id AND u.user_type = 'MANAGER'")
    List<Dealership> findDealershipsById(@Param("id") int id);

    @Query("SELECT u FROM User u JOIN u.dealerships d WHERE d.id = :dealershipId AND u.user_type = :userRole")
    User findManagerByDealershipId(@Param("dealershipId") int dealershipId, @Param("userRole") UserType userRole);

    @Query("SELECT u FROM User u JOIN u.dealerships d WHERE d.id = :dealershipId AND u.user_type = :userRole")
    List<User> findAllManagersByDealershipId(@Param("dealershipId") int dealershipId, @Param("userRole") UserType userRole);

    @Query("SELECT u FROM User u JOIN FETCH u.dealerships d WHERE d.id = :dealershipId AND u.user_type = 'SALESMAN'")
    List<User> findSalesmenByDealershipId(@Param("dealershipId") int dealershipId);

    @Query("SELECT u.dealerships FROM User u WHERE u.email = :email AND u.user_type = :userRole")
    List<Dealership> findDealershipIdByEmailIfUserRole(@Param("email") String email, @Param("userRole") UserType userRole);

    @Query("SELECT u.dealerships FROM User u WHERE u.email = :email")
    Optional<Dealership> findDealershipIdByEmailIfAny(@Param("email") String email);

    @Query(value = "SELECT d.id AS dealership_id FROM dealership d JOIN user_dealership ud ON d.id = ud.dealership_id JOIN user u ON u.id = ud.user_id WHERE u.email = :email AND d.is_deleted = 0", nativeQuery = true)
    Optional<Dealership> findDealershipIdByEmail(@Param("email") String email);

    @Query(value = "SELECT automotive_group_id FROM user_automotive_group WHERE user_id = ?1", nativeQuery = true)
    Integer findAutomotiveGroupIdByAgaId(@Param("agaId") int agaId);

    // get user by reset token (user and password_reset_token are not connected in the model)
    @Query(value = "SELECT u.* FROM user u JOIN password_reset_token prt ON u.id = prt.user_id WHERE prt.token = :token", nativeQuery = true)
    User findUserByResetToken(@Param("token") String token);

    @Query(value = "SELECT u.* FROM user u JOIN user_dealership ud ON u.id = ud.user_id JOIN dealership d ON ud.dealership_id = d.id JOIN user_automotive_group uag ON u.id = uag.user_id JOIN user_automotive_group aga_uag ON aga_uag.automotive_group_id = uag.automotive_group_id WHERE u.user_type = :userRole AND aga_uag.user_id = :agaId", nativeQuery = true)
    List<User> findManagersByAGAId(@Param("agaId") int agaId, @Param("userRole") String userRole);


}
