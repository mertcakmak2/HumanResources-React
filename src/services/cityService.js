import axiosProvider from './axiosProvider';

const CITY_URL = "http://localhost:5002/api/city";

export default class CityService{

    findAllCities(){
        return axiosProvider.getMethod(CITY_URL);
    }

}