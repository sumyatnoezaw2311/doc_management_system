import React from "react";
import { useSelector } from "react-redux";

const ExpTable = () => {

  const cvData = useSelector((state) => state.CvForm.cv);

  const filledExpData = Array.from({ length: cvData.work_exp_data?.length > 4 ? cvData.work_exp_data.length : 4 }, (_, index) =>
    cvData.work_exp_data?.[index] || {}
  );

  return (
      <>
        <tr>
          <td colSpan={2} className="custom-cell">
            期間
          </td>
          <td className="custom-cell">業種</td>
          <td colSpan={2} className="custom-cell">
            役職
          </td>
          <td colSpan={3} className="custom-cell">
            会社名
          </td>
          <td className="custom-cell">所在地</td>
        </tr>
        {filledExpData.map((exp, index) => (
          <tr key={index}>
            <td className="custom-cell" style={exp.start ? {} : { height: '30px' }}>{exp.start || ""}</td>
            <td className="custom-cell">{exp.end || ""}</td>
            <td className="custom-cell">{exp.business_type || ""}</td>
            <td colSpan={2} className="custom-cell">
              {exp.company || ""}
            </td>
            <td colSpan={3} className="custom-cell">
              {exp.position || ""}
            </td>
            <td className="custom-cell" style={{ fontSize: '14px' }}>{exp.location || ""}</td>
          </tr>
        ))}
      </>
  );
};

export default ExpTable;
