import { store } from "../../store"
import actionNames from "../../utils/actionNames"

export function addInfoLocally(newInfo){
    return(dispatch, getState) => {
        const {info} = getState()?.generalInfoReducer;
        dispatch({
            type: actionNames?.UPDATE_REDUCER,
            payload: { info: [newInfo]?.concat(info) }
        })
    }
}