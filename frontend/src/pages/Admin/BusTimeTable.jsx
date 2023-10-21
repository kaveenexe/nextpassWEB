import Header from "../../components/Admin/Header";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function BusTimeTable() {
  const [busData, setBusData] = useState([]);
  const reportRef = useRef();

  useEffect(() => {
    fetch("http://localhost:5000/buses/")
      .then((response) => response.json())
      .then((data) => setBusData(data.schedules))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const deleteBus = async (busId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/buses/delete/${busId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || "There was an error deleting the record."
        );
      }
      setBusData(busData.filter((bus) => bus.id !== busId));
      alert("Are you sure you want to delete this bus schedule?");
    } catch (error) {
      console.error("Error deleting bus schedule: ", error);
    }
  };

  const downloadPdf = () => {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => btn.classList.add("print-hide"));

    html2canvas(reportRef.current, {
      scale: window.devicePixelRatio,
      logging: true,
      useCORS: true,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "pt",
          format: "a4",
        });

        const title = "Bus Timetable Monthly Report - October 2023";
        const titleFontSize = 18;
        pdf.setFontSize(titleFontSize);

        const titleWidth =
          (pdf.getStringUnitWidth(title) * titleFontSize) /
          pdf.internal.scaleFactor;
        const titlePosition =
          (pdf.internal.pageSize.getWidth() - titleWidth) / 2;

        const titleYPosition = 40;
        pdf.text(titlePosition, titleYPosition, title);
        const imageStartPosition = titleYPosition + 30;

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        const adjustedImgHeight =
          pdf.internal.pageSize.getHeight() - imageStartPosition;
        const scaledImgHeight = Math.min(pdfHeight, adjustedImgHeight);

        pdf.addImage(
          imgData,
          "PNG",
          0,
          imageStartPosition,
          pdfWidth,
          scaledImgHeight
        );
        pdf.save("bus-timetable-report.pdf");

        deleteButtons.forEach((btn) => btn.classList.remove("print-hide"));
      })
      .catch((err) => {
        console.error(err);
        deleteButtons.forEach((btn) => btn.classList.remove("print-hide"));
      });
  };

  return (
    <div className="main-component">
      <Header
        title="Bus Timetable"
        subtitle="Review and adjust the bus timetable as needed, then generate an updated report."
      />
      <br />
      <div className="table-container" ref={reportRef}>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Bus Number</th>
              <th>Date</th>
              <th>Start Location</th>
              <th>Arrival Location</th>
              <th>Start Time</th>
              <th>Arrival Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {busData.map((bus) => (
              <tr
                key={
                  bus.id /* replace with your unique identifier for each bus */
                }
              >
                <td>{bus.busNumber}</td>
                <td>{bus.date}</td>
                <td>{bus.startLocation}</td>
                <td>{bus.arrivalLocation}</td>
                <td>{bus.startTime}</td>
                <td>{bus.arrivalTime}</td>
                <td>
                  <button
                    onClick={() =>
                      deleteBus(
                        bus.id /* replace with your unique identifier */
                      )
                    }
                    type="button"
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ float: "right" }}>
          <Link to="/dashboard/assign-busses/">
            <button type="button" class="custom-button-green">
              {" "}
              Add New Bus{" "}
            </button>
          </Link>
        </div>
        <div style={{ float: "left" }}>
          <button
            onClick={downloadPdf}
            type="button"
            className="custom-button-red"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusTimeTable;
