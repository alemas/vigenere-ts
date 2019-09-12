"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Alphabet = /** @class */ (function () {
    function Alphabet() {
    }
    //Retorna o valor numérico correspondente à letra desejada
    Alphabet.getLetterForNumber = function (number) {
        return Alphabet.letters[number];
    };
    //Retorna a letra correspondente ao valor numérico desejado
    Alphabet.getNumberForLetter = function (letter) {
        return Alphabet.letters.indexOf(letter);
    };
    // Letras dos alfabeto a ser utilizado
    Alphabet.letters = "abcdefghijklmnopqrstuvwxyz".split("");
    // Número de caracteres do alfabeto (usado para cálculos de módulo na classe Decoder)
    Alphabet.alphabetLength = Alphabet.letters.length;
    return Alphabet;
}());
exports.Alphabet = Alphabet;
