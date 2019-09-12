import { Alphabet } from "./alphabet";

export class KeyFinder {

    public static findKey(text: string, keyLength: number) {

        // Array de dicionários onde cada posição representa uma letra da chave
        // e cada dicionário representa o número de ocorrências de cada caracter
        let charOccurrences:{[char: string] : number}[] = [];

        // Array para guardar os melhores cadidatos para cada
        // letra da chave
        let bestCandidates:{[char: string]: number}[] = [];

        // Inicia charOccurrences com todas letras e número de ocorrências em 0
        for (let i = 0; i < keyLength; i++) {
            charOccurrences[i] = {};
            for (let j = 0; j < Alphabet.letters.length; j++) {
                charOccurrences[i][Alphabet.letters[j]] = 0;
            }
        }

        // Preenche as ocorrências de cada caracter em cada posição da chave
        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i);
            charOccurrences[i % keyLength][char]++;
        }


        for (let i = 0; i < keyLength; i++) {
            for (let j = 0; j < Alphabet.alphabetLength; j++) {
                
            }
          
        }

        // for (let i = 0; i < charOccurrences.length; i++) {
        //     for (const char in charOccurrences[i]) {
        //         let occurrences = charOccurrences[i][char];
        //         if (occurrences > (text.length * 0.01)) {
        //             console.log("char: " + char + ", count: " + charOccurrences[i][char]);
        //         }
        //     }
        //     console.log();
        // }

    }

}