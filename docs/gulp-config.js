const options = require('gulp-options');
const buildDir = './build';

/////////////////////////////////////////////////////////////
//////////////////// BASIC CONFIGURATION ////////////////////
/////////////////////////////////////////////////////////////
module.exports = {
  debug: options.has('debug'),  // For debug mode use "gulp <task> --debug"

  // External programs
  //
  // CAUTION!!!
  // If the program is in user's path you can just specify the name of the executable, otherwise 
  // - for Windows OS always use '\\' (double backslash) as path separator
  // - for Unix-like OS simply use '/' (single slash) as path separator
  // drawioExec: "c:\\Programmi\\draw.io\\draw.io",
  drawioExec: "",  // if empty use the internal and faster drawioex instead of the official and slower drawio
  pandocExec: "pandoc",
  
  // Source and build paths
  srcDir: '.',
  buildDir: buildDir,
  tmpSrcDir1: `${buildDir}/_`,
  tmpSrcDir2: `${buildDir}/__`,
  drawioDestDir: `${buildDir}/drawio`,
  htmlDestDir: `${buildDir}/html`,
  wordDestDir: `${buildDir}/word`,

  // Generated files
  adrByStatus: '0000-00-adr-by-status.md',
  adrByTags: '0000-01-adr-by-tags.md',
  adrByMarkers: '0000-02-adr-by-markers.md',
  changelog: '0000-03-changelog.md',
  todolist: '0000-04-to-do-list.md',

  encoding: 'utf-8'
};

// Merge advanced configuration
require('./gulp-config-advanced')(module.exports);
  