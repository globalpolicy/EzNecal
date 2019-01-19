const electron = require("electron");
const fs = isRenderer()?electron.remote.require("fs"):require("fs");
const app=isRenderer()?electron.remote.app:electron.app;
const settingFileName = "EzNpCalConf.json";
const settingFilePath = app.getPath("userData") + "/" + settingFileName;

function isRenderer(){
    return process && process.type==='renderer';
}

function readField(fieldName) {
    if (fs.existsSync(settingFilePath)) {
        let settingsJSON = JSON.parse(fs.readFileSync(settingFilePath));
        return settingsJSON[fieldName];
    }
}

function updateField(fieldName, value) {

    let settingsJSON={};
    if (fs.existsSync(settingFilePath)) {
        let existingFileContents = fs.readFileSync(settingFilePath);
        if (existingFileContents != null) {
            settingsJSON = JSON.parse(existingFileContents);
        }
    }
    settingsJSON[fieldName]=value;

    fs.writeFileSync(settingFilePath,JSON.stringify(settingsJSON));


}

exports.updateField=updateField;
exports.readField=readField;