#!/bin/sh

set -o xtrace

BUCKET=gs://citaten.odee.net


gsutil rm $BUCKET/**
#gsutil -m rm -r $BUCKET
#gsutil mb -p badge-260212 -l europe-west4 -b on $BUCKET
#gsutil iam ch allUsers:objectViewer $BUCKET
gsutil -m -h "Cache-Control:public,max-age=3600" cp -r -Z build/. $BUCKET
gsutil setmeta -h "Cache-Control:no-cache, max-age=0" -h "Content-Type:application/json" $BUCKET/actuator/info

