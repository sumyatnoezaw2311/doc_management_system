import React from 'react'
import { useSelector } from 'react-redux';
import '../../../../assets/css/cv.css'
import dayjs from 'dayjs';

const EduTable = () => {
  const cvData = useSelector((state) => state.CvForm.cv);
  return (
    <>
        <tr>
            <td className='custom-cell-sw' style={{ textAlign: 'center'}}>YEAR <br/> 年</td>
            <td className='custom-cell-sw' style={{ textAlign: 'center'}}>MONTH <br/> 月</td>
            <td className='custom-cell-sw' style={{ textAlign: 'center'}} colSpan={6}>EDUCATIONAL BACKGROUND from high school graduation <br/> 高校卒業からの学歴 </td>
        </tr>
        <tr>
            <td className='custom-cell-sw' style={{ textAlign: 'center'}}>{dayjs(cvData.hs_end).year()}</td>
            <td className='custom-cell-sw' style={{ textAlign: 'center'}}>{dayjs(cvData.hs_end).month() + 1}</td>
            <td className='custom-cell-sw' colSpan={6}>{cvData.hs_name}高等学校　卒業</td>
        </tr>
        <tr>
            <td className='custom-cell-sw' style={{ textAlign: 'center'}}>{dayjs(cvData.uni_start).year()}</td>
            <td className='custom-cell-sw' style={{ textAlign: 'center'}}>{dayjs(cvData.uni_start).month() + 1}</td>
            <td className='custom-cell-sw' colSpan={6}>{cvData.uni_name}入学</td>
        </tr>
        <tr>
            <td className='custom-cell-sw' style={{ textAlign: 'center'}}>{dayjs(cvData.uni_end).year()}</td>
            <td className='custom-cell-sw' style={{ textAlign: 'center'}}>{dayjs(cvData.uni_end).month() + 1}</td>
            <td className='custom-cell-sw' colSpan={6}>{cvData.uni_name} {cvData.major} {cvData.last_attended_year}</td>
        </tr>
        <tr>
            <td className='custom-cell-sw'></td>
            <td className='custom-cell-sw'></td>
            <td className='custom-cell-sw' style={{ height: '30px'}} colSpan={6}></td>
        </tr>
        <tr>
            <td className='custom-cell-sw'></td>
            <td className='custom-cell-sw'></td>
            <td className='custom-cell-sw' style={{ height: '30px'}} colSpan={6}></td>
        </tr>
    </>
  )
}

export default EduTable
