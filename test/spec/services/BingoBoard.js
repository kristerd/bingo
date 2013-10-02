'use strict';

describe('Service: BingoBoard', function () {

  // load the service's module
  beforeEach(module('bingoApp'));

  // instantiate service
  var BingoBoard;
  beforeEach(inject(function (_BingoBoard_) {
    BingoBoard = _BingoBoard_;
  }));

  it('should do something', function () {
    expect(!!BingoBoard).toBe(true);
  });

});
