package com.driveai.salesprocessms.service;

import com.driveai.salesprocessms.dto.FinancingDto;
import com.driveai.salesprocessms.dto.TokenStripeDto;
import com.driveai.salesprocessms.model.Financing;
import com.driveai.salesprocessms.model.TokenStripe;
import com.driveai.salesprocessms.repository.TokenStripeRepository;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TokenStripeService {
    @Autowired
    TokenStripeRepository tokenStripeRepository;
    public TokenStripe saveTokenStripe(TokenStripe tokenStripe) throws Exception{
        if(tokenStripe.getId()!=0){
            Optional<TokenStripe> tokenStripeInDb = tokenStripeRepository.findById(tokenStripe.getId());
            if(!tokenStripeInDb.isPresent()){
                throw new Exception("TokenStripe " + tokenStripe.getId()+" does not exist");
            }
            tokenStripe=tokenStripeRepository.save(tokenStripe);
        }else{
            tokenStripe=tokenStripeRepository.save(tokenStripe);
        }
        return tokenStripe;
    }

    public void deleteTokenStripe(int id) throws Exception{
        Optional<TokenStripe> tokenStripeOptional = tokenStripeRepository.findById(id);
        if(tokenStripeOptional.isPresent()){
            tokenStripeRepository.delete(tokenStripeOptional.get());
        }else{
            throw new Exception("Address "+id+" does not exist");
        }
    }

    public List<TokenStripeDto> findAll(){
        List<TokenStripe> tokenStripeList = tokenStripeRepository.findAll();
        List<TokenStripeDto> result = new ArrayList<>();
        for(TokenStripe t:
                tokenStripeList){
            TokenStripeDto dto = new TokenStripeDto(t);
            result.add(dto);
        }
        return  result;
    }
    public TokenStripeDto findByid(int id) throws Exception{
        Optional<TokenStripe> tokenStripelOptional = tokenStripeRepository.findById(id);
        if(tokenStripelOptional.isPresent()){
            return new TokenStripeDto((tokenStripelOptional.get()));
        }else{
            throw new Exception("TokenStripe Token "+ id + " does not exist");
        }
    }
}
