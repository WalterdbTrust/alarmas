jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"alarmas/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"alarmas/test/integration/pages/App",
	"alarmas/test/integration/pages/Browser",
	"alarmas/test/integration/pages/Master",
	"alarmas/test/integration/pages/Detail",
	"alarmas/test/integration/pages/NotFound"
], function(Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "alarmas.view."
	});

	sap.ui.require([
		"alarmas/test/integration/NavigationJourneyPhone",
		"alarmas/test/integration/NotFoundJourneyPhone",
		"alarmas/test/integration/BusyJourneyPhone"
	], function() {
		QUnit.start();
	});
});