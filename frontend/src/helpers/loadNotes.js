import { noteApi } from "../api";

export const loadNotes = async () => {
    try{
        const response = await noteApi.get('/notes');
        return response;
    }catch(e){
        console.log(e)
    }
}
