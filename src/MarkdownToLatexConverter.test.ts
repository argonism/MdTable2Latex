import MarkdownToLatexConverter from './MarkdownToLatexConverter';

describe('MarkdownToLatexConverter', () => {
  let converter: MarkdownToLatexConverter;

  beforeEach(() => {
    converter = new MarkdownToLatexConverter();
  });

  it('should convert a simple markdown table to latex', () => {
    const markdown = `| Header1 | Header2 |
|---------|---------|
| data1   | data2   |`;

    const latex = converter.convert(markdown);
    expect(latex).toBe(`\\begin{tabular}{r | r}
\\hline
Header1 & Header2 \\\\
\\hline
data1 & data2 \\\\
\\hline
\\end{tabular}`);
  });

  it('should throw an error for invalid markdown', () => {
    const markdown = `| Header1 | Header2 |
| data1 | data2 |`;

    expect(() => converter.convert(markdown)).toThrow("Invalid Markdown table format.");
  });
});
