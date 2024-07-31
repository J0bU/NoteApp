import { useDispatch, useSelector } from "react-redux";

import { deleteTag, setSaving  } from "../store/note";
import { noteApi } from "../api";

export const useDeleteTag = () => {

    const { active:note } = useSelector(state => state.note);
    const dispatch = useDispatch();

    const value = note.tag;
    const newTags = note.tags.filter(note => note !== value);

    const startDeletingTag = async () => {
        
        dispatch(setSaving());
        const { data } = await noteApi.patch(`/notes/${note.id}`, {tags: newTags} )
        dispatch(deleteTag(data));
    }

    return { startDeletingTag };
}
