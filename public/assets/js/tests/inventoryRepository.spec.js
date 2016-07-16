describe('inventoryRepository', function() {


    var _inventoryRepository,
        _httpBackend;


    beforeEach(module('AnsibleApp'));


    beforeEach(inject(function($httpBackend, inventoryRepository) {
        _httpBackend = $httpBackend;
        _inventoryRepository = inventoryRepository;
    }));

    afterEach(function() {
        _httpBackend.verifyNoOutstandingRequest();
        _httpBackend.verifyNoOutstandingExpectation();
    });

    it('should throw error if options are not set', function() {
        // test for throwing an error
       expect(function() {
           _inventoryRepository.getInventory({})
       }).toThrow('No options when getting inventory');
    });

    it('should make a request to the middleware', function() {
        _inventoryRepository.getInventory({ inventoryFile: 'test'});
        _httpBackend.expectGET('/inventory?inventoryFile=test').respond();
        _httpBackend.flush();
    });


});