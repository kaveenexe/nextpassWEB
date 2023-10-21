import React from "react";
import FlexBetween from "../../components/Admin/FlexBetween";
import StatBox from "../../components/Admin/StatBox";
// import RevenueChart from "../../components/Admin/RevenueChart";
import Header from "../../components/Admin/Header";
import { Box, Button } from "@mui/material";
import { DownloadOutlined } from "@mui/icons-material";
import { blue, blueGrey } from "@mui/material/colors";

const TransportManager = () => {
  return (
    <div>
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: blueGrey,
              color: blue,
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "8px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        mr="20px"
      >
        {/* BOX 1 */}
        <StatBox title="Total Passengers" value="1863" />
        {/* BOX 2 */}
        <StatBox title="Local Passengers" value="1249" />
        {/* BOX 3 */}
        <StatBox title="Foreign Passengers" value="614" />
        {/* BOX 4 */}
        <StatBox title="Total Buses" value="198" />
      </Box>
      {/* <Box mt="20px">
        <RevenueChart />
      </Box> */}
    </div>
  );
};

export default TransportManager;
