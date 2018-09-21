#!/usr/bin/env bash
source /usr/local/node_versions/set_node_version.sh 5.3.0
npm install bower grunt-cli
npm install
npm run bower
npm run build
npm run compile
npm run tarDevVersion
npm run tarProdVersion
