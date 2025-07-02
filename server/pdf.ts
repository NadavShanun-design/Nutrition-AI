import { PDFExtract } from 'pdf.js-extract';

const pdfExtract = new PDFExtract();

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfExtract.extractBuffer(buffer);
    const text = data.pages
      .map(page => page.content.map(item => item.str).join(' '))
      .join('\n');

    // Clean and normalize the text
    return text
      .replace(/\s+/g, ' ')
      .trim();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to extract text from PDF: ${errorMessage}`);
  }
}