import * as xlsx from 'xlsx'
export const ExportXlsx = <T extends Record<string, any>>(
  exportData: T[],
  options: { fileName?: string; mapper: (item: T) => Record<string, any> },
) => {
  /**
   * @params exportData: 导出的json
   *
   * @params
   */
  const { fileName, mapper } = options
  // 导出的数据
  const xlsxExportData = exportData.map(mapper)
  // 导出数据长度，用于生成每一列 列宽
  const xlength = Object.keys(xlsxExportData[0]!).length
  const cols_type = []
  for (let i = 0; i < xlength; i++) {
    cols_type.push({ wch: 20 })
  }
  //创建xlsx表
  const xlsx_sheet = xlsx.utils.json_to_sheet(xlsxExportData)
  // 创建xlsx工作簿
  const xlsx_book = xlsx.utils.book_new()
  // 将表填入工作簿
  xlsx.utils.book_append_sheet(xlsx_book, xlsx_sheet, fileName ?? 'xlsx工作表')

  xlsx_sheet['!cols'] = cols_type

  // 下载
  xlsx.writeFile(xlsx_book, (fileName ?? 'xlsx工作表') + '_' + Date.now().toString() + '.xlsx')
}
