describe('profileRepository', function() {

    var _profileRepository,
        _httpBackend;

    beforeEach(module('AnsibleApp'));

    beforeEach(inject(function($httpBackend, profileRepository) {
        _httpBackend = $httpBackend;
        _profileRepository = profileRepository;
    }));

    afterEach(function() {
        _httpBackend.verifyNoOutstandingRequest();
        _httpBackend.verifyNoOutstandingExpectation();
    });
/*
    it('should throw error if options are not set', function() {
        expect(function() {
            _inventoryRepository.getInventory({})
        }).toThrow('No options when getting inventory');
    });

    it('should make a request to the middleware', function() {
        _inventoryRepository.getInventory({ inventoryFile: 'test'});
        _httpBackend.expectGET('/inventory?inventoryFile=test').respond();
        _httpBackend.flush();
    });

    it('should detect when a user has not selected an inventory', function() {
        var givenInventory;
        var emptyInventory = _inventoryRepository.isInventoryEmpty(givenInventory);
        expect(emptyInventory).toBe(true);
    });

    it('should detect a production inventory', function() {
        var givenInventory = 'production';
        var isProductionInventory = _inventoryRepository.isProductionInventory(givenInventory);
        expect(isProductionInventory).toBe(true);
    });
*/
});