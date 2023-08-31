const stream = require('./../stream')
var PdfPrinter = require('pdfmake')
const path = require('path')

//Inscr report
exports.inscriptReport = async (nome, code, bi, cv, curso, telefone, data, mNumber, year, docRef, showM) => {
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
            { text: '____________________________________________________________________________________________', fontSize: 10 },
            {
                image: path.join(__dirname, 'img/domvx.png'),
                width: 135,
                height: 50,
            },
            { text: 'web-site: www.doms.ac.mz', fontSize: 10, margin: [10, -11] },
            { text: 'email: suporte@doms.ac', fontSize: 10, margin: [10, 11] },

            {
                columns: [
                    {
                        // auto-sized columns have their widths based on their content
                        width: 'auto',
                        text: ''
                    },
                    {
                        // star-sized columns fill the remaining space
                        // if there's more than one star-column, available width is divided equally
                        width: '*',
                        text: ''
                    },
                    {
                        // fixed width
                        width: 100,
                        text: ''
                    },
                    {
                        // % width
                        width: '30%',
                        text: "INSTITUIÇÃO", fontSize: 12, bold: true, margin: [0, -55]
                    }
                ],
                // optional space between columns
                columnGap: 10
            },

            {
                columns: [
                    {
                        // auto-sized columns have their widths based on their content
                        width: 'auto',
                        text: ''
                    },
                    {
                        // star-sized columns fill the remaining space
                        // if there's more than one star-column, available width is divided equally
                        width: '*',
                        text: ''
                    },
                    {
                        // fixed width
                        width: 100,
                        text: ''
                    },
                    {
                        // % width
                        width: '30%',
                        text: "Estrada Nacional N7, B.Matema\nTelefone: xxx-xx\nFax: xxxx", fontSize: 10, margin: [0, -40]
                    }
                ],
                // optional space between columns
                columnGap: 10
            },


            { text: '\n\n' },

     
            {
                columns: [
                    {
                        image: path.join(__dirname, 'img/User.png'),
                        width: 16,
                        height: 16,
                    },
                    { text: `Código: ${code}`, fontSize: 10, bold: true, margin: [-6, 2] }, ,
                    {
                        // fixed width
                        width: 100,
                        text: ''
                    }
                ],
                // optional space between columns
                columnGap: 10
            },

            { text: '\n' },

            {
                layout: 'lightHorizontalLines', // optional
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: ['*', 'auto', 200, '*'],

                    body: [
                        [{ text: 'Estudante', fontSize: 11 }, '', { text: 'Curso', fontSize: 11 }, { text: 'Contacto', fontSize: 11 }],
                        [{ text: `${nome}`, bold: true }, '', { text: `${curso}`, fontSize: 11 }, { text: `(+258) ${telefone}`, fontSize: 10 }],
                        [`Nível: ${cv}`, '', '\n\n', '',],
                        ['', '', { text: `DADOS DE ${docRef}`, bold: true, margin: [0, 2] }, '',],
                        [{ text: `Data de emissão:\n ${data}`, fontSize: 11 }, '', { text: `Ano lectivo: ${year}`, fontSize: 11 }, { text: `Referencia:\n ${await produceRef(bi)}`, fontSize: 11 },]
                    ]
                }
            },
            {text: '_____________________________'},
            { text: `RECIBO DE ${docRef} Nº: ${mNumber}`, fontSize: 10, margin: [0, 5] },
            { text: '\n\n' },
            {text: '_____________________________'},
            { text: 'MÓDULOS', bold: true, margin: [0, 5] },
            //modulos table here
            { text: '\n' },
            [
                showM
            ],

            { text: '\n\n\n\n\n' },
            { text: '___________________________________\n\n        (Assinatura & Carrimbo)', fontSize: 10 },

        ],
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
        //writeStream.end(callback)
    }
    )
}

async function produceRef(bi) {
    const b = bi
    const d = b.charAt(0)
    const d1 = b.charAt(9)
    const d2 = b.charAt(10)
    const d3 = b.charAt(11)
    const d4 = b.charAt(12)
    const codigo = 'ref00' + d1 + d2 + d3 + d4 + d + '@2kdomwriter'
    return new Promise((resolve, reject) => {
        resolve(codigo)
    })
}
