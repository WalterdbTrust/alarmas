jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 P_ALARM_SETTING in the list

sap.ui.require([
	"sap/ui/test/Opa5",
	"alarmas/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"alarmas/test/integration/pages/App",
	"alarmas/test/integration/pages/Browser",
	"alarmas/test/integration/pages/Master",
	"alarmas/test/integration/pages/Detail",
	"alarmas/test/integration/pages/Create",
	"alarmas/test/integration/pages/NotFound"
], function(Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "alarmas.view."
	});

	sap.ui.require([
		"alarmas/test/integration/MasterJourney",
		"alarmas/test/integration/NavigationJourney",
		"alarmas/test/integration/NotFoundJourney",
		"alarmas/test/integration/BusyJourney",
		"alarmas/test/integration/FLPIntegrationJourney"
	], function() {
		QUnit.start();
	});
});