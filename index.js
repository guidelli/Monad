// run `node index.js` in the terminal
import fs from 'fs'
import { Either } from './either.js'
import { IO } from './io.js'
console.log(`Hello Node.js v${process.versions.node}!`);
const readFile = (filename) =>
  new IO(() => {
    try {
      // Attempt to read the file and return the contents wrapped in a Right Either instance.
      return Either.of(fs.readFileSync(filename, 'utf8'));
    } catch (error) {
      // If the file cannot be read, return an error object wrapped in a Left Either instance.
      return Either.left(error);
    }
  });

// A function used to write to a file, returning a new IO instance that either wraps null, or an error object if the file cannot be written to.
const writeFile = (filename, content) =>
  new IO(() => {
    try {
      // Attempt to write to the file and return null wrapped in a Right Either instance.
      fs.writeFileSync(filename, content, 'utf8');
      return Either.of(null);
    } catch (error) {
      // If the file cannot be written to, return an error object wrapped in a Left Either instance.
      return Either.left(error);
    }
  });

// A function used to process file content by converting it to upper case.
const processContent = (content) => content.toUpperCase();

// A function that composes IO instances to read an input file, process its content, and write the result to an output file.
const main = (inputFile, outputFile) =>
  readFile(inputFile)
    .chain((content) => content.map(processContent))
    .chain((processedContent) => writeFile(outputFile, processedContent))
    .run();

// Execute the `main` function with input and output file names, and store the result in the `result` variable.
const result = main('input.txt', 'output.txt');

// Check the result of the computation and log either a success message or an error message.
if (result instanceof Left) {
  console.error('Error:', result.value);
} else {
  console.log('File processed successfully');
}