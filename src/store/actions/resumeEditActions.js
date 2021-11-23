export const ALLOW_RESUME_EDIT = "ALLOW_RESUME_EDIT"

export function allowResumeEdit(resumeEditStatu){
    return {
        type:ALLOW_RESUME_EDIT,
        payload: resumeEditStatu
    }
}