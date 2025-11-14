function isValidInteger(value) {
    return Number.isInteger(Number(value)) && Number(value) > 0;
}

export {isValidInteger};