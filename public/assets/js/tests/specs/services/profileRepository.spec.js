describe('profileRepository', function() {

    var _profileRepository,
        _httpBackend;

    beforeEach(module('AnsibleApp'));

    beforeEach(inject(function($httpBackend, profileRepository) {
        _httpBackend = $httpBackend;
        _profileRepository = profileRepository;
    }));

    beforeEach(function() {
        _profileRepository.initialize();
    });

    afterEach(function() {
        _httpBackend.verifyNoOutstandingRequest();
        _httpBackend.verifyNoOutstandingExpectation();
    });

    it('should fetch the data file', function() {
        _profileRepository.getDataFile();
        _httpBackend.expectGET('./data.json').respond();
        _httpBackend.flush();
    });

    it('should get the page title from the profile', function() {
        expect(_profileRepository.getPageTitle()).toBe('Ansible DevOps Tool');
    });

    it('should get the body class from the profile', function() {
        expect(_profileRepository.getBodyClass()).toBe('dev');
    });

});