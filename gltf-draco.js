const fs = require("fs");
const path = require("path");
const gltfPipeline = require('gltf-pipeline');
const fsExtra = require('fs-extra');
const glbToGltf = gltfPipeline.glbToGltf;
const gltfToGlb = gltfPipeline.gltfToGlb;
const processGltf = gltfPipeline.processGltf;
const basePath = path.join(__dirname, "");
const options = {
    dracoOptions: {
        quantizePositionBits: 17
    }
};
const _options = {
    resourceDirectory : '.'
};
fs.readdir(basePath, (error, files) => {
  if (error) {
    throw error;
  }
console.log("дошел")
  files.forEach((file,i) => {
    if (file.includes("glb")) {
      const pathToFile = `${basePath}`;
      let glb = fsExtra.readFileSync(`${file}`);
      glbToGLTF(glb,file)
    }
  });

});
function gltfDraco(file,name){
processGltf(file, options)
    .then(function(results) {
        gltftoGLB(file,name)
    });
}
function glbToGLTF(file,name){
  glbToGltf(file,_options).then(function(results) {
    console.log("glbToGLTF")
    gltfDraco(results.gltf,name);
  })
}
function gltftoGLB(file,name){
  gltfToGlb(file,_options)
    .then(function(results) {
        fsExtra.writeFileSync(`draco/${name}`, results.glb);
    });
}