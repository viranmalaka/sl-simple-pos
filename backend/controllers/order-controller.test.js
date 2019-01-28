const oc = require('./order-controller');
const ic = require('./item-controller');
require('../test-setup');

let oneOrderId = '';
let oneItemId = '';

test('[SUCCESS] createOrder success', () => {
  expect.assertions(4);
  return oc.create({ status: 'pending' }).then((result) => {
    expect(result).toBeDefined();
    expect(result.status).toEqual('pending');
    expect(Array.isArray(result.items)).toBeTruthy();
    expect(result.items.length).toEqual(0);
    oneOrderId = result._id;
  })
})

// Find order
test('[SUCCESS] findOrder by status gives a non empty array', () => {
  expect.assertions(2);
  return oc.find({ status: 'pending' }).then(result => {
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBeGreaterThanOrEqual(0);
  })
});

test('[SUCCESS] findOrder by ID with previous _id', () => {
  expect.assertions(2);
  return oc.find({ _id: oneOrderId }).then(result => {
    expect(result.length).toEqual(1);
    expect(result[0].status).toEqual('pending');
  })
});

test('[SUCCESS] findOrder by id', () => {
  expect.assertions(2);
  return oc.findById(oneOrderId).then(result => {
    expect(result).toBeDefined();
    expect(result.status).toEqual('pending');
  })
});

test('[SUCCESS] change state of the order', () => {
  expect.assertions(2);
  return oc.changeState(oneOrderId, 'success').then(result => {
    expect(result).toBeDefined();
    expect(result.status).toEqual('success');
  });
});

test('[EXCEPTION] change state of the order, order id not found', () => {
  const demoId = "5c4ad10fcda64b49bf18e373";
  expect.assertions(1);
  return oc.changeState(demoId, 'success').catch(result => {
    expect(result).toEqual('Order Not Found');
  });
});

// TODO: two async functions
test('[SUCCESS] Add item to the order', () => {
  expect.assertions(4);
  return new Promise((resolve, reject) => {
    ic.create({ name: 'test-item', unitPrice: 10 }).then(item => {
      oneItemId = item._id;
      oc.editOrder(oneOrderId, {
        itemId: item._id,
        quantity: 5
      }).then(result => {
        expect(Array.isArray(result.items)).toBeTruthy();
        expect(result.items.length).toEqual(1);
        expect(result.items[0].item).toEqual(item._id);
        expect(result.items[0].quantity).toEqual(5);
        resolve();
      })
    });
  })
})

test('[SUCCESS] edit item in the order', () => {
  expect.assertions(4);
  return oc.editOrder(oneOrderId, {
    itemId: oneItemId,
    quantity: 10
  }). then(result => {
    expect(Array.isArray(result.items)).toBeTruthy();
    expect(result.items.length).toEqual(1);
    expect(result.items[0].item).toEqual(oneItemId);
    expect(result.items[0].quantity).toEqual(10);
  });
});


test('[EXCEPTION] order not found', () => {
  const demoId = "5c4ad10fcda64b49bf18e373";
  expect.assertions(1);
  return oc.editOrder(demoId, {
    itemId: oneItemId,
    quantity: 10
  }).catch(result => {
    expect(result).toEqual('Order Not Found');
  });
});

test('[EXCEPTION] item in order not found', () => {
  const demoId = "5c4ad10fcda64b49bf18e373";
  expect.assertions(1);
  return oc.editOrder(oneOrderId, {
    itemId: demoId,
    quantity: 10
  }).catch(result => {
    expect(result).toEqual('Item Not Found');
  });
});

test('[EXCEPTION] delete Item form order, order Id not found', () => {
  const demoId = "5c4ad10fcda64b49bf18e373";
  expect.assertions(1);
  return oc.deleteItemFromOrder(demoId, demoId).catch(result => {
    expect(result).toEqual('Order Not Found');
  });
});

test('[SUCCESS] Delete item in order', () => {
  expect.assertions();
  return oc.deleteItemFromOrder(oneOrderId, oneItemId).then(result => {
    expect(Array.isArray(result.items)).toBeTruthy();
    expect(result.items.length).toEqual(1);
    expect(result.items[0].item).toEqual(oneItemId);
    expect(result.items[0].quantity).toEqual(10);
  });
});

test('[SUCCESS] Delete Order By Id', () => {
  expect.assertions(4);
  return oc.deleteById(oneOrderId).then(result => {
    expect(Array.isArray(result.items)).toBeTruthy();
    expect(result.items.length).toEqual(1);
    expect(result.items[0].item).toEqual(oneItemId);
    expect(result.items[0].quantity).toEqual(10);
  });
});
