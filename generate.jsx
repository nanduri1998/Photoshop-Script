#include json2.js
app.preferences.rulerUnits = Units.PIXELS;
(function main() {
    var dets = loadJson('test.json');

    for(var i = 0; i<dets.length; i++){
        var det = dets[i];
        processDetails(det);
    }
})();

function processDetails(details){
    var doc = app.activeDocument;
    var detsgrp = doc.layerSets.getByName('dets');
    var nameLayer = detsgrp.layers.getByName('name');
    var pinLayer = detsgrp.layers.getByName('pin');
    var phoneLayer = detsgrp.layers.getByName('phone');
    var emailLayer = detsgrp.layers.getByName('email');
    var idLayer = detsgrp.layers.getByName('idno');
    var photoLayer = doc.artLayers.layers.getByName('photo');

    nameLayer.textItem.contents = details.name;
    pinLayer.textItem.contents = details.pin;
    phoneLayer.textItem.contents = details.phone;
    emailLayer.textItem.contents = details.email;
    idLayer.textItem.contents = details.desg;
    

    var filename = details.pin;
    saveImage(filename);
}

function loadJson(relPath){
    var script = new File($.fileName);
    var jsonFile = new File(script.path + '/' + relPath);
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();

    return JSON.parse(str)
}

function saveImage(name){
    var doc = app.activeDocument;
    var file = new File(doc.path + '/gen/' + name + '.jpg');
    var opts = new JPEGSaveOptions();
    opts.quality = 10;

    doc.saveAs(file, opts, true);
}