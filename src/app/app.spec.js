'use strict';
describe( 'AppCtrl', function() {
  var AppCtrl, $location, $scope;

  beforeEach( module( 'ozpWebtopApp' ) );

  beforeEach( inject( function( $controller, _$location_, $rootScope ) {
    $location = _$location_;
    $scope = $rootScope.$new();
    AppCtrl = $controller( 'AppCtrl', { $location: $location, $scope: $scope });
  }));

  it( 'should pass a dummy test', inject( function() {
    expect( AppCtrl ).toBeTruthy();
  }));
});
