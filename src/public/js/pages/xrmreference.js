/* globals $ */
$(function(){
    // Attach the dynatree widget to an existing <div id="tree"> element
    // and pass the tree options as an argument to the dynatree() function:
    $("#tree").dynatree({
        onActivate: function(node) {},
        children: [
            {title: "Xrm.Page", isFolder: true, key: "xrmPage",
                children: [
                    {title: "context", isFolder: true, key: "context",
                        children: [
                            {title: "getAuthenticationHeader()"},
                            {title: "getCurrentTheme()"},
                            {title: "getOrgLcid()"},
                            {title: "getOrgUniqueName()"},
                            {title: "getQueryStringParameters()"},
                            {title: "getServerUrl()"},
                            {title: "getUserId()"},
                            {title: "getUserLcid()"},
                            {title: "getUserRoles()"},
                            {title: "isOutlookClient()"},
                            {title: "isOutlookClientOnline()"},
                            {title: "prependOrgName()"}
                        ]},
                    {title: "data.entity", isFolder: true, key: "data.entity",
                        children: [
                            {title: "addOnSave([function reference])"},
                            {title: "getDataXml()"},
                            {title: "getEntityName()"},
                            {title: "getId()"},
                            {title: "removeOnSave([function reference])"},
                            {title: "save(null | \"saveandclose\" | \"saveandnew\")"},
                            {title: "attributes", isFolder: true, key: "data.entity.attributes",
                                children: [
                                    {title: "forEach([delegate function(control, index)])"},
                                    {title: "get([String] | [Number] | [delegate function(attribute, index)])"},
                                    {title: "getLength()"}
                                ]}
                        ]},
                    {title: "ui", isFolder: true, key: "ui",
                        children: [
                            {title: "close()"},
                            {title: "getCurrentControl()"},
                            {title: "getFormType()", isFolder: true, key: "ui.FormType",
                                children: [
                                    {title: "Create: 1"},
                                    {title: "Update: 2"},
                                    {title: "Read Only: 3"},
                                    {title: "Disabled: 4"},
                                    {title: "Quick Create (Deprecated): 5"},
                                    {title: "Bulk Edit: 6"}
                                ]},
                            {title: "getViewPortHeight()"},
                            {title: "getViewPortWidth()"},
                            {title: "refreshRibbon()"},
                            {title: "controls", isFolder: true, key: "data.entity.attributes",
                                children: [
                                    {title: "forEach([delegate function(control, index)])"},
                                    {title: "get([String] | [Number] | [delegate function(attribute, index)])"},
                                    {title: "getLength()"}
                                ]}
                        ]},
                    {title: "getAttribute()"},
                    {title: "getControl()"}
                ]
            },
            {title: "Attribute Methods", isFolder: true, key: "attributeMethods",
                children: [
                    {title: "addOnChange([function reference])"},
                    {title: "fireOnChange()"},
                    {title: "getAttributeType()"},
                    {title: "getFormat()"},
                    {title: "getInitialValue()"},
                    {title: "getIsDirty()"},
                    {title: "getMax()"},
                    {title: "getMaxLength()"},
                    {title: "getMin()"},
                    {title: "getName()"},
                    {title: "getOption(value)"},
                    {title: "getOptions()", isFolder: true, key: "getOptions",
                        children: [
                            {title: "Note: returns strings, must use parseInt('', 10) to convert to numbers before use in setValue()"}
                        ]},
                    {title: "getParent()"},
                    {title: "getPrecision()"},
                    {title: "getRequiredLevel()"},
                    {title: "getSelectedOption()"},
                    {title: "getSubmitMode()"},
                    {title: "getText()"},
                    {title: "getUserPrivilege()"},
                    {title: "getValue()"},
                    {title: "removeOnChange([function reference])"},
                    {title: "setRequiredLevel(\"none\" | \"required\" | \"recommended\")"},
                    {title: "setSubmitMode(\"always\" | \"never\" | \"dirty\")"},
                    {title: "setSubmitMode(\"always\" | \"never\" | \"dirty\")"},
                    {title: "setValue(value)", isFolder: true, key: "setValue",
                        children: [
                            {title: "boolean: Boolean"},
                            {title: "datetime: Date"},
                            {title: "decimal: Number"},
                            {title: "double: Number"},
                            {title: "integer: Number"},
                            {title: "lookup: [{id: \"00-00-00\", entityType: \"logicalName\", name: \"text in lookup\"}]"},
                            {title: "optionset: Number"}
                        ]},
                ]},
            {title: "Control Methods", isFolder: true, key: "controlMethods",
                children: [
                    {title: "addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, isDefault)"},
                    {title: "addOption(option, [index])"},
                    {title: "clearOptions()"},
                    {title: "getAttribute()"},
                    {title: "getControlType()"},
                    {title: "getData()"},
                    {title: "getDefaultView()"},
                    {title: "getDisabled()"},
                    {title: "getLabel()"},
                    {title: "getName()"},
                    {title: "getParent()"},
                    {title: "getSrc()"},
                    {title: "getInitialUrl()"},
                    {title: "getObject()"},
                    {title: "getVisible()"},
                    {title: "refresh()"},
                    {title: "removeOption()"},
                    {title: "setData()"},
                    {title: "setDefaultView(viewGuid)"},
                    {title: "setDisabled(bool)"},
                    {title: "setFocus()"},
                    {title: "setLabel(label)"},
                    {title: "setSrc(url)"},
                    {title: "setVisibile(bool)"}
                ]},
            {title: "Shortcuts", isFolder: true, key: "Shortcuts",
                children: [
                    {title: "prependOrgName() = Xrm.Page.context.prependOrgName()"},
                    {title: "Xrm.Page.getAttribute() = Xrm.Page.data.entity.attributes.get()"},
                    {title: "Xrm.Page.getControl() = Xrm.Page.ui.controls.get()"}
                ]}
        ]
    });
    $("#tree").dynatree("getRoot").visit(function(node){
        if (node.data.key !== undefined && (node.data.key == "xrmPage"))
            node.expand(true);
    });
});