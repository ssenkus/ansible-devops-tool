angular.module('AnsibleApp')
    .directive('pageDisplayManager', ['profileRepository',
        function (profileRepository) {

            function linkFn(scope) {
                setPageTitle(scope)


                scope.bodyClasses = function () {
                    var classes = [];
                    classes.push(profileRepository.getBodyClass());
                    return classes;
                };
            }


            function setPageTitle(scope) {
                scope.title = profileRepository.getPageTitle();
            }


            return {
                restrict: 'A',
                link: linkFn

            };

        }]);