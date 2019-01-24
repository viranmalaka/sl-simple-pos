const oc = require('./order-controller');
const ic = require('./item-controller');
require('../test-setup');

let oneOrderId = '';

test('createOrder success', () => {
  expect.assertions(4);
  return oc.create({ status: 'pending' }).then((result) => {
    expect(result).toBeDefined();
    expect(result.status).toEqual('pending');
    expect(Array.isArray(result.items)).toBeTruthy();
    expect(result.items.length).toEqual(0);
    oneOrderId = result._id;
  })
})

// Find items
test('findOrder by status gives a non empty array', () => {
  expect.assertions(2);
  return oc.find({ status: 'pending' }).then(result => {
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  })
});

test('findOrder by ID with previous _id', () => {
  expect.assertions(2);
  return oc.find({ _id: oneOrderId }).then(result => {
    expect(result.length).toEqual(1);
    expect(result[0].status).toEqual('pending');
  })
});

test('findOrder by id', () => {
  expect.assertions(2);
  return oc.findById(oneOrderId).then(result => {
    expect(result).toBeDefined();
    expect(result.status).toEqual('pending');
  })
});

test('change state of the order', () => {
  expect.assertions(2);
  return oc.changeState(oneOrderId, 'success').then(result => {
    expect(result).toBeDefined();
    expect(result.status).toEqual('success');
  });
});

// TODO: two async functions
test('Add item to the order', () => {
  expect.assertions(3);
  return new Promise((resolve, reject) => {
    ic.create({ name: 'test-item', unitPrice: 10 }).then(item => {
      oc.editOrder(oneOrderId, {
        itemId: item._id,
        quantity: 5
      }).then(result => {
        expect(Array.isArray(result.items)).toBeTruthy();
        expect(result.items.length).toEqual(1);
        expect(result.items[0].item).toEqual(item._id)
        resolve();
      })
    });
  })
})
// // delete item
// test('delete item by id', () => {
//   expect.assertions(3);
//   return ic.findOneAndDelete(oneItemId).then(result => {
//     expect(result).toBeDefined();
//     expect(result.name).toEqual('jest-test');
//     expect(result.unitPrice).toEqual(10);
//   });
// });

// // find that item again
// test('delete the item successfully', () => {
//   expect.assertions(1);
//   return ic.findById(oneItemId).then(result => {
//     console.log(result);
//     expect(result).toBeNull();
//   });
// });