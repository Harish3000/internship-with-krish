# Spring Boot Circuit Breaker Pattern with Resilience4J

This project is a hands-on demonstration of the **Circuit Breaker pattern** using Spring Boot and the Resilience4J library. It showcases how to build resilient microservice applications that can gracefully handle downstream service failures, preventing cascading failures.

The repository contains two microservices:

- `catalog-service`: A simple REST API that provides product order data.
- `user-service`: Calls the `catalog-service` to fetch data and implements the Circuit Breaker pattern to protect itself from failures.

## Tutorial

For a detailed, step-by-step explanation of this project and the concepts behind it, please read the full tutorial on Medium:

**📑[Medium Article](https://medium.com/@bharishx/a-practical-guide-to-the-circuit-breaker-pattern-with-spring-boot-87c9dbd26e53)**

---

## Key Concepts Demonstrated

- **Circuit Breaker Pattern**: Implementing the `CLOSED`, `OPEN`, and `HALF_OPEN` states.
- **Resilience4J**: Integrating and configuring a fault-tolerance library with Spring Boot.
- **Fallback Mechanisms**: Providing a default response when a downstream service is unavailable.
- **Microservice Communication**: Simple RESTful communication between two services.
- **Spring Boot Actuator**: Monitoring the real-time state of the circuit breaker.

## Prerequisites

- JDK 11 or newer
- Apache Maven 3.6+

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Harish3000/internship-with-krish.git
cd internship-with-krish
cd 2-springbootj-circuit-breaker
```

### 2. Start the `catalog-service` (Terminal 1)

This is the downstream dependency.

```bash
cd catalog-service
mvn spring-boot:run
```

The service will start on port `9191`. You can check it at `http://localhost:9191/orders`.

### 3. Start the `user-service` (Terminal 2)

This is the service with the circuit breaker. **Open a new terminal window.**

```bash
cd user-service
mvn spring-boot:run
```

The service will start on port `9292`.

## How to Test the Circuit Breaker

Use a browser or a tool like Postman to interact with these endpoints:

- **User Service API**: `GET http://localhost:9292/user-service/displayOrders?category`
- **Health Check API**: `GET http://localhost:9292/actuator/health`

### Step 1: See the `CLOSED` State (Normal)

- Call the **User Service API**. You should get a successful response with product data.
- Check the **Health Check API**. You will see the circuit breaker status is **`CLOSED`**.

### Step 2: Trip the Circuit to `OPEN` (Failure)

- **Stop the `catalog-service`** (press `Ctrl+C` in its terminal).
- Call the **User Service API** repeatedly. The first few requests will fail.
- After 5 failures, the circuit will trip. All future calls will instantly return the **fallback data**.
- Check the **Health Check API**. The status will now be **`OPEN`**.

### Step 3: Observe the `HALF_OPEN` State

- Wait for **5 seconds**.
- Refresh the **Health Check API**. The status will automatically change to **`HALF_OPEN`**. The system is now ready to test if the `catalog-service` has recovered.

### Step 4: Return to `CLOSED` (Recovery)

- **Restart the `catalog-service`** in its terminal.
- Call the **User Service API** 3 times. These "test" calls will succeed.
- The circuit breaker will now reset itself.
- Check the **Health Check API**. The status will be back to **`CLOSED`**. Normal operation has resumed

### -- END of Practical --
