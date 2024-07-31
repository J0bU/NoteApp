import { useDispatch, useSelector } from "react-redux";

import { noteApi } from "../api";
import { addNewEmptyNote, isSavingNote, setActiveNote } from "../store/note/noteSlice";

export const useCreateNote = () => {

    const { isSaving, active } = useSelector(state => state.note);
    const dispatch = useDispatch();

    const newNote = {
        title: "",
        description: "Note was created but not updated!",
        isActived: true,
        isArchived: false,
        tags: [],
    }

    const startNewNote = async () => {

        dispatch(isSavingNote());

        try {
            console.log(newNote)
            const { data } = await noteApi.post('/notes', newNote);
            newNote.id = data.id;
            newNote.isActived = true;
        } catch (error) {
            console.log(error);
        }
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }

    return { isSaving, active, startNewNote };
}
