sap.ui.define([
			"alarmas/controller/BaseController",
			"sap/ui/model/json/JSONModel",
			"sap/m/MessageBox"

		], function(BaseController, JSONModel, MessageBox) {
			"use strict";

			return BaseController.extend("alarmas.controller.CreateEntity", {

					_oBinding: {},

					/* =========================================================== */
					/* lifecycle methods                                           */
					/* =========================================================== */
					selectMode: function(oEvent) {
						var selectMode = oEvent.getParameters().selectedItem;
						var input = sap.ui.getCore().byId("rpmValue");
						input.setValue(selectMode.getKey());
					},

					_swicthChangeSpeed: function(oEvent) {
						var state = oEvent.getSource().getState();
						var input = sap.ui.getCore().byId("speedActive");
						input.setValue((state ? 1 : 0));

					},
					_swicthChangeRpm: function(oEvent) {
						var state = oEvent.getSource().getState();
						var input = sap.ui.getCore().byId("rpmActive");
						input.setValue((state ? 1 : 0));
					},
					_swicthChangeTemp: function(oEvent) {
						var state = oEvent.getSource().getState();
						var input = sap.ui.getCore().byId("tempActive");
						input.setValue((state ? 1 : 0));

					},

					onInit: function() {
						var that = this;
						this.getRouter().getTargets().getTarget("create").attachDisplay(null, this._onDisplay, this);
						this._oODataModel = this.getOwnerComponent().getModel();
						this._oResourceBundle = this.getResourceBundle();
						this._oViewModel = new JSONModel({
							enableCreate: false,
							delay: 0,
							busy: false,
							mode: "create",
							viewTitle: ""
						});
						this.setModel(this._oViewModel, "viewModel");

						// Register the view with the message manager
						sap.ui.getCore().getMessageManager().registerObject(this.getView(), true);
						var oMessagesModel = sap.ui.getCore().getMessageManager().getMessageModel();
						this._oBinding = new sap.ui.model.Binding(oMessagesModel, "/", oMessagesModel.getContext("/"));
						this._oBinding.attachChange(function(oEvent) {
							var aMessages = oEvent.getSource().getModel().getData();
							for (var i = 0; i < aMessages.length; i++) {
								if (aMessages[i].type === "Error" && !aMessages[i].technical) {
									that._oViewModel.setProperty("/enableCreate", false);
								}
							}
						});

					},

					/* =========================================================== */
					/* event handlers                                              */
					/* =========================================================== */

					/**
					 * Event handler (attached declaratively) for the view save button. Saves the changes added by the user. 
					 * @function
					 * @public
					 */
					onSave: function() {
						var that = this,
							oModel = this.getModel();

						// abort if the  model has not been changed
						if (!oModel.hasPendingChanges()) {
							MessageBox.information(
								this._oResourceBundle.getText("noChangesMessage"), {
									id: "noChangesInfoMessageBox",
									styleClass: that.getOwnerComponent().getContentDensityClass()
								}
							);
							return;
						}
						this.getModel("appView").setProperty("/busy", true);
						if (this._oViewModel.getProperty("/mode") === "edit") {
							// attach to the request completed event of the batch
							oModel.attachEventOnce("batchRequestCompleted", function(oEvent) {
								if (that._checkIfBatchRequestSucceeded(oEvent)) {
									that._fnUpdateSuccess();
								} else {
									that._fnEntityCreationFailed();
									MessageBox.error(that._oResourceBundle.getText("updateError"));
								}
							});
						}
						that.sendSMS(oModel);

					},
					sendSMS: function(oModel) {
                        var that = this;
						var telefono = sap.ui.getCore().byId("devicePhone").getValue();
						var smsString = "666666";
						var smsVelocidad0 = ",OBA1;0";
						var smsRpm0 = ",DBS7;0";
						var smsTemp0 = ",OBA0;0";

						var swVel = sap.ui.getCore().byId("swSpeedActive").getState();
						var swRpm = sap.ui.getCore().byId("sw_RpmActive").getState();
						var swTmp = sap.ui.getCore().byId("swTempActive").getState();

						var speedValue = sap.ui.getCore().byId("speedValue").getValue();
						var rpmValue = sap.ui.getCore().byId("rpmValue").getValue();
						var tempValue = sap.ui.getCore().byId("tempValue").getValue();

						if (swVel) {
							smsString += ",OBA1;0D;0;" + speedValue + ";30";
				// 			;0;" + tempValue + ";10";
						} else {
							smsString += smsVelocidad0;
						}
						if (swRpm) {
							smsString += ",DBS7;" + rpmValue;
						} else {
							smsString += smsRpm0;
						}
						if (swTmp) {
							smsString += ",OBA0;05;0;" + tempValue + ";120";
						} else {
							smsString += smsTemp0;
						}

						var msjs = [];
						msjs.push(smsString);
						// 			msjs.push(smsRpm);
						// 			msjs.push(smsTemp);

				// 		for (var i = 0; i < msjs.length; i++) {
							var datos = {
								"to": telefono,
								"message": smsString
							};

							var aUrl = "https://cors-anywhere.herokuapp.com/http://34.209.112.168:3000/service/sms";

							$.ajax({
									type: "POST",
									url: aUrl,
									dataType: "json",
									data: datos,
									success: function(data, textStatus, jqXHR) {
									    console.log("data del ajax:",data);
										if(data.status === 'true') {
    										sap.m.MessageBox.success("Configuracion enviada", {
                        					    title: "Alarmas",                                    // default
                        					    onClose: function(){
                                				    oModel.submitChanges();
        				    						sap.ui.controller("alarmas.controller.Detail").actulizaDetalle();
                        					    },                                        // default
                        					    styleClass: "",                                       // default
                        					    initialFocus: null,                                   // default
                        					    textDirection: sap.ui.core.TextDirection.Inherit     // default
                        				    });

                        				    return true;
										} else {
    										sap.m.MessageBox.error(data.msj, {
                        					    title: "Error",                                    // default
                        					    onClose: null,                                        // default
                        					    styleClass: "",                                       // default
                        					    initialFocus: null,                                   // default
                        					    textDirection: sap.ui.core.TextDirection.Inherit     // default
                        				    });				
                        				    that.getModel("appView").setProperty("/busy", false);
                        				    return false;
										    
										}

									},
									error: function(jqXHR, textStatus, errorThrown) {
										sap.m.MessageBox.error("Error al enviar la configuracion", {
                    					    title: "Error",                                    // default
                    					    onClose: null,                                        // default
                    					    styleClass: "",                                       // default
                    					    initialFocus: null,                                   // default
                    					    textDirection: sap.ui.core.TextDirection.Inherit     // default
                    				    });		
                    				    that.getModel("appView").setProperty("/busy", false);
                    				    return false;
									    
									}


									});

								// jQuery.ajax({
								// 	url: aUrl,
								// 	data: datos,
								// 	method: 'POST',
								// 	dataType: 'json',
								// 	success: function(res) {
								// 		// 	console.log(res)
									

								// });
								// console.log("Mensajes:",msjs);

				// 			}

						},
						_checkIfBatchRequestSucceeded: function(oEvent) {
								var oParams = oEvent.getParameters();
								var aRequests = oEvent.getParameters().requests;
								var oRequest;
								if (oParams.success) {
									if (aRequests) {
										for (var i = 0; i < aRequests.length; i++) {
											oRequest = oEvent.getParameters().requests[i];
											if (!oRequest.success) {
												return false;
											}
										}
									}
									return true;
								} else {
									return false;
								}
							},

							/**
							 * Event handler (attached declaratively) for the view cancel button. Asks the user confirmation to discard the changes. 
							 * @function
							 * @public
							 */
							onCancel: function() {
								// check if the model has been changed
								if (this.getModel().hasPendingChanges()) {
									// get user confirmation first
									this._showConfirmQuitChanges(); // some other thing here....
								} else {
									this.getModel("appView").setProperty("/addEnabled", true);
									// cancel without confirmation
									this._navBack();
								}
							},

							/* =========================================================== */
							/* Internal functions
							/* =========================================================== */
							/**
							 * Navigates back in the browser history, if the entry was created by this app.
							 * If not, it navigates to the Details page
							 * @private
							 */
							_navBack: function() {
								var oHistory = sap.ui.core.routing.History.getInstance(),
									sPreviousHash = oHistory.getPreviousHash();

								this.getView().unbindObject();
								if (sPreviousHash !== undefined) {
									// The history contains a previous entry
									history.go(-1);
								} else {
									this.getRouter().getTargets().display("object");
								}
							},

							/**
							 * Opens a dialog letting the user either confirm or cancel the quit and discard of changes.
							 * @private
							 */
							_showConfirmQuitChanges: function() {
								var oComponent = this.getOwnerComponent(),
									oModel = this.getModel();
								var that = this;
								MessageBox.confirm(
									this._oResourceBundle.getText("confirmCancelMessage"), {
										styleClass: oComponent.getContentDensityClass(),
										onClose: function(oAction) {
											if (oAction === sap.m.MessageBox.Action.OK) {
												that.getModel("appView").setProperty("/addEnabled", true);
												oModel.resetChanges();
												that._navBack();
											}
										}
									}
								);
							},

							/**
							 * Prepares the view for editing the selected object
							 * @param {sap.ui.base.Event} oEvent the  display event
							 * @private
							 */
							_onEdit: function(oEvent) {
								var oData = oEvent.getParameter("data"),
									oView = this.getView();
								this._oViewModel.setProperty("/mode", "edit");
								this._oViewModel.setProperty("/enableCreate", true);
								this._oViewModel.setProperty("/viewTitle", this._oResourceBundle.getText("editViewTitle"));

								oView.bindElement({
									path: oData.objectPath
								});

								var valor = sap.ui.getCore().byId("speedActive");
								sap.ui.getCore().byId("swSpeedActive").setState(valor.getValue() === "1" ? true : false);

								var valor1 = sap.ui.getCore().byId("rpmActive");
								sap.ui.getCore().byId("sw_RpmActive").setState(valor1.getValue() === "1" ? true : false);

								var valor2 = sap.ui.getCore().byId("tempActive");
								sap.ui.getCore().byId("swTempActive").setState(valor2.getValue() === "1" ? true : false);

								var mySelectMenu = sap.ui.getCore().byId("mySelectMenu");

								// 		var myJsonSelect = {
								// 			"select": [{
								// 				"key": "VELOCIDAD",
								// 				"text": "Velocidad"
								// 			}, {
								// 				"key": "RPM",
								// 				"text": "Revoluciones x min."
								// 			}, {
								// 				"key": "PRESADMISIONAB",
								// 				"text": "Presion Admision"
								// 			}, {
								// 				"key": "TEMPAGUA",
								// 				"text": "Temperatura de Agua"
								// 			}, {
								// 				"key": "ACELERACION",
								// 				"text": "Aceleracion"
								// 			}]
								// 		};

								// 		var mModel = new sap.ui.model.json.JSONModel(myJsonSelect); //initialise your model from a JSON file
								var oItemSelectTemplate = new sap.ui.core.Item({
									key: "{CODE}",
									text: "{DESCRIPTION}"
								}); //Define the template for items, which will be inserted inside a select element

								// 		mySelectMenu.setModel(mModel); // set model your_data_model to Select element
								mySelectMenu.bindAggregation("items", {
									path: '/P_REFERENCE',
									filters: [new sap.ui.model.Filter('TABLE', sap.ui.model.FilterOperator.EQ, '01')],
									template: oItemSelectTemplate
								}); //			

								mySelectMenu.setSelectedKey(("00" + sap.ui.getCore().byId("rpmValue").getValue()).slice(-2));

							},

							/**
							 * Prepares the view for creating new object
							 * @param {sap.ui.base.Event} oEvent the  display event
							 * @private
							 */

							_onCreate: function(oEvent) {
								if (oEvent.getParameter("name") && oEvent.getParameter("name") !== "create") {
									this._oViewModel.setProperty("/enableCreate", false);
									this.getRouter().getTargets().detachDisplay(null, this._onDisplay, this);
									this.getView().unbindObject();
									return;
								}

								this._oViewModel.setProperty("/viewTitle", this._oResourceBundle.getText("createViewTitle"));
								this._oViewModel.setProperty("/mode", "create");
								var oContext = this._oODataModel.createEntry("P_ALARM_SETTING", {
									success: this._fnEntityCreated.bind(this),
									error: this._fnEntityCreationFailed.bind(this)
								});
								this.getView().setBindingContext(oContext);
							},

							/**
							 * Checks if the save button can be enabled
							 * @private
							 */
							_validateSaveEnablement: function() {
								var aInputControls = this._getFormFields(this.byId("newEntitySimpleForm"));
								var oControl;
								for (var m = 0; m < aInputControls.length; m++) {
									oControl = aInputControls[m].control;
									if (aInputControls[m].required) {
										var sValue = oControl.getValue();
										if (!sValue) {
											this._oViewModel.setProperty("/enableCreate", false);
											return;
										}
									}
								}
								this._checkForErrorMessages();
							},

							/**
							 * Checks if there is any wrong inputs that can not be saved.
							 * @private
							 */

							_checkForErrorMessages: function() {
								var aMessages = this._oBinding.oModel.oData;
								if (aMessages.length > 0) {
									var bEnableCreate = true;
									for (var i = 0; i < aMessages.length; i++) {
										if (aMessages[i].type === "Error" && !aMessages[i].technical) {
											bEnableCreate = false;
											break;
										}
									}
									this._oViewModel.setProperty("/enableCreate", bEnableCreate);
								} else {
									this._oViewModel.setProperty("/enableCreate", true);
								}
							},

							/**
							 * Handles the success of updating an object
							 * @private
							 */
							_fnUpdateSuccess: function() {
								this.getModel("appView").setProperty("/busy", false);
								this.getView().unbindObject();
								this.getRouter().getTargets().display("object");
							},

							/**
							 * Handles the success of creating an object
							 *@param {object} oData the response of the save action
							 * @private
							 */
							_fnEntityCreated: function(oData) {
								var sObjectPath = this.getModel().createKey("P_ALARM_SETTING", oData);
								this.getModel("appView").setProperty("/itemToSelect", "/" + sObjectPath); //save last created
								this.getModel("appView").setProperty("/busy", false);
								this.getRouter().getTargets().display("object");
							},

							/**
							 * Handles the failure of creating/updating an object
							 * @private
							 */
							_fnEntityCreationFailed: function() {
								this.getModel("appView").setProperty("/busy", false);
							},

							/**
							 * Handles the onDisplay event which is triggered when this view is displayed 
							 * @param {sap.ui.base.Event} oEvent the on display event
							 * @private
							 */
							_onDisplay: function(oEvent) {
								var oData = oEvent.getParameter("data");
								if (oData && oData.mode === "update") {
									this._onEdit(oEvent);
								} else {
									this._onCreate(oEvent);
								}
							},

							/**
							 * Gets the form fields
							 * @param {sap.ui.layout.form} oSimpleForm the form in the view.
							 * @private
							 */
							_getFormFields: function(oSimpleForm) {
								var aControls = [];
								var aFormContent = oSimpleForm.getContent();
								var sControlType;
								for (var i = 0; i < aFormContent.length; i++) {
									sControlType = aFormContent[i].getMetadata().getName();
									if (sControlType === "sap.m.Input" || sControlType === "sap.m.DateTimeInput" ||
										sControlType === "sap.m.CheckBox") {
										aControls.push({
											control: aFormContent[i],
											required: aFormContent[i - 1].getRequired && aFormContent[i - 1].getRequired()
										});
									}
								}
								return aControls;
							}
					});

			});