import { useDispatch, useSelector } from "react-redux";

import { setSaving, updatedNote } from "../store/note";
import { noteApi } from "../api";

export const useSaveNote = () => {

    const { active:note } = useSelector(state => state.note);
    const dispatch = useDispatch();

    const startSaveNote = async () => {

        dispatch(setSaving());
        const noteId = { ...note };
        delete noteId.id;
        delete noteId.tag;

        try{
            const { data } = await noteApi.patch(`/notes/${note.id}`, noteId );
            dispatch(updatedNote(data));
        }catch(error){
            console.log(error);
        }
    }

    return { startSaveNote };
}
