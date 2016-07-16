AnsibleApp.controller('MainCtrl',
    ['$scope', '$http', '$sce', '$timeout', 'inventoryRepository', 'profileRepository', 'dialogManager', 'socketHandler',
        function($scope, $http, $sce, $timeout, inventoryRepository, profileRepository, dialogManager, socketHandler) {

            var profiles = {
                defaultProfile: {
                    dataFile: './data.json',
                    bodyClass: 'dev',
                    pageTitle: 'Ansible DevOps Tool'
                }
            };

            var selectedProfile = null,
                socket = null;

            $scope.command_output = '';
            $scope.debug = true;
            $scope.title = null;
            $scope.outputScrollEnabled = false;

            $scope.initialize = function () {
                // todo: add stuff to profileRepo
                profileRepository.initialize();
                // add these two to profile repo
                setSelectedProfile();
                setPageTitle();
                
                
                initializeAppFromDataFile();
                
                socketHandler.connectSocketIo();
                socketHandler.registerSocketHandlers(function (data) {
                    $scope.$apply(function() {
                        if (data.done) {
                            $scope.actionClicked = false;
                            dialogManager.showPlaybooksEnd();
                        } else {
                            $scope.command_output = $sce.trustAsHtml(
                                $scope.command_output +
                                ansi_up.ansi_to_html(data.output)
                            );

                            if ($scope.outputScrollEnabled == true) {
                                $timeout(function() {
                                    window.scrollTo(0, document.body.scrollHeight);
                                }, 100);
                            }
                        }
                    });
                });
            };

            $scope.bodyClasses = function() {
                var classes = [];
                classes.push(selectedProfile.bodyClass);
                return classes;
            };

            $scope.getInventoryFile = function() {
                inventoryRepository.getInventory({
                    inventoryFile: $scope.inventory
                }).then(function(response) {
                    $scope.selectedInventoryFile = response.data.fileContents;
                });
            };


            // convert to directive
            $scope.hoverOverTask = function(playbooks) {
                if (!$scope.actionClicked) {
                    $scope.pbs = playbooks;
                }
            };

            // convert to directive
            $scope.hoverOutTask = function() {
                if (!$scope.actionClicked) {
                    $scope.pbs = null;
                }
            };

            $scope.action = function(name, playbooks) {
                var input = '';
                $scope.actionClicked = true;
                $scope.pbs = playbooks;

                if (inventoryRepository.isInventoryEmpty($scope.inventory)) {
                    dialogManager.promptUserToSelectEnvironment();
                    resetUi();
                    return;
                }

                if (inventoryRepository.isProductionInventory($scope.inventory)) {
                    if (!dialogManager.confirmProductionEnvironmentSelection()) {
                        resetUi();
                        return;
                    }
                }

                if (!_.isArray(playbooks)) {
                    for (key in playbooks) {
                        playbooks[key].forEach(function(el) {
                            input += el + "=" + prompt("Input for '" + el + "'.") + " ";
                        });
                    }
                    playbooks = _.keys(playbooks);
                }

                $scope.command_output = '';

                socketHandler.sendCommand({
                    name: name,
                    debug: $scope.debug,
                    inventoryFile: $scope.inventory,
                    playbooks: playbooks,
                    input: input.trim()
                });
            };

            function initializeAppFromDataFile() {
                var dataFile = getProfileDataFile();
                $http.get(dataFile).then(function(response) {
                    $scope.tasks = response.data.tasks;
                    $scope.inventories = response.data.inventories;
                    $scope.inventory = null;
                });
            }

            function getProfileTitle() {
                // todo add repo method
                return selectedProfile.pageTitle;
            }

            function getProfileDataFile() {
                // todo
                profileRepository.getDataFile();
                return selectedProfile.dataFile;
            }

            function setSelectedProfile() {
                selectedProfile = profileRepository.getDefaultProfile();
            }

            function setPageTitle() {
                $scope.title = getProfileTitle();
            }

            function resetUi() {
                $scope.actionClicked = false;
                $scope.pbs = null;
            }


        }
    ]);
