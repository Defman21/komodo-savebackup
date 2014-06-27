var osPath = Components.classes["@activestate.com/koOsPath;1"].getService(Components.interfaces.koIOsPath);
var os = Components.classes["@activestate.com/koOs;1"].getService(Components.interfaces.koIOs);
var basename = ko.views.manager.currentView.koDoc.file.baseName;
var curdir = ko.views.manager.currentView.koDoc.file.dirName;
var scimoz =  ko.views.manager.currentView.scimoz;
var content = scimoz.text;
var date     = new Date();
var Year     = date.getFullYear();
var Month    = date.getMonth();
var Day      = date.getDate();
var Hour     = date.getHours();
var Minute   = date.getMinutes();
var Second   = date.getSeconds();
if(Month<10) Month   = "0" + Month;
if(Day<10) Day       = "0" + Day;
if(Hour<10) Hour     = "0" + Hour;
if(Minute<10) Minute = "0" + Minute;
if(Second<10) Second = "0" + Second;
var timestamp = Year+"-"+Month+"-"+Day+":"+Hour+"-"+Minute+"-"+Second;
var backup_fld = curdir+"_bak/";
var backup =backup_fld+basename+timestamp;

if (!osPath.exists(backup_fld)) {
    os.mkdir(backup_fld);
    ko.statusBar.AddMessage('Create folder '+backup_fld, 'editor', 5000, true);
}
os.writefile(backup, content);
ko.statusBar.AddMessage('Save '+basename+" to "+backup_fld, 'editor', 5000, true);
