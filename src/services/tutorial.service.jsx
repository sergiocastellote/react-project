import apiInstance from '../ApiInstance';

class TutorialDataService {

    getAll(){
        return apiInstance.get(`http://localhost:3000/films`);
    }
    get(id) {
        return apiInstance.get(`http://localhost:3000/films/` + id);
    }
    create(data) {
        return apiInstance.post(`http://localhost:3000/films/`, data);
    }
    update(data) {
        return apiInstance.put(`http://localhost:3000/films/` + data.id, data);
    }
    delete(id) {
        return apiInstance.delete(`http://localhost:3000/films/` + id);
    }
    async findByTitle(title) {
        const data = await this.getAll();
        const items = title ? data.data.filter((item) => item.title === title) : this.films;
        const myPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(items );
            }, 300);
        });
        return myPromise;
    }
}
export default new TutorialDataService();
