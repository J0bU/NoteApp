import { useDispatch, useSelector } from "react-redux";

import { isSavingNote, addNewTag } from "../store/note";
import { noteApi } from "../api";

export const useCreateTag = () => {

    const { active: note } = useSelector(state => state.note);
    const dispatch = useDispatch();

    const startNewTag = async () => {

        dispatch(isSavingNote());

        const value = note.tag;
        const newTags = [...note.tags];
        newTags.push(value);

        try {
            const { data } = await noteApi.patch(`/notes/${note.id}`, { tags: newTags });
            dispatch(addNewTag(data));
        } catch (error) {
            console.log(error);
        }
    }

    return { startNewTag };
}
