# US States API - INF653 Final Project

## Author
Jakob Schaefer

## Overview
A rest API for US States built with Node.js, Express, and MongoDB.

Supports following HTTP methods:
- GET
- POST
- PATCH
- DELETE

## LIVE DEMO
https://inf653-finalproject-0da4.onrender.com

## Tech Stack
- Node.js
- Express
- MongoDB
- Render (deployment)
- Postman (testing)

## States API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /states/ | Get all states data |
| GET | /states/?contig=true | Get contiguous states only |
| GET | /states/?contig=false | Get non-contiguous states only |
| GET | /states/:state | Get single state data |
| GET | /states/:state/funfact | Get random fun fact for state |
| GET | /states/:state/capital | Get state capital |
| GET | /states/:state/nickname | Get state nickname |
| GET | /states/:state/population | Get state population |
| GET | /states/:state/admission | Get state admission date |
| POST | /states/:state/funfact | Add fun facts to a state |
| PATCH | /states/:state/funfact | Update a fun fact by index |
| DELETE | /states/:state/funfact | Delete a fun fact by index |

## Setup Instructions
1. Clone the repo
```bash
git clone https://github.com/jakobschaefer21/INF653_FinalProject.git
cd INF653_FinalProject
```
2. Install dependencies
```bash
npm install
```
3. Create .env file in the root directory and insert database URL
4. Seed fun facts for required states in postman
- POST to /states/KS/funfact
- POST to /states/MO/funfact
- POST to /states/OK/funfact
- POST to /states/NE/funfact
- POST to /states/CO/funfact
5. Run project locally
```bash
node server.js
```
6. Test via Postan
- Get all states
- Get contiguous states
- Get single state
- Get random fun fact
- Add fun facts
- Update fun fact by index
- Delete fun fact by index

Enjoy!