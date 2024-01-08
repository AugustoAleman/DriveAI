package com.driveai.salesprocessms.dto;

import com.driveai.salesprocessms.model.TokenStripe;
import lombok.Data;

@Data
public class TokenStripeDto {
    private int id;
    private int user_id;
    private String str_token;



    public TokenStripeDto(TokenStripe tokenStripe) {
        this.id = tokenStripe.getId();
        this.user_id = tokenStripe.getUser_id();
        this.str_token = tokenStripe.getStr_token();
    }
}
