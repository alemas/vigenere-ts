"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_reader_1 = require("./file-reader");
var key_length_finder_1 = require("./key-length-finder");
var key_finder_1 = require("./key-finder");
var readline = require('readline-sync');
var cipherText = file_reader_1.FileReader.readFile("./data/ciphertext.txt");
console.log("Os possíveis tamanhos de chave encontrados foram:\n");
var candidates = key_length_finder_1.KeyLengthFinder.findKeyLengh(cipherText);
for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
    var c = candidates_1[_i];
    console.log("Tamanho: " + c.length + ", Chance: " + c.chance);
}
var length = readline.question("\nEscolha o tamanho de chave que deseja explorar: ");
length = +length;
// TODO - While que valida o valor de length
key_finder_1.KeyFinder.findKey(cipherText, length);
