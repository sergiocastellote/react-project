class Auth {
    isAuthenticated(){
        const token= sessionStorage.getItem('token');
        return token ? true : false;
    }
}

export default new Auth();
