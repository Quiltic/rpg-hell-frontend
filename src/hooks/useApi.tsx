import "../client";
import {
    OpenAPI,
    CreaturesService,
    ItemsService,
    ObjectsService,
    SpellsService,
    TemporaryService,
    TraitsService,
    UsersService,
} from "../client";

function useApi() {
    // OpenAPI.BASE = "http://localhost:8000";
    
    if (window.localStorage.getItem("useLocalNetwork") != null) { // josh is not able to connnect like normal because he is onthe same network and ISP is fucking with him
        OpenAPI.BASE = window.localStorage.getItem("useLocalNetwork");
    } else {
        OpenAPI.BASE = "https://portof.yokohama";
    }
    
    
    OpenAPI.WITH_CREDENTIALS = true;
    OpenAPI.CREDENTIALS = "include";

    return {
        CreaturesService,
        ItemsService,
        ObjectsService,
        SpellsService,
        TemporaryService,
        TraitsService,
        UsersService,
    };
}

export default useApi;
