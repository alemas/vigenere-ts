"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var FileReader = (function () {
    function FileReader() {
    }
    // Retorna uma string contendo o texto do arquivo especificado por 'path'
    FileReader.readFile = function (path) {
        return fs.readFileSync(path).toString();
    };
    return FileReader;
}());
exports.FileReader = FileReader;
