import axiosProvider from './axiosProvider';

const SKILL_URL = "http://localhost:5002/api/skill";

export default class SkillService{

    saveSkill(data){
        var url = SKILL_URL;

        return new Promise(resolve => {
            axiosProvider.postMethod(data).then(res => {
                resolve(res);
            })
        })
    }

}