import React from "react";
import { useSelector } from "react-redux";

const PersonalInfo2Table = () => {
  const cvData = useSelector((state) => state.CvForm.cv);

  return (
      <>
        <tr>
          <td className="custom-cell" style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>日本語レベル</td>
          <td className="custom-cell" colSpan={2}>
            {cvData.japanese_level}
          </td>
          <td className="custom-cell">利き手</td>
          <td className="custom-cell">{cvData.left_right_handed}</td>
          <td className="custom-cell" colSpan={3}>
            集団生活
          </td>
          <td className="custom-cell">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className={ cvData.group_live === "有" ? "roundedBorder" : ""}>
                <span>有</span>
              </div>
              <div className={ cvData.group_live === "無" ? "roundedBorder" : ""}>
                <span>無</span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td className="custom-cell" style={{ textAlign: 'left' }}>自転車</td>
          <td className="custom-cell" colSpan={4}>
            {cvData.bicycle}
          </td>
          <td className="custom-cell" colSpan={3}>
            手術歴
          </td>
          <td className="custom-cell">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className={ cvData.surgery === "有" ? "roundedBorder" : ""}>
                <span>有</span>
              </div>
              <div className={ cvData.surgery === "無" ? "roundedBorder" : ""}>
                <span>無</span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td className="custom-cell" style={{ textAlign: 'left' }}>趣味・特技</td>
          <td className="custom-cell" colSpan={4}>
            {cvData.hobby}
          </td>
          <td className="custom-cell">嗜好</td>
          <td className="custom-cell" colSpan={3} style={{ flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
            <span style={ cvData.betal === 0 ? { textDecoration: 'line-through' } : {}}>キンマ　</span>
            <span >　・　</span>
            <span style={ cvData.cigrette === 0 ? { textDecoration: 'line-through' } : {}}>タバコ</span>
            <span>　・　</span>
            <span style={ cvData.alcohol === 0 ? { textDecoration: 'line-through' } : {}}>　酒　</span>
            <span>　・　</span>
            <span style={ cvData.tattoo === 0 ? { textDecoration: 'line-through' } : {}}>　刺青</span>
          </td>
        </tr>
        <tr>
          <td className="custom-cell" style={{ textAlign: 'left' }}>長所</td>
          <td style={{ fontSize: cvData.strong_point?.length > 30 ? "14px" : "16px", textAlign: 'left' }} className="custom-cell" colSpan={2}>
            {cvData.strong_point}
          </td>
          <td className="custom-cell" colSpan={2}>
            短所
          </td>
          <td className="custom-cell" colSpan={2}>
            {cvData.weak_point}
          </td>
          <td className="custom-cell">将来の夢</td>
          <td
            style={{
              fontSize: cvData.dream?.length > 30 ? "14px" : "16px",
              padding: "2px",
              textAlign: 'left',
              border: '2px solid #000',
              letterSpacing: "0px"
            }}
          >
            {cvData.dream}
          </td>
        </tr>
      </>
  );
};

export default PersonalInfo2Table;
