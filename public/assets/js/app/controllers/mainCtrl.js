angular.module('AnsibleApp').controller('MainCtrl',
    ['$scope', '$http', '$sce', '$timeout', '$log', 'inventoryRepository', 'profileRepository', 'dialogManager', 'socketHandler',
        function ($scope, $http, $sce, $timeout, $log, inventoryRepository, profileRepository, dialogManager, socketHandler) {

            $scope.command_output = '';
            $scope.debug = true;
            $scope.title = null;
            $scope.outputScrollEnabled = false;

            $scope.initialize = function () {
                initializeAppFromDataFile();
                setupSocketCommunication();
            };

            $scope.getInventoryFile = function () {
                inventoryRepository.getInventory({
                    inventoryFile: $scope.inventory
                }).then(function (response) {
                    $scope.selectedInventoryFile = response.data.fileContents;
                }, function () {
                    $log('There was an error getting inventory file!!!');
                });
            };

            // convert to directive
            $scope.hoverOverTask = function (playbooks) {
                if (!$scope.actionClicked) {
                    $scope.pbs = playbooks;
                }
            };

            // convert to directive
            $scope.hoverOutTask = function () {
                if (!$scope.actionClicked) {
                    $scope.pbs = null;
                }
            };

            $scope.action = function (name, playbooks) {

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

                resetCommandOutput();
                socketHandler.sendCommand({
                    name: name,
                    debug: $scope.debug,
                    inventoryFile: $scope.inventory,
                    playbooks: playbooks,
                    input: ''
                });
            };

            function resetCommandOutput() {
                $scope.command_output = '';
            }

            function setupSocketCommunication() {

                socketHandler.registerSocketHandlers(function (data) {
                    $scope.$apply(function () {
                        if (data.done) {
                            $scope.actionClicked = false;
                            dialogManager.showPlaybooksEnd();
                        } else {
                            // todo: this should eventually be a directive
                            $scope.command_output = $sce.trustAsHtml(
                                $scope.command_output +
                                ansi_up.ansi_to_html(data.output)
                            );

                            if ($scope.outputScrollEnabled == true) {
                                $timeout(function () {
                                    window.scrollTo(0, document.body.scrollHeight);
                                }, 100);
                            }
                        }
                    });
                });
            }

            function initializeAppFromDataFile() {
                profileRepository.getDataFile().then(function (response) {
                    $scope.tasks = response.data.tasks;
                    $scope.inventories = response.data.inventories;
                    $scope.inventory = null;
                }, function () {
                    $log('something went wrong');
                });
            }


            function resetUi() {
                $scope.actionClicked = false;
                $scope.pbs = null;
            }

        }
    ]);