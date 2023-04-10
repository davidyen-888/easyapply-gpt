import * as pdfjsLib from "pdfjs-dist";


async function convertPdfToText(pdfFile: File): Promise<string> {
  // Read the file using file reader
  const fileReader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    fileReader.onload = function () {
      // turn array buffer into typed array
      if (!fileReader.result || !(fileReader.result instanceof ArrayBuffer)) {
        reject(new Error('Invalid PDF file'));
        return;
      }
      const typedarray = new Uint8Array(fileReader.result);

      // pdfjs should be able to read this
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
      const loadingTask = pdfjsLib.getDocument(typedarray);
      let textBuilder: string = "";
      loadingTask.promise
        .then(async (pdf) => {
          // Loop through each page in the PDF file
          for (let i = 1; i <= pdf.numPages; i++) {
            // Get the text content for the page
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const text = content.items
              .map((item: any) => {
                if (item.str) {
                  return item.str;
                }
                return "";
              })
              .join(" ");
            textBuilder += text;
          }
          resolve(textBuilder);
        })
        .catch((err) => {
          reject(err);
        });
    };
    // Read the file as ArrayBuffer
    fileReader.readAsArrayBuffer(pdfFile);
  });
}

export default convertPdfToText;