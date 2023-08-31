const excelJS = require("exceljs")
exports.caderneta = async (data) => {
    var rows = []
    var bodies = [{ header: `ID`, key: `id`, width: 5 }, { header: `Nome`, key: `nome`, width: 50 }, { header: `Código`, key: `codigoEstudante`, width: 20 }]
    for (let index = 0; index < data.length; index++) {
        rows.push({ id: index + 1, nome: data[index].firstName + " " + data[index].lastName, codigoEstudante: data[index].codigoEstudante })
    }
    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("Caderneta"); // New Worksheet
    worksheet.columns = bodies
    // Looping through User data
    let counter = 1;
    rows.forEach((student) => {
        student.s_no = counter
        worksheet.addRow(student) // Add data in worksheet
    })
    // Making first line in excel bold
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true }
    })

    var fur = rows.length + 1
    for (let index = 0; index < fur; index++) {
        var g = index + 1
        worksheet.getRow(g).eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
        })
    }


    const ry = await workbook.xlsx.writeBuffer()
    return new Promise((resolve, reject) => {
        resolve({
            status: "success",
            message: "file successfully reported",
            file: ry
        })
    }
    )
}