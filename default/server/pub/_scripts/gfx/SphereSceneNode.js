(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.gfx.SphereSceneNode = (function() {
    function SphereSceneNode(engine, radius, posx, posy, posz) {
      var cosPhi, cosTheta, first, indices, lat, lats, lon, lons, meshbuf, phi, pi, second, sinPhi, sinTheta, theta, u, v, vert, vertex, verts, x, y, z, _i, _len, _ref;
      this.engine = engine;
      if (radius == null) {
        radius = 20;
      }
      if (posx == null) {
        posx = 0;
      }
      if (posy == null) {
        posy = 0;
      }
      if (posz == null) {
        posz = 0;
      }
      this.render = __bind(this.render, this);
      this.OnRegisterSceneNode = __bind(this.OnRegisterSceneNode, this);
      SphereSceneNode.__super__.constructor.call(this, this.engine);
      this.init();
      (this.mesh = new CL3D.Mesh()).AddMeshBuffer(meshbuf = new CL3D.MeshBuffer());
      _ref = [12, 24, [], [], Math.PI], lats = _ref[0], lons = _ref[1], indices = _ref[2], verts = _ref[3], pi = _ref[4];
      for (lat = 0; 0 <= lats ? lat <= lats : lat >= lats; 0 <= lats ? lat++ : lat--) {
        theta = lat * pi / lats;
        sinTheta = Math.sin(theta);
        cosTheta = Math.cos(theta);
        for (lon = 0; 0 <= lons ? lon <= lons : lon >= lons; 0 <= lons ? lon++ : lon--) {
          phi = lon * 2 * pi / lons;
          sinPhi = Math.sin(phi);
          cosPhi = Math.cos(phi);
          x = cosPhi * sinTheta;
          y = cosTheta;
          z = sinPhi * sinTheta;
          u = 1 - (lon / lons);
          v = lat / lats;
          vertex = this.engine.createVertex(radius * x, radius * y, radius * z, 1 - u, v);
          vertex.Normal.X = x;
          vertex.Normal.Y = y;
          vertex.Normal.Z = z;
          verts.push(vertex);
        }
      }
      for (lat = 0; 0 <= lats ? lat < lats : lat > lats; 0 <= lats ? lat++ : lat--) {
        for (lon = 0; 0 <= lons ? lon < lons : lon > lons; 0 <= lons ? lon++ : lon--) {
          first = (lat * (lons + 1)) + lon;
          second = first + lons + 1;
          indices.push(first + 1);
          indices.push(second);
          indices.push(first);
          indices.push(first + 1);
          indices.push(second + 1);
          indices.push(second);
        }
      }
      meshbuf.Indices = indices;
      for (_i = 0, _len = verts.length; _i < _len; _i++) {
        vert = verts[_i];
        meshbuf.Vertices.push(vert);
      }
      meshbuf.Mat.Tex1 = this.engine.getTextureManager().getTexture('/_/file/images/textures/particle.png', true);
      this.Pos.X = posx;
      this.Pos.Y = posy;
      this.Pos.Z = posz;
      this.updateAbsolutePosition();
    }
    SphereSceneNode.prototype.OnRegisterSceneNode = function(scene) {
      scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
      return SphereSceneNode.__super__.OnRegisterSceneNode.call(this, scene);
    };
    SphereSceneNode.prototype.render = function(renderer) {
      renderer.setWorld(this.getAbsoluteTransformation());
      return renderer.drawMesh(this.mesh);
    };
    return SphereSceneNode;
  })();
}).call(this);
