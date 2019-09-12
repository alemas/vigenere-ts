"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alphabet_1 = require("./alphabet");
var KeyFinder = /** @class */ (function () {
    function KeyFinder() {
    }
    KeyFinder.findKey = function (text, keyLength) {
        // let subStrings:string[] = [];
        // let subString = "";
        // Array de dicionários onde cada posição representa uma letra da chave
        // e cada dicionário representa o número de ocorrências de cada caracter
        var charOccurrences = [];
        // Array de 
        var higherOccurrences = [];
        for (var i = 0; i < keyLength; i++) {
            charOccurrences[i] = {};
            higherOccurrences.push({ char: "", occurrences: 0 });
        }
        // Transforma o texto em várias subStrings do tamanho de keyLength
        for (var i = 0; i < text.length; i++) {
            var char = text.charAt(i);
            var pos = i % keyLength;
            // subString += char;
            // if (i % keyLength == keyLength - 1) {
            //     subStrings.push(subString);
            //     subString = "";
            // }
            if (charOccurrences[pos][char] == null) {
                charOccurrences[pos][char] = 1;
            }
            else {
                charOccurrences[pos][char]++;
            }
        }
        console.log(text.length);
        for (var i = 0; i < charOccurrences.length; i++) {
            for (var char in charOccurrences[i]) {
                var occurrences = charOccurrences[i][char];
                if (occurrences > (text.length * 0.01)) {
                    console.log("char: " + char + ", count: " + charOccurrences[i][char]);
                }
                if (higherOccurrences[i].occurrences < occurrences) {
                    higherOccurrences[i] = { char: char, occurrences: occurrences };
                }
            }
            console.log();
        }
        console.log(higherOccurrences);
        for (var i = 0; i < higherOccurrences.length; i++) {
            var char = higherOccurrences[i].char;
            console.log(alphabet_1.Alphabet.getLetterForNumber(alphabet_1.Alphabet.alphabetLength - alphabet_1.Alphabet.getNumberForLetter(char)));
        }
    };
    return KeyFinder;
}());
exports.KeyFinder = KeyFinder;
