import { CurrentSellsProps, UserInfoProps, HistoricSellsProps, GenericCarInfoProps } from "./partials-types/types"

const getCurrentSells= (id:number): Array<CurrentSellsProps>  => {
    return [
        {
            image: "https://file.kelleybluebookimages.com/kbb/base/evox/CP/43648/2023-Honda-Civic-front_43648_032_1860x760_RE_cropped.png",
            brand: "Toyota",
            model: "Corolla",
            year: "2019",
            price: 20000,
            seller: "John Doe",
            location: "San Jose",
            documentStatus: "Pending",
            saleStatus: "Pending"
        },
        {
            image: "https://file.kelleybluebookimages.com/kbb/base/evox/CP/43648/2023-Honda-Civic-front_43648_032_1860x760_RE_cropped.png",
            brand: "Toyota",
            model: "Corolla",
            year: "2019",
            price: 20000,
            seller: "John Doe",
            location: "San Jose",
            documentStatus: "Pending",
            saleStatus: "Pending"
        },
        {
            image: "https://file.kelleybluebookimages.com/kbb/base/evox/CP/43648/2023-Honda-Civic-front_43648_032_1860x760_RE_cropped.png",
            brand: "Toyota",
            model: "Corolla",
            year: "2019",
            price: 20000,
            seller: "John Doe",
            location: "San Jose",
            documentStatus: "Pending",
            saleStatus: "Pending"
        },
    ]
}

const getHistoricSells = (id:number): Array<HistoricSellsProps>  => {
    return [
        {
            image: "https://file.kelleybluebookimages.com/kbb/base/evox/CP/43648/2023-Honda-Civic-front_43648_032_1860x760_RE_cropped.png",
            brand: "Mazda",
            model: "Fiesta",
            year: "2022",
            price: 374000,
            seller: "John Doe",
            location: "Polanco",
            saleDate: "13/01/2023"
        },
    ]
}

const getCurrentTestDrives = (id:number): Array<GenericCarInfoProps>  => {
    return [
        {
            image: "https://file.kelleybluebookimages.com/kbb/base/evox/CP/43648/2023-Honda-Civic-front_43648_032_1860x760_RE_cropped.png",
            brand: "Toyota",
            model: "Corolla",
            year: "2019",
            seller: "John Doe",
            location: "San Jose",
            purchaseDate: "12/12/2021",
            time: "12:00",
            driveTestStatus: "Pending",
        },
    ]
}

const getHistoricTestDrives = (id:number): Array<GenericCarInfoProps>  => {
    return [
        {
            image: "https://file.kelleybluebookimages.com/kbb/base/evox/CP/43648/2023-Honda-Civic-front_43648_032_1860x760_RE_cropped.png",
            brand: "Toyota",
            model: "Corolla",
            year: "2019",
            seller: "John Doe",
            location: "San Jose",
            purchaseDate: "12/12/2021",
        }
    ]
}

const getUserInfo = (id:number): UserInfoProps => {
    return {
        name: "John",
        surname: "Doe",
        email: "john.doe@gmail.com",
        phone: "12345678",
        addresses: [
            {
                state: "San Jose",
                city: "San Jose",
                street: "Street",
                number: "123",
                zipCode: "12345",
                appartment: "123",
                main: true
            },
        ],
        photo: "https://i.imgur.com/3Z1b9zB.png"
    }
}

export const LOGIC = {
    CURRENT_SELLS: (id:number):Array<CurrentSellsProps> => {
        return getCurrentSells(id)
    },
    HISTORIC_SELLS: (id:number):Array<HistoricSellsProps> => {
        return getHistoricSells(id)
    },
    CURRENT_TEST_DRIVES: (id:number):Array<GenericCarInfoProps> => {
        return getCurrentTestDrives(id)
    },
    HISTORIC_TEST_DRIVES: (id:number):Array<GenericCarInfoProps> => {
        return getHistoricTestDrives(id)
    },
    USER_INFO: (id:number):UserInfoProps => {
        return getUserInfo(id)
    }
}
