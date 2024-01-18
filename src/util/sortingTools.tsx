

function sortArrayByLevel(_list) {
    // returns a sorted array based on the objects Level
    // This will mostly be used for spells and creatures
    return _list.sort((l1, l2) => {
        return (l1.level ?? 0) - (l2.level ?? 0);
    });
}

function filterBROKENandMONSTER(_list) {
    // simple cleanup for BROKEN and MONSTER items
    return (_list?.filter((l) => {
        if (l.tags) {
            return l.tags.includes("MONSTER") ||
                l.tags.includes("BROKEN")
                ? ""
                : l.tags;
        }
    }))
};

function filterBROKENandMONSTERreq(_list) {
    // simple cleanup for BROKEN and MONSTER items
    return (_list?.filter((l) => {
        if (l.req) {
            return l.req.includes("MONSTER") ||
                l.req.includes("BROKEN")
                ? ""
                : l.req;
        }
    }))
};

function sortArrayByReqs(_list) {
    // first sorts by name so that items that dont have req can be properly sorted
    const _listSortedByName = _list?.sort((l1, l2) => {
        // console.log(t.name);
        return (l1.name ?? "") < (l2.name ?? "") ? -1 : 1;
    });

    

    // returns the sorted array based on a custom sort
    return _listSortedByName.sort((l1, l2) => {
        // console.log(t.name);
        return (l1.req ?? "") < (l2.req ?? "0") ? -1 : 1;
    });
}

export {
    sortArrayByLevel,
    filterBROKENandMONSTER,
    filterBROKENandMONSTERreq,
    sortArrayByReqs,
};
