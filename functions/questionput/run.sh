#! /bin/bash

handler_name="questionput"

cd /home/akin/go/src/huaweicloud.com/akinbe/survey-builder-app/functions/$handler_name

package="${handler_name}_go1.x.zip"

go build -o handler main.go
zip $package handler