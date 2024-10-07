export const checkValidData=(email,password)=>{
    const isEmailValid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);


    if(!isEmailValid) return "Email not valid";
    if(!isPasswordValid) return "Password not valid";

    return null;
}