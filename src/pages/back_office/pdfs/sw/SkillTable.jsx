import React from 'react'
import { useSelector } from 'react-redux';
import '../../../../assets/css/cv.css'
import dayjs from 'dayjs';

const SkillTable = () => {
    const cvData = useSelector((state) => state.CvForm.cv);
    const filledSkillData = Array.from({ length: cvData.skill_data?.length > 6 ? cvData.skill_data.length : 6 }, (_, index) =>
        cvData.skill_data?.[index] || {}
    );

  return (
    <>
        <tr>
            <td className='custom-cell-sw' style={{ textAlign: 'center'}}>年</td>
            <td className='custom-cell-sw' style={{ textAlign: 'center'}}>月</td>
            <td className='custom-cell-sw' style={{ textAlign: 'center'}} colSpan={6}>SKILL（スキル）</td>
        </tr>
        {
            filledSkillData.map((skill,index)=>
                <tr key={index}>
                    <td className='custom-cell-sw' style={{ textAlign: 'center', height: skill.year_month ? '' :'30px'}}>{skill.year_month ? dayjs(skill.year_month).year() : ""}</td>
                    <td className='custom-cell-sw' style={{ textAlign: 'center', height: skill.year_month ? '' :'30px'}}>{skill.year_month ? dayjs(skill.year_month).month() + 1 : ""}</td>
                    <td className='custom-cell-sw' style={{ height: skill.name ? '' :'30px'}} colSpan={6}>{skill.name}</td>
                </tr>
            )
        }
    </>
  )
}

export default SkillTable
