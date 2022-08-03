#!/bin/bash

# before using: install pm2
# https://pm2.keymetrics.io/docs/usage/quick-start/

pm2 stop mm-backend
pm2 stop mm-frontend

npm i
npm run build

pm2 start backend/build/index.js --name mm-backend --time
pm2 serve frontend/dist 3020 --name mm-frontend --time