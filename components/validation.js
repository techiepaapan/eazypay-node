checkJSON = (data) => {
    try {
        JSON.parse(data);
        return true;
    } catch (error) {
        return false;
    }
}

getTypeOf = (value) => {
    if (Array.isArray(value)) return 'array';
    else if (typeof value === 'string') return 'string';
    else if (value !== null && typeof value === 'object') return 'object';
    else return 'other';
}

module.exports = { checkJSON, getTypeOf };