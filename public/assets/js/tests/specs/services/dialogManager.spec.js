describe('dialogManager', function() {

    var _dialogManager;

    beforeEach(module('AnsibleApp'));

    beforeEach(inject(function(dialogManager) {
        _dialogManager = dialogManager;
        spyOn(window, 'alert');
        spyOn(window, 'confirm');
    }));

    it('should alert the user to select an inventory', function() {
        _dialogManager.promptUserToSelectEnvironment();
        expect(window.alert).toHaveBeenCalled();
    });

    it('should alert the user when playbooks are finished executing', function() {
        _dialogManager.showPlaybooksEnd();
        expect(window.alert).toHaveBeenCalled();
    });

    it('should give the user a chance to confirm using a production inventory', function() {
        _dialogManager.confirmProductionEnvironmentSelection();
        expect(window.confirm).toHaveBeenCalled();
    })
});