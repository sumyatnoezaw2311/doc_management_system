import dayjs from 'dayjs';
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { calculateYearDiff } from '../../../../utils/calculateYearDiff';

const ExpTable = () => {
    const cvData = useSelector((state) => state.CvForm.cv);
    const filledExpData = Array.from({ length: cvData.work_exp_data?.length > 2 ? cvData.work_exp_data.length : 2 }, (_, index) =>
        cvData.work_exp_data?.[index] || {}
    );

  return (
    <>
        <tr>
            <td className='custom-cell-sw' style={{ textAlign: 'center', padding: '10px' }}>YEAR <br/> 年</td>
            <td className='custom-cell-sw' style={{ textAlign: 'center', padding: '10px' }}>MONTH <br/> 月</td>
            <td className='custom-cell-sw' style={{ textAlign: 'center', padding: '10px' }} colSpan={6}>Work Experience <br/> 職歴 </td>
        </tr>
        {
            filledExpData.map((exp,index)=>
                <Fragment key={index}>
                    <tr>
                        <td className='custom-cell-sw' style={{ textAlign: 'center', height: exp.start ? '' :'30px'}}>{exp.start ? dayjs(exp.start).year() : ""}</td>
                        <td className='custom-cell-sw' style={{ textAlign: 'center', height: exp.end ? '' :'30px'}}>{exp.start ? dayjs(exp.start).month() + 1 : ""}</td>
                        <td className='custom-cell-sw' style={{ textAlign: 'left', height: exp.name ? '' :'30px'}} colSpan={6}>{exp.company ? `${exp.company}(${exp.business_type}) 入社` : ``}</td>
                    </tr>
                    <tr>
                        <td className='custom-cell-sw' style={{ textAlign: 'center', height: exp.start ? '' :'30px'}}>{exp.end ? dayjs(exp.end).year() : ""}</td>
                        <td className='custom-cell-sw' style={{ textAlign: 'center', height: exp.end ? '' :'30px'}}>{exp.end ? dayjs(exp.end).month() + 1 : ""}</td>
                        <td className='custom-cell-sw' style={{ textAlign: 'left', height: exp.name ? '' :'30px'}} colSpan={6}>{exp.company ? `${exp.company}(${exp.business_type}) 退社` : ``}</td>
                    </tr>
                </Fragment>
            )
        }
        <tr>
            <td className='custom-cell-sw' style={{ textAlign: 'center'}} colSpan={8}>WORK EXPERIENCE DETAILS</td>
        </tr>
        {
            cvData.work_exp_data.map((exp,index)=>
                <Fragment key={index}>
                    <tr>
                        <td className='custom-cell-sw' style={{ textAlign: 'center'}} colSpan={8}>職務経歴書</td>
                    </tr>
                    <tr>
                        <td className='custom-cell-sw' colSpan={2}>COMPANY NAME（会社名）</td>
                        <td className='custom-cell-sw' colSpan={6}>{exp.company}</td>
                    </tr>
                    <tr>
                        <td className='custom-cell-sw' colSpan={2}>PERIOD（在籍期間</td>
                        <td className='custom-cell-sw' colSpan={6}>
                            {`${dayjs(exp.start).year()} 年 - ${dayjs(exp.start).month() + 1 } 月`} - {`${dayjs(exp.end).year()} 年 - ${dayjs(exp.end).month() + 1} 月`}
                            （{calculateYearDiff(exp.start, exp.end)}年）
                        </td>
                    </tr>
                    <tr>
                        <td className='custom-cell-sw' colSpan={2}>BUSINESS TYPE（事業内容）</td>
                        <td className='custom-cell-sw' colSpan={6}>
                            {exp.business_type}
                        </td>
                    </tr>
                    <tr>
                        <td className='custom-cell-sw' colSpan={2}>POSITION（担当業務）</td>
                        <td className='custom-cell-sw' colSpan={6}>
                            {exp.position}
                        </td>
                    </tr>
                    <tr>
                        <td className='custom-cell-sw' colSpan={2}>DUTY & RESPONSIBILITY <br/> 担当業務</td>
                        <td className='custom-cell-sw' colSpan={6}>
                            {exp.responsibilities}
                        </td>
                    </tr>
                    <tr>
                        <td className='custom-cell-sw' colSpan={2}>REASON　FOR <br/> LEAVING（離職理由）</td>
                        <td className='custom-cell-sw' colSpan={6}>
                            {exp.reason_of_leaving}
                        </td>
                    </tr>
                </Fragment>
            )
        }
    </>
  )
}

export default ExpTable
