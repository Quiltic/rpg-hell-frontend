import { Item, Trait, Spell, Creature } from "../client";

type PinnedObject = Item | Trait | Spell | Creature;

function getPersistentPinnedNames(
    nameOfPinNames: string,
    objectList: Array<PinnedObject>
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

function getNames(names: string, objectList: Array<PinnedObject>) {
    console.log(objectList);
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

export { getPersistentPinnedNames, getNames, classNames };
