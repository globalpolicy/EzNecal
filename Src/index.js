const electron = require('electron');
const settingsHandler = require('./settingsHandler.js');
let contextMenu;


let loadedSettingsJSON = {};

function onMenuItemAboutClicked(menuItem, browserWindow, event) {
    electron.remote.dialog.showMessageBox({
        type: "info",
        title: "EzNecal",
        message: 
        `    Author : s0ft
    Blog : c0dew0rth.blogspot.com
    GitHub : globalpolicy
    Email : yciloplabolg@gmail.com
    Credit : http://www.rajanmaharjan.com.np`
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

    if (loadedSettingsJSON['X'] && loadedSettingsJSON['Y'])
        electron.remote.getCurrentWindow().setPosition(loadedSettingsJSON['X'], loadedSettingsJSON['Y']);
    if (loadedSettingsJSON['Topmost'])
        electron.remote.getCurrentWindow().setAlwaysOnTop(loadedSettingsJSON['Topmost']);
    if (loadedSettingsJSON['Border'])
        document.getElementById("grid-container").classList.toggle("grid-container-border");
    if (loadedSettingsJSON['HighlightOnHover'])
        document.getElementById("nepdate").classList.toggle("nepdate-highlight-on-hover");


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
            type: "separator"
        },
        {
            label: "About",
            click: onMenuItemAboutClicked
        },
        {
            label: "Reload",
            role: "reload"
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
}

fetch("http://rajanmaharjan.com.np/getdate/index.php?dateType=np", {
        cache: "reload"
    })
    .then((response) => {
        if(response.ok)
            return response.text();
        else{
            electron.remote.dialog.showMessageBox({
                type:"error",
                title:"Error",
                message:`Server responded with error : ${response.statusText}`
            });
            electron.remote.app.quit();
        }
    })
    .catch((error)=>{
        electron.remote.dialog.showMessageBox({
            type:"error",
            title:"Error",
            message:`No response from server. \nEither cannot reach server or internet connection problem. \nError message : ${error.message}`
        });
        electron.remote.app.quit();
    })
    .then((html) => {
        let domParser = new DOMParser();
        let doc = domParser.parseFromString(html, "text/html");
        let nepaliDate = doc.querySelector("span#nepali-date").textContent;
        document.querySelector("div#nepdate").textContent = nepaliDate;
    });


window.onload = onPageLoaded;