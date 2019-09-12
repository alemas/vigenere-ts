import { Alphabet } from "./alphabet";

export class Decoder {

    // Retorna o texto decodificado com a chave informada.
    // textLimit é usado para limitar o número de caracteres que se deseja decodificar
    public static decode(cipherText: string, key: string, textLimit?: number): string {

        let text:string = "";
        const keySize:number = key.length;
        const alphabetSize = Alphabet.alphabetLength;
        textLimit = textLimit != null && textLimit < cipherText.length ? textLimit : cipherText.length;

        for (let i = 0; i < textLimit; i++) {
            // Valor numérico correspondente à letra do texto cifrado
            let cipherNumber:number = Alphabet.getNumberForLetter(cipherText.charAt(i));

            // Valor numérico correspondente à letra da chave
            let keyNumber:number = Alphabet.getNumberForLetter(key.charAt(i % keySize));

            // Resultado do cálculo para decifrar o caracter
            let resultNumber:number = cipherNumber - keyNumber;
            if (resultNumber < 0) resultNumber += alphabetSize;
            
            text = text + Alphabet.getLetterForNumber(resultNumber);
        }

        return text;
    }

}