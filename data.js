    let guitars = [
    { model : "les paul", make: "gibson", type: "electric solid archtop", year: 1952 },
    { model : "telecaster", make: "fender", type: "electric solid body", year: 1954 },
    { model : "330", make: "rickenbacker", type: "electric semi-hollow body", year: 1958 },
    { model : "casino", make: "epiphone", type: "electric hollow body archtop", year: 1961 },
    { model : "phantom", make: "vox", type: "electric hollow body", year: 1963 },
    ];

    const getAll = () => {
        let string = JSON.stringify(guitars, null, 5);
        return string;
    }
    
    const getItem = (query) => {
        return JSON.stringify(guitars.filter((guitar) => {
        return guitar['model'] == query;
        }));
    } 

    export { getAll, getItem };
    

