import { useDispatch, useSelector } from "react-redux";

import { setSaving, unArchiveNoteById } from "../store/note";
import { noteApi } from "../api";

export const useUnArchiveNote = () => {

    const { active:note } = useSelector(state => state.note);
    const dispatch = useDispatch();

    const startUnArchiveNote = async () => {

        dispatch(setSaving());

        const noteId = { ...note };
        
        delete noteId.id;
        delete noteId.search;
        delete noteId.tags;
        delete noteId.filter;
        delete noteId.tag;
        
        const unArchivedNote = {
            ...noteId,
            isActived: true,
            isArchived: false
        }

        try{

           const { data } = await noteApi.patch(`/notes/${note.id}`, unArchivedNote );
           dispatch(unArchiveNoteById(data));

        }catch(error){
            console.log(error);
        }
    }

    return { startUnArchiveNote };
}
