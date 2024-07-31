import { useDispatch, useSelector } from "react-redux";

import { deleteNoteById, setSaving } from "../store/note";
import { noteApi } from "../api";

export const useDeleteNote = () => {

    const { active: note } = useSelector(state => state.note);
    const dispatch = useDispatch();

    const startDeletingNote = async () => {

        dispatch(setSaving());
        const noteId = { ...note };
        delete noteId.id;

        try {

            await noteApi.delete(`/notes/${note.id}`);

        } catch (error) {

            console.log(error);

        }
        dispatch(deleteNoteById(note.id));
    }

    return { startDeletingNote };
}
