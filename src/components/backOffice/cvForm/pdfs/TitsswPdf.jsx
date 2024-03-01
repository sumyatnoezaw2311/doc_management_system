import { Paper } from '@mui/material'
import React from 'react'
import '../../../../assets/css/titsswCv.css'

const TitsswPdf = () => {
  return (
    <Paper className="custom-table-container">
        <table className="custom-table">
            <tbody>
                <tr>
                <td style={{ fontSize: '24px', fontWeight: 'bold' }} colSpan={4} className="custom-cell">履歴書</td>
                <td style={{ fontSize: '24px', fontWeight: 'bold' }} colSpan={2} className="custom-cell">番号 </td>
                <td style={{ fontSize: '25px', fontWeight: 'bold' }} colSpan={2} className="custom-cell">⑩</td>
                <td rowSpan={5}></td>
                </tr>
                {/* Add more rows and cells as needed */}
            </tbody>
        </table>
    </Paper>
  )
}

export default TitsswPdf
