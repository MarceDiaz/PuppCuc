const nocolor = '--format-options \'{"colorsEnabled": false}\''
const browserGUI = '--world-parameters \'{"headless": false}\''
const parallel3 = '--parallel 3'
const staging = '--world-parameters \'{"env":"staging"}\''
const prod = '--world-parameters \'{"env":"prod"}\''

module.exports = {
  nocolor,
  browserGUI,
  parallel3,
  staging,
  prod
}
