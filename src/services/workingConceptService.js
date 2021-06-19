import axiosProvider from './axiosProvider';

const WORKING_CONCEPT_URL = "http://localhost:5002/api/working-concept"; 

export default class WorkingConceptService{

    findAllWorkingConcepts(){
        return axiosProvider.getMethod(WORKING_CONCEPT_URL);
    }

}