import axiosProvider from './axiosProvider';

const SKILL_URL = "http://localhost:5002/api/skill";

export default class SkillService{

    findAllSkillByResumeId(jobSeekerId){
        var url = SKILL_URL+"/"+jobSeekerId

        return new Promise(resolve => {
            axiosProvider.getMethod(url).then(res => {
                resolve(res);
            })
        })
    }

    saveSkill(data){
        var url = SKILL_URL;

        return new Promise(resolve => {
            axiosProvider.postMethod(url,data).then(res => {
                resolve(res);
            })
        })
    }

    updateSkill(data){
        var url = SKILL_URL+"/update";

        return new Promise(resolve => {
            axiosProvider.postMethod(url,data).then(res => {
                resolve(res);
            })
        })
    }

    deleteSkill(skillId){

        var url = SKILL_URL+"/"+skillId;

        return new Promise(resolve => {
            axiosProvider.deleteMethod(url).then(res => {
                resolve(res);
            })
        })
    }

}