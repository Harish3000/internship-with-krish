# Multi-Service Node.js Application with Docker

This project is a simple demonstration of a microservices architecture built with Node.js and Express.js. It consists of four independent services that are containerized using Docker and communicate over a shared network.

The application implements the **Scatter-Gather** design pattern, where an aggregation service queries multiple other services in parallel and combines their responses into a single output.

## Services Overview

There are four services in this application:

1.  **Rate Service**: Provides a fictional financial rate. Returns a random `value` between 1000 and 10000.
2.  **Allocation Service**: Provides a fictional resource allocation. Returns a random `value` between 10 and 100.
3.  **Logistic Service**: Provides a fictional shipping location. Returns a random `location` from a predefined list.
4.  **Aggregation Service**: The public-facing service. It gathers data from the other three services, aggregates it into a single JSON response, and calculates the total request duration. It also handles cases where one of the other services fails to respond.

---

## How to Run the Application

You can run this project in two ways.

### Method 1: Using Docker Compose (Recommended)

1.  Clone the repository and navigate to the project root directory (`microservice-app`).

2.  Build the images and start all the service containers with a single command:

    ```sh
    docker-compose up --build
    ```

3.  The application will be running. The Aggregation service is accessible at `http://localhost:3000`.

4.  To stop the application, press `Ctrl + C` in the terminal, and then run:
    ```sh
    docker-compose down
    ```

### Method 2: Using Manual Docker Commands

If you prefer to run the services without Docker Compose, follow these steps from the project root directory.

1.  **Create a Docker Network:**

    ```sh
    docker network create my-bridge-network
    ```

2.  **Build an Image for Each Service:**

    ```sh
    docker build -t rate-service-image ./rate-service
    docker build -t allocation-service-image ./allocation-service
    docker build -t logistic-service-image ./logistic-service
    docker build -t aggregation-service-image ./aggregation-service
    ```

3.  **Run Each Service Container:**

    ```sh
    docker run -d --network my-bridge-network --name rate-service rate-service-image
    docker run -d --network my-bridge-network --name allocation-service allocation-service-image
    docker run -d --network my-bridge-network --name logistic-service logistic-service-image
    docker run -d -p 3000:3000 --network my-bridge-network --name aggregation-service aggregation-service-image
    ```

4.  **To Stop and Clean Up:**
    ```sh
    docker stop rate-service allocation-service logistic-service aggregation-service
    docker rm rate-service allocation-service logistic-service aggregation-service
    docker network rm my-bridge-network
    ```

---

## How to Use the Application

Once the application is running, you can make GET requests to the aggregation service. This is the only service exposed to your local machine.

**Example Request:**

```sh
curl http://localhost:3000/google
```

**Example Success Response:**

```json
{
  "company": "google",
  "time": 1672531200,
  "value": 5421,
  "duration": 0.045,
  "location": ["Tokyo"]
}
```

If one of the internal services fails to respond within the 800ms timeout, the aggregator will report it gracefully.

**Example "No Response" Output (if logistic-service is down):**

```json
{
  "company": "google",
  "time": 1672531205,
  "value": 7890,
  "duration": 0.815,
  "location": ["no response"]
}
```
