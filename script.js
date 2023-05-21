function parseArrayFromGraphQL(strings) {
    const keyIsNotExist = (pointer, key) => pointer[key] === undefined;
    const keyIsEqualTrue = (pointer, key) => pointer[key] === true;
    const keyIsObject = (pointer, key) => typeof pointer[key] === "object";
    const isLastElemInArray = (index, arr) => index === arr.length - 1;

    const result = { include: {} };

    strings.forEach(string => {
        const keys = string.split(".");
        
        let pointer = result.include;
        const movePointerDown = key => pointer = pointer[key].include;

        keys.forEach((key, index, arr) => {
            if (keyIsObject(pointer, key)) {
                movePointerDown(key);
                return;
            }
            
            if (keyIsNotExist(pointer, key) && isLastElemInArray(index, arr)) {
                pointer[key] = true;
                return;
            }
            
            if (keyIsNotExist(pointer, key) || keyIsEqualTrue(pointer, key)) {
                pointer[key] = { include: {} };
                movePointerDown(key);
            }
        })
    })

    return result;
}

// const arr1 = ["composers", "templates", "template.composer", "template.composer.CompanyUsers", "template.versions", "versions"]
// const arr2 = ["composers", "composers.template", "composers.template.book", "composers.template.book.author", "composers.template.book.author.style", "versions"]
// const arr3 = ["composers", "templates", "composer", "template.composer", "template.versions", "versions"];

// console.log(parseArrayFromGraphQL(arr1));
// console.log(parseArrayFromGraphQL(arr2));
// console.log(parseArrayFromGraphQL(arr3));