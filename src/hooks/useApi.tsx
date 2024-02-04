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
    OpenAPI.BASE = "https://portof.yokohama";
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
