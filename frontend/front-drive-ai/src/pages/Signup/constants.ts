const redirectToPage = (pageUrl: string) => {
    window.location.href = pageUrl;
};

export const FUNCTIONS = {
    PRIVACY_AGREEMENT_PATH: "#",
    TERMS_USE_PATH: "#",
    LOGIN: () => {
        redirectToPage("/login");
    },
    AUTOMOTIVE_PATH: () => {
        redirectToPage("/register-formulaire-group");
    },
    SEND_VERIFICATION_CODE: (email:string) => {
        localStorage.setItem("email", email);
        console.log("Send verification code");
        redirectToPage("/registration-code");
    },
};
