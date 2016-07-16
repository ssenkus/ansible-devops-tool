AnsibleApp.factory('profileRepository', [function() {

    var  defaultProfile = {
        dataFile: './data.json',
            bodyClass: 'dev',
            pageTitle: 'Ansible DevOps Tool'
    };
    var profileRepository = {
        initialize: function() {
        },
        getDataFile: function() {},
        getDefaultProfile: function() {
            return defaultProfile;
        }
    };


    return profileRepository;
}]);