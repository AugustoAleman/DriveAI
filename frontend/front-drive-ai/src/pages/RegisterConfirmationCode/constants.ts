const redirectToPage = (pageUrl: string) => {
    window.location.href = pageUrl;
};


export const LOGIC = {
    RESEND_CODE: () => {
        // TODO: Implement this function
        console.log("RESEND_CODE");
    },
    CONFIRM_CODE: (text:string):boolean => {
        // TODO: Implement this function
        if (text === "verified") {
            console.log("Code confirmed");
            redirectToPage("/register-formulaire");
            return true;
        }
        else {
            console.log("Code not confirmed");
            return false;
        }
    }
};
