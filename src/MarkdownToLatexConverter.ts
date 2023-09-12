class MarkdownToLatexConverter {
    convert(markdown: string, includePipeInHeader: boolean = true): string {
        const lines = markdown.trim().split('\n');
    
        if (lines.length < 3) {
            throw new Error("Invalid Markdown table format.");
        }
    
        const header = this.parseRow(lines[0]);
        const body = lines.slice(2).map(line => this.parseRow(line));
        const alignments = this.parseAlignments(lines[1]);
    
        this.validateColumnCounts(header, body);
    
        const latexTable = this.generateLatexTable(header, body, alignments, includePipeInHeader);
    
        return latexTable;
    }

    private parseRow(row: string): string[] {
        return this.trimCell(row.split('|').slice(1, -1));
    }

    private trimCell(cells: string[]): string[] {
        return cells.map(cell => cell.trim());
    }

    private parseAlignments(alignmentsRow: string): string[] {
        return this.trimCell(alignmentsRow.split('|').slice(1, -1)).map(align => {
        if (align.startsWith(':') && align.endsWith(':')) return 'c';
        else if (align.startsWith(':')) return 'l';
        else if (align.endsWith(':')) return 'r';
        else return 'c';
        });
    }

    private validateColumnCounts(header: string[], body: string[][]): void {
        const headerColumnCount = header.length;
        if (body.some(row => row.length !== headerColumnCount)) {
        throw new Error("Header and body column counts must match.");
        }
    }

    private generateLatexTable(header: string[], body: string[][], alignments: string[], includePipeInHeader: boolean): string {
        const headerRow = this.joinRow(header);
        const bodyRows = body.map(cells => this.joinRow(cells)).join("\\hline\n");

        const pipe = includePipeInHeader ? '|' : '';

        return `\\begin{tabular}{${pipe}${alignments.join(pipe)}${pipe}}\n\\hline\n${headerRow}\\hline\n${bodyRows}\\hline\n\\end{tabular}`;
    }

    private joinRow(cells: string[]): string {
        return cells.join(' & ') + " \\\\\n";
    }
    }

export default MarkdownToLatexConverter;
