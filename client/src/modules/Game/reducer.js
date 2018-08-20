import { Map, fromJS, List } from 'immutable';

var init = {
    searchValue: "",
    recentColor: "",
    recentItem: "",
    docs: [],
    stockSuccess: "",
    requestSuccess: "",
    similar: [],
    aisle: "",
    bin_id: "",
    tower_id: -1,
}

init = Map(fromJS(init));

export default function reducer(state=init, action) {
    switch(action.type) {
        case 'CLEAR_DOCS': {
            state = state.set("docs", List());
            state = state.set("recentItem", "");
            state = state.set("recentColor", "");
            state = state.set("stockSuccess", "");
            state = state.set("requestSuccess", "");
            break;
        }
        case 'HARD_CLEAR_DOCS': {
            state = state.set("docs", List());
            state = state.set("searchValue", "");
            state = state.set("recentItem", "");
            state = state.set("recentColor", "");
            state = state.set("similar", []);
            state = state.set("aisle", "");
            state = state.set("bin_id", "");
            state = state.set("stockSuccess", "");
            state = state.set("requestSuccess", "");
            break;
        }
        case 'SET_DOCS': {
            state = state.set("docs", List(action.payload));
            break;
        }
        case 'SET_SEARCH_VALUE': {
            state = state.set("searchValue", action.payload);
            state = state.set("stockSuccess", "");
            state = state.set("requestSuccess", "");
            break;
        }
        case 'SET_SEARCH_RESULT': {
            state = state.set("recentColor", action.payload.color);
            state = state.set("recentItem", action.payload.name);
            state = state.set("similar", action.payload.similar);
            state = state.set("aisle", action.payload.aisle);
            state = state.set("bin_id", action.payload.bin_id);
            break;
        }
        case 'SET_STOCK_SUCCESS': {
            state = state.set("stockSuccess", action.payload);
            break;
        }
        case 'SET_REQUEST_SUCCESS': {
            state = state.set("requestSuccess", action.payload);
            break;
        }
        case 'SET_TOWER_ID': {
            state = state.set("tower_id", action.payload);
            break;
        }
        default: {
            break;
        }
    }
    return state;
};
