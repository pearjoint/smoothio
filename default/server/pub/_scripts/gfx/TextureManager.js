(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.gfx.TextureManager = (function() {
    function TextureManager(engine) {
      this.engine = engine;
      this.withTexture = __bind(this.withTexture, this);
      this.remove = __bind(this.remove, this);
      this.load = __bind(this.load, this);
      this.texQuality = 2;
      this.textures = {};
    }
    TextureManager.prototype.load = function(name, url, forceReload) {
      var gl, img, tex;
      if ((gl = this.engine.gl) && ((!(tex = this.textures[url])) || forceReload)) {
        if (!tex) {
          tex = gl.createTexture();
        }
        img = new Image();
        img.onerror = __bind(function() {
          return this.load('/_/file/images/textures/particle.png', forceReload, url);
        }, this);
        img.onload = __bind(function() {
          var linear, mipmap;
          this.textures[name] = tex;
          mipmap = this.texQuality === 2;
          linear = this.texQuality !== 0;
          return this.withTexture(tex, function() {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, linear ? gl.LINEAR : gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mipmap ? gl.LINEAR_MIPMAP_NEAREST : linear ? gl.LINEAR : gl.NEAREST);
            if (mipmap) {
              return gl.generateMipmap(gl.TEXTURE_2D);
            }
          });
        }, this);
        return img.src = url;
      }
    };
    TextureManager.prototype.remove = function(url) {
      var tex;
      if ((tex = this.textures[url])) {
        this.engine.deleteTexture(tex);
        return delete this.textures[url];
      }
    };
    TextureManager.prototype.withTexture = function(texOrUrl, fn) {
      var tex;
      if (_.isString(tex = texOrUrl)) {
        tex = this.textures[texOrUrl];
      }
      if (tex) {
        this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, tex);
        try {
          return fn(tex);
        } finally {
          this.engine.gl.bindTexture(this.engine.gl.TEXTURE_2D, null);
        }
      }
    };
    return TextureManager;
  })();
}).call(this);
