//window.openDialog('chrome://global/content/console.xul', '_blank');

var doc = ko.views.manager.currentView.koDoc;
var bakname =  doc.displayPath + ".bak";


if (komodo.koDoc.file.scheme != "file") {
  return;
}

if (! doc.isDirty) {
  return;
}

//print(doc.displayPath);
//print(doc.baseName);
//print(doc.file.dirName);

var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
var backupFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
var dir = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);

file.initWithPath(doc.displayPath);
backupFile.initWithPath(bakname);
dir.initWithPath(doc.file.dirName);

if (backupFile.exists()) {
    backupFile.remove(false);
}

// https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIFile#copyTo%28%29
file.copyTo(dir,  doc.baseName + ".bak");


// save current file
if (komodo.view) { komodo.view.setFocus(); }
ko.commands.doCommand('cmd_save')
