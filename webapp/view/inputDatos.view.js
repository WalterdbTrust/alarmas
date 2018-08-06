sap.ui.jsview("alarmas.view.inputDatos", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf alarmas.view.inputDatos
	 */
	getControllerName: function() {
		return "alarmas.controller.CreateEntity";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf alarmas.view.inputDatos
	 */
	createContent: function(oController) {
		//////////////////////////////////
		// SETEO DE ALARMA DE VELOCIDAD //
		//////////////////////////////////
		var text1 = new sap.m.Text("text1", {
			text: "Alarma de Velocidad:"
		});

		var input1 = new sap.m.Input("speedActive", {
			value: "{ path: 'SPEED_ALARM', type: 'sap.ui.model.odata.type.Byte' , constraints:{ nullable:false } }",
			visible: false
		});

		var switchSpeed = new sap.m.Switch("swSpeedActive", {
			state: true,
			change: function(event) {
				oController._swicthChangeSpeed(event);
			}
		});
		var layout1 = new sap.ui.layout.HorizontalLayout("lay1", {
			// width: "100%",
			layoutData: new sap.ui.layout.GridData({
				// indent: "L3 M3",
				span: "L3 M6 S12"
			})
		});
		var layout2 = new sap.ui.layout.HorizontalLayout("lay2", {
			// width: "100%",
			layoutData: new sap.ui.layout.GridData({
				// indent: "L3 M3",
				span: "L3 M6 S12"
			})
		});

		var layoutInv = new sap.ui.layout.HorizontalLayout("layInv", {
			// width: "100%",
			layoutData: new sap.ui.layout.GridData({
				// indent: "L3 M3",
				span: "L12 M12 S12"
			})
		});

		layout1.addContent(text1);

		layoutInv.addContent(input1);
		layout2.addContent(switchSpeed);

		var text2 = new sap.m.Text("text2", {
			text: "Limite de Velocidad:"
		});

		var input2 = new sap.m.Input("speedValue", {
			value: "{ path: 'SPEED_VALUE', type: 'sap.ui.model.odata.type.Int32' , constraints:{ nullable:false } }",
			visible: true
		});

		var layout3 = new sap.ui.layout.HorizontalLayout("lay3", {
			// width: "100%",
			layoutData: new sap.ui.layout.GridData({
				// indent: "L3 M3",
				span: "L3 M6 S12"
			})
		});
		var layout4 = new sap.ui.layout.HorizontalLayout("lay4", {
			// width: "100%",
			layoutData: new sap.ui.layout.GridData({
				// indent: "L3 M3",
				span: "L3 M6 S12"
			})
		});

		layout3.addContent(text2);
		layout4.addContent(input2);
		//////////////////////////////////
		//////////////////////////////////
		//////////////////////////////////

		//////////////////////////////////
		//    SETEO DE ALARMA DE RPM    //
		//////////////////////////////////
		var text3 = new sap.m.Text("text3", {
			text: "Alarma de RPM:"
		});

		var input3 = new sap.m.Input("rpmActive", {
			value: "{ path: 'RPM_ALARM', type: 'sap.ui.model.odata.type.Byte' , constraints:{ nullable:false } }",
			visible: false
		});

		var switchRpm = new sap.m.Switch("sw_RpmActive", {
			state: true,
			change: function(event) {
				oController._swicthChangeRpm(event);
			}
		});
		var layout5 = new sap.ui.layout.HorizontalLayout("lay5", {
			// width: "100%",
			layoutData: new sap.ui.layout.GridData({
				// indent: "L3 M3",
				span: "L3 M6 S12"
			})
		});
		var layout6 = new sap.ui.layout.HorizontalLayout("lay6", {
			// width: "100%",
			layoutData: new sap.ui.layout.GridData({
				// indent: "L3 M3",
				span: "L3 M6 S12"
			})
		});

		layout5.addContent(text3);

		layout6.addContent(input3);
		layout6.addContent(switchRpm);

		var text4 = new sap.m.Text("text4", {
			text: "Limite de RPM:"
		});



		var mySelectMenu = new sap.m.Select("mySelectMenu", {
			visible: true,
			change: function(oEvent) {
				oController.selectMode(oEvent);
			}
			// layoutData : new sap.ui.layout.GridData({
			// 				// indent: "L3 M3",
			// 				span: "L6 M6 S12"
			// })
		});







		var input4 = new sap.m.Input("rpmValue", {
			value: "{ path: 'RPM_VALUE', type: 'sap.ui.model.odata.type.Int32' , constraints:{ nullable:false } }",
			visible: false
		});

		var layout7 = new sap.ui.layout.HorizontalLayout("lay7", {
			// width: "100%",
			layoutData: new sap.ui.layout.GridData({
				// indent: "L3 M3",
				span: "L3 M6 S12"
			})
		});
		var layout8 = new sap.ui.layout.HorizontalLayout("lay8", {
			// width: "100%",
			layoutData: new sap.ui.layout.GridData({
				// indent: "L3 M3",
				span: "L3 M6 S12"
			})
		});

		layout7.addContent(text4);
		layout8.addContent(mySelectMenu);
		
		layout8.addContent(input4);
		//////////////////////////////////
		//////////////////////////////////
		//////////////////////////////////



		////////////////////////////////////
		// SETEO DE ALARMA DE TEMPERATURA //
		////////////////////////////////////
		var text5 = new sap.m.Text("text5", {
			text: "Alarma de Temperatura:"
		});

		var input5 = new sap.m.Input("tempActive", {
			value: "{ path: 'WATER_TEMP_ALARM', type: 'sap.ui.model.odata.type.Byte' , constraints:{ nullable:false } }",
			visible: false
		});

		var switchTemp = new sap.m.Switch("swTempActive", {
			state: true,
			change: function(event) {
				oController._swicthChangeTemp(event);
			}
		});
		var layout9 = new sap.ui.layout.HorizontalLayout("lay9", {
			// width: "100%",
			layoutData: new sap.ui.layout.GridData({
				// indent: "L3 M3",
				span: "L3 M6 S12"
			})
		});
		var layout10 = new sap.ui.layout.HorizontalLayout("lay10", {
			// width: "100%",
			layoutData: new sap.ui.layout.GridData({
				// indent: "L3 M3",
				span: "L3 M6 S12"
			})
		});

// 		var layoutInv = new sap.ui.layout.HorizontalLayout("layInv", {
// 			// width: "100%",
// 			layoutData: new sap.ui.layout.GridData({
// 				// indent: "L3 M3",
// 				span: "L12 M12 S12"
// 			})
// 		});

		layout9.addContent(text5);

		layoutInv.addContent(input5);
		layout10.addContent(switchTemp);

		var text6 = new sap.m.Text("text6", {
			text: "Limite de Temperatura:"
		});

		var input6 = new sap.m.Input("tempValue", {
			value: "{ path: 'WATER_TEMP_VALUE', type: 'sap.ui.model.odata.type.Int32' , constraints:{ nullable:false } }",
			visible: true
		});

		var layout11 = new sap.ui.layout.HorizontalLayout("lay11", {
			// width: "100%",
			layoutData: new sap.ui.layout.GridData({
				// indent: "L3 M3",
				span: "L3 M6 S12"
			})
		});
		var layout12 = new sap.ui.layout.HorizontalLayout("lay12", {
			// width: "100%",
			layoutData: new sap.ui.layout.GridData({
				// indent: "L3 M3",
				span: "L3 M6 S12"
			})
		});

		layout11.addContent(text6);
		layout12.addContent(input6);
		//////////////////////////////////
		//////////////////////////////////
		//////////////////////////////////



		//////////////////////////////////
		//////   NO VISIBLES  ////////////        
		//////////////////////////////////
		var telDevice = new sap.m.Input("devicePhone", {
			value: "{ path: 'DEVICE_PHONE', type: 'sap.ui.model.odata.type.String' , constraints:{ nullable:false } }",
			visible: false
		});

        
        
		//////////////////////////////////
		//////////////////////////////////
		//////////////////////////////////

		var oGrid1 = new sap.ui.layout.Grid({
			hSpacing: 1,
			vSpacing: 1,
			content: [telDevice,layoutInv,layout1, layout2, layout3, layout4, layout5, layout6, layout7, layout8,layout9,layout10,layout11,layout12]
		});


// 		var oPage = new sap.m.Page({
// 			title: "Title",
// 			content: [oGrid1]
// 		});

		return [oGrid1];

	}

});