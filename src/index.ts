import { Decoder } from "./decoder";
import { FileReader } from "./file-reader";
import { KeyLengthFinder } from "./key-length-finder";
import { KeyFinder } from './key-finder';

const readline = require('readline-sync');

let cipherText:string = FileReader.readFile("./data/ciphertext.txt").toLowerCase();

console.log("Os possíveis tamanhos de chave encontrados foram:");
console.log("(Tamanho de chave - Número de vezes que foi encontrado como intervalo entre subStrings do texto)\n");
let candidates = KeyLengthFinder.findKeyLengh(cipherText);

for (const c of candidates) {
    console.log(c.length + " - " + c.chance);
}

let length = readline.question("\nEscolha o tamanho de chave que deseja explorar: ");
length = +length;

// TODO - While que valida o valor de length

KeyFinder.findKey(cipherText, length);