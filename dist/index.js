"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var decoder_1 = require("./decoder");
var file_reader_1 = require("./file-reader");
var key_length_finder_1 = require("./key-length-finder");
var key_finder_1 = require("./key-finder");
var readline = require('readline-sync');
var fs = require('fs');
var cipherTextFiles = [];
var count = 0;
fs.readdirSync("./data/").forEach(function (filename) {
    console.log(count + " - " + filename);
    cipherTextFiles.push(filename);
    count++;
});
var chosenIndex = readline.question("\nDigite o índice do arquivo a ser decifrado " + "[0.." + (cipherTextFiles.length - 1) + "]: ");
var cipherText = file_reader_1.FileReader.readFile("./data/" + cipherTextFiles[chosenIndex]).toLowerCase();
console.log("\nOs possíveis tamanhos de chave encontrados foram:");
console.log("(Tamanho de chave - Número de vezes que foi encontrado como intervalo entre subStrings do texto)");
// Busca os tamanhos de chave possíveis
var candidates = key_length_finder_1.KeyLengthFinder.findKeyLengh(cipherText);
for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
    var c = candidates_1[_i];
    console.log(c.length + " - " + c.chance);
}
var keyLength = readline.question("\nEscolha o tamanho de chave que deseja explorar: ");
keyLength = +keyLength;
var keyCandidates = key_finder_1.KeyFinder.findKey(cipherText, keyLength);
for (var i = 0; i < keyLength; i++) {
    console.log(i + ": " + Object.keys(keyCandidates[i]));
}
var key = readline.question("\nDigite a chave que deseja usar para decifrar o texto: ");
console.log("\n" + decoder_1.Decoder.decode(cipherText, key, 200));
