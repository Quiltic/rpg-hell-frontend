

function sortArrayByLevel(_list: any[]) {
    // returns a sorted array based on the objects Level
    // This will mostly be used for spells and creatures
    return _list.sort((l1: { level: any; }, l2: { level: any; }) => {
        return (l1.level ?? 0) - (l2.level ?? 0);
    });
}

function filterBROKENandMONSTER(_list: any[]) {
    // simple cleanup for BROKEN and MONSTER items
    return (_list?.filter((l: { tags: string | string[]; }) => {
        if (l.tags) {
            return l.tags.includes("MONSTER") ||
                l.tags.includes("BROKEN")
                ? ""
                : l.tags;
        }
    }))
};

function filterBROKENandMONSTERreq(_list: any[]) {
    // simple cleanup for BROKEN and MONSTER items
    return (_list?.filter((l: { req: string | string[]; }) => {
        // console.log(l.req)
        if (l.req) {
            return (l.req.includes("MONSTER") ||
                l.req.includes("BROKEN"))
                ? ""
                : l.req;
        }
    }))
};

function sortArrayByReqs(_list: any[]) {
    // first sorts by name so that items that dont have req can be properly sorted
    const _listSortedByName = _list?.sort((l1: { name: any; }, l2: { name: any; }) => {
        return (l1.name ?? "") < (l2.name ?? "") ? -1 : 1;
    });

    // returns the sorted array based on a custom sort
    return _listSortedByName.sort((l1: { req: any; }, l2: { req: any; }) => {
        
        // get the length of the items req removing OOC because it shouldent be there for this case
        let firstItemLen = l1.req.length;
        let secondItemLen = l2.req.length;
        
        if (l1.req?.includes("OOC")) {
            firstItemLen--;
        }
        if (l2.req?.includes("OOC")) {
            secondItemLen--;
        }

        // if they are the same length sort by level
        if (firstItemLen == secondItemLen) {
            return (l1.req ?? "") < (l2.req ?? "0") ? -1 : 1;
        }
        
        // Single items are selected before nonsingle
        return (firstItemLen < secondItemLen) ? -1 : 1;
        
    });
}

export {
    sortArrayByLevel,
    filterBROKENandMONSTER,
    filterBROKENandMONSTERreq,
    sortArrayByReqs,
};
