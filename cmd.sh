#!/bin/bash

# Install dependencies using Poetry
echo "Installing dependencies..."
poetry cache clear --all

poetry update
poetry install

# Run the FastAPI application
echo "Starting FastAPI application..."
poetry run uvicorn main:app --reload