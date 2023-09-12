class MarkdownToLatexConverter {
    public convert(markdown: string): string {
        const lines = markdown.trim().split('\n');

        if (lines.length < 3) {
            throw new Error("Invalid Markdown table format.");
        }

        const header = lines[0].split('|').slice(1, -1).map(cell => cell.trim());
        if (header.some(cell => cell.trim() === "")) {
            throw new Error("Header cells cannot be empty.");
        }
        const body = lines.slice(2).map(line => line.split('|').slice(1, -1).map(cell => cell.trim()));

        const alignments: string[] = [];
        lines[1].split('|').slice(1, -1).forEach(align => {
            const trimmedAlign = align.trim();
            if (trimmedAlign.startsWith(':') && trimmedAlign.endsWith(':')) {
                alignments.push('c');
            } else if (trimmedAlign.startsWith(':')) {
                alignments.push('l');
            } else if (trimmedAlign.endsWith(':')) {
                alignments.push('r');
            } else {
                alignments.push('c')
            }
        });

        let latexTable = "\\begin{tabular}{" + alignments.join(' | ') + "}\n";
        latexTable += "\\hline\n";
        latexTable += header.join(' & ') + " \\\\\n";
        latexTable += "\\hline\n";

        body.forEach(cells => {
            latexTable += cells.join(' & ') + " \\\\\n";
            latexTable += "\\hline\n";
        });
        
        latexTable += "\\end{tabular}";

        return latexTable;
    }
}

export default MarkdownToLatexConverter;