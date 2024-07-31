import { useDispatch, useSelector } from "react-redux";

import { noteApi } from "../api";
import { filterSearch } from "../store/note";

export const useSearchTag = () => {

    const { active } = useSelector(state => state.note);
    const dispatch = useDispatch();

    const startSearchingFilter = async () => {
        const term = active.filter;
        try {
            const {data} = await noteApi.get(`/notes/${term}`);
            dispatch(filterSearch(data));
        }catch(error){
            console.log(error);
        }
    }

    return { startSearchingFilter };
}
