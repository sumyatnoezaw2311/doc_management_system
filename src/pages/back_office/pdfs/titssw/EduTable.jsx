import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const EduTable = () => {
  const cvData = useSelector((state) => state.CvForm.cv);
  
  return (
      <>
        <tr>
          <td
            className="custom-cell"
            style={{ fontWeight: "bold", fontSize: "18px" }}
            colSpan={9}
          >
            学歴
          </td>
        </tr>
        <tr>
          <td className="custom-cell" style={{ textAlign: "left" }}>
            学級
          </td>
          <td className="custom-cell" colSpan={4}>
            期間
          </td>
          <td className="custom-cell" colSpan={4}>
            学校/大学名
          </td>
        </tr>
        <tr>
          <td className="custom-cell" style={{ textAlign: "left" }}>
            小学校
          </td>
          <td className="custom-cell" colSpan={2}>
            {cvData.ps_start}
          </td>
          <td className="custom-cell" colSpan={2}>
            {cvData.ps_end}
          </td>
          <td
            className="custom-cell"
            colSpan={4}
            style={{ textAlign: 'left' }}
          >
            {cvData.ps_name}
          </td>
        </tr>
        <tr>
          <td className="custom-cell" style={{ textAlign: "left" }}>
            中学校
          </td>
          <td colSpan={2} className="custom-cell">
            {cvData.ms_start}
          </td>
          <td colSpan={2} className="custom-cell">
            {cvData.ms_start}
          </td>
          <td colSpan={4} className="custom-cell" style={{ textAlign: 'left' }}>
            {cvData.ms_name}
          </td>
        </tr>
        <tr>
          <td className="custom-cell" style={{ textAlign: "left" }}>
            高校
          </td>
          <td colSpan={2} className="custom-cell">
            { cvData.hs_start ? cvData.hs_start : <span>-</span>}
          </td>
          <td colSpan={2} className="custom-cell">
            { cvData.hs_end ? cvData.hs_end : <span>-</span>}
          </td>
          <td colSpan={4} className="custom-cell" style={{ textAlign: 'left' }}>
            { cvData.hs_name ? cvData.hs_name : <span>-</span>}
          </td>
        </tr>
        <tr>
          <td className="custom-cell" style={{ textAlign: "left" }}>
            大学
          </td>
          <td colSpan={2} className="custom-cell">
            {cvData.uni_start ? cvData.uni_start : <span>-</span>}
          </td>
          <td colSpan={2} className="custom-cell">
            {cvData.uni_end ? cvData.uni_end : <span>-</span> }
          </td>
          <td colSpan={4} className="custom-cell" style={{ textAlign: 'left' }}>
            {cvData.uni_name ? cvData.uni_name : <span>-</span>}
          </td>
        </tr>
        {
          cvData.other_edu_data && cvData.other_edu_data.length > 0 &&
          cvData.other_edu_data.map((course,index)=>{
            return <tr key={index}>
                      <td className="custom-cell" style={{ textAlign: "left" }}>
                        他
                      </td>
                      <td colSpan={2} className="custom-cell">
                        { course.start }
                      </td>
                      <td colSpan={2} className="custom-cell">
                        { course.end }
                      </td>
                      <td colSpan={4} className="custom-cell" style={{ textAlign: 'left' }}>
                        { course.name }
                      </td>
                    </tr>
          })
        }
      </>
  );
};

export default EduTable;
