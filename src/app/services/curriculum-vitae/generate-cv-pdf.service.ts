import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf';
import { PdfCVData } from '@core/interfaces/pdf-cv-data';

@Injectable({
    providedIn: 'root',
})
export class GenerateCvPdfService {
    constructor(private toastrService: ToastrService) {}

    exportAsPDF(data: PdfCVData) {
        this.toastrService.info('Generando CV');

        let doc = new jsPDF();

        const myImage =
            'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60';

        doc.setFontSize(20);
        doc.setFont('arial', 'bold');
        doc.text('CURRICULUM VITAE', 75, 15);
        doc.addImage(myImage, 'JPEG', 15, 30, 45, 45);
        doc.setFontSize(12);
        doc.text(data.fullname.toUpperCase(), 70, 40);
        doc.text(`CELULAR : ${data.phone}`, 70, 50);
        doc.text('UNIVERSIDAD GENTLEMAN PROGRAMMING - PERÚ', 70, 60);
        doc.text('- APASIONADO DEL DESARROLLO WEB -', 70, 70);

        doc.setFont('arial', 'bold');
        doc.text('EXPERIENCIA LABORAL', 15, 90);
        doc.setLineWidth(0.5);
        doc.line(15, 92, 100, 92);
        doc.setFont('arial', 'normal');
        doc.text(data.experience, 15, 100);

        doc.setFont('arial', 'bold');
        doc.text('HABILIDADES TÉCNICAS', 15, 120);
        doc.setLineWidth(0.5);
        doc.line(15, 122, 100, 122);
        doc.setFont('arial', 'normal');
        doc.text(data.technicalSkills, 15, 130);

        doc.setFont('arial', 'bold');
        doc.text('HABILIDADES BLANDAS', 15, 150);
        doc.setLineWidth(0.5);
        doc.line(15, 152, 100, 152);
        doc.setFont('arial', 'normal');
        doc.text(data.softSkills, 15, 160);

        doc.setFontSize(20);
        doc.setFont('arial', 'bold');
        doc.text('HACKATHON GENTLEMAN PROGRAMMING', 30, 250);
        doc.setFontSize(18);
        doc.setFont('arial', 'normal');
        doc.text('- GET ON BOARD -', 80, 260);
        doc.save('CV_' + data.fullname.toUpperCase() + '_' + new Date().getTime() + '.pdf');
    }
}
