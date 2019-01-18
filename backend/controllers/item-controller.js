

const createItem = (data, cb) => {
    new Item(data).save(cb);
}
const findItem = (query, cb) => {
    Item.find(query, cb);
}
const findById = (id, cb) => {
    Item.findById(id, cb);
}

