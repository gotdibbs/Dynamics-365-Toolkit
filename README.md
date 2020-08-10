# Dynamics 365 (CRM) Toolkit

![Toolkit Screenshot](https://github.com/gotdibbs/Dynamics-365-Toolkit/raw/master/chromeExtension/screenshots/screenshot1.png)

Contains quick, pretty, and easy to use tools and shortcuts to assist with development in a Dynamics 365 environment.

Includes:
 - Display of Organization Unique Name, Dynamics Version, User Id, Security Roles (and links to edit them), Record Id, Record Url, etc. All of these points can be double clicked to copy them to the clipboard.
 - Navigation helpers to get you quickly to: Advanced Find, Solution Import, etc. You can even open a solution if you know it's unique name.
 - Dev/Admin Utilities like: enable all fields on a form, list dirty fields, show record properties window, enable ribbon debugger.
 - Keyboard shortcut to open the toolbox: Alt + Shift + G, otherwise click on the box icon that's added to your browser actions next to your address bar.
 - A developer who cares and wants to help you out, but doesn't actively work on Dynamics anymore. If you have any contributions, or challenging problems I can help automate, just let me know by submitting an issue!

# Repository Structure

 - `archive` contains the old bookmarklets that were used in the Dynamics CRM 2011 days, they're still live and hosted on https://www.gotdibbs.com/crm/help/ if you wish to use them for older implementations, or need to do something in Internet Explorer (IE).
 - `chromeExtension` contains the meat of the new hot goodness. Recently rewritten entirely in React with an eye for maintainability and ease of contribution, this extension is what this repository is all about nowadays. All the bookmarklets of old, plus some new tricks are in here. See the README in that folder for more info on it's architecture.


# Contributing

To put it simply, I would love the help. If you'd like to contribute but find anything confusing I'm happy to chat through it.

Thanks for stopping by!