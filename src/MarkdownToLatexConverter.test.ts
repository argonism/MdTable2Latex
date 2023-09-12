import MarkdownToLatexConverter from './MarkdownToLatexConverter';

describe('MarkdownToLatexConverter', () => {
  it('should convert a valid Markdown table to LaTeX', () => {
    const markdownTable = `
      | Header 1 | Header 2 | Header 3 |
      |:--------:|:--------:|:--------:|
      |  Cell 1  |  Cell 2  |  Cell 3  |
      |  Cell 4  |  Cell 5  |  Cell 6  |`;
    const expectedLatex = `\\begin{tabular}{|c|c|c|}
\\hline
Header 1 & Header 2 & Header 3 \\\\
\\hline
Cell 1 & Cell 2 & Cell 3 \\\\
\\hline
Cell 4 & Cell 5 & Cell 6 \\\\
\\hline
\\end{tabular}`;

    const converter = new MarkdownToLatexConverter();
    const latexTable = converter.convert(markdownTable);

    expect(latexTable).toEqual(expectedLatex);
  });

  it('should throw an error for invalid Markdown table format', () => {
    const invalidMarkdown = `
      | Header 1 | Header 2 |
      | ------- | ------- |
    `;
    const converter = new MarkdownToLatexConverter();

    expect(() => converter.convert(invalidMarkdown)).toThrowError('Invalid Markdown table format.');
  });

  it('should handle empty cells in the header', () => {
    const markdownWithEmptyHeader = `
      |  | Header 2 | Header 3 |
      | ------- | ------- | ------- |
      | Cell 1  | Cell 2  | Cell 3  |
    `;
    const converter = new MarkdownToLatexConverter();

    expect(() => converter.convert(markdownWithEmptyHeader)).not.toThrowError();
  });

  it('should handle cells with varying alignments', () => {
    const converter = new MarkdownToLatexConverter();
    const markdown = `
      | Header 1 | :Header 2 | Header 3: |
      | --- | :---: | --- |
      | Cell 1 | Cell 2 | Cell 3 |
      | Cell 4 | Cell 5 | Cell 6 |
    `;
    const expectedLatex = `\\begin{tabular}{|c|c|c|}
\\hline
Header 1 & :Header 2 & Header 3: \\\\
\\hline
Cell 1 & Cell 2 & Cell 3 \\\\
\\hline
Cell 4 & Cell 5 & Cell 6 \\\\
\\hline
\\end{tabular}`;

    const latexTable = converter.convert(markdown);
    expect(latexTable).toEqual(expectedLatex);
  });

  it('should throw an error for mismatched header and body column counts', () => {
    const converter = new MarkdownToLatexConverter();

    // Create a Markdown table with mismatched header and body column counts
    const markdown = `
      | Header 1 | Header 2 |
      |:--------:|:--------:|
      | Cell 1   |
    `;

    expect(() => converter.convert(markdown)).toThrowError("Header and body column counts must match.");
  });

  it('should throw an error for missing header', () => {
    const converter = new MarkdownToLatexConverter();

    // Create a Markdown table with matching header and body column counts
    const markdown = `
      | Header 1 |
      |:--------:|:--------:|
      | Cell 1   | Cell 2   |
    `;

    expect(() => converter.convert(markdown)).toThrowError("Header and body column counts must match.");
  });

  it('should generate LaTeX without pipe in headers when includePipeInHeader is false', () => {
    const markdownTable = `
      | Header 1 | Header 2 | Header 3 |
      |:--------:|:--------:|:--------:|
      |  Cell 1  |  Cell 2  |  Cell 3  |
      |  Cell 4  |  Cell 5  |  Cell 6  |`;
    const expectedLatex = `\\begin{tabular}{cc|c}
\\hline
Header 1 & Header 2 & Header 3 \\\\
\\hline
Cell 1 & Cell 2 & Cell 3 \\\\
\\hline
Cell 4 & Cell 5 & Cell 6 \\\\
\\hline
\\end{tabular}`;

    const converter = new MarkdownToLatexConverter();
    const latexTable = converter.convert(markdownTable, false); // includePipeInHeader is set to false

    expect(latexTable).toEqual(expectedLatex);
  });

  it('should generate LaTeX with pipe in headers by default', () => {
    const markdownTable = `
      | Header 1 | Header 2 | Header 3 |
      |:--------:|:--------:|:--------:|
      |  Cell 1  |  Cell 2  |  Cell 3  |
      |  Cell 4  |  Cell 5  |  Cell 6  |`;
    const expectedLatex = `\\begin{tabular}{|c|c|c|}
\\hline
Header 1 & Header 2 & Header 3 \\\\
\\hline
Cell 1 & Cell 2 & Cell 3 \\\\
\\hline
Cell 4 & Cell 5 & Cell 6 \\\\
\\hline
\\end{tabular}`;

    const converter = new MarkdownToLatexConverter();
    const latexTable = converter.convert(markdownTable); // By default, includePipeInHeader is true

    expect(latexTable).toEqual(expectedLatex);
  });
});
