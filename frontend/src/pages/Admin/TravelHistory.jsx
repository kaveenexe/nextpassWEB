import Header from "../../components/Admin/Header";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function TravelHistory() {
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
      alert("Are you sure you want to delete record?");
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

        const title = "Travel History Monthly Report - October 2023";
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
        pdf.save("travel-history-report.pdf");

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
        title="Travel History"
        subtitle="Providing the passenger count and travel history for this route on the specified bus."
      />
      <br />
      <div className="table-container-travel" ref={reportRef}>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Date</th>
              <th>Bus Number</th>
              <th>Driver</th>
              <th>Bus Route</th>
              <th>Journey Time</th>
              <th>No of Seats</th>
              <th>Total Passengers</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {busData.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.date}</td>
                <td>{bus.busNumber}</td>
                <td>{bus.driver}</td>
                <td>{`${bus.startLocation} - ${bus.arrivalLocation}`}</td>
                <td>{`${bus.startTime} - ${bus.arrivalTime}`}</td>
                <td>{bus.noOfSeats}</td>
                <td>{bus.totalPassengers}</td>
                <td>
                  <button
                    onClick={() => deleteBus(bus.id)}
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

export default TravelHistory;
