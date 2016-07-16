AnsibleApp.factory('inventoryRepository', ['$http', function($http) {


    var inventoryEndpoint = '/inventory';
    
    
    var inventoryRepository = {

        getInventory: function(options) {
            if (!options) {
                throw "No options when getting inventory";
            }

            return $http({
                method: 'GET',
                url: inventoryEndpoint,
                params: {
                    inventoryFile: options.inventoryFile
                }
            });
            
        }
    };
    
    return inventoryRepository;
}]);