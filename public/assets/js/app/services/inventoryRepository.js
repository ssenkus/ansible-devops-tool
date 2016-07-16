AnsibleApp.factory('inventoryRepository', ['$http', function($http) {

    function hasValidOptions(options) {
        return (options && options.inventoryFile);
    }

    function requestInventoryFile(options   ) {
       return $http({
            method: 'GET',
            url: inventoryEndpoint,
            params: {
                inventoryFile: options.inventoryFile
            }
        });
    }

    var inventoryEndpoint = '/inventory',
        inventoryRepository = {

        getInventory: function(options) {

            if (!hasValidOptions(options)) {
                throw "No options when getting inventory";
            }

            return requestInventoryFile(options);
        }
    };

    return inventoryRepository;
}]);