

function getPersistentPinnedNames(nameOfPinNames: string, objectList) {
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

export {
    getPersistentPinnedNames,
    
};