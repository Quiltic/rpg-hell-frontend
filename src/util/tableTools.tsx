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

function download(content:any, fileName: string, contentType: string) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}

function getAllCombinations(arr: string[]): string { // Made with Chat GPT (I was running out of time)
    // Filter out empty strings
    const filteredArr = arr.filter(str => str !== "");

    // Recursive helper function to generate permutations
    function permute(arr: string[]): string[][] {
        if (arr.length <= 1) return [arr];
        
        const result: string[][] = [];
        
        for (let i = 0; i < arr.length; i++) {
            const current = arr[i];
            const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
            const remainingPermutations = permute(remaining);

            for (const perm of remainingPermutations) {
                result.push([current, ...perm]);
            }
        }
        
        return result;
    }

    // Generate all permutations and join with .*
    const allPermutations = permute(filteredArr);
    return allPermutations.map(permutation => permutation.join(".*")).join("|");
}

export { getPersistentPinnedNames, getNames, classNames, download, getAllCombinations };
