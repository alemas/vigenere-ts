"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var FileReader = /** @class */ (function () {
    function FileReader() {
    }
    FileReader.readFile = function (path) {
        return fs.readFileSync(path).toString();
    };
    return FileReader;
}());
exports.FileReader = FileReader;
