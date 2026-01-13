///////// Helper functions /////////

function getMinOrderIndex (tags: any[], _order:string[]) {
    // used to find order in a listing of tags (though can be used in other areas)

    // Map over the tags and find their index in order
    const indices = tags
        .map(tag => _order.indexOf(tag))
        .filter(index => index !== -1); // Ignore tags that are not in order

    const bonus = tags.includes('magical 0') == true ? 5 : 0; // magic items go last

    return indices.length > 0 ? Math.min(...indices)+bonus : Infinity; // Return the lowest index found
};

function listSortByName(_list: any[]) {
    return _list?.sort((l1: { name: any; }, l2: { name: any; }) => {
        return (l1.name ?? "") > (l2.name ?? "") ? -1 : 1;
    })
};


///////// Filter functions /////////
// TODO - Only being used in creatures, once creatures is cleaned up and added to backend remove this


function filterBROKENandMONSTER(_list: any[]) {
    // simple cleanup for BROKEN and MONSTER items
    return (_list?.filter((l: { tags: string | string[]; }) => {
        if (l.tags) {
            return l.tags.includes("monster") || l.tags.includes("broken")
                ? ""
                : l.tags;
        }
    }))
};

function filterBROKENandMONSTERreq(_list: any[]) {
    // simple cleanup for BROKEN and MONSTER items
    return (_list?.filter((l: { req: string | string[]; }) => {
        if (l.req) {
            return (l.req.includes("monster 0") || l.req.includes("broken 0"))
                ? ""
                : l.req;
        }
    }))
};




///////// Output functions /////////

function sortArrayByLevel(_list: any[]) {
    // returns a sorted array based on the objects Level

    // I do not know why this needs to be flipped for just level, but for some reason it returns the list backwards only in this instance
    const listSortedByName = _list?.sort((l1: { name: any; }, l2: { name: any; }) => {
        return (l1.name ?? "") < (l2.name ?? "") ? -1 : 1;
    });//listSortByName(_list);

    // This will mostly be used for spells and creatures
    return listSortedByName.sort((l1: { level: any; }, l2: { level: any; }) => {
        return (l1.level ?? 0) - (l2.level ?? 0);
    });
}

function sortArrayByTags(_list: any[], _order: string[]) {
    // first sorts by name so that items that dont have req can be properly sorted
    const listSortedByName = listSortByName(_list);

    return listSortedByName.sort((l1: { tags: any; }, l2: { tags: any; }) => {

        const firstItemLen = getMinOrderIndex(l1.tags,_order);
        const secondItemLen = getMinOrderIndex(l2.tags,_order);
        
        return (firstItemLen < secondItemLen) ? -1 : 1;
        
    });
}

function sortArrayByReqs(_list: any[]) {
    // first sorts by name so that items that dont have req can be properly sorted
    const listSortedByName = listSortByName(_list);

    return listSortedByName.sort((l1: { req: any; }, l2: { req: any; }) => {
        
        // get the length of the items req removing OOC because it shouldent be there for this case
        let firstItemLen = l1.req.length;
        let secondItemLen = l2.req.length;
        
        if (l1.req?.includes("ooc 0") || l1.req?.includes("broken 0")) {
            firstItemLen--;
        }
        if (l2.req?.includes("ooc 0") || l2.req?.includes("broken 0")) {
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


function sortSpells(_list: any[]) {
    // returns a sorted array based on the objects Level

    // I do not know why this needs to be flipped for just level, but for some reason it returns the list backwards only in this instance
    let listSortedByName = listSortByName(_list);

    listSortedByName = listSortedByName.sort((l1: { stat: any; }, l2: { stat: any; }) => {
        
        // get the length of the items req removing OOC because it shouldent be there for this case
        let firstItemLen = l1.stat.length;
        let secondItemLen = l2.stat.length;
        
        if (l1.stat?.includes("ooc 0") || l1.stat?.includes("broken 0")) {
            firstItemLen--;
        }
        if (l2.stat?.includes("ooc 0") || l2.stat?.includes("broken 0")) {
            secondItemLen--;
        }

        // if they are the same length sort by level
        if (firstItemLen == secondItemLen) {
            return (l1.stat ?? "") < (l2.stat ?? "0") ? -1 : 1;
        }
        
        // Single items are selected before nonsingle
        return (firstItemLen < secondItemLen) ? -1 : 1;
        
    });

    // This will mostly be used for spells and creatures
    return listSortedByName.sort((l1: { level: any; }, l2: { level: any; }) => {
        return (l1.level ?? 0) - (l2.level ?? 0);
    });
}


function sortItems(_list: any[]) {
    // I cant get it to sort items in the way i want with sort tags and sort req since they need to be sorted at the same time rather than one after another

    // first sorts by name so that items that dont have req can be properly sorted
    const listSortedByName = listSortByName(_list);
    console.log(_list);

    return listSortedByName.sort((l1: { rarity: string, tags: string; }, l2: { rarity: string, tags: string; }) => {
        const order = ["mundane","common","uncommon","rare","legendary"];
        const IterativeItemLevels = [
            "weapon","armor","medicine","alchemical","consumable","tool","mysc","magical",
            // "body","mind","soul","arcana","charm","crafting","medicine","nature","thieving",
        ];

        let firstItemLen = getMinOrderIndex(l1.tags.split(", "),IterativeItemLevels); 
        let secondItemLen = getMinOrderIndex(l2.tags.split(", "),IterativeItemLevels);

        firstItemLen += order.indexOf(l1.rarity)*10;// mult by 10 so we get rarity folowed by req (## = rarity type)
        secondItemLen += order.indexOf(l2.rarity)*10;
        
        // get the length of the items req removing broken because it shouldent be there for this case
        // firstItemLen += l1.req.length;
        // secondItemLen += l2.req.length;
        
        // if (l1.req?.includes("broken 0")) {
        //     firstItemLen--;
        // }
        // if (l2.req?.includes("broken 0")) {
        //     secondItemLen--;
        // }

        // if they are the same length sort by level
        // if (firstItemLen == secondItemLen) {
        //     return (l1.req ?? "") < (l2.req ?? "0") ? -1 : 1;
        // }
        
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
    sortItems,
    sortSpells
};
