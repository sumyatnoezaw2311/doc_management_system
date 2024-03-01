import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import '../../../../assets/css/cv.css'
import { transform } from '../../../../utils/transformsrc';
import { getAge } from '../../../../utils/getAge';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from 'dayjs';

const PersonalInfo = () => {
  const cvData = useSelector((state) => state.CvForm.cv);
  const [photo, setPhoto] = useState(null);

  const getPhoto = async () => {
    const base64Photo = await transform(cvData.photo);
    setPhoto(base64Photo);
  };

  useEffect(() => {
    getPhoto();
  }, [cvData]);

  return (
    <>
        <tr>
            <td className='custom-cell-sw' style={{ fontSize: '26px', fontWeight: 'bold', borderBottom: 'none', lineHeight: '26px' }} colSpan={7}>RESUME <p style={{ fontSize: '20px' }}>履歴書</p></td>
            {/* passport photo */}
            <td rowSpan={3} style={{ paddingLeft: '3px', paddingBottom: '3px', maxWidth: '160px', verticalAlign: 'top' }}>
                <div style={{ border: '2px solid #000', padding: '5px 5px 0px 5px', width: '100%', height: '100%' }}>
                    <img
                        style={{
                            maxWidth: "100%",
                            height: '100%',
                            '@media print': {
                                width: '3cm',
                                height: '4cm',
                            },
                        }}
                        src={photo}
                        alt="Passport Photo"
                    ></img>
                </div>
            </td>
        </tr>
        <tr>
            <td className='custom-cell-sw' style={{ borderBottom: 'none',  }} colSpan={2}>NAME <br/> 氏名 </td>
            <td className='custom-cell-sw' style={{ borderBottom: 'none',  }} colSpan={5}>{cvData.name_eng} <br/> {cvData.name_jp }</td>
        </tr>
        <tr>
            <td className='custom-cell-sw' style={{ borderBottom: 'none' }} colSpan={2}>DATE OF BIRTH <br/> 生年月日</td>
            <td className='custom-cell-sw' colSpan={4} style={{ borderRight: 'none' }}>
                <span style={{ fontFamily: 'mincho', fontSize: '20px' }}>{`${dayjs(cvData.date_of_birth).year()}年 ${dayjs(cvData.date_of_birth).month()+1}月 ${dayjs(cvData.date_of_birth).date()}日`} 満（   {getAge(cvData.date_of_birth)}   ）歳</span>
            </td>
            <td className='custom-cell-sw' style={{ borderRight: '2px solid black', borderLeft: 'none'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100px', float: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className={ cvData.gender === "男" ? "roundedBorder" : ""}>
                        <span style={{ fontSize: '16px' }}>男</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className={ cvData.gender === "女" ? "roundedBorder" : ""}>
                        <span style={{ fontSize: '16px' }}>女</span>
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td className='custom-cell-sw' colSpan={2} style={{ borderBottom: 'none',  }}>ADRESS <br/> 住所 </td>
            <td className='custom-cell-sw' colSpan={5} style={{ borderBottom: 'none', fontSize: '18px',  }}>{cvData.address_eng} <br/> {cvData.address_jp}</td>
            <td className='custom-cell-sw' rowSpan={2} style={{ textAlign: 'center', borderBottom: 'none',  }}>TEL・電話 <br/> {cvData.phone} </td>
        </tr>
        <tr>
            <td className='custom-cell-sw' colSpan={2}>Email</td>
            <td className='custom-cell-sw' colSpan={5}>{cvData.email}</td>
        </tr>
        <tr>
            <td className='custom-cell-sw' colSpan={2}>ADRESS(RELATIVES) <br/> 住所(親族)</td>
            <td className='custom-cell-sw' colSpan={5}>{cvData.family_address}</td>
            <td className='custom-cell-sw' style={{ textAlign: 'center' }}>TEL・電話 <br/> {cvData.family_phone}</td>
        </tr>
        <tr>
            <td className='custom-cell-sw' colSpan={2}>SINGLE <br/> 独身 </td>
            <td className='custom-cell-sw' style={{ textAlign: 'center' }}>{cvData.marriage_status === "ရှိ" ? <ClearIcon/> : <CheckIcon/> }</td>
            <td className='custom-cell-sw' >MARRIED <br/> 既婚</td>
            <td className='custom-cell-sw' style={{ textAlign: 'center' }}>{cvData.marriage_status === "ရှိ" ? <CheckIcon/> : <ClearIcon/> }</td>
            <td className='custom-cell-sw' style={{ whiteSpace: 'nowrap', borderRight: 'none' }}>DEPENDENT FAMILY <br/> 扶養家族</td>
            <td className='custom-cell-sw' style={{ textAlign: 'center' , borderRight: 'none' }}>{cvData.dependent_family}</td>
            <td className='custom-cell-sw' style={{ borderLeft: 'none' }}>PERSONS <br/> 人 </td>
        </tr>
    </>
  )
}

export default PersonalInfo
