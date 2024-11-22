import { readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

// Fonction pour parcourir les répertoires récursivement
function readDirectory(directoryPath, result = []) {
  const items = readdirSync(directoryPath);

  items.forEach((item) => {
    const fullPath = join(directoryPath, item);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      // Si c'est un répertoire, le parcourir récursivement
      readDirectory(fullPath, result);
    } else {
      // Si c'est un fichier, lire son contenu
      const content = readFileSync(fullPath, "utf-8");
      result.push({
        path: fullPath,
        content,
      });
    }
  });

  return result;
}

// Fonction pour écrire le résultat dans un fichier texte
function writeToFile(outputPath, data) {
  const output = data
    .map((file) => `==== ${file.path} ====\n\n${file.content}\n\n`)
    .join("\n");

  writeFileSync(outputPath, output, "utf-8");
  console.log(
    `Tous les fichiers et leur contenu ont été enregistrés dans : ${outputPath}`
  );
}

// Chemin du répertoire à analyser
const directoryPath = "h:/project3/src/components";

// Chemin du fichier de sortie
const outputFilePath = "./all_files_content.txt";

try {
  const result = readDirectory(directoryPath);
  writeToFile(outputFilePath, result);
} catch (error) {
  console.error("Erreur lors du traitement :", error);
}
