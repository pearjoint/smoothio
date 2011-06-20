(function() {
  /*
  Auto-generated from Core/Controls/Test.ctl
  */  var smio, smoothio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Controls_Test = (function() {
    __extends(Packs_Core_Controls_Test, smio.Control);
    Packs_Core_Controls_Test.prototype.test = function(xyz) {
      var arr, x;
      arr = [1, 'a', 3];
      x = 'a';
      if (arr.indexOf(x) >= 0) {
        return alert(345);
      }
    };
    function Packs_Core_Controls_Test(client, parent, args) {
      this.test = __bind(this.test, this);      Packs_Core_Controls_Test.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_Test.prototype.className = function() {
      return "Core_Controls_Test";
    };
    Packs_Core_Controls_Test.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_Test;
  })();
}).call(this);
