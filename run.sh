#! /bin/bash

for dir in functions/*/; do
  # Extract the function name from the directory path
  function_name=$(basename "$dir")
  cd ${GOPATH}/src/huaweicloud.com/akinbe/survey-builder-app/functions/$function_name
  package="${function_name}_go1.x.zip"
  go build -o handler main.go
  zip $package handler
done