"use server";

function authorisation(email: string){
    if(email === 'aadeshk306@gmail.com' || email === 'subodh.sabbarwal@gmail.com'){
        return true;
    } else {
        return false;
    }
}

export default authorisation;