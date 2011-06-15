(function() {
  /*
  Auto-generated from Core/Controls/SlidePanel.ctl
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
  smio.Packs_Core_Controls_SlidePanel = (function() {
    __extends(Packs_Core_Controls_SlidePanel, smio.Control);
    Packs_Core_Controls_SlidePanel.prototype.renderTemplate = function() {
      var item, itemID, ul, _ref;
      ul = {
        "class": "= smio-slidepanel " + (this.args["class"] || ''),
        'li #libefore': {
          html: ['&nbsp;']
        }
      };
      if (this.args.items) {
        _ref = this.args.items;
        for (itemID in _ref) {
          item = _ref[itemID];
          while (_.startsWith(itemID, '#')) {
            itemID = itemID.substr(1);
          }
          this.items.push(itemID);
          ul["li #items_" + itemID + " ." + (this.args.itemClass || '')] = item;
        }
      }
      ul['li #liafter'] = {
        html: ['&nbsp;']
      };
      return {
        div: {
          id: '',
          "class": "= smio-slidepanel " + this.args["class"],
          'div #scrollbox .= smio-slidepanel-scrollbox': {
            'ul #items': ul
          },
          'div #edgeprev .= smio-slidepanel-edge .= smio-slidepanel-edge-left': {
            'div .= smio-slidepanel-edge-arr .x9668': {
              _: [this.r('slidepanel_prev')]
            }
          },
          'div #edgenext .= smio-slidepanel-edge .= smio-slidepanel-edge-right': {
            'div .= smio-slidepanel-edge-arr .x9658': {
              _: [this.r('slidepanel_next')]
            }
          }
        }
      };
    };
    Packs_Core_Controls_SlidePanel.prototype.init = function() {
      this.curItem = 0;
      this.items = [];
      this.scrolling = false;
      Packs_Core_Controls_SlidePanel.__super__.init.call(this);
      if (this.args.onItemSelect && _.isFunction(this.args.onItemSelect)) {
        return this.on('itemSelect', this.args.onItemSelect);
      }
    };
    Packs_Core_Controls_SlidePanel.prototype.onLoad = function() {
      Packs_Core_Controls_SlidePanel.__super__.onLoad.call(this);
      this.sub('edgeprev').click(__bind(function() {
        return this.scrollTo(this.curItem - 1);
      }, this));
      this.sub('edgenext').click(__bind(function() {
        return this.scrollTo(this.curItem + 1);
      }, this));
      this.sub('scrollbox').scroll(_.debounce((__bind(function() {
        if (!this.scrolling) {
          return this.scrollTo(null, true);
        }
      }, this)), 100));
      return this.scrollTo(0, true);
    };
    Packs_Core_Controls_SlidePanel.prototype.onWindowResize = function(w, h) {
      return this.scrollTo(this.curItem, true);
    };
    Packs_Core_Controls_SlidePanel.prototype.scrollTo = function(item, force) {
      var distances, edgeNext, edgePrev, i, it, scrollBox, scrollLefts, tmp, _len, _ref, _ref2;
      _ref = [this.sub('edgeprev'), this.sub('edgenext'), this.sub('scrollbox')], edgePrev = _ref[0], edgeNext = _ref[1], scrollBox = _ref[2];
      if (item === null) {
        scrollLefts = [];
        distances = [];
        _ref2 = this.items;
        for (i = 0, _len = _ref2.length; i < _len; i++) {
          it = _ref2[i];
          scrollLefts.push(tmp = scrollBox.scrollLeft() + this.sub('items_' + it).position().left - edgePrev.width());
          distances.push(Math.abs(tmp - scrollBox.scrollLeft()));
        }
        item = distances.indexOf(Math.min.apply(Math, distances));
      }
      if (_.isString(item)) {
        item = this.items.indexOf(item);
      }
      if (((item < 0) || (item >= this.items.length)) && force) {
        item = 0;
      }
      if ((force || item !== this.curItem) && (item >= 0) && (item < this.items.length)) {
        this.scrolling = true;
        edgePrev.css({
          display: item === 0 ? 'none' : 'block'
        });
        edgeNext.css({
          display: item === (this.items.length - 1) ? 'none' : 'block'
        });
        this.on('itemSelect', [this.curItem = item, this.items[item]]);
        return morpheus.tween(250, (__bind(function(pos) {
          return scrollBox.scrollLeft(pos);
        }, this)), (__bind(function() {
          return this.scrolling = false;
        }, this)), null, scrollBox.scrollLeft(), scrollBox.scrollLeft() + this.sub('items_' + this.items[item]).position().left - edgePrev.width());
      }
    };
    function Packs_Core_Controls_SlidePanel(client, parent, args) {
      this.scrollTo = __bind(this.scrollTo, this);
      this.onWindowResize = __bind(this.onWindowResize, this);
      this.onLoad = __bind(this.onLoad, this);
      this.init = __bind(this.init, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_SlidePanel.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_SlidePanel.prototype.className = function() {
      return "Core_Controls_SlidePanel";
    };
    Packs_Core_Controls_SlidePanel.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_SlidePanel;
  })();
}).call(this);
