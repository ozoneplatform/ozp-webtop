# sed -i -e "s/\/icons/\/icons#1fc7aee3a2812042c421baaab67abb2bd9606b0d/g" bower.json
source /usr/local/node_versions/set_node_version.sh 5.3.0
npm install
npm run bower
npm run build
npm run compile
npm run tarDevDate
npm run tarProdDate
