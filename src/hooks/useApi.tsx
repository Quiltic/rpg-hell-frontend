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
    // OpenAPI.BASE = "http://192.168.1.225";
    OpenAPI.BASE = "http://localhost:8000";
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
