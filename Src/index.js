const electron = require('electron');
const settingsHandler = require('./settingsHandler.js');
const nepaliFunctions = require('./nepaliFunctions.js');
let contextMenu;


let loadedSettingsJSON = {};

function onMenuItemBoldClicked(menuItem, browserWindow, event) {
    document.getElementById("nepdate").classList.toggle("nepdate-bold");
    settingsHandler.updateField("Bold", menuItem.checked);
}

function onMenuItemReloadClicked(menuItem, browserWindow, event) {
    browserWindow.hide(); //hide-show is to remove any black regions that
    browserWindow.show(); //can show up sometimes on dragging the window around
    browserWindow.reload();
}

function onMenuItemAboutClicked(menuItem, browserWindow, event) {
    electron.remote.dialog.showMessageBox({
        type: "info",
        title: "EzNecal",
        message: `    Author : s0ft
    Blog : c0dew0rth.blogspot.com
    GitHub : globalpolicy
    Email : yciloplabolg@gmail.com
    Credit : https://www.ashesh.com.np`
    });
}

function onMenuItemRunOnStartupClicked(menuItem, browserWindow, event) {
    electron.remote.app.setLoginItemSettings({
        openAtLogin: menuItem.checked
    });
    settingsHandler.updateField("RunOnStartup", menuItem.checked);
}

function onMenuItemHighlightOnHoverClicked(menuItem, browserWindow, event) {
    document.getElementById("nepdate").classList.toggle("nepdate-highlight-on-hover");
    settingsHandler.updateField("HighlightOnHover", menuItem.checked);
}

function onMenuItemBorderClicked(menuItem, browserWindow, event) {
    document.getElementById("grid-container").classList.toggle("grid-container-border");
    settingsHandler.updateField("Border", menuItem.checked);
}

function onMenuItemTopmostClicked(menuItem, browserWindow, event) {
    browserWindow.setAlwaysOnTop(menuItem.checked);
    settingsHandler.updateField("Topmost", menuItem.checked);
}

function onPageLoaded() {

    loadedSettingsJSON['X'] = settingsHandler.readField('X');
    loadedSettingsJSON['Y'] = settingsHandler.readField('Y');
    loadedSettingsJSON['Topmost'] = settingsHandler.readField('Topmost');
    loadedSettingsJSON['Border'] = settingsHandler.readField('Border');
    loadedSettingsJSON['HighlightOnHover'] = settingsHandler.readField('HighlightOnHover');
    loadedSettingsJSON['RunOnStartup'] = settingsHandler.readField('RunOnStartup');
    loadedSettingsJSON['Bold'] = settingsHandler.readField('Bold');

    if (loadedSettingsJSON['X'] && loadedSettingsJSON['Y'])
        electron.remote.getCurrentWindow().setPosition(loadedSettingsJSON['X'], loadedSettingsJSON['Y']);
    if (loadedSettingsJSON['Topmost'])
        electron.remote.getCurrentWindow().setAlwaysOnTop(loadedSettingsJSON['Topmost']);
    if (loadedSettingsJSON['Border'])
        document.getElementById("grid-container").classList.toggle("grid-container-border");
    if (loadedSettingsJSON['HighlightOnHover'])
        document.getElementById("nepdate").classList.toggle("nepdate-highlight-on-hover");
    if (loadedSettingsJSON['Bold'])
        document.getElementById("nepdate").classList.toggle("nepdate-bold");

    let contextMenuTemplate = [{
            label: "Topmost",
            type: "checkbox",
            click: onMenuItemTopmostClicked,
            checked: loadedSettingsJSON['Topmost']
        },
        {
            label: "Border",
            type: "checkbox",
            click: onMenuItemBorderClicked,
            checked: loadedSettingsJSON['Border']
        },
        {
            label: "Highlight on hover",
            type: "checkbox",
            click: onMenuItemHighlightOnHoverClicked,
            checked: loadedSettingsJSON['HighlightOnHover']
        },
        {
            label: "Run on startup",
            type: "checkbox",
            click: onMenuItemRunOnStartupClicked,
            checked: loadedSettingsJSON['RunOnStartup']
        },
        {
            label: "Bold",
            type: "checkbox",
            click: onMenuItemBoldClicked,
            checked: loadedSettingsJSON['Bold']
        },
        {
            type: "separator"
        },
        {
            label: "About",
            click: onMenuItemAboutClicked
        },
        {
            label: "Reload",
            click: onMenuItemReloadClicked
        },
        {
            label: "Quit",
            role: "close"
        }
    ];
    contextMenu = electron.remote.Menu.buildFromTemplate(contextMenuTemplate);
    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        contextMenu.popup();
    });

    document.querySelector("div#nepdate").textContent = nepaliFunctions.getNepaliDate();
    setInterval(() => {
        document.querySelector("div#nepdate").textContent = nepaliFunctions.getNepaliDate();
    }, 60000);
}

window.onload = onPageLoaded;