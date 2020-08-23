# Dynamics 365 (CRM) Toolkit

![Toolkit Screenshot](https://github.com/gotdibbs/Dynamics-365-Toolkit/raw/master/chromeExtension/screenshots/screenshot-github.png)

Contains quick, pretty, and easy to use tools and shortcuts to assist with development in a Dynamics 365 environment.

## Keyboard Shortcut

Once installed, press `Alt` + `Shift` + `G` to open the toolbox when inside Dynamics.

## Information Displayed

**Note:** Each of the items below can be copied to your clipboard by double clicking the value, or clicking the copy button on the right.

Depending on what you're viewing in Dynamics and which version you're accessing, one or more of the below may not apply and therefore won't be visible.

|Label|Description|
|---|---|
|Dynamics Version|Displays the current version of Dynamics that you are accessing|
|Organization Unique Name|Displays the unique name of the current environment you are in|
|App Name|Name of the current business app in model-driven apps|
|User Name|Displays the name of the current user, also is a link to current user's record|
|User Id|Displays the GUID of the current user|
|Security Roles|Displays the names of the security roles assigned to the current user as links|
|Record URL|Displays a link to the current record|
|Record Id|Displays the GUID of the current record|
|Logical Name|Displays the logical name of the current record|

## Navigation Utilities

|Navigator|Description|
|---|---|
|Advanced Find|Opens the Advanced Find tool for searching Dynamics data|
|Import Solution|Opens the Dynamics solution import window|
|Open Record List|Requests a logical name of an entity in Dynamics, then opens the default list view for that entity|
|Open Record|Requests both a logical name and a GUID for a specific entity record in Dynamics, then opens it|
|Open Solution|Requests the name of a solution in your Dynamics environment, then opens that solution|
|Plugin Trace Logs|Opens a list view of all the plugin trace logs generated for your environment|
|Solution History|Opens the history view of solutions imported to your environment|

## Utilities

|Utility|Description|
|---|---|
|Copy Record Id|Copies the current record GUID to the clipboard|
|Copy Record Link|Copies the current record URL to the clipboard|
|Unlock All Fields|Sets all attributes on the form to be enabled|
|Focus Field|Requests a field logical name, then sets the focus to that field|
|Open Ribbon Debugger|Opens the Command Checker / Ribbon Debug feature, or refreshes the page such that it is available|
|Populate Required Fields|Finds all required fields and sets a value, except for lookups|
|Show All Fields|Sets the display state of all fields to visible|
|Show Dirty Fields|Displays a list of all fields that have unsaved changes|
|Toggle Schema Names|Toggles between showing attribute labels and their logical names|

# Repository Structure

 - `archive` contains the old bookmarklets that were used in the Dynamics CRM 2011 days, they're still live and hosted on https://www.gotdibbs.com/crm/help/ if you wish to use them for older implementations, or need to do something in Internet Explorer (IE).
 - `chromeExtension` contains the meat of the new hot goodness. Recently rewritten entirely in React with an eye for maintainability and ease of contribution, this extension is what this repository is all about nowadays. All the bookmarklets of old, plus some new tricks are in here. See the [README](https://github.com/gotdibbs/Dynamics-365-Toolkit/blob/master/chromeExtension/README.md) in that folder for more info on it's architecture.


# Contributing

To put it simply, I would love the help. I worked on Dynamics 365/CRM implementations for nearly 10 years, from CRM 4.0 and up. That is no longer my day job, but I'd love to help update this tool for you if I can. If you'd like to contribute but find anything confusing I'm happy to chat through it.

Thanks for stopping by!