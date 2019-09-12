import { Alphabet } from "./alphabet";
import { LetterFrequencies } from "./letter-frequencies";

export class KeyFinder {

    public static findKey(text: string, keyLength: number): {[char: string]: number}[] {

        // Array de dicionários onde cada posição representa uma letra da chave
        // e cada dicionário representa o número de ocorrências de cada caracter
        let charOccurrences:{[char: string] : number}[] = [];

        // Array para guardar os melhores cadidatos para cada
        // letra da chave
        let bestCandidates:{[char: string]: number}[] = [];

        // Inicia charOccurrences com todas letras e número de ocorrências em 0 e
        // inicia bestCandidates com dicionários vazios
        for (let i = 0; i < keyLength; i++) {
            charOccurrences[i] = {};
            bestCandidates[i] = {};
            for (let j = 0; j < Alphabet.letters.length; j++) {
                charOccurrences[i][Alphabet.letters[j]] = 0;
            }
        }

        // Preenche as ocorrências de cada caracter para cada letra da chave
        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i);
            charOccurrences[i % keyLength][char]++;
        }

        // Número total de characteres que cada letra da chave cifrou
        let totalLetters = text.length/keyLength;

        // Array com as frequências de cada letra na língua portuguesa
        const langFrequencies = LetterFrequencies.portuguese;

        // Para cada letra da chave
        for (let i = 0; i < keyLength; i++) {
            // 
            let keyPos = charOccurrences[i];
            
            // j serve como o deslocamento para cada letra do alfabeto
            for (let j = 0; j < Alphabet.alphabetLength; j++) {
                // Representa a soma de diferenças entre
                let difference = 0;
                for (const char in keyPos) {
                    // Frequência que aparece o caracter nessa posição da chave pelo texto
                    let freq = keyPos[char] / totalLetters * 100;

                    let shiftedChar = Alphabet.getLetterForNumber((Alphabet.getNumberForLetter(char) + j) % Alphabet.alphabetLength);
                    // Frequência que aparece o caracter na língua portuguesa
                    let langFreq = langFrequencies[shiftedChar];

                    difference += Math.abs(freq - langFreq);
                }

                // 50 foi um valor arbitrário definido após vários testes com textos de tamanhos diferentes
                if (difference < 50) {
                    let decodedLetter = Math.abs(j - 26) % 26;
                    bestCandidates[i][Alphabet.getLetterForNumber(decodedLetter)] = difference;
                }
            }

        }
        return bestCandidates;
    }

}