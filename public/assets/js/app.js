AnsibleApp.controller('MainCtrl',
	['$scope', '$http', '$sce', '$timeout',
		function($scope, $http, $sce, $timeout) {

			var profiles = {
				defaultProfile: {
					dataFile: './data.json',
					bodyClass: 'dev',
					pageTitle: 'Ansible DevOps Tool'
				}
			};




	
			
			
			var selectedProfile = null,
			    socket = null;

			productionWarningMessage = getProductionWarningMessage();
			
			$scope.command_output = '';
			$scope.debug = true;
			$scope.title = null;
			$scope.outputScrollEnabled = false;

			$scope.initialize = function () {
				setSelectedProfile();
				setPageTitle();	
				initializeAppFromDataFile();				
				connectSocketIo();
				registerSocketIoHandlers();
			};
			
			$scope.bodyClasses = function() {
				var classes = [];
				classes.push(selectedProfile.bodyClass);
				return classes;
			};

			$scope.getInventoryFile = function() {

				var url = '/inventory';

				$http({
					method: 'GET',
					url: url,
					params: {
						inventoryFile: $scope.inventory,
						inventoryDirectory: selectedProfile.inventoryDirectory
					},
				}).then(function(response) {
					$scope.selectedInventoryFile = response.data.fileContents;
				});
			};

			$scope.hoverOverTask = function(playbooks) {
				if (!$scope.actionClicked) {
					$scope.pbs = playbooks;
				}
			};

			$scope.hoverOutTask = function() {
				if (!$scope.actionClicked) {
					$scope.pbs = null;
				}
			};

						
			$scope.action = function(name, playbooks) {
				var input = '';
				$scope.actionClicked = true;
				$scope.pbs = playbooks;
				
				if (isInventoryEmpty()) {
					promptUserToSelectEnvironment();
					resetUi();
					return;
				}
				
				if (isProductionInventory()) {
					if (!confirm(productionWarningMessage)) {
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
				socket.emit('command', {
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
			
			function getProfileKeyFromUrl() {
				var selectedKey = 'defaultProfile';		
				return selectedKey;
			}

			function getProfileTitle() {
				return selectedProfile.pageTitle;
			}

			function getProfileDataFile() {
				return selectedProfile.dataFile;
			}

			function getProfileBodyClass() {
				return selectedProfile.bodyClass;
			}

			function setSelectedProfile() {
				var selectedProfileKey = getProfileKeyFromUrl();
				selectedProfile = profiles[selectedProfileKey];
			}
			
			function setPageTitle() {
				$scope.title = getProfileTitle();
			}			
			
			function connectSocketIo() {
				socket = io.connect('http://' + window.location.hostname + ':3000');
			}			
			
			function registerSocketIoHandlers() {
				socket.on('out', function (data) {
					$scope.$apply(function() {
						if (data.done) {
							$scope.actionClicked = false;
							alert("Playbook commands have finished");
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
			}

			function isInventoryEmpty() {
				return !$scope.inventory;
			}
			
			function promptUserToSelectEnvironment() {
				alert('Please select an environment!');
			}
			
			function resetUi() {
				$scope.actionClicked = false;
				$scope.pbs = null;
			}
			
			function isProductionInventory() {
				return $scope.inventory.match(/prod/i);
			}
			
			function getProductionWarningMessage() {
				return [
					"==WARNING==",
					"You are about to perform this on a production server!",
					"",
					"Are you sure you wish to continue, bro?"].join("\n");
			}

		}
]);
