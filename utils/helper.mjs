function isValidId(value) {
    return Number.isInteger(Number(value)) && Number(value) > 0;
}

function isValidLimit(value) {
    return Number.isInteger(Number(value)) && Number(value) > 0;
}