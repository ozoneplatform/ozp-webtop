'use strict';

describe('Service: Dashboards', function () {
  // load the service's module
  beforeEach(module('ozp.common.localStorage'));

  // instantiate service
  var LocalStorage;
  beforeEach(inject(function (_LocalStorage_) {
    LocalStorage = _LocalStorage_;
  }));

  it('has a constructor', function() {
    var wc = new LocalStorage(localStorage, JSON);
    expect(wc).toBeDefined();
  });

  it('should support basic KV store methods', function() {
    var wc = new LocalStorage(localStorage, JSON);

    // save an element
    wc.setItem('myKey', 'myValue');
    expect(wc.hasItem('myKey')).toBeTruthy();

    // get the value
    var myVal = wc.getItem('myKey');
    expect(myVal).toBe('myValue');

    // now clear it
    wc.clear();
    myVal = wc.getItem('myKey');
    expect(myVal).toBeNull();
    expect(wc.hasItem('myKey')).toBeFalsy();
  });

  it('should support removing of individual elements', function() {
    var wc = new LocalStorage(localStorage, JSON);
    // save some elements
    wc.setItem('key1', 'val1');
    wc.setItem('key2', 'val2');
    wc.setItem('key3', 'val3');
    expect(wc.hasItem('key1')).toBeTruthy();
    expect(wc.hasItem('key2')).toBeTruthy();
    expect(wc.hasItem('key3')).toBeTruthy();

    // remove key2
    wc.removeItem('key2');
    expect(wc.hasItem('key1')).toBeTruthy();
    expect(wc.hasItem('key2')).toBeFalsy();
    expect(wc.hasItem('key3')).toBeTruthy();
  });

  it('should support JSON serialization of objects', function() {
    var wc = new LocalStorage(localStorage, JSON);
    var myObj = {
          'firstName': 'joe',
          'lastName': 'smith',
          'favoriteNumbers': [1,2,3,5,8],
          'pet': {
            'name': 'max',
            'type': 'dog'
          }
        };
    wc.setItem('myObj', myObj);
    var cachedObj = wc.getItem('myObj');

    expect(cachedObj.lastName).toBe('smith');
    expect(cachedObj.favoriteNumbers[2]).toBe(3);
    expect(cachedObj.pet.type).toBe('dog');
  });
});