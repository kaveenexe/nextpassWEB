const { addBus, getOneBus, removeBus } = require("../controllers/busController");
const httpMocks = require("node-mocks-http");

jest.mock("../config/firebaseConfig", () => {
  return {
    db: {
      collection: jest.fn(() => {
        return {
          add: jest.fn().mockResolvedValue({ id: "newDocId" }),
          doc: jest.fn(() => {
            return {
              get: jest.fn().mockResolvedValue({
                exists: true,
                data: () => ({
                  /* mock data */
                }),
              }),
              delete: jest.fn().mockResolvedValue({
                /* response if needed */
              }),
              update: jest.fn().mockResolvedValue({
                /* response if needed */
              }),
            };
          }),
          where: jest.fn().mockReturnThis(),
          get: jest.fn().mockResolvedValue({ empty: true, docs: [] }), // Simulate Firestore 'get' operation
        };
      }),
    },
  };
});

describe("Bus Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: addBus - Positive
  it("should add a bus schedule successfully", async () => {
    const requestBody = {
      date: "2023-01-01",
      driver: "John Doe",
      busNumber: "12345",
      noOfSeats: 45,
      startLocation: "Downtown Station",
      arrivalLocation: "Uptown Station",
      startTime: "08:00",
      arrivalTime: "10:00",
    };

    const request = httpMocks.createRequest({
      method: "POST",
      body: requestBody,
    });
    const response = httpMocks.createResponse();

    await addBus(request, response);

    // Assert status code 201 Created
    expect(response.statusCode).toBe(201);
    expect(response._getJSONData()).toEqual({
      message: "Bus schedule added successfully",
      schedule: expect.objectContaining(requestBody),
    });
  });

  // Test 2: addBus - Negative
  it("should handle missing required fields when adding a bus", async () => {
    const requestBody = {
      date: "2023-01-01",
      driver: "John Doe",
      busNumber: "12345",
    };
    const request = httpMocks.createRequest({
      method: "POST",
      body: requestBody,
    });
    const response = httpMocks.createResponse();

    await addBus(request, response);

    expect(response.statusCode).toBe(400);
    expect(response._getJSONData()).toEqual({
      error: "Please provide all the required fields",
    });
  });

  // Test 3: getOneBus - Positive
  it("should retrieve a bus schedule by ID", async () => {
    const busId = "someValidBusId";
    const request = httpMocks.createRequest({
      method: "GET",
      params: {
        id: busId,
      },
    });
    const response = httpMocks.createResponse();

    const mockBusData = {
      exists: true,
      data: () => ({
        date: "2023-01-01",
        driver: "John Doe",
        busNumber: "12345",
        noOfSeats: 45,
        startLocation: "Downtown Station",
        arrivalLocation: "Uptown Station",
        startTime: "08:00",
        arrivalTime: "10:00",
      }),
    };

    require("../config/firebaseConfig")
      .db.collection()
      .doc()
      .get.mockResolvedValue(mockBusData);

    await getOneBus(request, response);

    expect(response.statusCode).toBe(200);
    expect(response._getJSONData()).toEqual({ schedule: expect.any(Object) });
  });

  // Test 4: getOneBus - Negative
  it("should handle bus schedule not found", async () => {
    const busId = "nonExistingBusId";
    const request = httpMocks.createRequest({
      method: "GET",
      params: {
        id: busId,
      },
    });
    const response = httpMocks.createResponse();

    const mockBusData = {
      exists: false,
      data: () => ({}),
    };

    require("../config/firebaseConfig")
      .db.collection()
      .doc()
      .get.mockResolvedValue(mockBusData);

    await getOneBus(request, response);

    // Assert status code 404 Not Found
    expect(response.statusCode).toBe(404);
    expect(response._getJSONData()).toEqual({
      error: "Bus schedule not found",
    });
  });

  // Test 5 : removeBus - Negative
  it("should handle failure in deleting a bus schedule", async () => {
    const request = httpMocks.createRequest({
      method: "DELETE",
      params: {
        id: "nonExistingBusId", 
      },
    });
    const response = httpMocks.createResponse();

    require("../config/firebaseConfig")
      .db.collection()
      .doc()
      .delete.mockRejectedValue(new Error("Some database error"));

    await removeBus(request, response);

    expect(response.statusCode).toBe(500);
    expect(response._getJSONData()).toEqual({
      error: "Internal Server Error",
    });

    const mockFirebaseConfig = require("../config/firebaseConfig");
    expect(
      mockFirebaseConfig.db.collection().doc().delete
    ).toHaveBeenCalledTimes(1);
  });
});
