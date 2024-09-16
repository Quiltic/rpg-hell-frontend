

function sortArrayByLevel(_list: any[]) {
    // returns a sorted array based on the objects Level
    // This will mostly be used for spells and creatures
    return _list.sort((l1: { level: any; }, l2: { level: any; }) => {
        return (l1.level ?? 0) - (l2.level ?? 0);
    });
}

function sortArrayByTags(_list: any[]) {

    // returns the sorted array based on a custom sort
    return _list.sort((l1: { tags: any; }, l2: { tags: any; }) => {
        
        const order = ["common 0","uncommon 0","rare 0","legendary 0"];

        const getMinOrderIndex = (tags: any[], _order:string[]) => {
            // Map over the tags and find their index in order
            const indices = tags
                .map(tag => _order.indexOf(tag))
                .filter(index => index !== -1); // Ignore tags that are not in order

            const bonus = tags.includes('magical 0') == true ? 5 : 0; // magic items go last

            return indices.length > 0 ? Math.min(...indices)+bonus : Infinity; // Return the lowest index found
        };

        const firstItemLen = getMinOrderIndex(l1.tags,order);
        const secondItemLen = getMinOrderIndex(l2.tags,order);
        
        return (firstItemLen > secondItemLen) ? -1 : 1;
        
    });
}

function filterBROKENandMONSTER(_list: any[]) {
    // simple cleanup for BROKEN and MONSTER items
    return (_list?.filter((l: { tags: string | string[]; }) => {
        if (l.tags) {
            return l.tags.includes("MONSTER") || l.tags.includes("monster") ||
                l.tags.includes("BROKEN") || l.tags.includes("broken")
                ? ""
                : l.tags;
        }
    }))
};

function filterBROKENandMONSTERreq(_list: any[]) {
    // simple cleanup for BROKEN and MONSTER items
    return (_list?.filter((l: { req: string | string[]; }) => {
        if (l.req) {
            return (l.req.includes("MONSTER 0") || l.req.includes("monster 0") ||
                l.req.includes("BROKEN 0") || l.req.includes("broken 0"))
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
        
        if (l1.req?.includes("OOC 0") || l1.req?.includes("ooc 0") || l1.req?.includes("BROKEN 0") || l1.req?.includes("broken 0")) {
            firstItemLen--;
        }
        if (l2.req?.includes("OOC 0") || l2.req?.includes("ooc 0") || l2.req?.includes("BROKEN 0") || l2.req?.includes("broken 0")) {
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
    sortArrayByTags,
};
