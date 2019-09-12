import { Decoder } from "./decoder";
import { FileReader } from "./file-reader";
import { KeyLengthFinder } from "./key-length-finder";
import { KeyFinder } from './key-finder';

const readline = require('readline-sync');

let cipherText = FileReader.readFile("./data/ciphertext.txt");

console.log("Os possíveis tamanhos de chave encontrados foram:\n");
let candidates = KeyLengthFinder.findKeyLengh(cipherText);

for (const c of candidates) {
    console.log("Tamanho: " + c.length + ", Chance: " + c.chance);
}

let length = readline.question("\nEscolha o tamanho de chave que deseja explorar: ");
length = +length;

// TODO - While que valida o valor de length

KeyFinder.findKey(cipherText, length);