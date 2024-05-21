import { ApiClassUnion } from "../types/ApiClassUnions";

function getPersistentPinnedNames(
    nameOfPinNames: string,
    objectList: ApiClassUnion[]
    // objectList: Array<ApiClassUnion>
) {
    const persistentPinnedNames = window.localStorage.getItem(nameOfPinNames);

    if (persistentPinnedNames) {
        const splitNames = persistentPinnedNames.split(";|;");
        const persistentNames = splitNames.map((on) => {
            const found = objectList.find((o) => {
                return o.name == on;
            });
            return found
                ? found
                : {
                      name: "Error",
                      effect: `Object "${on}" not found. It either has been edited or deleted. please search for it and remove this entry.`,
                  };
        });
        return persistentNames;
    }
    return [];
}

function getNames(names: string, objectList: ApiClassUnion[]) {
    // console.log(objectList);
    // split the nameOfNames
    const splitNames = names.split(";|;");
    const _list = splitNames.map((on) => {
        const found = objectList.find((o) => {
            return o.name == on;
        });
        return found
            ? found
            : {
                  name: "Error",
                  effect: `Object "${on}" not found. It either has been edited or deleted. please search for it and remove this entry.`,
              };
    });
    return _list;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

function download(content, fileName: string, contentType: string) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}

export { getPersistentPinnedNames, getNames, classNames, download };
