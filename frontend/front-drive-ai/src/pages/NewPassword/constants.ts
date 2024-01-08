const redirectToPage = (pageUrl:string) => {
    window.location.href = pageUrl;
};

export const LOGIC = {

    LOGIN: (email:string, password:string):boolean => {
        if (email === "admin@admin.com" && password === "admin") {
            console.log("Login successful");
            return true;
        } else {        
            console.log("Login failed");
            return false;
        }
    },
    FORGOT_PASSWORD: (pageUrl:string) => {
        redirectToPage(pageUrl);
    },
    REGISTER: (pageUrl:string) => {
        redirectToPage(pageUrl);
    },
};