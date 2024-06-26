import React, { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable"; // Adjust the import path as necessary
import "../../styles/StylesP/HistoryData.css";
import { Button } from "@mui/material";

import "../../styles/StylesP/Ame.css";
import { usePatientStore } from "../../stores/patientStore";
import useAuth from "../../stores/authStore";

function AME() {
  const { patient, testDate } = usePatientStore();
  const ameHeading = ["AME", "Data"];

  const [ameData, setAMEData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const API = `${import.meta.env.VITE_SERVER}/api/user`;
  const { makeAuthRequest } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const armyNo = patient?.armyNo; // Replace with the actual army number
        const ameResponse = await makeAuthRequest(
          "POST",
          `${API}/ametestreports`,
          {
            armyNo,
            date: testDate, // Utilize medicalDate
          },
        );
        const formattedData = {
          "Blood HB": ameResponse?.data?.bloodHb,
          TLC: ameResponse?.data?.TLC,
          DLC: ameResponse?.data?.DLC,
          "Urine RE/ME": ameResponse?.data?.urineRE,
          "Urine Sp Gravity": ameResponse?.data?.urineSpGravity,
        };

        setAMEData(formattedData);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="ameInfo">
      <h1 className="md:text-3xl text-2xl">AME</h1>
      <div className="ameTable">
        <CustomTable headings={ameHeading} rows={Object.entries(ameData)} />
      </div>
      <center>
        <button
          className="h-9 w-1/4 md:w-1/12 text-lg font-medium text-amber-400 border-2 border-[#efb034] mx-auto mb-5 rounded hover:bg-amber-400 hover:text-white hover:border-[#efb034]"
          onClick={handlePrint}
          style={{ fontFamily: "Manrope", fontOpticalSizing: "auto" }}
        >
          Print
        </button>
      </center>
    </div>
  );
}

export default AME;
