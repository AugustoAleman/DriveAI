package com.driveai.salesprocessms.repository;

import com.driveai.salesprocessms.model.TokenStripe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TokenStripeRepository extends CrudRepository<TokenStripe, Integer> {
    List<TokenStripe> findAll();
}
