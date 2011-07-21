(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.gfx.GroundSceneNode = (function() {
    function GroundSceneNode(engine) {
      this.engine = engine;
      this.unloadSector = __bind(this.unloadSector, this);
      this.updateSectors = __bind(this.updateSectors, this);
      this.render = __bind(this.render, this);
      this.mapPositionToLatLong = __bind(this.mapPositionToLatLong, this);
      this.mapPositionFromLatLong = __bind(this.mapPositionFromLatLong, this);
      this.OnRegisterSceneNode = __bind(this.OnRegisterSceneNode, this);
      GroundSceneNode.__super__.constructor.call(this, this.engine);
      this.init();
      this.mppsEq = {
        0: {
          18: 0.597164,
          17: 1.194329,
          16: 2.388657,
          15: 4.777314,
          14: 9.554629,
          13: 19.109257,
          12: 38.218514,
          11: 76.437028,
          10: 152.874057,
          9: 305.748113,
          8: 611.496226,
          7: 1222.992453,
          6: 2445.984905,
          5: 4891.969810,
          4: 9783.939621,
          3: 19567.879241,
          2: 39135.758482
        }
      };
      this.sectors = [[null, null, null], [null, null, null], [null, null, null]];
      this.init();
    }
    GroundSceneNode.prototype.OnRegisterSceneNode = function(scene) {
      scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
      return GroundSceneNode.__super__.OnRegisterSceneNode.call(this, scene);
    };
    GroundSceneNode.prototype.mapPositionFromLatLong = function(lat, lon) {
      var pos;
      pos = smio.Util.Geo.mercator(lat, lon, this.mapWidth, this.mapHeight);
      document.title = JSON.stringify(pos);
      pos.x = this.mapWidthHalf - pos.x;
      pos.y = pos.y - this.mapHeightHalf;
      return pos;
    };
    GroundSceneNode.prototype.mapPositionToLatLong = function(x, z) {
      return {
        lat: 0,
        lon: 0
      };
    };
    GroundSceneNode.prototype.render = function(renderer) {
      this.updateSectors();
      return renderer.setWorld(this.getAbsoluteTransformation());
    };
    GroundSceneNode.prototype.toTileLon = function(x, y, zoom2, pi) {
      return x / zoom2 * 360 - 180;
    };
    GroundSceneNode.prototype.toTileLat = function(x, y, zoom2, pi) {
      return (Math.atan(smio.Util.Number.sinh(pi * (1 - 2 * y / zoom2)))) * 180 / pi;
    };
    GroundSceneNode.prototype.toTileNumX = function(lon, zoom2, noInt) {
      var r;
      r = ((lon + 180) / 360) * zoom2;
      if (noInt) {
        return r;
      } else {
        return parseInt(r);
      }
    };
    GroundSceneNode.prototype.toTileNumY = function(lon, lat, latRad, zoom2, pi, noInt) {
      var r;
      r = (1 - (Math.log(Math.tan(latRad) + smio.Util.Number.secant(latRad)) / pi)) / 2 * zoom2;
      if (noInt) {
        return r;
      } else {
        return parseInt(r);
      }
    };
    GroundSceneNode.prototype.updateSectors = function() {
      var cell, fig, goalSect, goalSectCell, goalSectRow, i, isGoalSect, lat, latRad, lon, mp, mpp, other, pi, row, sect, sectorSize, sub, tileNumX, tileNumY, tx, ty, url, x, y, z, zl, zoom, zoom2, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
      _ref = [this.engine.universe.curFig, null, -1, -1], fig = _ref[0], goalSect = _ref[1], goalSectRow = _ref[2], goalSectCell = _ref[3];
      _ref2 = [18, Math.pow(2, 18), Math.PI, fig.Pos.X, fig.Pos.Z, fig.Pos.Z, fig.posLon, fig.posLat, fig.posLatRad], zoom = _ref2[0], zoom2 = _ref2[1], pi = _ref2[2], x = _ref2[3], y = _ref2[4], z = _ref2[5], lon = _ref2[6], lat = _ref2[7], latRad = _ref2[8];
      if (!this.mppsEq[lat]) {
        this.mppsEq[lat] = {};
        _ref3 = this.mppsEq[0];
        for (zl in _ref3) {
          mp = _ref3[zl];
          this.mppsEq[lat][zl] = mp / Math.cos(lat * pi / 180);
        }
      }
      mpp = this.mppsEq[lat][zoom];
      _ref4 = [mpp * 256, this.toTileNumX(lon, zoom2), this.toTileNumY(lon, lat, latRad, zoom2, pi)], sectorSize = _ref4[0], tileNumX = _ref4[1], tileNumY = _ref4[2];
      for (row = 0; row <= 2; row++) {
        for (cell = 0; cell <= 2; cell++) {
          if ((sect = this.sectors[row][cell]) && sect.tileNumX === tileNumX && sect.tileNumY === tileNumY) {
            _ref5 = [sect, row, cell], goalSect = _ref5[0], goalSectRow = _ref5[1], goalSectCell = _ref5[2];
            break;
          }
        }
      }
      if (!goalSect) {
        for (row = 0; row <= 2; row++) {
          for (cell = 0; cell <= 2; cell++) {
            this.unloadSector(row, cell);
          }
        }
      } else if (goalSectRow !== 1 || goalSectCell !== 1) {
        if (goalSectRow !== 1 && goalSectCell !== 1) {
          if (goalSectRow === goalSectCell) {
            other = goalSectRow === 0 ? 2 : 0;
            this.sectors[other][other] = this.sectors[1][1];
            this.sectors[other][1] = this.sectors[1][goalSectRow];
            this.sectors[1][other] = this.sectors[goalSectRow][1];
          } else if (goalSectRow === 0 && goalSectCell === 2) {
            this.sectors[1][0] = this.sectors[0][1];
            this.sectors[2][0] = this.sectors[1][1];
            this.sectors[2][1] = this.sectors[1][2];
          } else if (goalSectRow === 2 && goalSectCell === 0) {
            this.sectors[0][1] = this.sectors[1][0];
            this.sectors[0][2] = this.sectors[1][1];
            this.sectors[1][2] = this.sectors[2][1];
          }
          this.sectors[1][1] = this.sectors[goalSectRow][goalSectCell];
          if (goalSectRow === goalSectCell) {
            this.unloadSector(0, 2);
            this.unloadSector(2, 0);
          } else {
            this.unloadSector(0, 0);
            this.unloadSector(2, 2);
          }
          this.sectors[1][goalSectCell] = null;
          this.sectors[goalSectRow][goalSectCell] = null;
          this.sectors[goalSectRow][1] = null;
        } else if (goalSectRow !== 1) {
          other = goalSectRow === 0 ? 2 : 0;
          for (i = 0; i <= 2; i++) {
            this.unloadSector(other, i);
          }
          for (i = 0; i <= 2; i++) {
            this.sectors[other][i] = this.sectors[1][i];
          }
          for (i = 0; i <= 2; i++) {
            this.sectors[1][i] = this.sectors[goalSectRow][i];
          }
          for (i = 0; i <= 2; i++) {
            this.sectors[goalSectRow][i] = null;
          }
        } else if (goalSectCell !== 1) {
          other = goalSectCell === 0 ? 2 : 0;
          for (i = 0; i <= 2; i++) {
            this.unloadSector(i, other);
          }
          for (i = 0; i <= 2; i++) {
            this.sectors[i][other] = this.sectors[i][1];
          }
          for (i = 0; i <= 2; i++) {
            this.sectors[i][1] = this.sectors[i][goalSectCell];
          }
          for (i = 0; i <= 2; i++) {
            this.sectors[i][goalSectCell] = null;
          }
        }
      }
      _ref6 = [1, 0, 2];
      for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
        row = _ref6[_i];
        _ref7 = [1, 0, 2];
        for (_j = 0, _len2 = _ref7.length; _j < _len2; _j++) {
          cell = _ref7[_j];
          isGoalSect = row === 1 && cell === 1;
          _ref8 = [(isGoalSect ? tileNumX : tileNumX + (-1 + cell)), (isGoalSect ? tileNumY : tileNumY + (-1 + row))], tx = _ref8[0], ty = _ref8[1];
          if (!(sect = this.sectors[row][cell])) {
            this.sectors[row][cell] = sect = new smio.gfx.SectorTileSceneNode(this.engine, tx, ty, sectorSize);
          }
          if ((sub = this.engine.ctl.sub("map" + cell + row)).attr('url') !== (url = "http://c.tile.openstreetmap.org/18/" + sect.tileNumX + "/" + sect.tileNumY + ".png")) {
            sub.attr('src', url);
          }
          if (isGoalSect && ((sub = this.engine.ctl.sub('mapimg')).attr('url') !== (url = "http://b.tile.openstreetmap.org/18/" + sect.tileNumX + "/" + sect.tileNumY + ".png"))) {
            sub.attr('src', url);
          }
        }
      }
      return document.title = "" + this.sectors;
    };
    GroundSceneNode.prototype.unloadSector = function(row, cell) {
      var sect;
      if ((sect = this.sectors[row][cell])) {
        this.removeChild(sect);
        return this.sectors[row][cell] = null;
      }
    };
    return GroundSceneNode;
  })();
}).call(this);
