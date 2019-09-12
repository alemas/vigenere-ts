"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alphabet_1 = require("./alphabet");
var letter_frequencies_1 = require("./letter-frequencies");
var KeyFinder = /** @class */ (function () {
    function KeyFinder() {
    }
    KeyFinder.findKey = function (text, keyLength) {
        // Array de dicionários onde cada posição representa uma letra da chave
        // e cada dicionário representa o número de ocorrências de cada caracter
        var charOccurrences = [];
        // Array para guardar os melhores cadidatos para cada
        // letra da chave
        var bestCandidates = [];
        // Inicia charOccurrences com todas letras e número de ocorrências em 0
        for (var i = 0; i < keyLength; i++) {
            charOccurrences[i] = {};
            bestCandidates[i] = {};
            for (var j = 0; j < alphabet_1.Alphabet.letters.length; j++) {
                charOccurrences[i][alphabet_1.Alphabet.letters[j]] = 0;
            }
        }
        // Preenche as ocorrências de cada caracter para cada letra da chave
        for (var i = 0; i < text.length; i++) {
            var char = text.charAt(i);
            charOccurrences[i % keyLength][char]++;
        }
        var totalLetters = text.length / keyLength;
        var langFrequencies = letter_frequencies_1.LetterFrequencies.portuguese;
        for (var i = 0; i < keyLength; i++) {
            var keyPos = charOccurrences[i];
            // j irá agir como o deslocamento para cada letra do alfabeto
            for (var j = 0; j < alphabet_1.Alphabet.alphabetLength; j++) {
                var difference = 0;
                for (var char in keyPos) {
                    // Frequência que aparece o caracter nessa posição da chave pelo texto
                    var freq = keyPos[char] / totalLetters * 100;
                    var shiftedChar = alphabet_1.Alphabet.getLetterForNumber((alphabet_1.Alphabet.getNumberForLetter(char) + j) % alphabet_1.Alphabet.alphabetLength);
                    // Frequência que aparece o caracter na língua portuguesa
                    var langFreq = langFrequencies[shiftedChar];
                    difference += Math.abs(freq - langFreq);
                }
                if (difference < 50) {
                    var decodedLetter = Math.abs(j - 26) % 26;
                    bestCandidates[i][alphabet_1.Alphabet.getLetterForNumber(decodedLetter)] = difference;
                }
            }
        }
        console.log(bestCandidates);
    };
    return KeyFinder;
}());
exports.KeyFinder = KeyFinder;
