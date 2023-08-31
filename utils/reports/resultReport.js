const stream = require('../stream')
var PdfPrinter = require('pdfmake')
const path = require('path')

exports.riReport = async (entidade, modulo, ras) => {
    
    var fonts = {
        Courier: {
            normal: 'Courier',
            bold: 'Courier-Bold',
            italics: 'Courier-Oblique',
            bolditalics: 'Courier-BoldOblique'
        },
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        },
        Times: {
            normal: 'Times-Roman',
            bold: 'Times-Bold',
            italics: 'Times-Italic',
            bolditalics: 'Times-BoldItalic'
        },
        Symbol: {
            normal: 'Symbol'
        },
        ZapfDingbats: {
            normal: 'ZapfDingbats'
        }
    };

    var printer = new PdfPrinter(fonts);

    var docDefinition = {
        pageSize: 'A4',
        content: [
            {
                table: {
                    widths: ['*'],
                    body: [
                        [{ text: 'Relatório RI', bold: true }],
                    ]
                }
            },
            {

                table: {
                    widths: [50, 270, 60, 98],
                    body: [
                        ['Titulo do Módulo', { text: `${modulo.titulo}`, italics: true, color: 'gray' }, 'Código', { text: `${modulo.codigo}`, italics: true, color: 'gray' }],
                        ['Nivel do QNQP', { text: `${modulo.nivel}`, italics: true, color: 'gray' }, { text: 'Semestre' }, { text: '*', italics: true, color: 'gray' }],
                    ]
                }
            },
            {
                style: 'tableExample',
                table: {
                    widths: [100, '*'],
                    body: [
                        ['Nome do Estudante', { text: `${entidade.nome}`, italics: true, color: 'gray' }],
                    ]
                }
            },
            {
                table: {
                    widths: [100, 250, '*', '*'],
                    body: [
                        ['Código do estudante', { text: `${entidade.estudante}`, italics: true, color: 'gray' }, 'Turma', { text: 'x', italics: true, color: 'gray' }],
                    ]
                }
            },
            {
                table: {
                    widths: ['*'],
                    body: [
                        [{ text: 'mm', bold: true, color: 'white' }],
                    ]
                }
            },
            {
                table: {
                    widths: ['*', '*', '*', '*', '*'],
                    body: [
                        ['Resultado de aprendizagem', 'Resultado da avaliação', 'Avaliação/Data', '1ª RAV/Data', '2ª RAV/Data'],
                    ]
                }
            },
            ras,
            {
                style: 'tableExample',
                table: {
                    widths: [100, '*'],
                    body: [
                        ['Nome do Avaliador', { text: ``, italics: true, color: 'gray' }],
                        ['Assinatura do Avaliador', { text: '', italics: true, color: 'gray' }],
                        ['Data da avaliação Final', { text: '', italics: true, color: 'gray' }],
                        ['Nome do verificador interno', { text: '', italics: true, color: 'gray' }],
                        ['Data da verificação', { text: '', italics: true, color: 'gray' }],
                        ['Assinatura do verificador interno', { text: '', italics: true, color: 'gray' }],
                    ]
                }
            },
            {
                style: 'tableExample',
                table: {
                    widths: [100, '*'],
                    body: [
                        ['Resultado final do modulo', 'Feedback/Observações'],
                        [{ text: '', italics: true, color: 'gray' }, { text: '\n\n\n\n\n\n', italics: true, color: 'gray' }],
                    ]
                }
            }
        ],
        styles: {
            tableExample: {
                margin: [0, 15, 0, 0]
            },
            tableExampleb: {
                margin: [0, 0, 0, 0]
            }
        },
        defaultStyle: {
            font: 'Helvetica'
        }
    };

    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    let writeStream = new stream.WritableBufferStream();
    pdfDoc.pipe(writeStream);

    pdfDoc.end()
    return new Promise((resolve, reject) => {
        const callback = () => {
            resolve(writeStream.toBuffer())
        }
        writeStream.on('finish', callback)
    }
    )
}
