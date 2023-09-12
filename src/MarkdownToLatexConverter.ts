class MarkdownToLatexConverter {
    public convert(markdown: string): string {
        const lines = markdown.trim().split('\n');

        if (lines.length < 3) {
            throw new Error("Invalid Markdown table format.");
        }

        const header = lines[0].split('|').slice(1, -1);
        if (header.some(cell => cell.trim() === "")) {
            throw new Error("Header cells cannot be empty.");
        }

        const body = lines.slice(2);

        const alignments: string[] = [];
        lines[1].split('|').slice(1, -1).forEach(align => {
            const trimmedAlign = align.trim();
            if (trimmedAlign.startsWith(':') && trimmedAlign.endsWith(':')) {
                alignments.push('c');
            } else if (trimmedAlign.startsWith(':')) {
                alignments.push('l');
            } else {
                alignments.push('r');
            }
        });

        let latexTable = "\\begin{tabular}{" + alignments.join(' | ') + "}\n";
        latexTable += "\\hline\n";
        latexTable += header.join(' & ') + " \\\\\n";
        latexTable += "\\hline\n";

        body.forEach(line => {
            latexTable += line.split('|').slice(1, -1).join(' & ') + " \\\\\n";
            latexTable += "\\hline\n";
        });

        latexTable += "\\end{tabular>";

        return latexTable;
    }
}

export default MarkdownToLatexConverter;