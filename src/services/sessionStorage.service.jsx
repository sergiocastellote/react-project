class SessionStorageService {

    setToken(value){
        sessionStorage.setItem('token', value)
    }
}
export default new SessionStorageService();
