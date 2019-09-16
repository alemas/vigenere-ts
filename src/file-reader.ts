var fs = require("fs");

// Classe responsável por ler os arquivos de texto a serem decifrados

export class FileReader {

    // Retorna uma string contendo o texto do arquivo especificado por 'path'
    static readFile(path: string) {
        return fs.readFileSync(path).toString();
    }
}