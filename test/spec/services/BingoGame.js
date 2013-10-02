'use strict';

describe('Service: BingoGame', function () {

  // load the service's module
  beforeEach(module('bingoApp'));

  // instantiate service
  var BingoGame;
  beforeEach(inject(function (_BingoGame_) {
    BingoGame = _BingoGame_;
  }));

  it('should do something', function () {
    expect(!!BingoGame).toBe(true);
  });

});
