var fs = require("fs");

export class FileReader {

    // Retorna uma string contendo o texto do arquivo especificado por 'path'
    static readFile(path: string) {
        return fs.readFileSync(path).toString();
    }
}