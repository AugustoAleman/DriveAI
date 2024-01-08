export const LOGIC = {
    REGISTER_USER: (name:string, surname:string, phone:string, dataOfBirth:string, email:string|null, password:string) => {
        return {
            query: `
                mutation {
                    registerUser(name:"${name}", surname:"${surname}", phone:"${phone}", dataOfBirth:"${dataOfBirth}", email:"${email}", password:"${password}") {
                        name
                        surname
                        phone
                        dataOfBirth
                        password
                    }
                }
            `
        }
    }
}