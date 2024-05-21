import { Item } from "../client/models/Item";
import { Trait } from "../client/models/Trait";

function dictionaryItems(_items: Item[]) {

    let itemsDict = Object.fromEntries(_items.map(({name,...rest}) => [name, rest])); // provided by https://stackoverflow.com/questions/61379389/mapping-an-array-of-objects-to-dictionary-in-typescript

    for (const [key, value] of Object.entries(itemsDict)) {
        let itemTags = Object.fromEntries(value.tags.map(tag => 
            {
                let segments = tag.split(" "); 
                let output = [];
                // console.log(segments);
                
                if( segments[1] == "damage" ) {
                    output = ['damage', parseInt(segments[0])];
                } else {
                    output = [segments[0], parseInt(segments[1])];
                }

                if (Number.isNaN(output[1])) {
                    output[1] = 0;
                }

                return output;
            }
        ));

        itemsDict[key].tags = itemTags;
    }

    // console.log(itemsDict);

    return (itemsDict);
}

function upgradeItem(itemsDict, _stackEffects: string[]){

    // console.log(itemsDict);

    for(const effect of _stackEffects){
        const name = effect.substring(0,effect.indexOf(" - "));
        const item = itemsDict[name];

        let effectTags = Object.fromEntries(effect.substring(effect.indexOf(" - ")+3).split(",").map(tag => 
            {
                let segments = tag.split(" "); 
                let output = [];
                
                if( segments[1] == "damage" ) {
                    output = ['damage', parseInt(segments[0])];
                } else {
                    output = [segments[0], parseInt(segments[1])];
                }

                if (Number.isNaN(output[1])) {
                    output[1] = 0;
                }

                return output;
            }
        ));

        for (const [key, value] of Object.entries(effectTags)) {
            if (item.tags[key] == undefined) {
                item.tags[key] = value;
            } else {
                item.tags[key] = item.tags[key] + value;
            }
        }
    }
    return (itemsDict);
}


function sumTags(_items){
    // console.log(_items);
    
    let totalTags = {};

    for (const [name, item] of Object.entries(_items)) {
        for (const [key, value] of Object.entries(item.tags)) {
            // console.log(key,value);
            if (totalTags[key] == undefined) {
                totalTags[key] = value;
            } else {
                totalTags[key] = totalTags[key] + value;
            }
            
        }
    }
    return (totalTags);
}


function createItemLines(updatedItems){
    

    let active = [];
    let passive = [];
    let items = [];

    for (const [name, value] of Object.entries(updatedItems)) {

        value.tags = Object.entries(value.tags).map(([tagName, tagValue]) => `${tagName} ${tagValue}`);

        if (value.tags.join("").includes("weapon") || value.tags.join("").includes("grenade")) {
            active.push(`${name} - ## - ${value.tags.join(", ").replace(" 0","")}\n${value.effect}\n`.replace("\n\n","\n"));
        }
        else if (value.tags.join("").includes("medicine")) {
            active.push(`${name} - # - ${value.tags.join(", ").replace(" 0","")}\n${value.effect}\n`.replace("\n\n","\n"));
        }
        else if (value.tags.join("").includes("armor")) {
            passive.push(`${name} - ${value.tags.join(", ").replace(" 0","")}\n${value.effect}\n`.replace("\n\n","\n"));
        }
        else {
            items.push(`${name} - ${value.tags.join(", ").replace(" 0","")}\n${value.effect}\n`.replace("\n\n","\n"));
        }

        

    }

    // console.log(active,passive,items);
    return ([active,passive,items]);
    
}

function createTraitLines(_traits: Trait[], activeLines: string[], passiveLines: string[]) {

    const remove = ["swimmer", "climber", "flight"];
    _traits = _traits.filter(trait => !remove.includes(trait.name));

    for (const t of _traits) {
        if (t.dice != 0) {
            activeLines.push(`${t.name} - ${"#".repeat(t.dice ?? 1) ?? "P"}\n${t.effect}\n`);
        } else {
            passiveLines.push(`${t.name}\n${t.effect}\n`)
        }
    }

    // console.log(traitLines);
}


export { createTraitLines, createItemLines, upgradeItem, dictionaryItems, sumTags};