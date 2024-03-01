import React from "react";
import { useSelector } from "react-redux";

const FamilyTable = () => {
  const cvData = useSelector((state) => state.CvForm.cv);

  const filledExpData = Array.from({ length: cvData.family_data?.length > 4 ? cvData.family_data.length : 4 }, (_, index) =>
    cvData.family_data?.[index] || {}
  );

  return (
      <>
        <tr>
          <td colSpan={2} className="custom-cell">
            名前
          </td>
          <td colSpan={2} className="custom-cell">
            続柄
          </td>
          <td className="custom-cell">年齢</td>
          <td colSpan={2} className="custom-cell">
            業種
          </td>
          <td colSpan={2} className="custom-cell">
            地域・国
          </td>
        </tr>
          { filledExpData.map((member, index) => (
            <tr key={index}>
                <td colSpan={2} className="custom-cell" style={member.name ? {} : { height: '30px' }}>
                  {member.name}
                </td>
                <td colSpan={2} className="custom-cell">
                  {member.relationship}
                </td>
                <td className="custom-cell">{member.age}</td>
                <td colSpan={2} className="custom-cell">
                  {member.job}
                </td>
                <td colSpan={2} className="custom-cell" style={{ fontSize: '14px' }}>
                  {member.address}
                </td>
            </tr>
          ))}       
      </>
  );
};

export default FamilyTable;
