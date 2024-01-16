

function getPersistentPinnedNames(nameOfPinNames: string, objectList: Array<any>) {
    const persistentPinnedNames =
                    window.localStorage.getItem(nameOfPinNames);

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
        return(persistentNames);
    }
    return(NaN);
}

function getNames(names: string, objectList: Array<any>) {

    console.log(objectList);
    // split the nameOfNames
    const splitNames = names.split(";|;");
    const _list = splitNames.map((on) => {
        const found = objectList.find((o: any) => {
            return o.name == on;
        });
        return found
            ? found
            : {
                name: "Error",
                effect: `Object "${on}" not found. It either has been edited or deleted. please search for it and remove this entry.`,
            };
    });
    return(_list);
}

export {
    getPersistentPinnedNames,
    getNames,
};