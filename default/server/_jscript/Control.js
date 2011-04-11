(function() {
  var node_util, smio;
  node_util = require('util');
  smio = global.smoothio;
  smio.Control = (function() {
    Control.compile = function(inst, ctlContent, controlPath) {
      var c, className, coffeeScript, contentParts, inDyn, lastChar, lastContent, obj, oneUp, pathParts, _i, _len, _ref;
      this.inst = inst;
      _ref = [false, '../', [], '', '', {}], inDyn = _ref[0], oneUp = _ref[1], contentParts = _ref[2], lastChar = _ref[3], lastContent = _ref[4], obj = _ref[5];
      pathParts = (controlPath.substr(0, controlPath.lastIndexOf('.'))).split('/');
      className = pathParts.join('_');
      for (_i = 0, _len = ctlContent.length; _i < _len; _i++) {
        c = ctlContent[_i];
        if (((lastChar + c) === '<%') && !inDyn) {
          inDyn = true;
          if (lastContent) {
            contentParts.push({
              "s": lastContent.substr(0, lastContent.length - 1)
            });
            lastContent = '';
          }
        } else if (((lastChar + c) === '%>') && inDyn) {
          inDyn = false;
          if (lastContent) {
            contentParts.push({
              "d": lastContent.substr(0, lastContent.length - 1)
            });
            lastContent = '';
          }
        } else {
          lastContent += c;
        }
        lastChar = c;
      }
      if (lastContent) {
        obj[inDyn ? 'd' : 's'] = lastContent;
        contentParts.push(obj);
      }
      coffeeScript = "###\nAuto-generated\n###\nrequire '" + (this.inst.util.string.times(oneUp, pathParts.length)) + "_jscript/Control'\nsmio = smoothio = global.smoothio\nclass smio.Packs_" + className + " extends smio.Control\n	constructor: ->\n		x = \"\"";
      return coffeeScript;
    };
    function Control() {
      var x;
      x = "";
    }
    return Control;
  })();
}).call(this);
