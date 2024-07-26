

// bech nkhabi token wel user fel localstorage

export const setLocalStorage =(token , user)=>{

    localStorage.setItem('token',JSON.stringify(token));
     localStorage.setItem('User',JSON.stringify(user)) 
}


// bech nekhou ay 7aja mawjouda fel localStorage 

export const getLocalStorage=(key)=>{
    return JSON.parse(localStorage.getItem(key))
}