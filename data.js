    export let guitars = [
        { model: "les paul", make: "gibson", type: "electric solid archtop", year: 1952 },
        { model: "telecaster", make: "fender", type: "electric solid body", year: 1954 },
        { model: "330", make: "rickenbacker", type: "electric semi-hollow body", year: 1958 },
        { model: "casino", make: "epiphone", type: "electric hollow body archtop", year: 1961 },
        { model: "phantom", make: "vox", type: "electric hollow body", year: 1963 },
    ];

    const getAll = () => {
        return guitars;
    }
    
    const getItem = (model) => {
        return guitars.find((guitar) => {
            return guitar.model === model;
        });
    }

    const addItem = (addGuitar) => {
    const guitarList = guitars.length;
        let found = getItem(addGuitar.model);
        if (!found) {
            guitars.push(addGuitar);
        }
        return { added: guitarList !== guitars.length, total: guitars.length };
    };

    const deleteItem = (model) => {
    const guitarList = guitars.length;
        guitars = guitars.filter((item) => {
        return item.model !== model;
        });
        return { deleted: guitarList !== guitars.length, total: guitars.length };
    };

    export { getAll, getItem, addItem, deleteItem };
    

