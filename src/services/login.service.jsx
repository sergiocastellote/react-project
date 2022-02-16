import apiInstance from '../ApiInstance';

class LoginService {

    login(){
        return apiInstance.get(`http://localhost:3000/login`);
    }

    logout(){
        sessionStorage.clear();
    }
}
export default new LoginService();
