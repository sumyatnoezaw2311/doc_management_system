import React from "react";
import { useSelector } from "react-redux";
import { getAge } from "../../../../utils/getAge";
import { useEffect } from "react";
import { transform } from "../../../../utils/transformsrc";
import { useState } from "react";

const PersonalInfo1Table = ({no}) => {
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
        <td
          colSpan="4"
          className="custom-cell"
          style={{ fontSize: "30px", fontWeight: "bold" }}
        >
          履歴書
        </td>
        <td
          colSpan="2"
          className="custom-cell"
          style={{ fontSize: "30px", fontWeight: "bold" }}
        >
          番号
        </td>
        <td
          colSpan="2"
          className="custom-cell"
          style={{ fontSize: "30px", fontWeight: "bold" }}
        >
          {no}
        </td>
        {/* passport photo */}
        <td rowSpan="5" style={{ paddingLeft: '5px', verticalAlign: "top", height: '100%' }}>
            <div style={{ border: '2px solid #000', padding: '5px', height: '100%'}}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
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
        <td className="custom-cell" style={{ textAlign: "left" }}>
          氏名
        </td>
        <td className="custom-cell" colSpan={3}>
          {cvData.name_eng}
        </td>
        <td className="custom-cell">性別</td>
        <td className="custom-cell">{cvData.gender}</td>
        <td className="custom-cell" colSpan={2}>
          視力
        </td>
      </tr>
      <tr>
        <td className="custom-cell" style={{ textAlign: "left" }}>
          カタカナ{" "}
        </td>
        <td className="custom-cell" colSpan={3}>
          {cvData.name_jp}
        </td>
        <td className="custom-cell">身長</td>
        <td className="custom-cell">{cvData.height} cm</td>
        <td className="custom-cell">左</td>
        <td className="custom-cell">右</td>
      </tr>
      <tr>
        <td className="custom-cell" style={{ textAlign: "left" }}>
          生年月日
        </td>
        <td className="custom-cell">{cvData.date_of_birth}</td>
        <td className="custom-cell">年齢</td>
        <td className="custom-cell">{getAge(cvData.date_of_birth)}</td>
        <td className="custom-cell">体重</td>
        <td className="custom-cell">{cvData.weight} kg</td>
        <td className="custom-cell">{cvData.eye_left}</td>
        <td className="custom-cell">{cvData.eye_right}</td>
      </tr>
      <tr>
        <td className="custom-cell" style={{ textAlign: "left" }}>
          出身地
        </td>
        <td className="custom-cell" colSpan={2} style={{ fontSize: '14px' }}>
          {cvData.hometown}
        </td>
        <td className="custom-cell">{cvData.marriage_status}</td>
        <td className="custom-cell">血液型</td>
        <td className="custom-cell">{cvData.blood_type}</td>
        <td className="custom-cell">宗教</td>
        <td className="custom-cell">{cvData.religion}</td>
      </tr>
    </>
  );
};

export default PersonalInfo1Table;
