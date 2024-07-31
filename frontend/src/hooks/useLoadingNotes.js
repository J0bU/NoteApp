import { useDispatch } from "react-redux";

import { loadNotes } from "../helpers";
import { setNotes } from "../store/note";

export const useLoadingNotes = () => {

    const dispatch = useDispatch();

    const startLoadingNotes = async () => {
        const {data} = await loadNotes();
        dispatch(setNotes(data));
    }
    return {
        startLoadingNotes,
    };
}
