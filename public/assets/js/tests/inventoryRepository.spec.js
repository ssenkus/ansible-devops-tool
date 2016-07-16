describe('inventoryRepository', function() {


    var _inventoryRepository,
        _httpBackend;


    beforeEach(module('AnsibleApp'));


    beforeEach(inject(function($httpBackend, inventoryRepository) {
        _httpBackend = $httpBackend;
        _inventoryRepository = inventoryRepository;
    }));


    it('should throw an error if an inventory is not selected', function() {
        // test for throwing an error
        expect(false).toBe(true);

    });

});