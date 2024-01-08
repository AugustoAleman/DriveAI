export var DummyRegistryData = {
    id:             1,
    brand:          "",
    subbrand:       "",
    model:          0,
    fuel:           "",
    transmision:   "",
    dealership:     "",
    performance:    0,
    mileage:        0,
    traction:       "",
    version:        "",
    airbags:        0,
    active:         true,
    doors:          0,
    seats:          0,
    colors:         [
                        {
                            color:  "#343254"
                        },
                        {
                            color:  "#fd43254"
                        },
                        {
                            color:  "#fasdga4"
                        },
                        {
                            color:  "#34fffff"
                        },
                        {
                            color:  "#343gggda4"
                        },
    ],
    price:          432423,
    retailers:      [
                        {
                            id:         1,
                            assigned:   false,
                            name:       "Alejando"
                        },
                        {
                            id:         2,
                            assigned:   true,
                            name:       "Samuel"
                        },
                        {
                            id:         3,
                            assigned:   false,
                            name:       "Jaina"
                        },
    ],
    fplans:         [
                        {
                            id:         1,
                            months:     12,
                            interests:  12,
                            downPayment:20
                        },
                        {
                            id:         2,
                            months:     24,
                            interests:  14,
                            downPayment:20
                        },
                        {
                            id:         3,
                            months:     36,
                            interests:  18,
                            downPayment:20
                        },
                        {
                            id:         4,
                            months:     48,
                            interests:  20,
                            downPayment:20
                        },
                        {
                            id:         5,
                            months:     60,
                            interests:  22,
                            downPayment:20
                        },
    ],
    imgs:[]
};

export var EmptyData = {
    vehicleId : null,
    mileage: 0,
    performance: 0,
    info: "",
    subBrand: "",
    brand: "",
    colors: [""],
    model: 0,
    version: "",
    seats: 0,
    transmission: "",
    doors:0,
    fuel: "",
    airbags: 0,
    traction:"",
    price: 0,
    dealershipName: "",
    dealershipId:1,
    salesManId:0,
    financingPlans:[
        {
        months:12,
        downPayment: 0,
        interest:0,},
        {
        months:24,
        downPayment: 0,
        interest:0,},
        {
        months:36,
        downPayment: 0,
        interest:0,},
        {
        months:48,
        downPayment: 0,
        interest:0,},
        {
        months:60,
        downPayment: 0,
        interest:0,}
        
    ],
    favorite: false,
    weaviate_id: "",
    img_url:"",
}; 