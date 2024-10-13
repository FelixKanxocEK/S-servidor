import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';
import { Extension } from "../pages/extensions/extensions/interfaces/extensions.interface";

@Injectable({
    providedIn: 'root'
})
export class ExcelService {

    constructor() { }

    exportExtensions(data: Extension[]) {
        const data_formated: string[][] = [];

        data_formated.push(['ID', 'Nombre', 'Extension', 'Empresa', 'Departamento', 'DID salida']);

        data.forEach(extension => {
            data_formated.push([
                extension.extension_id.toString(),
                extension.name,
                extension.extension,
                extension.contact.organization,
                extension.contact.location,
                extension.did_number
            ]);
        })

        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data_formated);

        // Aplicar negrita a los headers (primera fila)
        const range = XLSX.utils.decode_range(ws['!ref'] as string);
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col }); // Headers en la fila 0
            if (!ws[cellAddress]) continue; // Si la celda está vacía, continuar
            
            // Aplicar estilo de negrita
            ws[cellAddress].t = {
                font: {
                    bold: true
                }
            };
        }

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'extensiones_' + new Date().getTime() + '.xlsx');
    }


}