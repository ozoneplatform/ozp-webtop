'use strict';

describe('Service: Utilities', function () {
  // load the service's module
  beforeEach(module('ozpWebtopApp'));

  // instantiate service
  var Utilities;

  beforeEach(inject(function (_Utilities_) {
    Utilities = _Utilities_;
  }));

  it('should generateUuid', function () {
    var utils = new Utilities();
    var uuid = utils.generateUuid();
    var re = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/;
    expect(uuid.match(re)).not.toBeNull();
  });

  it('should generate unique uuids', function () {
    var uuidsToTest = 100;
    var utils = new Utilities();
    var uuids = [];
    for (var i=0; i < uuidsToTest; i++) {
      uuids.push(utils.generateUuid());
    }

    var uuidsNoDups = utils.eliminateDuplicates(uuids);
    expect(uuids).toEqual(uuidsNoDups);
  });

  it('should eliminateDuplicate values from an array', function() {
    var utils = new Utilities();
    var noDups = ['one', 'two', 'three', 'four'];
    var eliminateDups = utils.eliminateDuplicates(noDups);
    expect(noDups).toEqual(eliminateDups);

    var dups = ['one', 'two', 'two', 'three'];
    eliminateDups = utils.eliminateDuplicates(dups);
    expect(eliminateDups).toEqual(['one', 'two', 'three']);
  });

});
