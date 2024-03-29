"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alphabet_1 = require("./alphabet");
var letter_frequencies_1 = require("./letter-frequencies");
// Classe responsável por encontrar os caracteres mais prováveis da chave.
// O texto é dividido em x partes, sendo x o tamanho da chave, e em cada parte
// estão todos os caracteres cifrados pela mesma letra da chave. É
// feita uma comparação de frequência dos caracteres com as frequências da
// língua portuguesa e define-se então qual chave foi usada
var KeyFinder = /** @class */ (function () {
    function KeyFinder() {
    }
    KeyFinder.findKey = function (text, keyLength) {
        // Array de dicionários onde cada posição representa uma letra da chave
        // e cada dicionário representa o número de ocorrências de cada caracter
        var charOccurrences = [];
        // Array para guardar os melhores cadidatos para cada
        // letra da chave
        var candidates = [];
        // Inicia charOccurrences com todas letras e número de ocorrências em 0 e
        // inicia bestCandidates com dicionários vazios
        for (var i = 0; i < keyLength; i++) {
            charOccurrences[i] = {};
            candidates[i] = {};
            for (var j = 0; j < alphabet_1.Alphabet.letters.length; j++) {
                charOccurrences[i][alphabet_1.Alphabet.letters[j]] = 0;
            }
        }
        // Preenche as ocorrências de cada caracter para cada letra da chave
        for (var i = 0; i < text.length; i++) {
            var char = text.charAt(i);
            charOccurrences[i % keyLength][char]++;
        }
        // Número total de caracteres que cada letra da chave cifrou
        var totalLetters = text.length / keyLength;
        // Array com as frequências de cada letra na língua portuguesa
        var langFrequencies = letter_frequencies_1.LetterFrequencies.portuguese;
        // Para cada letra da chave
        for (var i = 0; i < keyLength; i++) {
            // Dicionário contendo as ocorrências de cada caracter naquela letra da chave
            var keyPos = charOccurrences[i];
            // Calcula-se a frequência de cada caracter naquela parte do texto e compara-se com as frequências de
            // cada caracter na língua portuguesa deslocados de 0 a 25 posições.
            // Aquela comparação que houver menor diferença de frequências se torna candidato de caracter da chave
            // j serve como o deslocamento para cada letra do alfabeto
            for (var j = 0; j < alphabet_1.Alphabet.alphabetLength; j++) {
                // Representa a soma de diferenças entre a frequência das letras no texto e na língua portuguesa
                var difference = 0;
                for (var char in keyPos) {
                    // Frequência que aparece o caracter nessa posição da chave pelo texto
                    var freq = keyPos[char] / totalLetters * 100;
                    // Caracter deslocado segundo o valor de j
                    var shiftedChar = alphabet_1.Alphabet.getLetterForNumber((alphabet_1.Alphabet.getNumberForLetter(char) + j) % alphabet_1.Alphabet.alphabetLength);
                    // Frequência que aparece o caracter na língua portuguesa
                    var langFreq = langFrequencies[shiftedChar];
                    difference += Math.abs(freq - langFreq);
                }
                // Salva os melhores candidatos no array;
                // 50 foi um valor arbitrário definido após vários testes com textos de tamanhos diferentes
                if (difference < 50) {
                    var decodedLetter = Math.abs(j - alphabet_1.Alphabet.alphabetLength) % alphabet_1.Alphabet.alphabetLength;
                    candidates[i][alphabet_1.Alphabet.getLetterForNumber(decodedLetter)] = difference;
                }
            }
        }
        return candidates;
    };
    return KeyFinder;
}());
exports.KeyFinder = KeyFinder;
