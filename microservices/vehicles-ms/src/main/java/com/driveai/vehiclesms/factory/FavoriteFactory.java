package com.driveai.vehiclesms.factory;

import com.driveai.vehiclesms.model.Favorite;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FavoriteFactory {
    public List<Integer> getDealershipVehicleIdsFromFavorites(List<Favorite> favoriteList){
        List<Integer> ids = new ArrayList<>();
        for (Favorite fav : favoriteList) {
            ids.add(fav.getDealershipVehicle().getDealershipVehicleId());
        }
        return ids;
    }
}
