AnsibleApp.factory('dialogManager', [function () {

    var productionWarningMessage = [
        "==WARNING==",
        "You are about to perform this on a production server!",
        "",
        "Are you sure you wish to continue, bro?"].join("\n");

    var messages = {
        productionWarning: productionWarningMessage,
        selectEnvironment: 'Please select an environment!',
        playbooksFinished: "Playbook commands have finished"
    };
    
    var dialogManager = {
        promptUserToSelectEnvironment: function () {
            alert(messages.selectEnvironment);
        },
        confirmProductionEnvironmentSelection: function () {
            return confirm(messages.productionWarning);
        },
        showPlaybooksEnd: function( ) {
            alert(messages.playbooksFinished);
        }
    };

    return dialogManager;
}]);
