sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
    "use strict";

    return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
        onShowHello: function() {
            //read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            //show message
            MessageToast.show(sMsg);
        },
        onOpenDialog: function() {
            //create Dialog
            if(!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name : "sap.ui.demo.walkthrough.view.HelloDialog"
                }).then(function(oDialog) {
                    //forward compact/cozy style into dialog
                    syncStyleClass(this.getOwnerComponent().getContentDensityClass(), thi.getView(), oDialog);
                    return oDialog;
                }.bind(this));
            }
            this.pDialog.then(function(oDialog) {
                oDialog.open();
            });
        },
        onCloseDialog: function() {
            //note: We don't need to chane to the pDialog promise, sinse this event-handler
            //is only called form within the loaded dialog itself
            this.byId("helloDialog").close();

        }
    })
})