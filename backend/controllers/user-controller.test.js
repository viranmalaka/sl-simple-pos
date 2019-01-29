const uc = require('./user-controller');
require('../test-setup');

let oneUserId = '';
let aToken = '';

// Create user
test('[EXCEPTION] createUser user validation fail', () => {
  expect.assertions(2);
  return uc.createUser({}).catch(err => {
    expect(err).toBeDefined();
    expect(err[1]).toEqual('username is Required');
  })
})

test('[EXCEPTION] createUser user validation fail - only username', () => {
  expect.assertions(2);
  return uc.createUser({username: 'test-user'}).catch(err => {
    expect(err).toBeDefined();
    expect(err[1]).toEqual('Password is Required');
  })
})

test('[EXCEPTION] createUser user validation fail - only password', () => {
  expect.assertions(2);
  return uc.createUser({password: 'test'}).catch(err => {
    expect(err[1]).toEqual('username is Required');
    expect(err).toBeDefined();
  })
})

test('[SUCCESS] createUser success', () => {
  expect.assertions(3);
  return uc.createUser({username: 'test-user', password: 'test'}).then(result => {
    expect(result).toBeDefined();
    expect(result.username).toEqual('test-user');
    expect(result.password).not.toBeNull();
  })
})

test('[EXCEPTION] createUser user validation fail - user already exist', () => {
  expect.assertions(2);
  return uc.createUser({username: 'test-user', password: 'test'}).catch(err => {
    expect(err[1]).toEqual('username already exist');
    expect(err).toBeDefined();
  })
})


test('[EXCEPTION] Login', () => {
  expect.assertions(2);
  return uc.login({}).catch(err => {
    expect(err).toBeDefined();
    expect(err[1]).toEqual('User Not Found');
  })
});

test('[EXCEPTION] Login', () => {
  expect.assertions(2);
  return uc.login({username : 'test-user', password: ''}).catch(err => {
    expect(err).toBeDefined();
    expect(err[1]).toEqual('Invalid Password');
  })
});

test('[SUCCESS] Login', () => {
  expect.assertions(2);
  return uc.login({username : 'test-user', password: 'test'}).then(result => {
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThanOrEqual(30);
    aToken = result;
  })
});

test('[EXCEPTION] verify token', (done) => {
  expect.assertions(1);
  return uc.verifyToken('asdfasdf', result => {
    expect(result).toBeFalsy();
    done();
  })
});

test('[SUCCESS] verify token', (done) => {
  expect.assertions(2);
  return uc.verifyToken(aToken, result => {
    expect(result).toBeDefined();
    expect(result.username).toEqual('test-user');
    done();
  })
});

test('[SUCCESS] delete user by username', () => {
  expect.assertions(2);
  return uc.findOneAndDelete({username: 'test-user'}).then(result => {
    expect(result).toBeDefined();
    expect(result.username).toEqual('test-user');
  })
});