angular.module('AnsibleApp').factory('profileRepository', ['$http', function ($http) {

    var defaultProfile = {
        dataFile: './data.json',
        bodyClass: 'dev',
        pageTitle: 'Ansible DevOps Tool'
    };
    
    var profileRepository = {
        initialize: function () {
            this.getDefaultProfile();
        },
        getDataFile: function () {
            return $http.get(defaultProfile.dataFile);
        },
        getDefaultProfile: function () {
            return defaultProfile;
        },
        getPageTitle: function() {
            return defaultProfile.pageTitle;
        },
        getBodyClass: function() {
            return defaultProfile.bodyClass;
        }

    };

    return profileRepository;
}]);