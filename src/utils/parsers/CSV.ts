
class CSV {
    static async parseText(text: string, fields: any) {
        const data: any[] = [];
        const lines = text.replaceAll('\r\n', '\n').split('\n');
        const headers = lines[0].split(',');
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const values = line.split(',');
            const obj: any = {};
            for (let j = 0; j < values.length; j++) {
                const field = fields[headers[j]];
                if (field) {
                    obj[field] = values[j];
                }
            }
            data.push(obj);
        }
        return data;
    }

    static async parseFile(file: File, fields: any) {
        const text = await file.text();
        return CSV.parseText(text, fields);
    }

    static async parse(target: File | string, fields: any) {
        if (target instanceof File) return CSV.parseFile(target, fields);
        return CSV.parseText(target, fields);
    }
}

export default CSV;