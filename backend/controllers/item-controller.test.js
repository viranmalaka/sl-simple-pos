const ic = require('./item-controller');
require('../test-setup');

let oneItemId = '';

// Create item
test('createItem validation failed', () => {
  expect.assertions(1);
  return ic.create({}).catch((result) => {
    expect(result).toBeDefined();
  });
})
  
test('createItem success', () => {
  expect.assertions(3);
  return ic.create({name: 'jest-test', unitPrice: 10}).then((result) => {
    expect(result).toBeDefined();
    expect(result.name).toEqual('jest-test');
    expect(result.unitPrice).toEqual(10);
  })
})


// Find items
test('findItem gives a non empty array', () => {
  expect.assertions(2);
  return ic.find({name: 'jest-test'}).then(result => {
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  })
});

test('findItem by name return only one item', () => {
  expect.assertions(3);
  return ic.find({name: 'jest-test'}).then(result => {
    expect(result.length).toEqual(1);
    expect(result[0].name).toEqual('jest-test');
    expect(result[0].unitPrice).toEqual(10);
    oneItemId = result[0]._id
  })
});

test('findItem by ID with previous _id', () => {
  expect.assertions(3);
  return ic.find({_id: oneItemId}).then(result => {
    expect(result.length).toEqual(1);
    expect(result[0].name).toEqual('jest-test');
    expect(result[0].unitPrice).toEqual(10);
  })
});

test('findItem by id', () => {
  expect.assertions(3);
  return ic.findById(oneItemId).then(result => {
    expect(result).toBeDefined();
    expect(result.name).toEqual('jest-test');
    expect(result.unitPrice).toEqual(10);
  })
});

// delete item
test('delete item by id', () => {
  expect.assertions(3);
  return ic.findOneAndDelete(oneItemId).then(result => {
    expect(result).toBeDefined();
    expect(result.name).toEqual('jest-test');
    expect(result.unitPrice).toEqual(10);
  });
});

// find that item again
test('delete the item successfully', () => {
  expect.assertions(1);
  return ic.findById(oneItemId).then(result => {
    expect(result).toBeNull();
  });
});