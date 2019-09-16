import { Decoder } from "./decoder";
import { FileReader } from "./file-reader";
import { KeyLengthFinder } from "./key-length-finder";
import { KeyFinder } from './key-finder';

const readline = require('readline-sync');
const fs = require('fs');

let cipherTextFiles:string[] = [];
let count = 0;

fs.readdirSync("./data/").forEach( (filename: string) => {
    console.log(count + " - " + filename);
    cipherTextFiles.push(filename);
    count++;
});

const chosenIndex = readline.question("\nDigite o índice do arquivo a ser decifrado " + "[0.." + (cipherTextFiles.length-1) +"]: ");

let cipherText:string = FileReader.readFile("./data/" + cipherTextFiles[chosenIndex]).toLowerCase();

console.log("\nOs possíveis tamanhos de chave encontrados foram:");
console.log("(Tamanho de chave - Número de vezes que foi encontrado como mdc entre subStrings do texto)");

// Busca os tamanhos de chave possíveis
let candidates = KeyLengthFinder.findKeyLengh(cipherText);

for (const c of candidates) {
    console.log(c.length + " - " + c.count);
}

let keyLength = readline.question("\nEscolha o tamanho de chave que deseja explorar: ");
keyLength = +keyLength;

// Busca as possíveis chaves
const keyCandidates = KeyFinder.findKey(cipherText, keyLength);

for (let i = 0; i < keyLength; i++) {
    console.log(i + ": " + Object.keys(keyCandidates[i]));
}

let key = readline.question("\nDigite a chave que deseja usar para decifrar o texto: ");

// Decodifica os primeiros 200 caracteres do texto com a chave
console.log("\n" + Decoder.decode(cipherText, key, 200));