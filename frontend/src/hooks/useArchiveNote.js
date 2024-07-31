import { useDispatch, useSelector } from "react-redux";

import { archiveNoteById, setSaving } from "../store/note";
import { noteApi } from "../api";

export const useArchiveNote = () => {

    const { active: note } = useSelector(state => state.note);
    const dispatch = useDispatch();

    const startArchivingNote = async () => {

        dispatch(setSaving());

        const noteId = { ...note };
        delete noteId.id;
        delete noteId.search;
        delete noteId.tags;
        delete noteId.filter;
        delete noteId.tag;

        const archivedNote = {
            ...noteId,
            isArchived: true,
            isActived: false
        }
        console.log(archivedNote);

        try {

            const { data } = await noteApi.patch(`/notes/${note.id}`, archivedNote);
            dispatch(archiveNoteById(data));

        } catch (error) {
            console.log(error);
        }
    }

    return { startArchivingNote };
}
