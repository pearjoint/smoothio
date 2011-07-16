/** ../_core/scripts/copperlicht.js **/
/**
  * CopperLicht 3D Engine, Copyright by Nikolaus Gebhardt, Ambiera e.U.
  * For license details, see www.ambiera.com/copperlicht
  * For the full source, see http://www.ambiera.com/copperlicht/license.html#commercial
  *
  * Note: This library can be further minificated to less then 100 KB from the full source,
  * but it isn't here to make debugging easier.
  */
var CL3D={};CL3D.DebugOutput=function(d,a){this.DebugRoot=null;var e=document.getElementById(d);if(e==null){CL3D.gCCDebugInfoEnabled=false;return}this.DebugRoot=e.parentNode;if(this.DebugRoot){this.LoadingRoot=document.createElement("div");this.DebugRoot.appendChild(this.LoadingRoot);var b=document.createTextNode("Loading...");this.LoadingRootText=b;this.LoadingRoot.appendChild(b)}if(a){this.FPSRoot=document.createElement("div");this.DebugRoot.appendChild(this.FPSRoot);var b=document.createTextNode("FPS: 0");this.FPSRootText=b;this.FPSRoot.appendChild(b);this.frames=0;this.lasttime=new Date().getTime()}};CL3D.DebugOutput.prototype.updatefps=function(c){if(this.FPSRootText==null){return}this.frames+=1;var b=new Date().getTime();if(b-this.lasttime>1000){var d=this.frames/(b-this.lasttime)*1000;var a="FPS: "+d.toFixed(2);if(c!=null){a+=c}this.FPSRootText.nodeValue=a;this.lasttime=b;this.frames=0}};CL3D.DebugOutput.prototype.print=function(a){if(CL3D.gCCDebugInfoEnabled==false){return}this.printInternal(a,false)};CL3D.DebugOutput.prototype.setLoadingText=function(a){if(!this.LoadingRoot){return}if(a==null){this.LoadingRoot.style.display="none"}else{this.LoadingRoot.style.display="block";this.LoadingRootText.nodeValue=a}};CL3D.DebugOutput.prototype.printError=function(b,a){this.printInternal(b,true,a)};CL3D.DebugOutput.prototype.printInternal=function(e,d,b){if(CL3D.gCCDebugInfoEnabled==false&&d!=true){return}if(b){this.DebugRoot.appendChild(document.createElement("br"));var a=document.createElement("div");this.DebugRoot.appendChild(a);a.innerHTML=e}else{this.DebugRoot.appendChild(document.createElement("br"));var c=document.createTextNode(e);this.DebugRoot.appendChild(c)}};CL3D.gCCDebugInfoEnabled=true;CL3D.gCCDebugOutput=null;CL3D.CCFileLoader=function(a){this.FileToLoad=a;this.xmlhttp=false;if(!this.xmlhttp&&typeof XMLHttpRequest!="undefined"){try{this.xmlhttp=new XMLHttpRequest()}catch(b){this.xmlhttp=false}}if(!this.xmlhttp&&window.createRequest){try{this.xmlhttp=window.createRequest()}catch(b){this.xmlhttp=false}}this.load=function(c){if(this.xmlhttp==false){CL3D.gCCDebugOutput.printError("Your browser doesn't support AJAX");return}var d=this;try{this.xmlhttp.open("GET",this.FileToLoad,true)}catch(f){CL3D.gCCDebugOutput.printError("Could not open file "+this.FileToLoad+": "+f.message);return}this.xmlhttp.onreadystatechange=function(){if(d.xmlhttp.readyState==4){if(d.xmlhttp.status!=200&&d.xmlhttp.status!=0&&d.xmlhttp.status!=null){CL3D.gCCDebugOutput.printError("Could not open file "+d.FileToLoad+" (status:"+d.xmlhttp.status+")")}c(d.xmlhttp.responseText)}};try{this.xmlhttp.send(null)}catch(f){CL3D.gCCDebugOutput.printError("Could not open file "+d.FileToLoad);return}};this.loadComplete=function(c){alert("loaded :"+c)}};CL3D.PI=3.14159265359;CL3D.RECIPROCAL_PI=1/3.14159265359;CL3D.HALF_PI=3.14159265359/2;CL3D.PI64=3.141592653589793;CL3D.DEGTORAD=3.14159265359/180;CL3D.RADTODEG=180/3.14159265359;CL3D.TOLERANCE=1e-8;CL3D.radToDeg=function(a){return a*CL3D.RADTODEG};CL3D.degToRad=function(a){return a*CL3D.DEGTORAD};CL3D.iszero=function(b){return(b<1e-8)&&(b>-1e-8)};CL3D.isone=function(b){return(b+1e-8>=1)&&(b-1e-8<=1)};CL3D.equals=function(d,c){return(d+1e-8>=c)&&(d-1e-8<=c)};CL3D.clamp=function(c,a,b){if(c<a){return a}if(c>b){return b}return c};CL3D.fract=function(a){return a-Math.floor(a)};CL3D.max3=function(e,d,f){if(e>d){if(e>f){return e}return f}if(d>f){return d}return f};CL3D.min3=function(e,d,f){if(e<d){if(e<f){return e}return f}if(d<f){return d}return f};CL3D.getAlpha=function(a){return((a&4278190080)>>>24)};CL3D.getRed=function(a){return((a&16711680)>>16)};CL3D.getGreen=function(a){return((a&65280)>>8)};CL3D.getBlue=function(a){return((a&255))};CL3D.createColor=function(d,f,e,c){d=d&255;f=f&255;e=e&255;c=c&255;return(d<<24)|(f<<16)|(e<<8)|c};CL3D.CLTimer=function(){};CL3D.CLTimer.getTime=function(){var a=new Date();return a.getTime()};CL3D.Vect3d=function(a,c,b){if(a==null){this.X=0;this.Y=0;this.Z=0}else{this.X=a;this.Y=c;this.Z=b}};CL3D.Vect3d.prototype.X=0;CL3D.Vect3d.prototype.Y=0;CL3D.Vect3d.prototype.Z=0;CL3D.Vect3d.prototype.set=function(a,c,b){this.X=a;this.Y=c;this.Z=b};CL3D.Vect3d.prototype.clone=function(){return new CL3D.Vect3d(this.X,this.Y,this.Z)};CL3D.Vect3d.prototype.copyTo=function(a){a.X=this.X;a.Y=this.Y;a.Z=this.Z};CL3D.Vect3d.prototype.substract=function(a){return new CL3D.Vect3d(this.X-a.X,this.Y-a.Y,this.Z-a.Z)};CL3D.Vect3d.prototype.substractFromThis=function(a){this.X-=a.X;this.Y-=a.Y;this.Z-=a.Z};CL3D.Vect3d.prototype.add=function(a){return new CL3D.Vect3d(this.X+a.X,this.Y+a.Y,this.Z+a.Z)};CL3D.Vect3d.prototype.addToThis=function(a){this.X+=a.X;this.Y+=a.Y;this.Z+=a.Z};CL3D.Vect3d.prototype.addToThisReturnMe=function(a){this.X+=a.X;this.Y+=a.Y;this.Z+=a.Z;return this};CL3D.Vect3d.prototype.normalize=function(){var a=this.X*this.X+this.Y*this.Y+this.Z*this.Z;if(a>-1e-7&&a<1e-7){return}a=1/Math.sqrt(a);this.X*=a;this.Y*=a;this.Z*=a};CL3D.Vect3d.prototype.getNormalized=function(){var a=this.X*this.X+this.Y*this.Y+this.Z*this.Z;if(a>-1e-7&&a<1e-7){return new CL3D.Vect3d(0,0,0)}a=1/Math.sqrt(a);return new CL3D.Vect3d(this.X*a,this.Y*a,this.Z*a)};CL3D.Vect3d.prototype.setLength=function(b){var a=this.X*this.X+this.Y*this.Y+this.Z*this.Z;if(a>-1e-7&&a<1e-7){return}a=b/Math.sqrt(a);this.X*=a;this.Y*=a;this.Z*=a};CL3D.Vect3d.prototype.setTo=function(a){this.X=a.X;this.Y=a.Y;this.Z=a.Z};CL3D.Vect3d.prototype.equals=function(a){return CL3D.equals(this.X,a.X)&&CL3D.equals(this.Y,a.Y)&&CL3D.equals(this.Z,a.Z)};CL3D.Vect3d.prototype.equalsZero=function(){return CL3D.iszero(this.X)&&CL3D.iszero(this.Y)&&CL3D.iszero(this.Z)};CL3D.Vect3d.prototype.equalsByNumbers=function(a,c,b){return CL3D.equals(this.X,a)&&CL3D.equals(this.Y,c)&&CL3D.equals(this.Z,b)};CL3D.Vect3d.prototype.isZero=function(){return this.X==0&&this.Y==0&&this.Z==0};CL3D.Vect3d.prototype.getLength=function(){return Math.sqrt(this.X*this.X+this.Y*this.Y+this.Z*this.Z)};CL3D.Vect3d.prototype.getDistanceTo=function(b){var a=b.X-this.X;var d=b.Y-this.Y;var c=b.Z-this.Z;return Math.sqrt(a*a+d*d+c*c)};CL3D.Vect3d.prototype.getDistanceFromSQ=function(b){var a=b.X-this.X;var d=b.Y-this.Y;var c=b.Z-this.Z;return a*a+d*d+c*c};CL3D.Vect3d.prototype.getLengthSQ=function(){return this.X*this.X+this.Y*this.Y+this.Z*this.Z};CL3D.Vect3d.prototype.multiplyWithScal=function(a){return new CL3D.Vect3d(this.X*a,this.Y*a,this.Z*a)};CL3D.Vect3d.prototype.multiplyThisWithScal=function(a){this.X*=a;this.Y*=a;this.Z*=a};CL3D.Vect3d.prototype.multiplyThisWithScalReturnMe=function(a){this.X*=a;this.Y*=a;this.Z*=a;return this};CL3D.Vect3d.prototype.multiplyThisWithVect=function(a){this.X*=a.X;this.Y*=a.Y;this.Z*=a.Z};CL3D.Vect3d.prototype.multiplyWithVect=function(a){return new CL3D.Vect3d(this.X*a.X,this.Y*a.Y,this.Z*a.Z)};CL3D.Vect3d.prototype.divideThisThroughVect=function(a){this.X/=a.X;this.Y/=a.Y;this.Z/=a.Z};CL3D.Vect3d.prototype.divideThroughVect=function(a){return new CL3D.Vect3d(this.X/a.X,this.Y/a.Y,this.Z/a.Z)};CL3D.Vect3d.prototype.crossProduct=function(a){return new CL3D.Vect3d(this.Y*a.Z-this.Z*a.Y,this.Z*a.X-this.X*a.Z,this.X*a.Y-this.Y*a.X)};CL3D.Vect3d.prototype.dotProduct=function(a){return this.X*a.X+this.Y*a.Y+this.Z*a.Z};CL3D.Vect3d.prototype.getHorizontalAngle=function(){var b=new CL3D.Vect3d();b.Y=CL3D.radToDeg(Math.atan2(this.X,this.Z));if(b.Y<0){b.Y+=360}if(b.Y>=360){b.Y-=360}var a=Math.sqrt(this.X*this.X+this.Z*this.Z);b.X=CL3D.radToDeg(Math.atan2(a,this.Y))-90;if(b.X<0){b.X+=360}if(b.X>=360){b.X-=360}return b};CL3D.Vect3d.prototype.toString=function(){return"(x: "+this.X+" y:"+this.Y+" z:"+this.Z+")"};CL3D.Line3d=function(){this.Start=new CL3D.Vect3d();this.End=new CL3D.Vect3d()};CL3D.Line3d.prototype.Start=null;CL3D.Line3d.prototype.End=null;CL3D.Line3d.prototype.getVector=function(){return this.End.substract(this.Start)};CL3D.Line3d.prototype.getLength=function(){return this.getVector().getLength()};CL3D.Vect2d=function(a,b){if(a==null){this.X=0;this.Y=0}else{this.X=a;this.Y=b}};CL3D.Vect2d.prototype.X=0;CL3D.Vect2d.prototype.Y=0;CL3D.Box3d=function(){this.MinEdge=new CL3D.Vect3d();this.MaxEdge=new CL3D.Vect3d()};CL3D.Box3d.prototype.MinEdge=null;CL3D.Box3d.prototype.MaxEdge=null;CL3D.Box3d.prototype.clone=function(){var a=new CL3D.Box3d();a.MinEdge=this.MinEdge.clone();a.MaxEdge=this.MaxEdge.clone();return a};CL3D.Box3d.prototype.getCenter=function(){var a=this.MinEdge.add(this.MaxEdge);a.multiplyThisWithScal(0.5);return a};CL3D.Box3d.prototype.getExtent=function(){return this.MaxEdge.substract(this.MinEdge)};CL3D.Box3d.prototype.getEdges=function(){var b=this.getCenter();var c=b.substract(this.MaxEdge);var a=new Array();a.push(new CL3D.Vect3d(b.X+c.X,b.Y+c.Y,b.Z+c.Z));a.push(new CL3D.Vect3d(b.X+c.X,b.Y-c.Y,b.Z+c.Z));a.push(new CL3D.Vect3d(b.X+c.X,b.Y+c.Y,b.Z-c.Z));a.push(new CL3D.Vect3d(b.X+c.X,b.Y-c.Y,b.Z-c.Z));a.push(new CL3D.Vect3d(b.X-c.X,b.Y+c.Y,b.Z+c.Z));a.push(new CL3D.Vect3d(b.X-c.X,b.Y-c.Y,b.Z+c.Z));a.push(new CL3D.Vect3d(b.X-c.X,b.Y+c.Y,b.Z-c.Z));a.push(new CL3D.Vect3d(b.X-c.X,b.Y-c.Y,b.Z-c.Z));return a};CL3D.Box3d.prototype.intersectsWithLine=function(d,e){var c=e.substract(d);var a=c.getLength();c.normalize();var b=d.add(e).multiplyWithScal(0.5);return this.intersectsWithLineImpl(b,c,a*0.5)};CL3D.Box3d.prototype.intersectsWithLineImpl=function(b,a,g){var f=this.getExtent().multiplyWithScal(0.5);var c=this.getCenter().substract(b);if((Math.abs(c.X)>f.X+g*Math.abs(a.X))||(Math.abs(c.Y)>f.Y+g*Math.abs(a.Y))||(Math.abs(c.Z)>f.Z+g*Math.abs(a.Z))){return false}var d=f.Y*Math.abs(a.Z)+f.Z*Math.abs(a.Y);if(Math.abs(c.Y*a.Z-c.Z*a.Y)>d){return false}d=f.X*Math.abs(a.Z)+f.Z*Math.abs(a.X);if(Math.abs(c.Z*a.X-c.X*a.Z)>d){return false}d=f.X*Math.abs(a.Y)+f.Y*Math.abs(a.X);if(Math.abs(c.X*a.Y-c.Y*a.X)>d){return false}return true};CL3D.Box3d.prototype.addInternalPoint=function(a,c,b){if(a>this.MaxEdge.X){this.MaxEdge.X=a}if(c>this.MaxEdge.Y){this.MaxEdge.Y=c}if(b>this.MaxEdge.Z){this.MaxEdge.Z=b}if(a<this.MinEdge.X){this.MinEdge.X=a}if(c<this.MinEdge.Y){this.MinEdge.Y=c}if(b<this.MinEdge.Z){this.MinEdge.Z=b}};CL3D.Box3d.prototype.addInternalPointByVector=function(a){this.addInternalPoint(a.X,a.Y,a.Z)};CL3D.Box3d.prototype.intersectsWithBox=function(a){return this.MinEdge.X<=a.MaxEdge.X&&this.MinEdge.Y<=a.MaxEdge.Y&&this.MinEdge.Z<=a.MaxEdge.Z&&this.MaxEdge.X>=a.MinEdge.X&&this.MaxEdge.Y>=a.MinEdge.Y&&this.MaxEdge.Z>=a.MinEdge.Z};CL3D.Box3d.prototype.isPointInside=function(a){return a.X>=this.MinEdge.X&&a.X<=this.MaxEdge.X&&a.Y>=this.MinEdge.Y&&a.Y<=this.MaxEdge.Y&&a.Z>=this.MinEdge.Z&&a.Z<=this.MaxEdge.Z};CL3D.Box3d.prototype.reset=function(a,c,b){this.MaxEdge.set(a,c,b);this.MinEdge.set(a,c,b)};CL3D.Plane3d=function(){this.Normal=new CL3D.Vect3d(0,1,0);this.recalculateD(new CL3D.Vect3d(0,0,0))};CL3D.Plane3d.prototype.D=0;CL3D.Plane3d.prototype.Normal=null;CL3D.Plane3d.ISREL3D_FRONT=0;CL3D.Plane3d.ISREL3D_BACK=1;CL3D.Plane3d.ISREL3D_PLANAR=2;CL3D.Plane3d.prototype.clone=function(){var a=new CL3D.Plane3d(false);a.Normal=this.Normal.clone();a.D=this.D;return a};CL3D.Plane3d.prototype.recalculateD=function(a){this.D=-a.dotProduct(this.Normal)};CL3D.Plane3d.prototype.getMemberPoint=function(){return this.Normal.multiplyWithScal(-this.D)};CL3D.Plane3d.prototype.setPlane=function(a,b){this.Normal=b.clone();this.recalculateD(a)};CL3D.Plane3d.prototype.setPlaneFrom3Points=function(c,b,a){this.Normal=(b.substract(c)).crossProduct(a.substract(c));this.Normal.normalize();this.recalculateD(c)};CL3D.Plane3d.prototype.normalize=function(){var a=(1/this.Normal.getLength());this.Normal=this.Normal.multiplyWithScal(a);this.D*=a};CL3D.Plane3d.prototype.classifyPointRelation=function(a){var b=this.Normal.dotProduct(a)+this.D;if(b<-0.000001){return CL3D.Plane3d.ISREL3D_BACK}if(b>0.000001){return CL3D.Plane3d.ISREL3D_FRONT}return CL3D.Plane3d.ISREL3D_PLANAR};CL3D.Plane3d.prototype.getIntersectionWithPlanes=function(d,c,b){var a=new CL3D.Vect3d();var e=new CL3D.Vect3d();if(this.getIntersectionWithPlane(d,a,e)){return c.getIntersectionWithLine(a,e,b)}return false};CL3D.Plane3d.prototype.getIntersectionWithPlane=function(j,l,g){var f=this.Normal.getLength();var e=this.Normal.dotProduct(j.Normal);var a=j.Normal.getLength();var h=f*a-e*e;if(Math.abs(h)<1e-8){return false}var d=1/h;var k=(a*-this.D+e*j.D)*d;var i=(f*-j.D+e*this.D)*d;this.Normal.crossProduct(j.Normal).copyTo(g);var c=this.Normal.multiplyWithScal(k);var b=j.Normal.multiplyWithScal(i);c.add(b).copyTo(l);return true};CL3D.Plane3d.prototype.getIntersectionWithLine=function(d,e,c){var b=this.Normal.dotProduct(e);if(b==0){return false}var a=-(this.Normal.dotProduct(d)+this.D)/b;d.add((e.multiplyWithScal(a))).copyTo(c);return true};CL3D.Plane3d.prototype.getDistanceTo=function(a){return a.dotProduct(this.Normal)+this.D};CL3D.Plane3d.prototype.isFrontFacing=function(b){var a=this.Normal.dotProduct(b);return a<=0};CL3D.Triangle3d=function(e,d,f){if(e){this.pointA=e}else{this.pointA=new CL3D.Vect3d()}if(d){this.pointB=d}else{this.pointB=new CL3D.Vect3d()}if(f){this.pointC=f}else{this.pointC=new CL3D.Vect3d()}};CL3D.Triangle3d.prototype.pointA=null;CL3D.Triangle3d.prototype.pointB=null;CL3D.Triangle3d.prototype.pointC=null;CL3D.Triangle3d.prototype.clone=function(){return new CL3D.Triangle3d(this.pointA,this.pointB,this.pointC)};CL3D.Triangle3d.prototype.getPlane=function(){var a=new CL3D.Plane3d(false);a.setPlaneFrom3Points(this.pointA,this.pointB,this.pointC);return a};CL3D.Triangle3d.prototype.isPointInsideFast=function(j){var l=this.pointB.substract(this.pointA);var k=this.pointC.substract(this.pointA);var u=l.dotProduct(l);var s=l.dotProduct(k);var q=k.dotProduct(k);var i=j.substract(this.pointA);var n=i.dotProduct(l);var m=i.dotProduct(k);var t=(n*q)-(m*s);var r=(m*u)-(n*s);var h=(u*q)-(s*s);var o=t+r-h;return(o<0)&&!((t<0)||(r<0))};CL3D.Triangle3d.prototype.isPointInside=function(a){return(this.isOnSameSide(a,this.pointA,this.pointB,this.pointC)&&this.isOnSameSide(a,this.pointB,this.pointA,this.pointC)&&this.isOnSameSide(a,this.pointC,this.pointA,this.pointB))};CL3D.Triangle3d.prototype.isOnSameSide=function(i,g,d,c){var e=c.substract(d);var h=e.crossProduct(i.substract(d));var f=e.crossProduct(g.substract(d));return(h.dotProduct(f)>=0)};CL3D.Triangle3d.prototype.getNormal=function(){return this.pointB.substract(this.pointA).crossProduct(this.pointC.substract(this.pointA))};CL3D.Triangle3d.prototype.getIntersectionOfPlaneWithLine=function(c,f){var e=this.getNormal();e.normalize();var b=e.dotProduct(f);if(CL3D.iszero(b)){return null}var g=this.pointA.dotProduct(e);var a=-(e.dotProduct(c)-g)/b;return c.add(f.multiplyWithScal(a))};CL3D.Triangle3d.prototype.getIntersectionWithLine=function(b,c){var a=this.getIntersectionOfPlaneWithLine(b,c);if(a==null){return null}if(this.isPointInside(a)){return a}return null};CL3D.Triangle3d.prototype.isTotalInsideBox=function(a){return a.isPointInside(this.pointA)&&a.isPointInside(this.pointB)&&a.isPointInside(this.pointC)};CL3D.Triangle3d.prototype.copyTo=function(a){this.pointA.copyTo(a.pointA);this.pointB.copyTo(a.pointB);this.pointC.copyTo(a.pointC)};CL3D.Matrix4=function(a){if(a==null){a=true}this.m00=0;this.m01=0;this.m02=0;this.m03=0;this.m04=0;this.m05=0;this.m06=0;this.m07=0;this.m08=0;this.m09=0;this.m10=0;this.m11=0;this.m12=0;this.m13=0;this.m14=0;this.m15=0;this.bIsIdentity=false;if(a){this.m00=1;this.m05=1;this.m10=1;this.m15=1;this.bIsIdentity=true}};CL3D.Matrix4.prototype.makeIdentity=function(){this.m00=1;this.m01=0;this.m02=0;this.m03=0;this.m04=0;this.m05=1;this.m06=0;this.m07=0;this.m08=0;this.m09=0;this.m10=1;this.m11=0;this.m12=0;this.m13=0;this.m14=0;this.m15=1;this.bIsIdentity=true};CL3D.Matrix4.prototype.isIdentity=function(){if(this.bIsIdentity){return true}this.bIsIdentity=(CL3D.isone(this.m00)&&CL3D.iszero(this.m01)&&CL3D.iszero(this.m02)&&CL3D.iszero(this.m03)&&CL3D.iszero(this.m04)&&CL3D.isone(this.m05)&&CL3D.iszero(this.m06)&&CL3D.iszero(this.m07)&&CL3D.iszero(this.m08)&&CL3D.iszero(this.m09)&&CL3D.isone(this.m10)&&CL3D.iszero(this.m11)&&CL3D.iszero(this.m12)&&CL3D.iszero(this.m13)&&CL3D.iszero(this.m14)&&CL3D.isone(this.m15));return this.bIsIdentity};CL3D.Matrix4.prototype.isTranslateOnly=function(){if(this.bIsIdentity){return true}return(CL3D.isone(this.m00)&&CL3D.iszero(this.m01)&&CL3D.iszero(this.m02)&&CL3D.iszero(this.m03)&&CL3D.iszero(this.m04)&&CL3D.isone(this.m05)&&CL3D.iszero(this.m06)&&CL3D.iszero(this.m07)&&CL3D.iszero(this.m08)&&CL3D.iszero(this.m09)&&CL3D.isone(this.m10)&&CL3D.iszero(this.m11)&&CL3D.isone(this.m15))};CL3D.Matrix4.prototype.equals=function(a){return CL3D.equals(this.m00,a.m00)&&CL3D.equals(this.m01,a.m01)&&CL3D.equals(this.m02,a.m02)&&CL3D.equals(this.m03,a.m03)&&CL3D.equals(this.m04,a.m04)&&CL3D.equals(this.m05,a.m05)&&CL3D.equals(this.m06,a.m06)&&CL3D.equals(this.m07,a.m07)&&CL3D.equals(this.m08,a.m08)&&CL3D.equals(this.m09,a.m09)&&CL3D.equals(this.m10,a.m10)&&CL3D.equals(this.m11,a.m11)&&CL3D.equals(this.m12,a.m12)&&CL3D.equals(this.m13,a.m13)&&CL3D.equals(this.m14,a.m14)&&CL3D.equals(this.m15,a.m15)};CL3D.Matrix4.prototype.getTranslation=function(){return new CL3D.Vect3d(this.m12,this.m13,this.m14)};CL3D.Matrix4.prototype.getScale=function(){return new CL3D.Vect3d(this.m00,this.m05,this.m10)};CL3D.Matrix4.prototype.rotateVect=function(a){var b=a.clone();a.X=b.X*this.m00+b.Y*this.m04+b.Z*this.m08;a.Y=b.X*this.m01+b.Y*this.m05+b.Z*this.m09;a.Z=b.X*this.m02+b.Y*this.m06+b.Z*this.m10};CL3D.Matrix4.prototype.rotateVect2=function(a,b){a.X=b.X*this.m00+b.Y*this.m04+b.Z*this.m08;a.Y=b.X*this.m01+b.Y*this.m05+b.Z*this.m09;a.Z=b.X*this.m02+b.Y*this.m06+b.Z*this.m10};CL3D.Matrix4.prototype.getRotatedVect=function(a){return new CL3D.Vect3d(a.X*this.m00+a.Y*this.m04+a.Z*this.m08,a.X*this.m01+a.Y*this.m05+a.Z*this.m09,a.X*this.m02+a.Y*this.m06+a.Z*this.m10)};CL3D.Matrix4.prototype.getTransformedVect=function(a){return new CL3D.Vect3d(a.X*this.m00+a.Y*this.m04+a.Z*this.m08+this.m12,a.X*this.m01+a.Y*this.m05+a.Z*this.m09+this.m13,a.X*this.m02+a.Y*this.m06+a.Z*this.m10+this.m14)};CL3D.Matrix4.prototype.transformVect=function(c){var b=c.X*this.m00+c.Y*this.m04+c.Z*this.m08+this.m12;var a=c.X*this.m01+c.Y*this.m05+c.Z*this.m09+this.m13;var d=c.X*this.m02+c.Y*this.m06+c.Z*this.m10+this.m14;c.X=b;c.Y=a;c.Z=d};CL3D.Matrix4.prototype.transformVect2=function(a,b){a.X=b.X*this.m00+b.Y*this.m04+b.Z*this.m08+this.m12;a.Y=b.X*this.m01+b.Y*this.m05+b.Z*this.m09+this.m13;a.Z=b.X*this.m02+b.Y*this.m06+b.Z*this.m10+this.m14};CL3D.Matrix4.prototype.getTranslatedVect=function(a){return new CL3D.Vect3d(a.X+this.m12,a.Y+this.m13,a.Z+this.m14)};CL3D.Matrix4.prototype.translateVect=function(a){a.X=a.X+this.m12;a.Y=a.Y+this.m13;a.Z=a.Z+this.m14};CL3D.Matrix4.prototype.transformPlane=function(a){var d=a.getMemberPoint();this.transformVect(d);var b=a.Normal.clone();b.normalize();var c=this.getScale();if(!CL3D.equals(c.X,0)&&!CL3D.equals(c.Y,0)&&!CL3D.equals(c.Z,0)&&(!CL3D.equals(c.X,1)||!CL3D.equals(c.Y,1)||!CL3D.equals(c.Z,1))){b.X*=1/(c.X*c.X);b.Y*=1/(c.Y*c.Y);b.Z*=1/(c.Z*c.Z)}this.rotateVect(b);b.normalize();a.setPlane(d,b)};CL3D.Matrix4.prototype.multiply=function(a){var b=new CL3D.Matrix4(false);if(this.bIsIdentity){a.copyTo(b);return b}if(a.bIsIdentity){this.copyTo(b);return b}b.m00=this.m00*a.m00+this.m04*a.m01+this.m08*a.m02+this.m12*a.m03;b.m01=this.m01*a.m00+this.m05*a.m01+this.m09*a.m02+this.m13*a.m03;b.m02=this.m02*a.m00+this.m06*a.m01+this.m10*a.m02+this.m14*a.m03;b.m03=this.m03*a.m00+this.m07*a.m01+this.m11*a.m02+this.m15*a.m03;b.m04=this.m00*a.m04+this.m04*a.m05+this.m08*a.m06+this.m12*a.m07;b.m05=this.m01*a.m04+this.m05*a.m05+this.m09*a.m06+this.m13*a.m07;b.m06=this.m02*a.m04+this.m06*a.m05+this.m10*a.m06+this.m14*a.m07;b.m07=this.m03*a.m04+this.m07*a.m05+this.m11*a.m06+this.m15*a.m07;b.m08=this.m00*a.m08+this.m04*a.m09+this.m08*a.m10+this.m12*a.m11;b.m09=this.m01*a.m08+this.m05*a.m09+this.m09*a.m10+this.m13*a.m11;b.m10=this.m02*a.m08+this.m06*a.m09+this.m10*a.m10+this.m14*a.m11;b.m11=this.m03*a.m08+this.m07*a.m09+this.m11*a.m10+this.m15*a.m11;b.m12=this.m00*a.m12+this.m04*a.m13+this.m08*a.m14+this.m12*a.m15;b.m13=this.m01*a.m12+this.m05*a.m13+this.m09*a.m14+this.m13*a.m15;b.m14=this.m02*a.m12+this.m06*a.m13+this.m10*a.m14+this.m14*a.m15;b.m15=this.m03*a.m12+this.m07*a.m13+this.m11*a.m14+this.m15*a.m15;return b};CL3D.Matrix4.prototype.multiplyWith1x4Matrix=function(a){var b=a.clone();b.W=a.W;a.X=b.X*this.m00+b.Y*this.m04+b.Z*this.m08+b.W*this.m12;a.Y=b.X*this.m01+b.Y*this.m05+b.Z*this.m09+b.W*this.m13;a.Z=b.X*this.m02+b.Y*this.m06+b.Z*this.m10+b.W*this.m14;a.W=b.X*this.m03+b.Y*this.m07+b.Z*this.m11+b.W*this.m15};CL3D.Matrix4.prototype.getInverse=function(a){if(this.bIsIdentity){this.copyTo(a);return true}var b=(this.m00*this.m05-this.m01*this.m04)*(this.m10*this.m15-this.m11*this.m14)-(this.m00*this.m06-this.m02*this.m04)*(this.m09*this.m15-this.m11*this.m13)+(this.m00*this.m07-this.m03*this.m04)*(this.m09*this.m14-this.m10*this.m13)+(this.m01*this.m06-this.m02*this.m05)*(this.m08*this.m15-this.m11*this.m12)-(this.m01*this.m07-this.m03*this.m05)*(this.m08*this.m14-this.m10*this.m12)+(this.m02*this.m07-this.m03*this.m06)*(this.m08*this.m13-this.m09*this.m12);if(b>-1e-7&&b<1e-7){return false}b=1/b;a.m00=b*(this.m05*(this.m10*this.m15-this.m11*this.m14)+this.m06*(this.m11*this.m13-this.m09*this.m15)+this.m07*(this.m09*this.m14-this.m10*this.m13));a.m01=b*(this.m09*(this.m02*this.m15-this.m03*this.m14)+this.m10*(this.m03*this.m13-this.m01*this.m15)+this.m11*(this.m01*this.m14-this.m02*this.m13));a.m02=b*(this.m13*(this.m02*this.m07-this.m03*this.m06)+this.m14*(this.m03*this.m05-this.m01*this.m07)+this.m15*(this.m01*this.m06-this.m02*this.m05));a.m03=b*(this.m01*(this.m07*this.m10-this.m06*this.m11)+this.m02*(this.m05*this.m11-this.m07*this.m09)+this.m03*(this.m06*this.m09-this.m05*this.m10));a.m04=b*(this.m06*(this.m08*this.m15-this.m11*this.m12)+this.m07*(this.m10*this.m12-this.m08*this.m14)+this.m04*(this.m11*this.m14-this.m10*this.m15));a.m05=b*(this.m10*(this.m00*this.m15-this.m03*this.m12)+this.m11*(this.m02*this.m12-this.m00*this.m14)+this.m08*(this.m03*this.m14-this.m02*this.m15));a.m06=b*(this.m14*(this.m00*this.m07-this.m03*this.m04)+this.m15*(this.m02*this.m04-this.m00*this.m06)+this.m12*(this.m03*this.m06-this.m02*this.m07));a.m07=b*(this.m02*(this.m07*this.m08-this.m04*this.m11)+this.m03*(this.m04*this.m10-this.m06*this.m08)+this.m00*(this.m06*this.m11-this.m07*this.m10));a.m08=b*(this.m07*(this.m08*this.m13-this.m09*this.m12)+this.m04*(this.m09*this.m15-this.m11*this.m13)+this.m05*(this.m11*this.m12-this.m08*this.m15));a.m09=b*(this.m11*(this.m00*this.m13-this.m01*this.m12)+this.m08*(this.m01*this.m15-this.m03*this.m13)+this.m09*(this.m03*this.m12-this.m00*this.m15));a.m10=b*(this.m15*(this.m00*this.m05-this.m01*this.m04)+this.m12*(this.m01*this.m07-this.m03*this.m05)+this.m13*(this.m03*this.m04-this.m00*this.m07));a.m11=b*(this.m03*(this.m05*this.m08-this.m04*this.m09)+this.m00*(this.m07*this.m09-this.m05*this.m11)+this.m01*(this.m04*this.m11-this.m07*this.m08));a.m12=b*(this.m04*(this.m10*this.m13-this.m09*this.m14)+this.m05*(this.m08*this.m14-this.m10*this.m12)+this.m06*(this.m09*this.m12-this.m08*this.m13));a.m13=b*(this.m08*(this.m02*this.m13-this.m01*this.m14)+this.m09*(this.m00*this.m14-this.m02*this.m12)+this.m10*(this.m01*this.m12-this.m00*this.m13));a.m14=b*(this.m12*(this.m02*this.m05-this.m01*this.m06)+this.m13*(this.m00*this.m06-this.m02*this.m04)+this.m14*(this.m01*this.m04-this.m00*this.m05));a.m15=b*(this.m00*(this.m05*this.m10-this.m06*this.m09)+this.m01*(this.m06*this.m08-this.m04*this.m10)+this.m02*(this.m04*this.m09-this.m05*this.m08));a.bIsIdentity=this.bIsIdentity;return true};CL3D.Matrix4.prototype.makeInverse=function(){var a=new CL3D.Matrix4(false);if(this.getInverse(a)){a.copyTo(this);return true}return false};CL3D.Matrix4.prototype.getTransposed=function(){var a=new CL3D.Matrix4(false);a.m00=this.m00;a.m01=this.m04;a.m02=this.m08;a.m03=this.m12;a.m04=this.m01;a.m05=this.m05;a.m06=this.m09;a.m07=this.m13;a.m08=this.m02;a.m09=this.m06;a.m10=this.m10;a.m11=this.m14;a.m12=this.m03;a.m13=this.m07;a.m14=this.m11;a.m15=this.m15;a.bIsIdentity=this.bIsIdentity;return a};CL3D.Matrix4.prototype.asArray=function(){return[this.m00,this.m01,this.m02,this.m03,this.m04,this.m05,this.m06,this.m07,this.m08,this.m09,this.m10,this.m11,this.m12,this.m13,this.m14,this.m15]};CL3D.Matrix4.prototype.setByIndex=function(a,b){this.bIsIdentity=false;switch(a){case 0:this.m00=b;break;case 1:this.m01=b;break;case 2:this.m02=b;break;case 3:this.m03=b;break;case 4:this.m04=b;break;case 5:this.m05=b;break;case 6:this.m06=b;break;case 7:this.m07=b;break;case 8:this.m08=b;break;case 9:this.m09=b;break;case 10:this.m10=b;break;case 11:this.m11=b;break;case 12:this.m12=b;break;case 13:this.m13=b;break;case 14:this.m14=b;break;case 15:this.m15=b;break}};CL3D.Matrix4.prototype.clone=function(){var a=new CL3D.Matrix4(false);this.copyTo(a);return a};CL3D.Matrix4.prototype.copyTo=function(a){a.m00=this.m00;a.m01=this.m01;a.m02=this.m02;a.m03=this.m03;a.m04=this.m04;a.m05=this.m05;a.m06=this.m06;a.m07=this.m07;a.m08=this.m08;a.m09=this.m09;a.m10=this.m10;a.m11=this.m11;a.m12=this.m12;a.m13=this.m13;a.m14=this.m14;a.m15=this.m15;a.bIsIdentity=this.bIsIdentity};CL3D.Matrix4.prototype.buildProjectionMatrixPerspectiveFovLH=function(e,d,f,c){var b=1/Math.tan(e/2);var a=(b/d);this.m00=a;this.m01=0;this.m02=0;this.m03=0;this.m04=0;this.m05=b;this.m06=0;this.m07=0;this.m08=0;this.m09=0;this.m10=(c/(c-f));this.m11=1;this.m12=0;this.m13=0;this.m14=(-f*c/(c-f));this.m15=0;this.bIsIdentity=false};CL3D.Matrix4.prototype.buildCameraLookAtMatrixLH=function(b,e,d){var a=e.substract(b);a.normalize();var f=d.crossProduct(a);f.normalize();var c=a.crossProduct(f);this.m00=f.X;this.m01=c.X;this.m02=a.X;this.m03=0;this.m04=f.Y;this.m05=c.Y;this.m06=a.Y;this.m07=0;this.m08=f.Z;this.m09=c.Z;this.m10=a.Z;this.m11=0;this.m12=-f.dotProduct(b);this.m13=-c.dotProduct(b);this.m14=-a.dotProduct(b);this.m15=1;this.bIsIdentity=false};CL3D.Matrix4.prototype.setRotationDegrees=function(a){this.setRotationRadians(a.multiplyWithScal(CL3D.DEGTORAD))};CL3D.Matrix4.prototype.setRotationRadians=function(i){var e=Math.cos(i.X);var a=Math.sin(i.X);var f=Math.cos(i.Y);var c=Math.sin(i.Y);var d=Math.cos(i.Z);var g=Math.sin(i.Z);this.m00=(f*d);this.m01=(f*g);this.m02=(-c);var h=a*c;var b=e*c;this.m04=(h*d-e*g);this.m05=(h*g+e*d);this.m06=(a*f);this.m08=(b*d+a*g);this.m09=(b*g-a*d);this.m10=(e*f);this.bIsIdentity=false};CL3D.Matrix4.prototype.getRotationDegrees=function(){var f=-Math.asin(this.m02);var e=Math.cos(f);f*=CL3D.RADTODEG;var c;var a;var g;var d;if(Math.abs(e)>1e-8){var b=(1/e);c=this.m10*b;a=this.m06*b;g=Math.atan2(a,c)*CL3D.RADTODEG;c=this.m00*b;a=this.m01*b;d=Math.atan2(a,c)*CL3D.RADTODEG}else{g=0;c=this.m05;a=-this.m04;d=Math.atan2(a,c)*CL3D.RADTODEG}if(g<0){g+=360}if(f<0){f+=360}if(d<0){d+=360}return new CL3D.Vect3d(g,f,d)};CL3D.Matrix4.prototype.setTranslation=function(a){this.m12=a.X;this.m13=a.Y;this.m14=a.Z;this.bIsIdentity=false};CL3D.Matrix4.prototype.setScale=function(a){this.m00=a.X;this.m05=a.Y;this.m10=a.Z;this.bIsIdentity=false};CL3D.Matrix4.prototype.setScaleXYZ=function(a,c,b){this.m00=a;this.m05=c;this.m10=b;this.bIsIdentity=false};CL3D.Matrix4.prototype.transformBoxEx=function(d){var b=d.getEdges();var c;for(c=0;c<8;++c){this.transformVect(b[c])}var a=b[0];d.MinEdge=a.clone();d.MaxEdge=a.clone();for(c=1;c<8;++c){d.addInternalPointByVector(b[c])}};CL3D.Matrix4.prototype.toString=function(){return this.m00+" "+this.m01+" "+this.m02+" "+this.m03+"\n"+this.m04+" "+this.m05+" "+this.m06+" "+this.m07+"\n"+this.m08+" "+this.m09+" "+this.m10+" "+this.m11+"\n"+this.m12+" "+this.m13+" "+this.m14+" "+this.m15};CL3D.Quaternion=function(a,d,c,b){this.X=0;this.Y=0;this.Z=0;this.W=1;if(a!=null){this.X=a}if(d!=null){this.Y=d}if(c!=null){this.Z=c}if(b!=null){this.W=b}};CL3D.Quaternion.prototype.X=0;CL3D.Quaternion.prototype.Y=0;CL3D.Quaternion.prototype.Z=0;CL3D.Quaternion.prototype.W=0;CL3D.Quaternion.prototype.clone=function(){var a=new CL3D.Quaternion();this.copyTo(a);return a};CL3D.Quaternion.prototype.copyTo=function(a){a.X=this.X;a.Y=this.Y;a.Z=this.Z;a.W=this.W};CL3D.Quaternion.prototype.multiplyWith=function(a){return new CL3D.Quaternion(this.X*a,this.Y*a,this.Z*a,this.W*a)};CL3D.Quaternion.prototype.multiplyThisWith=function(a){this.X=this.X*a;this.Y=this.Y*a;this.Z=this.Z*a;this.W=this.W*a};CL3D.Quaternion.prototype.addToThis=function(a){this.X+=a.X;this.Y+=a.Y;this.Z+=a.Z;this.W+=a.W;return this};CL3D.Quaternion.prototype.slerp=function(g,f,b){var c=g.dotProduct(f);if(c<0){g=g.multiplyWith(-1);c*=-1}var d;var e;if((c+1)>0.05){if((1-c)>=0.05){var a=Math.acos(c);var i=1/Math.sin(a);d=Math.sin(a*(1-b))*i;e=Math.sin(a*b)*i}else{d=1-b;e=b}}else{f=new CL3D.Quaternion(-g.Y,g.X,-g.W,g.Z);d=Math.sin(CL3D.PI*(0.5-b));e=Math.sin(CL3D.PI*b)}var h=g.multiplyWith(d).addToThis(f.multiplyWith(e));this.X=h.X;this.Y=h.Y;this.Z=h.Z;this.W=h.W};CL3D.Quaternion.prototype.dotProduct=function(a){return(this.X*a.X)+(this.Y*a.Y)+(this.Z*a.Z)+(this.W*a.W)};CL3D.Quaternion.prototype.getMatrix=function(){var a=new CL3D.Matrix4(false);this.getMatrix_transposed(a);return a};CL3D.Quaternion.prototype.getMatrix_transposed=function(b){var e=this.X;var d=this.Y;var c=this.Z;var a=this.W;b.m00=1-2*d*d-2*c*c;b.m04=2*e*d+2*c*a;b.m08=2*e*c-2*d*a;b.m12=0;b.m01=2*e*d-2*c*a;b.m05=1-2*e*e-2*c*c;b.m09=2*c*d+2*e*a;b.m13=0;b.m02=2*e*c+2*d*a;b.m06=2*c*d-2*e*a;b.m10=1-2*e*e-2*d*d;b.m14=0;b.m03=0;b.m07=0;b.m11=0;b.m15=1;b.bIsIdentity=false};CL3D.Quaternion.prototype.toEuler=function(a){var e=this.W*this.W;var d=this.X*this.X;var c=this.Y*this.Y;var b=this.Z*this.Z;a.Z=(Math.atan2(2*(this.X*this.Y+this.Z*this.W),(d-c-b+e)));a.X=(Math.atan2(2*(this.Y*this.Z+this.X*this.W),(-d-c+b+e)));a.Y=Math.asin(CL3D.clamp(-2*(this.X*this.Z-this.Y*this.W),-1,1))};CL3D.Quaternion.prototype.setFromEuler=function(m,l,i){var f=m*0.5;var a=Math.sin(f);var g=Math.cos(f);f=l*0.5;var c=Math.sin(f);var j=Math.cos(f);f=i*0.5;var k=Math.sin(f);var e=Math.cos(f);var n=j*e;var h=c*e;var d=j*k;var b=c*k;this.X=(a*n-g*b);this.Y=(g*h+a*d);this.Z=(g*d-a*h);this.W=(g*n+a*b);this.normalize()};CL3D.Quaternion.prototype.normalize=function(){var a=this.X*this.X+this.Y*this.Y+this.Z*this.Z+this.W*this.W;if(a==1){return}a=1/Math.sqrt(a);this.multiplyThisWith(a)};CL3D.Quaternion.prototype.toString=function(){return"(x: "+this.X+" y:"+this.Y+" z:"+this.Z+" w:"+this.W+")"};CL3D.ViewFrustrum=function(){this.planes=new Array();for(var a=0;a<CL3D.ViewFrustrum.VF_PLANE_COUNT;++a){this.planes.push(new CL3D.Plane3d())}};CL3D.ViewFrustrum.prototype.planes=null;CL3D.ViewFrustrum.VF_FAR_PLANE=0;CL3D.ViewFrustrum.VF_NEAR_PLANE=1;CL3D.ViewFrustrum.VF_LEFT_PLANE=2;CL3D.ViewFrustrum.VF_RIGHT_PLANE=3;CL3D.ViewFrustrum.VF_BOTTOM_PLANE=4;CL3D.ViewFrustrum.VF_TOP_PLANE=5;CL3D.ViewFrustrum.VF_PLANE_COUNT=6;CL3D.ViewFrustrum.prototype.setFrom=function(d){var b;b=this.planes[CL3D.ViewFrustrum.VF_LEFT_PLANE];b.Normal.X=d.m03+d.m00;b.Normal.Y=d.m07+d.m04;b.Normal.Z=d.m11+d.m08;b.D=d.m15+d.m12;b=this.planes[CL3D.ViewFrustrum.VF_RIGHT_PLANE];b.Normal.X=d.m03-d.m00;b.Normal.Y=d.m07-d.m04;b.Normal.Z=d.m11-d.m08;b.D=d.m15-d.m12;b=this.planes[CL3D.ViewFrustrum.VF_TOP_PLANE];b.Normal.X=d.m03-d.m01;b.Normal.Y=d.m07-d.m05;b.Normal.Z=d.m11-d.m09;b.D=d.m15-d.m13;b=this.planes[CL3D.ViewFrustrum.VF_BOTTOM_PLANE];b.Normal.X=d.m03+d.m01;b.Normal.Y=d.m07+d.m05;b.Normal.Z=d.m11+d.m09;b.D=d.m15+d.m13;b=this.planes[CL3D.ViewFrustrum.VF_FAR_PLANE];b.Normal.X=d.m03-d.m02;b.Normal.Y=d.m07-d.m06;b.Normal.Z=d.m11-d.m10;b.D=d.m15-d.m14;b=this.planes[CL3D.ViewFrustrum.VF_NEAR_PLANE];b.Normal.X=d.m02;b.Normal.Y=d.m06;b.Normal.Z=d.m10;b.D=d.m14;var c=0;for(c=0;c<CL3D.ViewFrustrum.VF_PLANE_COUNT;++c){b=this.planes[c];var a=-(1/b.Normal.getLength());b.Normal=b.Normal.multiplyWithScal(a);b.D*=a}};CL3D.ViewFrustrum.prototype.getFarLeftUp=function(){var a=new CL3D.Vect3d();this.planes[CL3D.ViewFrustrum.VF_FAR_PLANE].getIntersectionWithPlanes(this.planes[CL3D.ViewFrustrum.VF_TOP_PLANE],this.planes[CL3D.ViewFrustrum.VF_LEFT_PLANE],a);return a};CL3D.ViewFrustrum.prototype.getFarRightUp=function(){var a=new CL3D.Vect3d();this.planes[CL3D.ViewFrustrum.VF_FAR_PLANE].getIntersectionWithPlanes(this.planes[CL3D.ViewFrustrum.VF_TOP_PLANE],this.planes[CL3D.ViewFrustrum.VF_RIGHT_PLANE],a);return a};CL3D.ViewFrustrum.prototype.getFarRightDown=function(){var a=new CL3D.Vect3d();this.planes[CL3D.ViewFrustrum.VF_FAR_PLANE].getIntersectionWithPlanes(this.planes[CL3D.ViewFrustrum.VF_BOTTOM_PLANE],this.planes[CL3D.ViewFrustrum.VF_RIGHT_PLANE],a);return a};CL3D.ViewFrustrum.prototype.getFarLeftDown=function(){var a=new CL3D.Vect3d();this.planes[CL3D.ViewFrustrum.VF_FAR_PLANE].getIntersectionWithPlanes(this.planes[CL3D.ViewFrustrum.VF_BOTTOM_PLANE],this.planes[CL3D.ViewFrustrum.VF_LEFT_PLANE],a);return a};CL3D.ViewFrustrum.prototype.getBoundingBox=function(c){var a=new CL3D.Box3d();a.reset(c.X,c.Y,c.Z);a.addInternalPointByVector(this.getFarLeftUp());a.addInternalPointByVector(this.getFarRightUp());a.addInternalPointByVector(this.getFarLeftDown());a.addInternalPointByVector(this.getFarRightDown());return a};CL3D.Vertex3D=function(a){if(a){this.Pos=new CL3D.Vect3d();this.Normal=new CL3D.Vect3d();this.Color=4294967295;this.TCoords=new CL3D.Vect2d();this.TCoords2=new CL3D.Vect2d()}};CL3D.Vertex3D.prototype.Pos=null;CL3D.Vertex3D.prototype.Normal=null;CL3D.Vertex3D.prototype.Color=0;CL3D.Vertex3D.prototype.TCoords=null;CL3D.Vertex3D.prototype.TCoords2=null;CL3D.Texture=function(){this.Name="";this.Loaded=false;this.Image=null;this.Texture=null;this.CachedWidth=null;this.CachedHeight=null;this.OriginalWidth=null;this.OriginalHeight=null};CL3D.Texture.prototype.getImage=function(){return this.Image};CL3D.Texture.prototype.getWebGLTexture=function(){return this.Texture};CL3D.Texture.prototype.getWidth=function(){if(this.Image){return this.Image.width}if(this.CachedWidth!=null){return this.CachedWidth}return 0};CL3D.Texture.prototype.getHeight=function(){if(this.Image){return this.Image.height}if(this.CachedHeight!=null){return this.CachedHeight}return 0};CL3D.Texture.prototype.getURL=function(){return this.Name};CL3D.Texture.prototype.isLoaded=function(){return this.Loaded};CL3D.Action=function(){};CL3D.Action.prototype.execute=function(a,b){};CL3D.Action.SetOverlayText=function(){this.Text="";this.SceneNodeToChange=null;this.ChangeCurrentSceneNode=false;this.Type="SetOverlayText"};CL3D.Action.SetOverlayText.prototype.execute=function(a,h){if(!a||!h){return}var j=null;if(this.ChangeCurrentSceneNode){j=a}else{if(this.SceneNodeToChange!=-1){j=h.getSceneNodeFromId(this.SceneNodeToChange)}}if(j&&j.setText){var g=this.Text.indexOf("$");if(g!=-1){var c=this.Text;var e=0;var k=true;while(k){k=false;g=c.indexOf("$",e);if(g!=-1){e=g+1;var d=c.indexOf("$",g+1);if(d!=-1){k=true;var b=c.substr(g+1,d-(g+1));var i=CL3D.CopperCubeVariable.getVariable(b);if(i){var f=c.substr(0,g);f+=i.getValueAsString();e=f.length+1;f+=c.substr(d+1,c.length-d);c=f}}}}j.setText(c)}else{j.setText(this.Text)}}};CL3D.Action.MakeSceneNodeInvisible=function(){this.InvisibleMakeType=0;this.SceneNodeToMakeInvisible=null;this.ChangeCurrentSceneNode=false;this.Type="MakeSceneNodeInvisible"};CL3D.Action.MakeSceneNodeInvisible.prototype.execute=function(c,b){if(!c||!b){return}var a=null;if(this.ChangeCurrentSceneNode){a=c}else{if(this.SceneNodeToMakeInvisible!=-1){a=b.getSceneNodeFromId(this.SceneNodeToMakeInvisible)}}if(a){switch(this.InvisibleMakeType){case 0:a.Visible=false;break;case 1:a.Visible=true;break;case 2:a.Visible=!a.Visible;break}}};CL3D.Action.ChangeSceneNodePosition=function(){this.UseAnimatedMovement=false;this.TimeNeededForMovementMs=false;this.Type="ChangeSceneNodePosition"};CL3D.Action.ChangeSceneNodePosition.prototype.execute=function(a,f){if(!a||!f){return}var h=null;if(this.ChangeCurrentSceneNode){h=a}else{if(this.SceneNodeToChangePosition!=-1){h=f.getSceneNodeFromId(this.SceneNodeToChangePosition)}}if(h){var d=null;switch(this.PositionChangeType){case 0:d=this.Vector.clone();break;case 1:d=h.Pos.add(this.Vector);break;case 2:var g=null;if(this.RelativeToCurrentSceneNode){g=a}else{if(this.SceneNodeRelativeTo!=-1){g=f.getSceneNodeFromId(this.SceneNodeRelativeTo)}}if(g){d=g.Pos.add(this.Vector)}break;case 3:var e=this.Vector.getLength();var c=h.AbsoluteTransformation;var i=new CL3D.Vect3d(1,0,0);c.rotateVect(i);i.setLength(e);d=h.Pos.add(i);break}if(d!=null){if(this.UseAnimatedMovement&&this.TimeNeededForMovementMs>0){var b=new CL3D.AnimatorFlyStraight();b.Start=h.Pos.clone();b.End=d;b.TimeForWay=this.TimeNeededForMovementMs;b.DeleteMeAfterEndReached=true;b.recalculateImidiateValues();h.addAnimator(b)}else{h.Pos=d}}}};CL3D.Action.ChangeSceneNodeRotation=function(){this.Type="ChangeSceneNodeRotation"};CL3D.Action.ChangeSceneNodeRotation.prototype.execute=function(c,b){if(!c||!b){return}var a=null;if(this.ChangeCurrentSceneNode){a=c}else{if(this.SceneNodeToChangeRotation!=-1){a=b.getSceneNodeFromId(this.SceneNodeToChangeRotation)}}if(a){var e=null;switch(this.RotationChangeType){case 0:e=this.Vector.clone();break;case 1:e=a.Rot.add(this.Vector);break}if(e){if(!this.RotateAnimated){a.Rot=e}else{var d=new CL3D.AnimatorRotation();d.setRotateToTargetAndStop(e,a.Rot,this.TimeNeededForRotationMs);a.addAnimator(d)}}}};CL3D.Action.ChangeSceneNodeScale=function(){this.Type="ChangeSceneNodeScale"};CL3D.Action.ChangeSceneNodeScale.prototype.execute=function(c,b){if(!c||!b){return}var a=null;if(this.ChangeCurrentSceneNode){a=c}else{if(this.SceneNodeToChangeScale!=-1){a=b.getSceneNodeFromId(this.SceneNodeToChangeScale)}}if(a){switch(this.ScaleChangeType){case 0:a.Scale=this.Vector.clone();break;case 1:a.Scale=a.Scale.multiplyWithVect(this.Vector);break}}};CL3D.Action.ChangeSceneNodeTexture=function(){this.Type="ChangeSceneNodeTexture"};CL3D.Action.ChangeSceneNodeTexture.prototype.execute=function(e,d){if(!e||!d){return}var a=null;if(this.ChangeCurrentSceneNode){a=e}else{if(this.SceneNodeToChange!=-1){a=d.getSceneNodeFromId(this.SceneNodeToChange)}}if(a){if(a.getType()=="2doverlay"){a.setShowImage(this.TheTexture)}else{var f=a.getMaterialCount();if(this.TextureChangeType==0){for(var c=0;c<f;++c){var b=a.getMaterial(c);b.Tex1=this.TheTexture}}else{if(this.TextureChangeType==1){var b=a.getMaterial(this.IndexToChange);b.Tex1=this.TheTexture}}}}};CL3D.Action.ExecuteJavaScript=function(){this.Type="ExecuteJavaScript"};CL3D.Action.ExecuteJavaScript.prototype.execute=function(currentNode,sceneManager){eval(this.JScript)};CL3D.Action.OpenWebpage=function(){this.Type="OpenWebpage"};CL3D.Action.OpenWebpage.prototype.execute=function(b,a){window.open(this.Webpage,this.Target)};CL3D.Action.SetSceneNodeAnimation=function(){this.Type="SetSceneNodeAnimation"};CL3D.Action.SetSceneNodeAnimation.prototype.execute=function(b,a){};CL3D.Action.SwitchToScene=function(a){this.Engine=a;this.Type="SwitchToScene"};CL3D.Action.SwitchToScene.prototype.execute=function(b,a){if(this.Engine){this.Engine.gotoSceneByName(this.SceneName,true)}};CL3D.Action.SetActiveCamera=function(a){this.Engine=a;this.Type="SetActiveCamera"};CL3D.Action.SetActiveCamera.prototype.execute=function(c,b){if(!c||!b){return}var a=null;if(this.CameraToSetActive!=-1){a=b.getSceneNodeFromId(this.CameraToSetActive)}if(a!=null){if(a.getType()=="camera"){if(this.Engine){this.Engine.setActiveCameraNextFrame(a)}}}};CL3D.Action.SetCameraTarget=function(){this.UseAnimatedMovement=false;this.TimeNeededForMovementMs=0;this.Type="SetCameraTarget"};CL3D.Action.SetCameraTarget.prototype.execute=function(f,e){if(!f||!e){return}var b=null;if(this.ChangeCurrentSceneNode){b=f}else{if(this.SceneNodeToChangePosition!=-1){b=e.getSceneNodeFromId(this.SceneNodeToChangePosition)}}var h=b;if(h.getType()!="camera"){return}var a=h.getTarget().clone();switch(this.PositionChangeType){case 0:a=this.Vector.clone();break;case 1:a=b.Pos.add(this.Vector);break;case 2:var d=null;if(this.RelativeToCurrentSceneNode){d=f}else{if(this.SceneNodeRelativeTo!=-1){d=e.getSceneNodeFromId(this.SceneNodeRelativeTo)}}if(d){a=d.Pos.add(this.Vector)}break}if(a!=null){if(this.UseAnimatedMovement&&this.TimeNeededForMovementMs>0){var g=new CL3D.AnimatorFlyStraight();g.Start=h.getTarget().clone();g.End=a;g.TimeForWay=this.TimeNeededForMovementMs;g.DeleteMeAfterEndReached=true;g.AnimateCameraTargetInsteadOfPosition=true;g.recalculateImidiateValues();b.addAnimator(g)}else{h.setTarget(a);var c=h.getAnimatorOfType("camerafps");if(c!=null){c.lookAt(a)}}}};CL3D.Action.Shoot=function(){this.ShootType=0;this.Damage=0;this.BulletSpeed=0;this.SceneNodeToUseAsBullet=-1;this.WeaponRange=100;this.Type="Shoot";this.SceneNodeToShootFrom=-1;this.ShootToCameraTarget=false;this.AdditionalDirectionRotation=null};CL3D.Action.Shoot.prototype.execute=function(d,a){if(!d||!a){return}var j=new CL3D.Line3d();var r=false;var i=null;var h=null;var e=a.getAllSceneNodesWithAnimator("gameai");if(this.SceneNodeToShootFrom!=-1){var k=a.getSceneNodeFromId(this.SceneNodeToShootFrom);if(k!=null){r=true;i=k;j.Start=k.getTransformedBoundingBox().getCenter();h=a.getActiveCamera();if(this.ShootToCameraTarget&&h){var c=new CL3D.Line3d();c.Start=h.getAbsolutePosition();c.End=h.getTarget();var b=c.getVector();b.setLength(this.WeaponRange);c.End=c.Start.add(b);this.shortenRayToClosestCollisionPointWithWorld(c,e,this.WeaponRange,a);this.shortenRayToClosestCollisionPointWithAIAnimator(c,e,this.WeaponRange,i,a);j.End=c.End}else{var t=k.AbsoluteTransformation;if(this.AdditionalDirectionRotation){var m=new CL3D.Matrix4();m.setRotationDegrees(this.AdditionalDirectionRotation);t=t.multiply(m)}j.End.set(1,0,0);t.rotateVect(j.End);j.End.addToThis(j.Start)}}}else{if(d!=null){var q=d.getAnimatorOfType("gameai");if(q&&q.isCurrentlyShooting()){j=q.getCurrentlyShootingLine();r=true}}}if(!r){h=a.getActiveCamera();if(h){j.Start=h.getAbsolutePosition();j.End=h.getTarget();r=true}}if(!r){return}var n=j.getVector();n.setLength(this.WeaponRange);j.End=j.Start.add(n);this.shortenRayToClosestCollisionPointWithWorld(j,e,this.WeaponRange,a);if(this.ShootType==1){var s=null;if(this.SceneNodeToUseAsBullet!=-1){s=a.getSceneNodeFromId(this.SceneNodeToUseAsBullet)}if(s){var g=s.createClone(a.getRootSceneNode());a.getRootSceneNode().addChild(g);if(g!=null){g.Pos=j.Start;g.updateAbsolutePosition();g.Visible=true;g.Id=-1;g.Name="";var p=this.BulletSpeed;if(p==0){p=1}var o=new CL3D.AnimatorFlyStraight();o.Start=j.Start;o.End=j.End;o.TimeForWay=j.getLength()/p;o.DeleteMeAfterEndReached=true;o.recalculateImidiateValues();o.TestShootCollisionWithBullet=true;o.ShootCollisionNodeToIgnore=d;o.ShootCollisionDamage=this.Damage;o.DeleteSceneNodeAfterEndReached=true;g.addAnimator(o)}}}else{if(this.ShootType==0){var u=this.WeaponRange;var l=this.shortenRayToClosestCollisionPointWithAIAnimator(j,e,this.WeaponRange,i,a);if(l!=null){var f=l.getAnimatorOfType("gameai");if(f){f.OnHit(this.Damage,l)}}}}};CL3D.Action.Shoot.prototype.shortenRayToClosestCollisionPointWithWorld=function(c,h,b,f){if(h.length!=0){var e=h[0].getAnimatorOfType("gameai");if(e){var g=e.World;if(g){var a=CL3D.AnimatorOnClick.prototype.static_getDistanceToNearestCollisionPointWithWorld(f,c.Start,c.End,g,true);if(a<b){var d=c.getVector();d.setLength(a);c.End=c.Start.add(d)}}}}};CL3D.Action.Shoot.prototype.shortenRayToClosestCollisionPointWithAIAnimator=function(h,l,b,a,j){var e=b;var f=null;for(var d=0;d<l.length;++d){if(l[d]===a){continue}var k=l[d].getAnimatorOfType("gameai");if(k&&!k.isAlive()){continue}var g=new Object();g.N=0;if(CL3D.AnimatorOnClick.prototype.static_getCollisionDistanceWithNode(j,l[d],h,false,false,null,g)){if(g.N<e){e=g.N;f=l[d]}}}if(f){var c=h.getVector();c.setLength(e);h.End=h.Start.add(c)}return f};CL3D.Action.Shoot.prototype.getWeaponRange=function(){return this.WeaponRange};CL3D.Action.SetOrChangeAVariable=function(){this.Type="SetOrChangeAVariable"};CL3D.Action.SetOrChangeAVariable.prototype.execute=function(d,c){if(!d||!c){return}if(this.VariableName==null){return}var f=CL3D.CopperCubeVariable.getVariable(this.VariableName,true);if(f==null){return}var e=null;if(this.ValueType==1){e=CL3D.CopperCubeVariable.getVariable(this.Value);if(e==null){return}}if(e==null){e=new CL3D.CopperCubeVariable();e.setValueAsString(this.Value)}switch(this.Operation){case 0:f.setAsCopy(e);break;case 1:f.setValueAsFloat(f.getValueAsFloat()+e.getValueAsFloat());break;case 2:f.setValueAsFloat(f.getValueAsFloat()-e.getValueAsFloat());break;case 3:var b=e.getValueAsFloat();f.setValueAsFloat((b!=0)?(f.getValueAsFloat()/b):0);break;case 4:var a=e.getValueAsFloat();f.setValueAsInt((a!=0)?Math.floor(f.getValueAsFloat()/a):0);break;case 5:f.setValueAsFloat(f.getValueAsFloat()*e.getValueAsFloat());break;case 6:f.setValueAsInt(Math.floor(f.getValueAsFloat()*e.getValueAsFloat()));break}};CL3D.Action.IfVariable=function(){this.Type="IfVariable"};CL3D.Action.IfVariable.prototype.execute=function(b,a){if(!b||!a){return}if(this.VariableName==null){return}var e=CL3D.CopperCubeVariable.getVariable(this.VariableName,true);if(e==null){return}var d=null;if(this.ValueType==1){d=CL3D.CopperCubeVariable.getVariable(this.Value);if(d==null){return}}if(d==null){d=new CL3D.CopperCubeVariable();d.setValueAsString(this.Value)}var c=false;switch(this.ComparisonType){case 0:case 1:if(e.isString()&&d.isString()){c=e.getValueAsString()==d.getValueAsString()}else{c=CL3D.equals(e.getValueAsFloat(),d.getValueAsFloat())}if(this.ComparisonType==1){c=!c}break;case 2:c=e.getValueAsFloat()>d.getValueAsFloat();break;case 3:c=e.getValueAsFloat()<d.getValueAsFloat();break}if(c){if(this.TheActionHandler){this.TheActionHandler.execute(b)}}};CL3D.Action.RestartBehaviors=function(){this.SceneNodeToRestart=null;this.ChangeCurrentSceneNode=false;this.Type="RestartBehaviors"};CL3D.Action.RestartBehaviors.prototype.execute=function(f,e){if(!f||!e){return}var b=null;if(this.ChangeCurrentSceneNode){b=f}else{if(this.SceneNodeToRestart!=-1){b=e.getSceneNodeFromId(this.SceneNodeToRestart)}}if(b){for(var d=0;d<b.Animators.length;++d){var c=b.Animators[d];if(c!=null){c.reset()}}}};CL3D.ActionHandler=function(a){this.Actions=new Array();this.SMGr=a};CL3D.ActionHandler.prototype.execute=function(b,c){for(var a=0;a<this.Actions.length;++a){this.Actions[a].execute(b,this.SMGr)}};CL3D.ActionHandler.prototype.addAction=function(b){if(b==null){return}this.Actions.push(b)};CL3D.ActionHandler.prototype.findAction=function(d){for(var c=0;c<this.Actions.length;++c){var b=this.Actions[c];if(b.Type==d){return b}}return null};CL3D.Material=function(){this.Type=0;this.Tex1=null;this.Tex2=null;this.ZWriteEnabled=true;this.ClampTexture1=false;this.Lighting=false};CL3D.Material.prototype.setFrom=function(a){if(!a){return}this.Type=a.Type;this.ZWriteEnabled=a.ZWriteEnabled;this.Tex1=a.Tex1;this.Tex2=a.Tex2;this.ClampTexture1=a.ClampTexture1;this.Lighting=a.Lighting};CL3D.Material.prototype.clone=function(){var a=new CL3D.Material();a.Type=this.Type;a.ZReadEnabled=this.ZReadEnabled;a.ZWriteEnabled=this.ZWriteEnabled;a.Tex1=this.Tex1;a.Tex2=this.Tex2;a.ClampTexture1=this.ClampTexture1;a.Lighting=this.Lighting;return a};CL3D.Material.prototype.isTransparent=function(){return this.Type==CL3D.Material.EMT_TRANSPARENT_ADD_COLOR||this.Type==CL3D.Material.EMT_TRANSPARENT_ALPHA_CHANNEL||this.Type==CL3D.Material.EMT_TRANSPARENT_REFLECTION_2_LAYER};CL3D.Material.prototype.Type=0;CL3D.Material.prototype.Tex1=null;CL3D.Material.prototype.Tex2=null;CL3D.Material.prototype.ZWriteEnabled=true;CL3D.Material.prototype.ZReadEnabled=true;CL3D.Material.prototype.ClampTexture1=false;CL3D.Material.EMT_SOLID=0;CL3D.Material.EMT_LIGHTMAP=2;CL3D.Material.EMT_REFLECTION_2_LAYER=11;CL3D.Material.EMT_TRANSPARENT_ADD_COLOR=12;CL3D.Material.EMT_TRANSPARENT_ALPHA_CHANNEL=13;CL3D.Material.EMT_TRANSPARENT_REFLECTION_2_LAYER=16;CL3D.MeshBuffer=function(){this.Box=new CL3D.Box3d();this.Mat=new CL3D.Material();this.Indices=new Array();this.Vertices=new Array();this.RendererNativeArray=null};CL3D.MeshBuffer.prototype.Box=null;CL3D.MeshBuffer.prototype.Mat=null;CL3D.MeshBuffer.prototype.Indices=null;CL3D.MeshBuffer.prototype.Vertices=null;CL3D.MeshBuffer.prototype.RendererNativeArray=null;CL3D.MeshBuffer.prototype.update=function(){this.RendererNativeArray=null};CL3D.MeshBuffer.prototype.recalculateBoundingBox=function(){if(!this.Vertices||this.Vertices.length==0){this.Box.reset(0,0,0)}else{var a=this.Vertices[0];this.Box.MinEdge=a.Pos.clone();this.Box.MaxEdge=a.Pos.clone();for(var b=1;b<this.Vertices.length;++b){a=this.Vertices[b];this.Box.addInternalPointByVector(a.Pos)}}};CL3D.MeshBuffer.prototype.createClone=function(){var a=new CL3D.MeshBuffer();a.Box=this.Box.clone();a.Mat=this.Mat.clone();if(this.Vertices){for(var b=0;b<this.Vertices.length;++b){a.Vertices.push(this.Vertices[b])}}if(this.Indices){for(var b=0;b<this.Indices.length;++b){a.Indices.push(this.Indices[b])}}return a};CL3D.Mesh=function(){this.Box=new CL3D.Box3d();this.MeshBuffers=new Array()};CL3D.Mesh.prototype.AddMeshBuffer=function(a){this.MeshBuffers.push(a)};CL3D.Mesh.prototype.GetMeshBuffers=function(){return this.MeshBuffers};CL3D.Mesh.prototype.GetPolyCount=function(){var b=0;if(this.MeshBuffers){for(var a=0;a<this.MeshBuffers.length;++a){if(this.MeshBuffers[a].Indices){b+=this.MeshBuffers[a].Indices.length}}}return b/3};CL3D.Mesh.prototype.createClone=function(){var a=new CL3D.Mesh();a.Box=this.Box.clone();if(this.MeshBuffers){for(var b=0;b<this.MeshBuffers.length;++b){if(this.MeshBuffers[b]){a.MeshBuffers.push(this.MeshBuffers[b].createClone())}}}return a};CL3D.MeshCache=function(){this.Meshes=new Array()};CL3D.MeshCache.prototype.getMeshFromName=function(a){for(var c=0;c<this.Meshes.length;++c){var b=this.Meshes[c];if(b.Name==a){return b}}return null};CL3D.MeshCache.prototype.addMesh=function(a){if(a!=null){this.Meshes.push(a)}};CL3D.SkinnedMeshJoint=function(){this.Name="";this.LocalMatrix=new CL3D.Matrix4();this.Children=new Array();this.AttachedMeshes=new Array();this.PositionKeys=new Array();this.ScaleKeys=new Array();this.RotationKeys=new Array();this.Weights=new Array();this.GlobalMatrix=new CL3D.Matrix4();this.GlobalAnimatedMatrix=new CL3D.Matrix4();this.LocalAnimatedMatrix=new CL3D.Matrix4();this.Animatedposition=new CL3D.Vect3d(0,0,0);this.Animatedscale=new CL3D.Vect3d(1,1,1);this.Animatedrotation=new CL3D.Quaternion();this.GlobalInversedMatrix=new CL3D.Matrix4();this.GlobalSkinningSpace=false;this.positionHint=-1;this.scaleHint=-1;this.rotationHint=-1};CL3D.SkinnedMeshWeight=function(){this.buffer_id=0;this.vertex_id=0;this.strength=0;this.StaticPos=new CL3D.Vect3d();this.StaticNormal=new CL3D.Vect3d()};CL3D.SkinnedMeshScaleKey=function(){this.frame=0;this.scale=new CL3D.Vect3d()};CL3D.SkinnedMeshPositionKey=function(){this.frame=0;this.position=new CL3D.Vect3d()};CL3D.SkinnedMeshRotationKey=function(){this.frame=0;this.rotation=new CL3D.Quaternion()};CL3D.NamedAnimationRange=function(){this.Name="";this.Begin=0;this.End=0;this.FPS=0};CL3D.NamedAnimationRange.prototype.Name="";CL3D.NamedAnimationRange.prototype.Begin=0;CL3D.NamedAnimationRange.prototype.End=0;CL3D.NamedAnimationRange.prototype.FPS=0;CL3D.SkinnedMesh=function(){this.Name="";this.AnimatedMeshesToLink=new Array();this.AnimationFrames=0;this.LocalBuffers=new Array();this.AllJoints=new Array();this.RootJoints=new Array();this.DefaultFPS=0;this.HasAnimation=false;this.PreparedForSkinning=false;this.LastAnimatedFrame=0;this.LastSkinnedFrame=0;this.BoneControlUsed=0;this.BoundingBox=new CL3D.Box3d();this.InterpolationMode=1;this.AnimateNormals=false;this.Vertices_Moved=new Array();this.NamedAnimationRanges=new Array()};CL3D.SkinnedMesh.prototype.AddMeshBuffer=function(a){this.LocalBuffers.push(a)};CL3D.SkinnedMesh.prototype.getFrameCount=function(){return Math.floor(this.AnimationFrames)};CL3D.SkinnedMesh.prototype.getBoundingBox=function(){return this.BoundingBox};CL3D.SkinnedMesh.prototype.finalize=function(){this.LastAnimatedFrame=-1;this.LastSkinnedFrame=-1;var g=0;var f=0;var h;var d;for(var k=0;k<this.AllJoints.length;++k){var m=false;for(g=0;g<this.AllJoints.length;++g){d=this.AllJoints[g];for(var c=0;c<d.Children.length;++c){if(d.Children[c]===this.AllJoints[k]){m=true}}}if(!m){this.RootJoints.push(this.AllJoints[k])}}for(g=0;g<this.LocalBuffers.length;++g){var b=new Array();this.Vertices_Moved.push(b);h=this.LocalBuffers[g];var a=h.Vertices.length;for(var l=0;l<a;++l){b.push(false)}}this.checkForAnimation();this.CalculateGlobalMatrices(null,null);for(g=0;g<this.AllJoints.length;++g){d=this.AllJoints[g];for(f=0;f<d.AttachedMeshes.length;++f){h=this.LocalBuffers[d.AttachedMeshes[f]];h.Transformation=d.GlobalAnimatedMatrix.clone()}}if(this.LocalBuffers.length==0){this.BoundingBox.MinEdge.set(0,0,0);this.BoundingBox.MaxEdge.set(0,0,0)}else{h=this.LocalBuffers[0];this.BoundingBox.MinEdge=h.Box.MinEdge.clone();this.BoundingBox.MaxEdge=h.Box.MaxEdge.clone();for(g=1;g<this.LocalBuffers.length;++g){h=this.LocalBuffers[g];if(h.Transformation==null){this.BoundingBox.addInternalPointByVector(h.Box.MinEdge);this.BoundingBox.addInternalPointByVector(h.Box.MaxEdge)}else{var e=h.Box.clone();h.Transformation.transformBoxEx(e);this.BoundingBox.addInternalPointByVector(e.MinEdge);this.BoundingBox.addInternalPointByVector(e.MaxEdge)}}}};CL3D.SkinnedMesh.prototype.checkForAnimation=function(){this.HasAnimation=false;var f=0;var e=0;var g;var c;for(f=0;f<this.AllJoints.length;++f){c=this.AllJoints[f];if(c.PositionKeys.length||c.ScaleKeys.length||c.RotationKeys.length||c.Weights.length){this.HasAnimation=true;break}}if(this.HasAnimation){this.AnimationFrames=0;for(f=0;f<this.AllJoints.length;++f){c=this.AllJoints[f];if(c.PositionKeys.length){var h=c.PositionKeys[c.PositionKeys.length-1];if(h.frame>this.AnimationFrames){this.AnimationFrames=h.frame}}if(c.ScaleKeys.length){var l=c.ScaleKeys[c.ScaleKeys.length-1];if(l.frame>this.AnimationFrames){this.AnimationFrames=l.frame}}if(c.RotationKeys.length){var m=c.RotationKeys[c.RotationKeys.length-1];if(m.frame>this.AnimationFrames){this.AnimationFrames=m.frame}}}}if(this.HasAnimation&&!this.PreparedForSkinning){this.PreparedForSkinning=true;for(f=0;f<this.AllJoints.length;++f){c=this.AllJoints[f];for(e=0;e<c.Weights.length;++e){var k=c.Weights[e];var d=k.buffer_id;var b=k.vertex_id;g=this.LocalBuffers[d];var a=g.Vertices[b];k.StaticPos=a.Pos.clone();k.StaticNormal=a.Normal.clone()}}}};CL3D.SkinnedMesh.prototype.CalculateGlobalMatrices=function(d,c){if(d==null&&c!=null){return}if(d==null){for(var b=0;b<this.RootJoints.length;++b){this.CalculateGlobalMatrices(this.RootJoints[b],null)}return}if(c==null){d.GlobalMatrix=d.LocalMatrix.clone()}else{d.GlobalMatrix=c.GlobalMatrix.multiply(d.LocalMatrix)}d.LocalAnimatedMatrix=d.LocalMatrix.clone();d.GlobalAnimatedMatrix=d.GlobalMatrix.clone();if(d.GlobalInversedMatrix.isIdentity()){d.GlobalInversedMatrix=d.GlobalMatrix.clone();d.GlobalInversedMatrix.makeInverse()}for(var a=0;a<d.Children.length;++a){this.CalculateGlobalMatrices(d.Children[a],d)}};CL3D.SkinnedMesh.prototype.animateMesh=function(g,b){if(b==null){b=1}if(!this.HasAnimation||this.LastAnimatedFrame==g){return false}this.LastAnimatedFrame=g;if(b<=0){return false}for(var d=0;d<this.AllJoints.length;++d){var e=this.AllJoints[d];var a=e.Animatedposition.clone();var f=e.Animatedscale.clone();var c=e.Animatedrotation.clone();this.getFrameData(g,e,a,e.positionHint,f,e.scaleHint,c,e.rotationHint);e.Animatedposition=a.clone();e.Animatedscale=f.clone();e.Animatedrotation=c.clone()}this.buildAll_LocalAnimatedMatrices();return true};CL3D.SkinnedMesh.prototype.getFrameData=function(n,x,v,l,w,r,o,h){var s=-1;var m=-1;var d=-1;var c=x.PositionKeys;var t=x.ScaleKeys;var a=x.RotationKeys;var g;var b;var q;var p;var k;var j;if(c.length){s=-1;if(s==-1){for(p=0;p<c.length;++p){g=c[p];if(g.frame>=n){s=p;l=p;break}}}if(s!=-1){if(this.InterpolationMode==0||s==0){g=c[s];v=g.position.clone()}else{if(this.InterpolationMode==1){g=c[s];var f=c[s-1];k=n-g.frame;j=f.frame-n;v.setTo(f.position.substract(g.position).multiplyThisWithScalReturnMe(1/(k+j)).multiplyThisWithScalReturnMe(k).addToThisReturnMe(g.position))}}}}if(t.length){m=-1;if(m==-1){for(p=0;p<t.length;++p){b=t[p];if(b.frame>=n){m=p;r=p;break}}}if(m!=-1){if(this.InterpolationMode==0||m==0){b=t[m];w=b.scale.clone()}else{if(this.InterpolationMode==1){b=t[m];var u=t[m-1];k=n-b.frame;j=u.frame-n;w.setTo(u.scale.substract(b.scale).multiplyThisWithScalReturnMe(1/(k+j)).multiplyThisWithScalReturnMe(k).addToThisReturnMe(b.scale))}}}}if(a.length){d=-1;if(d==-1){for(p=0;p<a.length;++p){q=a[p];if(q.frame>=n){d=p;h=p;break}}}if(d!=-1){if(this.InterpolationMode==0||d==0){q=a[d];o=q.rotation.clone()}else{if(this.InterpolationMode==1){q=a[d];var e=a[d-1];k=n-q.frame;j=e.frame-n;o.slerp(q.rotation,e.rotation,k/(k+j))}}}}};CL3D.SkinnedMesh.prototype.buildAll_LocalAnimatedMatrices=function(){for(var b=0;b<this.AllJoints.length;++b){var d=this.AllJoints[b];if(d.PositionKeys.length||d.ScaleKeys.length||d.RotationKeys.length){if(!d.Animatedrotation){d.Animatedrotation=new CL3D.Quaternion()}if(!d.Animatedposition){d.Animatedposition=new CL3D.Vect3d()}d.LocalAnimatedMatrix=d.Animatedrotation.getMatrix();var a=d.LocalAnimatedMatrix;var c=d.Animatedposition;a.m00+=c.X*a.m03;a.m01+=c.Y*a.m03;a.m02+=c.Z*a.m03;a.m04+=c.X*a.m07;a.m05+=c.Y*a.m07;a.m06+=c.Z*a.m07;a.m08+=c.X*a.m11;a.m09+=c.Y*a.m11;a.m10+=c.Z*a.m11;a.m12+=c.X*a.m15;a.m13+=c.Y*a.m15;a.m14+=c.Z*a.m15;a.bIsIdentity=false;d.GlobalSkinningSpace=false;if(d.ScaleKeys.length&&d.Animatedscale&&!d.Animatedscale.equalsByNumbers(1,1,1)){c=d.Animatedscale;a.m00*=c.X;a.m01*=c.X;a.m02*=c.X;a.m03*=c.X;a.m04*=c.Y;a.m05*=c.Y;a.m06*=c.Y;a.m07*=c.Y;a.m08*=c.Z;a.m09*=c.Z;a.m10*=c.Z;a.m11*=c.Z}}else{d.LocalAnimatedMatrix=d.LocalMatrix.clone()}}};CL3D.SkinnedMesh.prototype.updateBoundingBox=function(){this.BoundingBox.MinEdge.set(0,0,0);this.BoundingBox.MaxEdge.set(0,0,0);if(this.LocalBuffers.length){var a=this.LocalBuffers[0];a.recalculateBoundingBox();this.BoundingBox.MinEdge=a.Box.MinEdge.clone();this.BoundingBox.MaxEdge=a.Box.MaxEdge.clone();for(var c=1;c<this.LocalBuffers.length;++c){a=this.LocalBuffers[c];a.recalculateBoundingBox();if(a.Transformation==null){this.BoundingBox.addInternalPointByVector(a.Box.MinEdge);this.BoundingBox.addInternalPointByVector(a.Box.MaxEdge)}else{var b=a.Box.clone();a.Transformation.transformBoxEx(b);this.BoundingBox.addInternalPointByVector(b.MinEdge);this.BoundingBox.addInternalPointByVector(b.MaxEdge)}}}};CL3D.SkinnedMesh.prototype.buildAll_GlobalAnimatedMatrices=function(e,d){if(e==null){for(var c=0;c<this.RootJoints.length;++c){var a=this.RootJoints[c];this.buildAll_GlobalAnimatedMatrices(a,null)}return}else{if(d==null||e.GlobalSkinningSpace){e.GlobalAnimatedMatrix=e.LocalAnimatedMatrix.clone()}else{e.GlobalAnimatedMatrix=d.GlobalAnimatedMatrix.multiply(e.LocalAnimatedMatrix)}}for(var b=0;b<e.Children.length;++b){this.buildAll_GlobalAnimatedMatrices(e.Children[b],e)}};CL3D.SkinnedMesh.prototype.skinMesh=function(){if(!this.HasAnimation){return}this.buildAll_GlobalAnimatedMatrices(null,null);var e=0;var d=0;var b;for(e=0;e<this.AllJoints.length;++e){var f=this.AllJoints[e];for(d=0;d<f.AttachedMeshes.length;++d){b=this.LocalBuffers[f.AttachedMeshes[d]];b.Transformation=f.GlobalAnimatedMatrix.clone()}}for(e=0;e<this.LocalBuffers.length;++e){var c=this.Vertices_Moved[e];for(d=0;d<c.length;++d){c[d]=false}}for(e=0;e<this.RootJoints.length;++e){var a=this.RootJoints[e];this.skinJoint(a,null)}};CL3D.SkinnedMesh.prototype.skinJoint=function(e,b){if(e.Weights.length){var m=e.GlobalAnimatedMatrix.multiply(e.GlobalInversedMatrix);var d=new CL3D.Vect3d();var c=new CL3D.Vect3d();var f=this.LocalBuffers;var l;var a;for(var h=0;h<e.Weights.length;++h){var k=e.Weights[h];m.transformVect2(d,k.StaticPos);if(this.AnimateNormals){m.rotateVect2(c,k.StaticNormal)}l=f[k.buffer_id];a=l.Vertices[k.vertex_id];if(!this.Vertices_Moved[k.buffer_id][k.vertex_id]){this.Vertices_Moved[k.buffer_id][k.vertex_id]=true;a.Pos=d.multiplyWithScal(k.strength);if(this.AnimateNormals){a.Normal=c.multiplyWithScal(k.strength)}}else{a.Pos.addToThis(d.multiplyWithScal(k.strength));if(this.AnimateNormals){a.Normal+=c.multiplyWithScal(k.strength)}}}}for(var g=0;g<e.Children.length;++g){this.skinJoint(e.Children[g],e)}};CL3D.SkinnedMesh.prototype.getNamedAnimationRangeByName=function(e){if(!e){return null}var b=this.NamedAnimationRanges.length;var c=e.toLowerCase();for(var a=0;a<b;++a){var d=this.NamedAnimationRanges[a];if(d.Name&&d.Name.toLowerCase()==c){return d}}return null};CL3D.SkinnedMesh.prototype.addNamedAnimationRange=function(a){this.NamedAnimationRanges.push(a)};CL3D.TextureManager=function(){this.Textures=new Array();this.TheRenderer=null;this.PathRoot=""};CL3D.TextureManager.prototype.getTexture=function(b,a){if(b==null||b==""){return null}var c=this.getTextureFromName(b);if(c!=null){return c}if(a){c=new CL3D.Texture();c.Name=b;this.addTexture(c);var d=this;c.Image=new Image();c.Image.onload=function(){d.onTextureLoaded(c)};c.Image.src=c.Name;return c}return null};CL3D.TextureManager.prototype.getTextureCount=function(){return this.Textures.length};CL3D.TextureManager.prototype.onTextureLoaded=function(a){var b=this.TheRenderer;if(b==null){return}b.finalizeLoadedImageTexture(a);a.Loaded=true};CL3D.TextureManager.prototype.getCountOfTexturesToLoad=function(){var a=0;for(var c=0;c<this.Textures.length;++c){var b=this.Textures[c];if(b.Loaded==false){++a}}return a};CL3D.TextureManager.prototype.getTextureFromName=function(a){for(var c=0;c<this.Textures.length;++c){var b=this.Textures[c];if(b.Name==a){return b}}return null};CL3D.TextureManager.prototype.addTexture=function(a){if(a!=null){if(this.getTextureFromName(a.Name)!=null){CL3D.gCCDebugOutput.print("ERROR! Cannot add the texture multiple times: "+a.Name)}this.Textures.push(a)}};CL3D.BinaryStream=function(a){this._buffer=a;this._length=a.length;this._offset=0;this._bitBuffer=null;this._bitOffset=8;this.bigEndian=false};CL3D.BinaryStream.prototype.bytesAvailable=function(){return this._length-this._offset};CL3D.BinaryStream.prototype.getPosition=function(){return this._offset};CL3D.BinaryStream.prototype.readInt=function(){return this.readSI32()};CL3D.BinaryStream.prototype.readByte=function(){return this.readSI8()};CL3D.BinaryStream.prototype.readByteAt=function(a){return this._buffer.charCodeAt(a)&255};CL3D.BinaryStream.prototype.readBoolean=function(){return this.readSI8()!=0};CL3D.BinaryStream.prototype.readShort=function(){return this.readUnsignedShort()};CL3D.BinaryStream.prototype.readNumber=function(a){var c=0;var d=this._offset;var b=d+a;while(b>d){c=c*256+this.readByteAt(--b)}this._offset+=a;return c};CL3D.BinaryStream.prototype.readSNumber=function(b){var c=this.readNumber(b);var a=1<<(b*8-1);if(c&a){c=(~c+1)*-1}return c};CL3D.BinaryStream.prototype.readUnsignedShort=function(){return this.readUI16()};CL3D.BinaryStream.prototype.readUnsignedInt=function(){return this.readUI32()};CL3D.BinaryStream.prototype.readSI8=function(){return this.readSNumber(1)};CL3D.BinaryStream.prototype.readSI16=function(){return this.readSNumber(2)};CL3D.BinaryStream.prototype.readSI32=function(){return this.readSNumber(4)};CL3D.BinaryStream.prototype.readUI8=function(){return this.readNumber(1)};CL3D.BinaryStream.prototype.readUI16=function(){return this.readNumber(2)};CL3D.BinaryStream.prototype.readUI24=function(){return this.readNumber(3)};CL3D.BinaryStream.prototype.readUI32=function(){return this.readNumber(4)};CL3D.BinaryStream.prototype.readFixed=function(){return this._readFixedPoint(32,16)};CL3D.BinaryStream.prototype.readFixed8=function(){return this._readFixedPoint(16,8)};CL3D.BinaryStream.prototype._readFixedPoint=function(c,a){var b=this.readSB(c);b=b*Math.pow(2,-a);return b};CL3D.BinaryStream.prototype.readFloat16=function(){return this.decodeFloat32fast(5,10)};CL3D.BinaryStream.prototype.readFloat=function(){var a=this.decodeFloat32fast(this._buffer,this._offset);this._offset+=4;return a};CL3D.BinaryStream.prototype.readDouble=function(){var a=this._buffer.substring(this._offset,this._offset+8);var b=this.decodeFloat(a,52,11);this._offset+=8;return b};CL3D.BinaryStream.prototype.decodeFloat32fast=function(d,c){var h=d.charCodeAt(c+3)&255,g=d.charCodeAt(c+2)&255,f=d.charCodeAt(c+1)&255,e=d.charCodeAt(c+0)&255;var a=1-(2*(h>>7));var b=(((h<<1)&255)|(g>>7))-127;var i=((g&127)<<16)|(f<<8)|e;if(i==0&&b==-127){return 0}return a*(1+i*Math.pow(2,-23))*Math.pow(2,b)};CL3D.BinaryStream.prototype.decodeFloat=function(f,c,n){var l=((l=new this.Buffer(this.bigEndian,f)),l),g=Math.pow(2,n-1)-1,j=l.readBits(c+n,1),k=l.readBits(c,n),i=0,d=2,a=l.buffer.length+(-c>>3)-1,e,h,m;do{for(e=l.buffer[++a],h=c%8||8,m=1<<h;m>>=1;(e&m)&&(i+=1/d),d*=2){}}while(c-=h);return k==(g<<1)+1?i?NaN:j?-Infinity:+Infinity:(1+j*-2)*(k||i?!k?Math.pow(2,-g+1)*i:Math.pow(2,k-g)*(1+i):0)};CL3D.BinaryStream.prototype.Buffer=function(b,a){this.bigEndian=b||0,this.buffer=[],this.setBuffer(a)};CL3D.BinaryStream.prototype.Buffer.prototype.readBits=function(b,d){function c(k,j){for(++j;--j;k=((k%=2147483647+1)&1073741824)==1073741824?k*2:(k-1073741824)*2+2147483647+1){}return k}if(b<0||d<=0){return 0}for(var e,f=b%8,a=this.buffer.length-(b>>3)-1,i=this.buffer.length+(-(b+d)>>3),h=a-i,g=((this.buffer[a]>>f)&((1<<(h?8-f:d))-1))+(h&&(e=(b+d)%8)?(this.buffer[i++]&((1<<e)-1))<<(h--<<3)-f:0);h;g+=c(this.buffer[i++],(h--<<3)-f)){}return g};CL3D.BinaryStream.prototype.Buffer.prototype.setBuffer=function(e){if(e){for(var c,d=c=e.length,a=this.buffer=new Array(c);d;a[c-d]=e.charCodeAt(--d)){}this.bigEndian&&a.reverse()}};CL3D.BinaryStream.prototype.Buffer.prototype.hasNeededBits=function(a){return this.buffer.length>=-(-a>>3)};CL3D.BinaryStream.prototype.readSB=function(c){var b=this.readUB(c);var a=1<<(c-1);if(b&a){b-=Math.pow(2,c)}return b};CL3D.BinaryStream.prototype.readUB=function(e){var d=0;var c=this;var b=e;while(b--){if(c._bitOffset==8){c._bitBuffer=c.readUI8();c._bitOffset=0}var a=128>>c._bitOffset;d=d*2+(c._bitBuffer&a?1:0);c._bitOffset++}return d};CL3D.BinaryStream.prototype.readFB=function(a){return this._readFixedPoint(a,16)};CL3D.BinaryStream.prototype.readString=function(d){var c=[];var a=d||this._length-this._offset;while(a--){var b=this.readNumber(1);if(d||b){c.push(String.fromCharCode(b))}else{break}}return c.join("")};CL3D.BinaryStream.prototype.readBool=function(a){return !!this.readUB(a||1)};CL3D.BinaryStream.prototype.tell=function(){return this._offset};CL3D.BinaryStream.prototype.seek=function(a,b){this._offset=(b?0:this._offset)+a;return this};CL3D.BinaryStream.prototype.reset=function(){this._offset=0;return this};CL3D.Renderer=function(){this.canvas=null;this.gl=null;this.width=0;this.height=0;this.textureWasLoadedFlag=false;this.Projection=new CL3D.Matrix4();this.View=new CL3D.Matrix4();this.World=new CL3D.Matrix4();this.programStandardMaterial=null;this.programLightmapMaterial=null;this.MaterialPrograms=new Array();this.MinExternalMaterialTypeId=20;this.Program2DDrawingColorOnly=null;this.Program2DDrawingTextureOnly=null;this.Program2DDrawingCanvasFontColor=null;this.OnChangeMaterial=null;this.StaticBillboardMeshBuffer=null;this.currentGLProgram=null;this.firefox5BugPrinted=false};CL3D.Renderer.prototype.OnChangeMaterial=null;CL3D.Renderer.prototype.getWidth=function(){return this.width};CL3D.Renderer.prototype.getAndResetTextureWasLoadedFlag=function(){var a=this.textureWasLoadedFlag;this.textureWasLoadedFlag=false;return a};CL3D.Renderer.prototype.getWebGL=function(){return this.gl};CL3D.Renderer.prototype.getHeight=function(){return this.height};CL3D.Renderer.prototype.registerFrame=function(){};CL3D.Renderer.prototype.drawMesh=function(c){if(c==null){return}for(var b=0;b<c.MeshBuffers.length;++b){var a=c.MeshBuffers[b];this.setMaterial(a.Mat);this.drawMeshBuffer(a)}};CL3D.Renderer.prototype.setMaterial=function(b){if(b==null){return}var d=this.gl;if(d==null){return}var a=null;try{a=this.MaterialPrograms[b.Type]}catch(c){}if(a){this.currentGLProgram=a;d.useProgram(a);if(this.OnChangeMaterial!=null){try{this.OnChangeMaterial(b.Type)}catch(c){}}if(a.blendenabled){d.enable(d.BLEND);d.blendFunc(a.blendsfactor,a.blenddfactor)}else{d.disable(d.BLEND)}if(!b.ZWriteEnabled||b.isTransparent()){d.depthMask(false)}else{d.depthMask(true)}if(b.ZReadEnabled){d.enable(d.DEPTH_TEST)}else{d.disable(d.DEPTH_TEST)}}if(b.Tex1&&b.Tex1.Loaded){d.activeTexture(d.TEXTURE0);d.bindTexture(d.TEXTURE_2D,b.Tex1.Texture);d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_S,b.ClampTexture1?d.CLAMP_TO_EDGE:d.REPEAT);d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_T,b.ClampTexture1?d.CLAMP_TO_EDGE:d.REPEAT)}else{d.activeTexture(d.TEXTURE0);d.bindTexture(d.TEXTURE_2D,null)}if(a){d.uniform1i(d.getUniformLocation(a,"texture1"),0)}if(b.Tex2&&b.Tex2.Loaded){d.activeTexture(d.TEXTURE1);d.bindTexture(d.TEXTURE_2D,b.Tex2.Texture)}else{d.activeTexture(d.TEXTURE1);d.bindTexture(d.TEXTURE_2D,null)}if(a){d.uniform1i(d.getUniformLocation(a,"texture2"),1)}};CL3D.Renderer.prototype.drawMeshBuffer=function(a){if(a==null){return}if(this.gl==null){return}if(a.RendererNativeArray==null){var g=this.gl;var f=new Object();var h=a.Vertices.length;var k=new WebGLFloatArray(h*3);var b=new WebGLFloatArray(h*3);var l=new WebGLFloatArray(h*2);var c=new WebGLFloatArray(h*2);var p=new WebGLFloatArray(h*3);for(var e=0;e<h;++e){var o=a.Vertices[e];k[e*3+0]=o.Pos.X;k[e*3+1]=o.Pos.Y;k[e*3+2]=o.Pos.Z;b[e*3+0]=o.Normal.X;b[e*3+1]=o.Normal.Y;b[e*3+2]=o.Normal.Z;l[e*2+0]=o.TCoords.X;l[e*2+1]=o.TCoords.Y;c[e*2+0]=o.TCoords2.X;c[e*2+1]=o.TCoords2.Y;p[e*3+0]=CL3D.getRed(o.Color)/255;p[e*3+1]=CL3D.getGreen(o.Color)/255;p[e*3+2]=CL3D.getBlue(o.Color)/255}var m=a.Indices.length;var n=new WebGLUnsignedShortArray(m);for(var d=0;d<m;d+=3){n[d+0]=a.Indices[d+0];n[d+1]=a.Indices[d+2];n[d+2]=a.Indices[d+1]}f.positionBuffer=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,f.positionBuffer);g.bufferData(g.ARRAY_BUFFER,k,g.STATIC_DRAW);f.texcoordsBuffer=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,f.texcoordsBuffer);g.bufferData(g.ARRAY_BUFFER,l,g.STATIC_DRAW);f.texcoordsBuffer2=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,f.texcoordsBuffer2);g.bufferData(g.ARRAY_BUFFER,c,g.STATIC_DRAW);f.normalBuffer=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,f.normalBuffer);g.bufferData(g.ARRAY_BUFFER,b,g.STATIC_DRAW);g.bindBuffer(g.ARRAY_BUFFER,null);f.colorBuffer=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,f.colorBuffer);g.bufferData(g.ARRAY_BUFFER,p,g.STATIC_DRAW);g.bindBuffer(g.ARRAY_BUFFER,null);f.indexBuffer=g.createBuffer();g.bindBuffer(g.ELEMENT_ARRAY_BUFFER,f.indexBuffer);g.bufferData(g.ELEMENT_ARRAY_BUFFER,n,g.STATIC_DRAW);f.indexCount=m;g.bindBuffer(g.ELEMENT_ARRAY_BUFFER,null);a.RendererNativeArray=f}this.drawWebGlStaticGeometry(a.RendererNativeArray)};CL3D.Renderer.prototype.drawWebGlStaticGeometry=function(a){var g=this.gl;g.enableVertexAttribArray(0);g.enableVertexAttribArray(1);g.enableVertexAttribArray(2);g.enableVertexAttribArray(3);g.enableVertexAttribArray(4);g.bindBuffer(g.ARRAY_BUFFER,a.positionBuffer);g.vertexAttribPointer(0,3,g.FLOAT,false,0,0);g.bindBuffer(g.ARRAY_BUFFER,a.texcoordsBuffer);g.vertexAttribPointer(1,2,g.FLOAT,false,0,0);g.bindBuffer(g.ARRAY_BUFFER,a.texcoordsBuffer2);g.vertexAttribPointer(2,2,g.FLOAT,false,0,0);g.bindBuffer(g.ARRAY_BUFFER,a.normalBuffer);g.vertexAttribPointer(3,3,g.FLOAT,false,0,0);g.bindBuffer(g.ARRAY_BUFFER,a.colorBuffer);g.vertexAttribPointer(4,3,g.FLOAT,false,0,0);g.bindBuffer(g.ELEMENT_ARRAY_BUFFER,a.indexBuffer);var d=new CL3D.Matrix4(false);this.Projection.copyTo(d);d=d.multiply(this.View);d=d.multiply(this.World);var c=this.currentGLProgram;if(c.locWorldViewProj!=null){g.uniformMatrix4fv(c.locWorldViewProj,false,this.getMatrixAsWebGLFloatArray(d))}if(c.locNormalMatrix!=null){var e=new CL3D.Matrix4(true);e=e.multiply(this.View);e=e.multiply(this.World);e.makeInverse();g.uniformMatrix4fv(c.locNormalMatrix,true,this.getMatrixAsWebGLFloatArray(e))}if(c.locModelViewMatrix!=null){var f=new CL3D.Matrix4(true);f=f.multiply(this.View);f=f.multiply(this.World);g.uniformMatrix4fv(c.locModelViewMatrix,false,this.getMatrixAsWebGLFloatArray(f))}g.drawElements(g.TRIANGLES,a.indexCount,g.UNSIGNED_SHORT,0)};CL3D.Renderer.prototype.draw3DLine=function(b,a){};CL3D.Renderer.prototype.draw2DRectangle=function(j,h,a,o,b,e){if(a<=0||o<=0||this.width==0||this.height==0){return}var m=true;if(e==null||e==false){m=false}var d=this.gl;d.enableVertexAttribArray(0);d.disableVertexAttribArray(1);d.disableVertexAttribArray(2);d.disableVertexAttribArray(3);d.disableVertexAttribArray(4);h=this.height-h;var n=2/this.width;var l=2/this.height;j=(j*n)-1;h=(h*l)-1;a*=n;o*=l;var g=new WebGLFloatArray(4*3);g[0]=j;g[1]=h;g[2]=0;g[3]=j+a;g[4]=h;g[5]=0;g[6]=j+a;g[7]=h-o;g[8]=0;g[9]=j;g[10]=h-o;g[11]=0;var i=6;var k=new WebGLUnsignedShortArray(i);k[0]=0;k[1]=2;k[2]=1;k[3]=0;k[4]=3;k[5]=2;var f=d.createBuffer();d.bindBuffer(d.ARRAY_BUFFER,f);d.bufferData(d.ARRAY_BUFFER,g,d.STATIC_DRAW);d.vertexAttribPointer(0,3,d.FLOAT,false,0,0);var c=d.createBuffer();d.bindBuffer(d.ELEMENT_ARRAY_BUFFER,c);d.bufferData(d.ELEMENT_ARRAY_BUFFER,k,d.STATIC_DRAW);this.currentGLProgram=this.Program2DDrawingColorOnly;d.useProgram(this.currentGLProgram);d.uniform4f(d.getUniformLocation(this.currentGLProgram,"vColor"),CL3D.getRed(b)/255,CL3D.getGreen(b)/255,CL3D.getBlue(b)/255,m?(CL3D.getAlpha(b)/255):1);d.depthMask(false);d.disable(d.DEPTH_TEST);if(!m){d.disable(d.BLEND)}else{d.enable(d.BLEND);d.blendFunc(d.SRC_ALPHA,d.ONE_MINUS_SRC_ALPHA)}d.drawElements(d.TRIANGLES,i,d.UNSIGNED_SHORT,0);d.deleteBuffer(f);d.deleteBuffer(c)};CL3D.Renderer.prototype.draw2DImage=function(h,g,l,k,s,n,t,j,d){if(s==null||s.isLoaded()==false||l<=0||k<=0||this.width==0||this.height==0){return}if(j==null){j=1}if(d==null){d=1}var f=true;if(n==null||n==false){f=false}var o=this.gl;o.enableVertexAttribArray(0);o.enableVertexAttribArray(1);o.disableVertexAttribArray(2);o.disableVertexAttribArray(3);o.disableVertexAttribArray(4);g=this.height-g;var e=2/this.width;var r=2/this.height;h=(h*e)-1;g=(g*r)-1;l*=e;k*=r;var p=new WebGLFloatArray(4*3);p[0]=h;p[1]=g;p[2]=0;p[3]=h+l;p[4]=g;p[5]=0;p[6]=h+l;p[7]=g-k;p[8]=0;p[9]=h;p[10]=g-k;p[11]=0;var i=new WebGLFloatArray(4*2);i[0]=0;i[1]=0;i[2]=j;i[3]=0;i[4]=j;i[5]=d;i[6]=0;i[7]=d;var a=6;var b=new WebGLUnsignedShortArray(a);b[0]=0;b[1]=2;b[2]=1;b[3]=0;b[4]=3;b[5]=2;var m=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,m);o.bufferData(o.ARRAY_BUFFER,p,o.STATIC_DRAW);o.vertexAttribPointer(0,3,o.FLOAT,false,0,0);var q=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,q);o.bufferData(o.ARRAY_BUFFER,i,o.STATIC_DRAW);o.vertexAttribPointer(1,2,o.FLOAT,false,0,0);var c=o.createBuffer();o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,c);o.bufferData(o.ELEMENT_ARRAY_BUFFER,b,o.STATIC_DRAW);if(t==null){this.currentGLProgram=this.Program2DDrawingTextureOnly}else{this.currentGLProgram=t}o.useProgram(this.currentGLProgram);o.depthMask(false);o.disable(o.DEPTH_TEST);if(!f){o.disable(o.BLEND)}else{o.enable(o.BLEND);o.blendFunc(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA)}o.activeTexture(o.TEXTURE0);o.bindTexture(o.TEXTURE_2D,s.getWebGLTexture());o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE);o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE);o.activeTexture(o.TEXTURE1);o.bindTexture(o.TEXTURE_2D,null);o.drawElements(o.TRIANGLES,a,o.UNSIGNED_SHORT,0);o.deleteBuffer(q);o.deleteBuffer(m);o.deleteBuffer(c)};CL3D.Renderer.prototype.draw2DFontImage=function(b,h,e,a,d,c){if(d==null||d.isLoaded()==false||e<=0||a<=0||this.width==0||this.height==0){return}var g=true;var f=this.gl;this.currentGLProgram=this.Program2DDrawingCanvasFontColor;f.useProgram(this.currentGLProgram);f.uniform4f(f.getUniformLocation(this.currentGLProgram,"vColor"),CL3D.getRed(c)/255,CL3D.getGreen(c)/255,CL3D.getBlue(c)/255,g?(CL3D.getAlpha(c)/255):1);this.draw2DImage(b,h,e,a,d,g,this.Program2DDrawingCanvasFontColor,d.OriginalWidth/d.CachedWidth,d.OriginalHeight/d.CachedHeight)};CL3D.Renderer.prototype.beginScene=function(a){if(this.gl==null){return}this.ensuresizeok();var b=this.gl;b.depthMask(true);b.clearColor(CL3D.getRed(a)/255,CL3D.getGreen(a)/255,CL3D.getBlue(a)/255,1);b.clear(b.COLOR_BUFFER_BIT|b.DEPTH_BUFFER_BIT)};CL3D.Renderer.prototype.endScene=function(){if(this.gl==null){return}var a=this.gl;a.flush()};CL3D.Renderer.prototype.clearDynamicLights=function(){};CL3D.Renderer.prototype.ensuresizeok=function(){if(this.canvas==null||this.gl==null){return}if(this.width==this.canvas.width&&this.height==this.canvas.height){return}this.width=this.canvas.width;this.height=this.canvas.height;var a=this.gl;if(a.viewport){a.viewport(0,0,this.width,this.height)}};CL3D.Renderer.prototype.init=function(a){this.canvas=a;this.gl=null;try{var d=["webgl","experimental-webgl","moz-webgl","webkit-3d","3d"];for(var b=0;b<d.length;b++){try{this.gl=this.canvas.getContext(d[b]);if(this.gl!=null){break}}catch(c){}}}catch(c){}if(this.gl==null){CL3D.gCCDebugOutput.printError("Error: This browser does not support WebGL (or it is disabled).");CL3D.gCCDebugOutput.printError("See www.ambiera.com/copperlicht/browsersupport.html for details.");return false}else{this.removeCompatibilityProblems();this.ensureCorrectMethodNamesSetForClosure();this.initWebGL();this.ensuresizeok()}return true};CL3D.Renderer.prototype.removeCompatibilityProblems=function(){if(typeof WebGLFloatArray=="undefined"&&typeof Float32Array!="undefined"){try{WebGLFloatArray=Float32Array;WebGLUnsignedShortArray=Uint16Array}catch(a){CL3D.gCCDebugOutput.printError("Error: Float32 array types for webgl not found.")}}if(typeof WebGLIntArray=="undefined"&&typeof Int32Array!="undefined"){try{WebGLIntArray=Int32Array}catch(a){CL3D.gCCDebugOutput.printError("Error: Int32 array types for webgl not found.")}}if(typeof WebGLFloatArray=="undefined"&&typeof CanvasFloatArray!="undefined"){try{WebGLFloatArray=CanvasFloatArray;WebGLUnsignedShortArray=CanvasUnsignedShortArray}catch(a){CL3D.gCCDebugOutput.printError("Error: canvas array types for webgl not found.")}}var b=this.gl;if(!b.getProgramParameter){b.getProgramParameter=b.getProgrami}if(!b.getShaderParameter){b.getShaderParameter=b.getShaderi}};CL3D.Renderer.prototype.loadShader=function(d,e){var c=this.gl;var a=c.createShader(d);if(a==null){return null}c.shaderSource(a,e);c.compileShader(a);if(!c.getShaderParameter(a,c.COMPILE_STATUS)){var b=(d==c.VERTEX_SHADER)?"vertex":"fragment";CL3D.gCCDebugOutput.printError("Error loading "+b+" shader: "+c.getShaderInfoLog(a));return null}return a};CL3D.Renderer.prototype.createShaderProgram=function(d,c){var f=this.gl;var e=this.loadShader(f.VERTEX_SHADER,d);var a=this.loadShader(f.FRAGMENT_SHADER,c);if(!e||!a){CL3D.gCCDebugOutput.print("Could not create shader program");return null}var b=f.createProgram();f.attachShader(b,e);f.attachShader(b,a);f.bindAttribLocation(b,0,"vPosition");f.bindAttribLocation(b,1,"vTexCoord1");f.bindAttribLocation(b,2,"vTexCoord2");f.bindAttribLocation(b,3,"vNormal");f.bindAttribLocation(b,4,"vColor");f.linkProgram(b);if(!f.getProgramParameter(b,f.LINK_STATUS)){CL3D.gCCDebugOutput.print("Could not link program:"+f.getProgramInfoLog(b))}else{f.useProgram(b);f.uniform1i(f.getUniformLocation(b,"texture1"),0);f.uniform1i(f.getUniformLocation(b,"texture2"),1)}return b};CL3D.Renderer.prototype.createMaterialType=function(c,b,f,d,e){var a=this.createMaterialTypeInternal(c,b,f,d,e);if(!a){return -1}this.MinExternalMaterialTypeId+=1;this.MaterialPrograms[this.MinExternalMaterialTypeId]=a;return this.MinExternalMaterialTypeId};CL3D.Renderer.prototype.getGLProgramFromMaterialType=function(a){var b=null;try{b=this.MaterialPrograms[a]}catch(c){}return b};CL3D.Renderer.prototype.createMaterialTypeInternal=function(a,d,g,c,e){var b=this.createShaderProgram(a,d);if(b){b.blendenabled=g?g:false;b.blendsfactor=c;b.blenddfactor=e;var f=this.gl;b.locWorldViewProj=f.getUniformLocation(b,"worldviewproj");b.locNormalMatrix=f.getUniformLocation(b,"normaltransform");b.locModelViewMatrix=f.getUniformLocation(b,"modelviewtransform")}return b};CL3D.Renderer.prototype.initWebGL=function(){var i=this.gl;var p=this.createMaterialTypeInternal(this.vs_shader_normaltransform,this.fs_shader_onlyfirsttexture);var e=this.createMaterialTypeInternal(this.vs_shader_normaltransform,this.fs_shader_lightmapcombine);var l=this.createMaterialTypeInternal(this.vs_shader_normaltransform,this.fs_shader_lightmapcombine_m4);var d=this.createMaterialTypeInternal(this.vs_shader_normaltransform,this.fs_shader_onlyfirsttexture,true,i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA);var m=this.createMaterialTypeInternal(this.vs_shader_normaltransform,this.fs_shader_onlyfirsttexture,true,i.ONE,i.ONE_MINUS_SRC_COLOR);var f=this.createMaterialTypeInternal(this.vs_shader_reflectiontransform,this.fs_shader_lightmapcombine);var k=this.createMaterialTypeInternal(this.vs_shader_reflectiontransform,this.fs_shader_lightmapcombine,true,i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA);var h=this.createMaterialTypeInternal(this.vs_shader_normaltransform_gouraud,this.fs_shader_onlyfirsttexture_gouraud);this.Program2DDrawingColorOnly=this.createMaterialTypeInternal(this.vs_shader_2ddrawing_coloronly,this.fs_shader_simplecolor);this.Program2DDrawingTextureOnly=this.createMaterialTypeInternal(this.vs_shader_2ddrawing_texture,this.fs_shader_onlyfirsttexture);this.Program2DDrawingCanvasFontColor=this.createMaterialTypeInternal(this.vs_shader_2ddrawing_texture,this.fs_shader_2ddrawing_canvasfont);this.MaterialPrograms[CL3D.Material.EMT_SOLID]=p;this.MaterialPrograms[CL3D.Material.EMT_SOLID+1]=p;this.MaterialPrograms[CL3D.Material.EMT_LIGHTMAP]=e;this.MaterialPrograms[CL3D.Material.EMT_LIGHTMAP+1]=e;this.MaterialPrograms[CL3D.Material.EMT_LIGHTMAP+2]=e;this.MaterialPrograms[CL3D.Material.EMT_LIGHTMAP+3]=l;this.MaterialPrograms[CL3D.Material.EMT_TRANSPARENT_ADD_COLOR]=m;this.MaterialPrograms[CL3D.Material.EMT_TRANSPARENT_ALPHA_CHANNEL]=d;this.MaterialPrograms[CL3D.Material.EMT_REFLECTION_2_LAYER]=f;this.MaterialPrograms[CL3D.Material.EMT_TRANSPARENT_REFLECTION_2_LAYER]=k;this.MaterialPrograms[23]=h;i.useProgram(p);this.currentGLProgram=p;var c=0;var j=0;var n=1;var o=1;i.clearColor(c,j,n,o);i.clearDepth(10000);i.depthMask(true);i.enable(i.DEPTH_TEST);i.disable(i.BLEND);i.blendFunc(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA);i.enable(i.CULL_FACE);i.cullFace(i.BACK)};CL3D.Renderer.prototype.setProjection=function(a){a.copyTo(this.Projection)};CL3D.Renderer.prototype.getProjection=function(){return this.Projection};CL3D.Renderer.prototype.setView=function(a){a.copyTo(this.View)};CL3D.Renderer.prototype.getView=function(){return this.View};CL3D.Renderer.prototype.getWorld=function(){return this.World};CL3D.Renderer.prototype.setWorld=function(a){if(a){a.copyTo(this.World)}};CL3D.Renderer.prototype.ensureCorrectMethodNamesSetForClosure=function(a){};CL3D.Renderer.prototype.getMatrixAsWebGLFloatArray=function(a){return new WebGLFloatArray(a.asArray())};CL3D.Renderer.prototype.deleteTexture=function(a){if(a==null){return}var b=this.gl;b.deleteTexture(a.getWebGLTexture());a.Texture=null;a.Loaded=false};CL3D.Renderer.prototype.createTextureFrom2DCanvas=function(b,h){var c=this.gl;var g=c.createTexture();c.bindTexture(c.TEXTURE_2D,g);var a=b.width;var k=b.height;var e=a;var f=k;if(!this.isPowerOfTwo(b.width)||!this.isPowerOfTwo(b.height)){var d=document.createElement("canvas");d.width=this.nextHighestPowerOfTwo(b.width);d.height=this.nextHighestPowerOfTwo(b.height);var i=d.getContext("2d");if(h){i.drawImage(b,0,0,b.width,b.height,0,0,b.width,b.height)}else{i.drawImage(b,0,0,b.width,b.height,0,0,d.width,d.height)}b=d;e=d.width;f=d.height}this.fillTextureFromDOMObject(g,b);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,c.LINEAR);c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,c.LINEAR_MIPMAP_NEAREST);c.generateMipmap(c.TEXTURE_2D);c.bindTexture(c.TEXTURE_2D,null);var j=new CL3D.Texture();j.Name="";j.Texture=g;j.Image=null;j.Loaded=true;j.CachedWidth=e;j.CachedHeight=f;j.OriginalWidth=a;j.OriginalHeight=k;return j};CL3D.Renderer.prototype.isPowerOfTwo=function(a){return(a&(a-1))==0};CL3D.Renderer.prototype.nextHighestPowerOfTwo=function(a){--a;for(var b=1;b<32;b<<=1){a=a|a>>b}return a+1};CL3D.Renderer.prototype.fillTextureFromDOMObject=function(b,c){var g=this.gl;try{g.texImage2D(g.TEXTURE_2D,0,g.RGBA,g.RGBA,g.UNSIGNED_BYTE,c)}catch(f){var a=navigator.userAgent;if(a!=null&&a.indexOf("Firefox")!=-1){if(this.firefox5BugPrinted==false){CL3D.gCCDebugOutput.printError("<i>Firefox doesn't allow loading textures from other domains and from local disk anymore.<br/>Workaround: set security.fileuri.strict_origin_policy in about:config to 'false'</i>",true)}this.firefox5BugPrinted=true;return}try{g.texImage2D(g.TEXTURE_2D,0,c)}catch(d){}}};CL3D.Renderer.prototype.finalizeLoadedImageTexture=function(b){var f=this.gl;var c=f.createTexture();var e=b.Image;if(!this.isPowerOfTwo(e.width)||!this.isPowerOfTwo(e.height)){var a=document.createElement("canvas");if(a!=null){a.width=this.nextHighestPowerOfTwo(e.width);a.height=this.nextHighestPowerOfTwo(e.height);var d=a.getContext("2d");d.drawImage(e,0,0,e.width,e.height,0,0,a.width,a.height);e=a}}f.bindTexture(f.TEXTURE_2D,c);this.fillTextureFromDOMObject(c,e);f.generateMipmap(f.TEXTURE_2D);f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MAG_FILTER,f.LINEAR);f.texParameteri(f.TEXTURE_2D,f.TEXTURE_MIN_FILTER,f.LINEAR_MIPMAP_NEAREST);f.bindTexture(f.TEXTURE_2D,null);this.textureWasLoadedFlag=true;b.Texture=c};CL3D.Renderer.prototype.getStaticBillboardMeshBuffer=function(){if(this.StaticBillboardMeshBuffer==null){this.createStaticBillboardMeshBuffer()}return this.StaticBillboardMeshBuffer};CL3D.Renderer.prototype.createStaticBillboardMeshBuffer=function(){if(this.StaticBillboardMeshBuffer!=null){return}var f=null;f=new CL3D.MeshBuffer();var g=new CL3D.Vertex3D(true);var e=new CL3D.Vertex3D(true);var c=new CL3D.Vertex3D(true);var b=new CL3D.Vertex3D(true);var d=f.Indices;d.push(0);d.push(2);d.push(1);d.push(0);d.push(3);d.push(2);var a=f.Vertices;a.push(g);a.push(e);a.push(c);a.push(b);g.TCoords.X=1;g.TCoords.Y=1;g.Pos.set(1,-1,0);e.TCoords.X=1;e.TCoords.Y=0;e.Pos.set(1,1,0);c.TCoords.X=0;c.TCoords.Y=0;c.Pos.set(-1,1,0);b.TCoords.X=0;b.TCoords.Y=1;b.Pos.set(-1,-1,0);this.StaticBillboardMeshBuffer=f};CL3D.Renderer.prototype.vs_shader_2ddrawing_coloronly="				#ifdef GL_ES												\n	precision highp float;										\n	#endif														\n																	attribute vec4 vPosition;																									    void main()													    {															        gl_Position = vPosition;								    }																";CL3D.Renderer.prototype.vs_shader_2ddrawing_texture="					#ifdef GL_ES												\n	precision highp float;										\n	#endif														\n																	attribute vec4 vPosition;										attribute vec4 vTexCoord1;										varying vec2 v_texCoord1;																									    void main()													    {															        gl_Position = vPosition;										v_texCoord1 = vTexCoord1.st;							    }																";CL3D.Renderer.prototype.fs_shader_simplecolor="						#ifdef GL_ES												\n	precision highp float;										\n	#endif														\n	uniform vec4 vColor;																										    void main()													    {															         gl_FragColor = vColor;									    }																";CL3D.Renderer.prototype.fs_shader_2ddrawing_canvasfont="				#ifdef GL_ES												\n	precision highp float;										\n	#endif														\n	uniform vec4 vColor;											uniform sampler2D texture1;										uniform sampler2D texture2;																									    varying vec2 v_texCoord1;																									    void main()													    {																    vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);		        float alpha = texture2D(texture1, texCoord).r;		        gl_FragColor = vec4(vColor.rgb, alpha);						    }																";CL3D.Renderer.prototype.vs_shader_normaltransform="					#ifdef GL_ES												\n	precision highp float;										\n	#endif														\n	uniform mat4 worldviewproj;																										attribute vec4 vPosition;									    attribute vec4 vNormal;										    attribute vec2 vTexCoord1;										attribute vec2 vTexCoord2;																									    varying vec2 v_texCoord1;										varying vec2 v_texCoord2;																									    void main()													    {															        gl_Position = worldviewproj * vPosition;				        v_texCoord1 = vTexCoord1.st;									v_texCoord2 = vTexCoord2.st;							    }																";CL3D.Renderer.prototype.vs_shader_normaltransform_gouraud="					#ifdef GL_ES												\n	precision highp float;										\n	#endif														\n	uniform mat4 worldviewproj;																										attribute vec4 vPosition;									    attribute vec2 vTexCoord1;										attribute vec2 vTexCoord2;										attribute vec4 vNormal;											attribute vec4 vColor;																										    varying vec2 v_texCoord1;										varying vec2 v_texCoord2;										varying vec4 v_color;																										    void main()													    {															        gl_Position = worldviewproj * vPosition;				        v_texCoord1 = vTexCoord1.st;									v_texCoord2 = vTexCoord2.st;									v_color = vColor;										    }																";CL3D.Renderer.prototype.vs_shader_reflectiontransform="			#ifdef GL_ES												\n	precision highp float;										\n	#endif														\n	uniform mat4 worldviewproj;									\n	uniform mat4 normaltransform;								\n	uniform mat4 modelviewtransform;							\n																	attribute vec4 vPosition;									    attribute vec3 vNormal;										    attribute vec2 vTexCoord1;										attribute vec2 vTexCoord2;																									    varying vec2 v_texCoord1;										varying vec2 v_texCoord2;																									    void main()													    {															        gl_Position = worldviewproj * vPosition;					\n																	\n		//	use reflection											\n		vec4 pos = modelviewtransform * vPosition;					\n		vec4 n = normalize(normaltransform * vec4(vNormal, 1));		\n		//n = vec4(-n.x, n.z, n.y, 1.0);								\n		vec3 r = reflect( pos.xyz, n.xyz );							\n		float m = sqrt( r.x*r.x + r.y*r.y + (r.z+1.0)*(r.z+1.0) ); \n															\n		//	texture coordinates								\n		v_texCoord1 = vTexCoord1.st;						\n		v_texCoord2.x = r.x / m  + 0.5;						\n		v_texCoord2.y = r.y / m  + 0.5;						\n    }														\n	";CL3D.Renderer.prototype.fs_shader_onlyfirsttexture="					#ifdef GL_ES												\n	precision highp float;										\n	#endif														\n	uniform sampler2D texture1;										uniform sampler2D texture2;																									    varying vec2 v_texCoord1;										varying vec2 v_texCoord2;																									    void main()													    {															        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);		        gl_FragColor = texture2D(texture1, texCoord);			    }																";CL3D.Renderer.prototype.fs_shader_onlyfirsttexture_gouraud="		#ifdef GL_ES												\n	precision highp float;										\n	#endif														\n	uniform sampler2D texture1;										uniform sampler2D texture2;																									    varying vec2 v_texCoord1;										varying vec2 v_texCoord2;										varying vec4 v_color;																										    void main()													    {															        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);		        gl_FragColor = texture2D(texture1, texCoord) * v_color;	    }																";CL3D.Renderer.prototype.fs_shader_lightmapcombine="					#ifdef GL_ES												\n	precision highp float;										\n	#endif														\n	uniform sampler2D texture1;										uniform sampler2D texture2;																									    varying vec2 v_texCoord1;										varying vec2 v_texCoord2;																									    void main()													    {															        vec2 texCoord1 = vec2(v_texCoord1.s, v_texCoord1.t);			vec2 texCoord2 = vec2(v_texCoord2.s, v_texCoord2.t);	        vec4 col1 = texture2D(texture1, texCoord1);						vec4 col2 = texture2D(texture2, texCoord2);						gl_FragColor = col1 * col2;								    }																";CL3D.Renderer.prototype.fs_shader_lightmapcombine_m4="			#ifdef GL_ES												\n	precision highp float;										\n	#endif														\n	uniform sampler2D texture1;										uniform sampler2D texture2;																									    varying vec2 v_texCoord1;										varying vec2 v_texCoord2;																									    void main()													    {															        vec2 texCoord1 = vec2(v_texCoord1.s, v_texCoord1.t);			vec2 texCoord2 = vec2(v_texCoord2.s, v_texCoord2.t);	        vec4 col1 = texture2D(texture1, texCoord1);						vec4 col2 = texture2D(texture2, texCoord2);						gl_FragColor = col1 * col2 * 3.0;						    }																";CL3D.SceneNode=function(){this.Type=-1;this.Pos=new CL3D.Vect3d();this.Rot=new CL3D.Vect3d();this.Scale=new CL3D.Vect3d(1,1,1);this.Visible=true;this.Name="";this.Culling=0;this.Id=-1;this.Parent=null;this.Children=new Array();this.Animators=new Array();this.AbsoluteTransformation=new CL3D.Matrix4();this.scene=null;this.Selector=null};CL3D.SceneNode.prototype.init=function(){this.Pos=new CL3D.Vect3d();this.Rot=new CL3D.Vect3d();this.Scale=new CL3D.Vect3d(1,1,1);this.Children=new Array();this.Animators=new Array();this.AbsoluteTransformation=new CL3D.Matrix4()};CL3D.SceneNode.prototype.Pos=null;CL3D.SceneNode.prototype.Rot=null;CL3D.SceneNode.prototype.Scale=null;CL3D.SceneNode.prototype.Visible=true;CL3D.SceneNode.prototype.Name="";CL3D.SceneNode.prototype.Id=-1;CL3D.SceneNode.prototype.Selector=null;CL3D.SceneNode.prototype.Parent=null;CL3D.SceneNode.prototype.getParent=function(){return this.Parent};CL3D.SceneNode.prototype.getChildren=function(){return this.Children};CL3D.SceneNode.prototype.getType=function(){return"none"};CL3D.SceneNode.prototype.getBoundingBox=function(){return new CL3D.Box3d()};CL3D.SceneNode.prototype.getAnimators=function(){return this.Animators};CL3D.SceneNode.prototype.getAnimatorOfType=function(c){for(var b=0;b<this.Animators.length;++b){var a=this.Animators[b];if(a.getType()==c){return a}}return null};CL3D.SceneNode.prototype.getTransformedBoundingBox=function(){var a=this.getBoundingBox().clone();this.AbsoluteTransformation.transformBoxEx(a);return a};CL3D.SceneNode.prototype.cloneMembers=function(a,e){a.Name=new String(this.Name);a.Visible=this.Visible;a.Culling=this.Culling;a.Pos=this.Pos.clone();a.Rot=this.Rot.clone();a.Scale=this.Scale.clone();a.Type=this.Type;if(e){e.addChild(a)}for(var d=0;d<this.Children.lenght;++d){var g=this.Children[d];if(g){var f=g.createClone(a);if(f!=null){a.addChild(f)}}}a.Animators=this.Animators.slice();if(this.AbsoluteTransformation){a.AbsoluteTransformation=this.AbsoluteTransformation.clone()}a.scene=this.scene};CL3D.SceneNode.prototype.createClone=function(a){return null};CL3D.SceneNode.prototype.addAnimator=function(b){if(b!=null){this.Animators.push(b)}};CL3D.SceneNode.prototype.removeAnimator=function(b){if(b==null){return}var d;for(d=0;d<this.Animators.length;++d){var c=this.Animators[d];if(c===b){this.Animators.splice(d,1);return}}};CL3D.SceneNode.prototype.addChild=function(a){if(a){a.scene=this.scene;if(a.Parent){a.Parent.removeChild(a)}a.Parent=this;this.Children.push(a)}};CL3D.SceneNode.prototype.removeChild=function(b){for(var a=0;a<this.Children.length;++a){if(this.Children[a]===b){b.Parent=null;this.Children.splice(a,1);return}}};CL3D.SceneNode.prototype.OnRegisterSceneNode=function(b){if(this.Visible){for(var a=0;a<this.Children.length;++a){var d=this.Children[a];d.OnRegisterSceneNode(b)}}};CL3D.SceneNode.prototype.OnAnimate=function(h,k){var e=false;if(this.Visible){var f;var b=this.Animators.length;for(f=0;f<b;){var d=this.Animators[f];e=d.animateNode(this,k)||e;var g=b;b=this.Animators.length;if(g>=b){++f}}this.updateAbsolutePosition();for(f=0;f<this.Children.length;++f){var j=this.Children[f];e=j.OnAnimate(h,k)||e}}return e};CL3D.SceneNode.prototype.getRelativeTransformation=function(){var b=new CL3D.Matrix4();b.setRotationDegrees(this.Rot);b.setTranslation(this.Pos);if(this.Scale.X!=1||this.Scale.Y!=1||this.Scale.Z!=1){var a=new CL3D.Matrix4();a.setScale(this.Scale);b=b.multiply(a)}return b};CL3D.SceneNode.prototype.updateAbsolutePosition=function(){if(this.Parent!=null){this.AbsoluteTransformation=this.Parent.AbsoluteTransformation.multiply(this.getRelativeTransformation())}else{this.AbsoluteTransformation=this.getRelativeTransformation()}};CL3D.SceneNode.prototype.render=function(a){};CL3D.SceneNode.prototype.getAbsoluteTransformation=function(){return this.AbsoluteTransformation};CL3D.SceneNode.prototype.getAbsolutePosition=function(){return this.AbsoluteTransformation.getTranslation()};CL3D.SceneNode.prototype.getMaterialCount=function(){return 0};CL3D.SceneNode.prototype.getMaterial=function(a){return null};CL3D.CameraSceneNode=function(){this.init();this.Box=new CL3D.Box3d();this.DoesCollision=false;this.Active=false;this.Target=new CL3D.Vect3d(0,0,10);this.UpVector=new CL3D.Vect3d(0,1,0);this.Projection=new CL3D.Matrix4();this.ViewMatrix=new CL3D.Matrix4();this.Fovy=CL3D.PI/2.5;this.Aspect=4/3;this.ZNear=0.1;this.ZFar=3000;this.Projection.buildProjectionMatrixPerspectiveFovLH(this.Fovy,this.Aspect,this.ZNear,this.ZFar)};CL3D.CameraSceneNode.prototype=new CL3D.SceneNode();CL3D.CameraSceneNode.prototype.recalculateProjectionMatrix=function(){this.Projection.buildProjectionMatrixPerspectiveFovLH(this.Fovy,this.Aspect,this.ZNear,this.ZFar)};CL3D.CameraSceneNode.prototype.getType=function(){return"camera"};CL3D.CameraSceneNode.prototype.setAspectRatio=function(b){if(!CL3D.equals(this.Aspect,b)){this.Aspect=b;this.recalculateProjectionMatrix()}};CL3D.CameraSceneNode.prototype.getAspectRatio=function(){return this.Aspect};CL3D.CameraSceneNode.prototype.getFov=function(){return this.Fovy};CL3D.CameraSceneNode.prototype.setFov=function(a){if(!CL3D.equals(this.Fovy,a)){this.Fovy=a;this.recalculateProjectionMatrix()}};CL3D.CameraSceneNode.prototype.setTarget=function(a){if(a){this.Target=a.clone()}};CL3D.CameraSceneNode.prototype.getTarget=function(){return this.Target};CL3D.CameraSceneNode.prototype.getUpVector=function(){return this.UpVector};CL3D.CameraSceneNode.prototype.setUpVector=function(a){if(a){this.UpVector=a.clone()}};CL3D.CameraSceneNode.prototype.getNearValue=function(){return this.ZNear};CL3D.CameraSceneNode.prototype.setNearValue=function(a){if(!CL3D.equals(this.ZNear,a)){this.ZNear=a;this.recalculateProjectionMatrix()}};CL3D.CameraSceneNode.prototype.getFarValue=function(){return this.ZFar};CL3D.CameraSceneNode.prototype.setFarValue=function(a){if(!CL3D.equals(this.ZFar,a)){this.ZFar=a;this.recalculateProjectionMatrix()}};CL3D.CameraSceneNode.prototype.recalculateViewArea=function(){};CL3D.CameraSceneNode.prototype.OnAnimate=function(b,c){var a=CL3D.SceneNode.prototype.OnAnimate.call(this,b,c);this.calculateViewMatrix();return a};CL3D.CameraSceneNode.prototype.calculateViewMatrix=function(){var b=this.getAbsolutePosition();var a=this.Target.clone();if(b.equals(a)){a.X+=1}this.ViewMatrix.buildCameraLookAtMatrixLH(b,a,this.UpVector);this.recalculateViewArea()};CL3D.CameraSceneNode.prototype.OnRegisterSceneNode=function(a){if(a.getActiveCamera()===this){a.registerNodeForRendering(this,2);CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this,a)}};CL3D.CameraSceneNode.prototype.render=function(a){this.calculateViewMatrix();if(this.Aspect==0){this.setAutoAspectIfNoFixedSet(a.width,a.height);if(this.Aspect==0){this.setAspectRatio(3/4)}}a.setProjection(this.Projection);a.setView(this.ViewMatrix)};CL3D.CameraSceneNode.prototype.onMouseDown=function(b){for(var a=0;a<this.Animators.length;++a){this.Animators[a].onMouseDown(b)}};CL3D.CameraSceneNode.prototype.onMouseWheel=function(b){for(var a=0;a<this.Animators.length;++a){this.Animators[a].onMouseWheel(b)}};CL3D.CameraSceneNode.prototype.onMouseUp=function(b){for(var a=0;a<this.Animators.length;++a){this.Animators[a].onMouseUp(b)}};CL3D.CameraSceneNode.prototype.onMouseMove=function(b){for(var a=0;a<this.Animators.length;++a){this.Animators[a].onMouseMove(b)}};CL3D.CameraSceneNode.prototype.onKeyDown=function(b){for(var a=0;a<this.Animators.length;++a){this.Animators[a].onKeyDown(b)}};CL3D.CameraSceneNode.prototype.onKeyUp=function(b){for(var a=0;a<this.Animators.length;++a){this.Animators[a].onKeyUp(b)}};CL3D.CameraSceneNode.prototype.createClone=function(a){var b=new CL3D.CameraSceneNode();this.cloneMembers(b,a);if(this.Target){b.Target=this.Target.clone()}if(this.UpVector){b.UpVector=this.UpVector.clone()}if(this.Projection){b.Projection=this.Projection.clone()}if(this.ViewMatrix){b.ViewMatrix=this.ViewMatrix.clone()}b.Fovy=this.Fovy;b.Aspect=this.Aspect;b.ZNear=this.ZNear;b.ZFar=this.ZFar;if(this.Box){b.Box=this.Box.clone()}return b};CL3D.CameraSceneNode.prototype.setAutoAspectIfNoFixedSet=function(a,d){if(a==0||d==0){return}var c=this.Aspect;if(!CL3D.equals(c,0)){return}var b=a/d;this.setAspectRatio(b)};CL3D.MeshSceneNode=function(){this.init();this.Box=new CL3D.Box3d();this.DoesCollision=false;this.OwnedMesh=null;this.ReadOnlyMaterials=true;this.Selector=null};CL3D.MeshSceneNode.prototype=new CL3D.SceneNode();CL3D.MeshSceneNode.prototype.getBoundingBox=function(){if(this.OwnedMesh){return this.OwnedMesh.Box}return this.Box};CL3D.MeshSceneNode.prototype.getMesh=function(){return this.OwnedMesh};CL3D.MeshSceneNode.prototype.setMesh=function(a){this.OwnedMesh=a};CL3D.MeshSceneNode.prototype.getType=function(){return"mesh"};CL3D.MeshSceneNode.prototype.OnRegisterSceneNode=function(d){var f=this.OwnedMesh;if(this.Visible&&f){var e=false;var a=false;for(var c=0;c<f.MeshBuffers.length;++c){var b=f.MeshBuffers[c];if(b.Mat.isTransparent()){e=true}else{a=true}}if(e){d.registerNodeForRendering(this,CL3D.Scene.RENDER_MODE_TRANSPARENT)}if(a){d.registerNodeForRendering(this,CL3D.Scene.RENDER_MODE_DEFAULT)}CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this,d)}};CL3D.MeshSceneNode.prototype.render=function(a){a.setWorld(this.AbsoluteTransformation);a.drawMesh(this.OwnedMesh)};CL3D.MeshSceneNode.prototype.getMaterialCount=function(){if(this.OwnedMesh){return this.OwnedMesh.MeshBuffers.length}return 0};CL3D.MeshSceneNode.prototype.getMaterial=function(b){if(this.OwnedMesh!=null){if(b>=0&&b<this.OwnedMesh.MeshBuffers.length){var a=this.OwnedMesh.MeshBuffers[b];return a.Mat}}return null};CL3D.MeshSceneNode.prototype.createClone=function(a){var b=new CL3D.MeshSceneNode();this.cloneMembers(b,a);b.OwnedMesh=this.OwnedMesh;b.ReadonlyMaterials=this.ReadonlyMaterials;b.DoesCollision=this.DoesCollision;if(this.Box){b.Box=this.Box.clone()}return b};CL3D.SkyBoxSceneNode=function(){this.OwnedMesh=new CL3D.Mesh();var a=[0,1,2,0,2,3];var b=new CL3D.MeshBuffer();this.OwnedMesh.AddMeshBuffer(b);b.Mat.ClampTexture1=true;b.Indices=a;b.Vertices.push(this.createVertex(-1,-1,-1,0,0,1,1,1));b.Vertices.push(this.createVertex(1,-1,-1,0,0,1,0,1));b.Vertices.push(this.createVertex(1,1,-1,0,0,1,0,0));b.Vertices.push(this.createVertex(-1,1,-1,0,0,1,1,0));b=new CL3D.MeshBuffer();this.OwnedMesh.AddMeshBuffer(b);b.Mat.ClampTexture1=true;b.Indices=a;b.Vertices.push(this.createVertex(1,-1,-1,-1,0,0,1,1));b.Vertices.push(this.createVertex(1,-1,1,-1,0,0,0,1));b.Vertices.push(this.createVertex(1,1,1,-1,0,0,0,0));b.Vertices.push(this.createVertex(1,1,-1,-1,0,0,1,0));b=new CL3D.MeshBuffer();this.OwnedMesh.AddMeshBuffer(b);b.Mat.ClampTexture1=true;b.Indices=a;b.Vertices.push(this.createVertex(-1,-1,1,1,0,0,1,1));b.Vertices.push(this.createVertex(-1,-1,-1,1,0,0,0,1));b.Vertices.push(this.createVertex(-1,1,-1,1,0,0,0,0));b.Vertices.push(this.createVertex(-1,1,1,1,0,0,1,0));b=new CL3D.MeshBuffer();this.OwnedMesh.AddMeshBuffer(b);b.Mat.ClampTexture1=true;b.Indices=a;b.Vertices.push(this.createVertex(1,-1,1,0,0,-1,1,1));b.Vertices.push(this.createVertex(-1,-1,1,0,0,-1,0,1));b.Vertices.push(this.createVertex(-1,1,1,0,0,-1,0,0));b.Vertices.push(this.createVertex(1,1,1,0,0,-1,1,0));b=new CL3D.MeshBuffer();this.OwnedMesh.AddMeshBuffer(b);b.Mat.ClampTexture1=true;b.Indices=a;b.Vertices.push(this.createVertex(1,1,-1,0,-1,0,1,1));b.Vertices.push(this.createVertex(1,1,1,0,-1,0,0,1));b.Vertices.push(this.createVertex(-1,1,1,0,-1,0,0,0));b.Vertices.push(this.createVertex(-1,1,-1,0,-1,0,1,0));b=new CL3D.MeshBuffer();this.OwnedMesh.AddMeshBuffer(b);b.Mat.ClampTexture1=true;b.Indices=a;b.Vertices.push(this.createVertex(1,-1,1,0,1,0,1,1));b.Vertices.push(this.createVertex(1,-1,-1,0,1,0,0,1));b.Vertices.push(this.createVertex(-1,-1,-1,0,1,0,0,0));b.Vertices.push(this.createVertex(-1,-1,1,0,1,0,1,0))};CL3D.SkyBoxSceneNode.prototype=new CL3D.MeshSceneNode();CL3D.SkyBoxSceneNode.prototype.getType=function(){return"sky"};CL3D.SkyBoxSceneNode.prototype.createVertex=function(g,f,e,d,c,b,i,h){var a=new CL3D.Vertex3D(true);a.Pos.X=g;a.Pos.Y=f;a.Pos.Z=e;a.TCoords.X=i;a.TCoords.Y=h;return a};CL3D.SkyBoxSceneNode.prototype.OnRegisterSceneNode=function(a){if(this.Visible){a.registerNodeForRendering(this,1);CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this,a)}};CL3D.SkyBoxSceneNode.prototype.render=function(b){var a=this.scene.getActiveCamera();if(!a||!this.OwnedMesh){return}var d=new CL3D.Matrix4(false);this.AbsoluteTransformation.copyTo(d);d.setTranslation(a.getAbsolutePosition());var e=(a.getNearValue()+a.getFarValue())*0.5;var c=new CL3D.Matrix4();c.setScale(new CL3D.Vect3d(e,e,e));b.setWorld(d.multiply(c));b.drawMesh(this.OwnedMesh)};CL3D.SkyBoxSceneNode.prototype.createClone=function(a){var b=new CL3D.SkyBoxSceneNode();this.cloneMembers(b,a);if(this.OwnedMesh){b.OwnedMesh=this.OwnedMesh.clone()}b.ReadonlyMaterials=this.ReadonlyMaterials;b.DoesCollision=this.DoesCollision;if(this.Box){b.Box=this.Box.clone()}return b};CL3D.CubeSceneNode=function(e){if(e==null){e=10}this.OwnedMesh=new CL3D.Mesh();var c=new CL3D.MeshBuffer();c.Indices=[0,2,1,0,3,2,1,5,4,1,2,5,4,6,7,4,5,6,7,3,0,7,6,3,9,5,2,9,8,5,0,11,10,0,10,7];this.OwnedMesh.AddMeshBuffer(c);var b=CL3D.createColor(255,255,255,255);c.Vertices.push(this.createVertex(0,0,0,-1,-1,-1,b,0,1));c.Vertices.push(this.createVertex(1,0,0,1,-1,-1,b,1,1));c.Vertices.push(this.createVertex(1,1,0,1,1,-1,b,1,0));c.Vertices.push(this.createVertex(0,1,0,-1,1,-1,b,0,0));c.Vertices.push(this.createVertex(1,0,1,1,-1,1,b,0,1));c.Vertices.push(this.createVertex(1,1,1,1,1,1,b,0,0));c.Vertices.push(this.createVertex(0,1,1,-1,1,1,b,1,0));c.Vertices.push(this.createVertex(0,0,1,-1,-1,1,b,1,1));c.Vertices.push(this.createVertex(0,1,1,-1,1,1,b,0,1));c.Vertices.push(this.createVertex(0,1,0,-1,1,-1,b,1,1));c.Vertices.push(this.createVertex(1,0,1,1,-1,1,b,1,0));c.Vertices.push(this.createVertex(1,0,0,1,-1,-1,b,0,0));for(var d=0;d<12;++d){var a=c.Vertices[d].Pos;a.multiplyThisWithScal(e);a.X-=e*0.5;a.Y-=e*0.5;a.Z-=e*0.5}c.recalculateBoundingBox();this.OwnedMesh.Box=c.Box.clone();this.init()};CL3D.CubeSceneNode.prototype=new CL3D.MeshSceneNode();CL3D.CubeSceneNode.prototype.createVertex=function(g,f,e,d,c,b,j,i,h){var a=new CL3D.Vertex3D(true);a.Pos.X=g;a.Pos.Y=f;a.Pos.Z=e;a.Normal.X=d;a.Normal.Y=c;a.Normal.Z=b;a.TCoords.X=i;a.TCoords.Y=h;return a};CL3D.CubeSceneNode.prototype.createClone=function(a){var b=new CL3D.CubeSceneNode();this.cloneMembers(b,a);b.OwnedMesh=this.OwnedMesh;b.ReadonlyMaterials=this.ReadonlyMaterials;b.DoesCollision=this.DoesCollision;if(this.Box){b.Box=this.Box.clone()}return b};CL3D.BillboardSceneNode=function(){this.init();this.Box=new CL3D.Box3d();this.SizeX=10;this.SizeY=10;this.IsVertical=false;this.MeshBuffer=new CL3D.MeshBuffer();this.vtx1=new CL3D.Vertex3D(true);this.vtx2=new CL3D.Vertex3D(true);this.vtx3=new CL3D.Vertex3D(true);this.vtx4=new CL3D.Vertex3D(true);var c=this.MeshBuffer.Indices;c.push(0);c.push(2);c.push(1);c.push(0);c.push(3);c.push(2);var a=this.MeshBuffer.Vertices;a.push(this.vtx1);a.push(this.vtx2);a.push(this.vtx3);a.push(this.vtx4);this.vtx1.TCoords.X=1;this.vtx1.TCoords.Y=1;this.vtx2.TCoords.X=1;this.vtx2.TCoords.Y=0;this.vtx3.TCoords.X=0;this.vtx3.TCoords.Y=0;this.vtx4.TCoords.X=0;this.vtx4.TCoords.Y=1;for(var b=0;b<4;++b){this.Box.addInternalPointByVector(a[b].Pos)}};CL3D.BillboardSceneNode.prototype=new CL3D.SceneNode();CL3D.BillboardSceneNode.prototype.getBoundingBox=function(){return this.Box};CL3D.BillboardSceneNode.prototype.getType=function(){return"billboard"};CL3D.BillboardSceneNode.prototype.OnRegisterSceneNode=function(a){if(this.Visible){a.registerNodeForRendering(this,this.MeshBuffer.Mat.isTransparent()?CL3D.Scene.RENDER_MODE_TRANSPARENT:CL3D.Scene.RENDER_MODE_DEFAULT);CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this,a)}};CL3D.BillboardSceneNode.prototype.render=function(k){var a=this.scene.getActiveCamera();if(!a){return}var e=this.IsVertical;if(!e){var m=this.getAbsolutePosition();var n=k.getStaticBillboardMeshBuffer();var g=new CL3D.Matrix4(true);g.setScale(new CL3D.Vect3d(this.SizeX*0.5,this.SizeY*0.5,0));var i=k.getView().clone();i.setTranslation(new CL3D.Vect3d(0,0,0));var o=new CL3D.Matrix4(true);i.getInverse(o);o.setTranslation(m);g=o.multiply(g);k.setWorld(g);k.setMaterial(this.MeshBuffer.Mat);k.drawMeshBuffer(n)}else{var m=this.getAbsolutePosition();var c=a.getAbsolutePosition();var h=a.getTarget();var f=a.getUpVector();var l=h.substract(c);l.normalize();var b=f.crossProduct(l);if(b.getLengthSQ()==0){b.set(f.Y,f.X,f.Z)}b.normalize();b.multiplyThisWithScal(0.5*this.SizeX);var d=b.crossProduct(l);d.normalize();d.multiplyThisWithScal(0.5*this.SizeY);if(this.IsVertical){d.set(0,-0.5*this.SizeY,0)}l.multiplyThisWithScal(1);this.vtx1.Pos.setTo(m);this.vtx1.Pos.addToThis(b);this.vtx1.Pos.addToThis(d);this.vtx2.Pos.setTo(m);this.vtx2.Pos.addToThis(b);this.vtx2.Pos.substractFromThis(d);this.vtx3.Pos.setTo(m);this.vtx3.Pos.substractFromThis(b);this.vtx3.Pos.substractFromThis(d);this.vtx4.Pos.setTo(m);this.vtx4.Pos.substractFromThis(b);this.vtx4.Pos.addToThis(d);this.MeshBuffer.update();var j=new CL3D.Matrix4(true);k.setWorld(j);k.setMaterial(this.MeshBuffer.Mat);k.drawMeshBuffer(this.MeshBuffer)}};CL3D.BillboardSceneNode.prototype.getMaterialCount=function(){return 1};CL3D.BillboardSceneNode.prototype.getMaterial=function(a){return this.MeshBuffer.Mat};CL3D.BillboardSceneNode.prototype.createClone=function(a){var b=new CL3D.BillboardSceneNode();this.cloneMembers(b,a);if(this.Box){b.Box=this.Box.clone()}b.SizeX=this.SizeX;b.SizeY=this.SizeY;b.IsVertical=this.IsVertical;b.MeshBuffer.Mat=this.MeshBuffer.Mat.clone();return b};CL3D.BillboardSceneNode.prototype.getSize=function(){return new CL3D.Vect2d(this.SizeX,this.SizeY)};CL3D.BillboardSceneNode.prototype.setSize=function(a,b){this.SizeX=a;this.SizeY=b};CL3D.PathSceneNode=function(){this.init();this.Box=new CL3D.Box3d();this.Tightness=0;this.IsClosedCircle=false;this.Nodes=new Array()};CL3D.PathSceneNode.prototype=new CL3D.SceneNode();CL3D.PathSceneNode.prototype.Tightness=0;CL3D.PathSceneNode.prototype.IsClosedCircle=false;CL3D.PathSceneNode.prototype.Nodes=new Array();CL3D.PathSceneNode.prototype.getBoundingBox=function(){return this.Box};CL3D.PathSceneNode.prototype.getType=function(){return"path"};CL3D.PathSceneNode.prototype.createClone=function(b){var e=new CL3D.PathSceneNode();this.cloneMembers(e,b);if(this.Box){e.Box=this.Box.clone()}e.Tightness=this.Tightness;e.IsClosedCircle=this.IsClosedCircle;e.Nodes=new Array();for(var a=0;a<this.Nodes.length;++a){var d=this.Nodes[a];e.Nodes.push(d.clone())}return e};CL3D.PathSceneNode.prototype.getPathNodePosition=function(a){if(a<0||a>=this.Nodes.length){return new CL3D.Vect3d(0,0,0)}if(!this.AbsoluteTransformation){this.updateAbsolutePosition()}var b=this.Nodes[a];b=b.clone();this.AbsoluteTransformation.transformVect(b);return b};CL3D.PathSceneNode.prototype.clampPathIndex=function(a,b){if(this.IsClosedCircle){return(a<0?(b+a):((a>=b)?(a-b):a))}return((a<0)?0:((a>=b)?(b-1):a))};CL3D.PathSceneNode.prototype.getPointOnPath=function(p,a){var h=this.Nodes.length;if(this.IsClosedCircle){p*=h}else{p=CL3D.clamp(p,0,1);p*=h-1}var e=new CL3D.Vect3d();if(h==0){return e}if(h==1){return e}var b=p;var o=CL3D.fract(b);var l=Math.floor(b)%h;var q=this.Nodes[this.clampPathIndex(l-1,h)];var n=this.Nodes[this.clampPathIndex(l+0,h)];var m=this.Nodes[this.clampPathIndex(l+1,h)];var k=this.Nodes[this.clampPathIndex(l+2,h)];var j=2*o*o*o-3*o*o+1;var i=-2*o*o*o+3*o*o;var g=o*o*o-2*o*o+o;var f=o*o*o-o*o;var d=m.substract(q);d.multiplyThisWithScal(this.Tightness);var c=k.substract(n);c.multiplyThisWithScal(this.Tightness);e=n.multiplyWithScal(j);e.addToThis(m.multiplyWithScal(i));e.addToThis(d.multiplyWithScal(g));e.addToThis(c.multiplyWithScal(f));if(!a){if(!this.AbsoluteTransformation){this.updateAbsolutePosition()}this.AbsoluteTransformation.transformVect(e)}return e};CL3D.Overlay2DSceneNode=function(a){this.init();this.engine=a;this.Box=new CL3D.Box3d();this.PosAbsoluteX=100;this.PosAbsoluteY=100;this.SizeAbsoluteWidth=50;this.SizeAbsoluteHeight=50;this.PosRelativeX=0.5;this.PosRelativeY=0.5;this.SizeRelativeWidth=1/6;this.SizeRelativeHeight=1/6;this.SizeModeIsAbsolute=true;this.ShowBackGround=true;this.BackGroundColor=0;this.Texture=null;this.TextureHover=null;this.RetainAspectRatio=true;this.DrawText=false;this.TextAlignment=1;this.Text="";this.FontName="";this.TextColor=0;this.AnimateOnHover=false;this.OnHoverSetFontColor=false;this.HoverFontColor=false;this.OnHoverSetBackgroundColor=false;this.HoverBackgroundColor=false;this.OnHoverDrawTexture=false;this.TextTexture=null;this.TextHoverTexture=null;this.CreatedTextTextureText="";this.CreatedTextTextureFontName="";this.CurrentFontPixelHeight=0};CL3D.Overlay2DSceneNode.prototype=new CL3D.SceneNode();CL3D.Overlay2DSceneNode.prototype.getBoundingBox=function(){return this.Box};CL3D.Overlay2DSceneNode.prototype.getType=function(){return"2doverlay"};CL3D.Overlay2DSceneNode.prototype.set2DPosition=function(b,d,c,a){this.PosAbsoluteX=b;this.PosAbsoluteY=d;this.SizeAbsoluteWidth=c;this.SizeAbsoluteHeight=a;this.SizeModeIsAbsolute=true};CL3D.Overlay2DSceneNode.prototype.setShowBackgroundColor=function(b,a){this.ShowBackGround=b;if(this.ShowBackGround){this.BackGroundColor=a}};CL3D.Overlay2DSceneNode.prototype.setShowImage=function(a){this.Texture=a};CL3D.Overlay2DSceneNode.prototype.setText=function(a){this.Text=a;this.DrawText=this.Text!=null&&this.Text!=""};CL3D.Overlay2DSceneNode.prototype.OnRegisterSceneNode=function(a){if(this.Visible){a.registerNodeForRendering(this,CL3D.Scene.RENDER_MODE_2DOVERLAY);CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this,a)}};CL3D.Overlay2DSceneNode.prototype.render=function(l){var d=this.getScreenCoordinatesRect(true,l);var f=d;var k=false;if(this.engine!=null&&this.AnimateOnHover){var c=this.engine.getMouseX();var b=this.engine.getMouseY();k=(d.x<=c&&d.y<=b&&d.x+d.w>=c&&d.y+d.h>=b)}if(k&&this.OnHoverSetBackgroundColor){l.draw2DRectangle(d.x,d.y,d.w,d.h,this.HoverBackgroundColor,true)}else{if(this.ShowBackGround){l.draw2DRectangle(d.x,d.y,d.w,d.h,this.BackGroundColor,true)}}var n=this.Texture;if(k&&this.TextureHover&&this.OnHoverDrawTexture){n=this.TextureHover}if(n!=null&&n.isLoaded()){var m=n.getWidth();var j=n.getHeight();if(!this.RetainAspectRatio){l.draw2DImage(d.x,d.y,d.w,d.h,n,true)}else{if(m&&j&&d.h&&d.w){var p=j/m;var a=d.w;var o=a*p;if(o>d.h){var r=d.h/o;a*=r;o*=r}d.w=a;d.h=o;f=d;l.draw2DImage(d.x,d.y,d.w,d.h,n,true)}}}if(this.DrawText&&this.FontName&&this.Text!=""){this.createNewTextTexturesIfNecessary(l);var i=this.TextTexture;var e=this.TextColor;if(k){if(this.TextHoverTexture){i=this.TextHoverTexture}e=this.HoverFontColor}if(i){var g=i.OriginalWidth;var q=i.OriginalHeight;if(this.TextAlignment==0){l.draw2DFontImage(d.x,d.y,g,q,i,e)}else{l.draw2DFontImage(d.x+((d.w-g)/2),d.y+((d.h-q)/2),g,q,i,e)}}}else{this.destroyTextTextures(l)}};CL3D.Overlay2DSceneNode.prototype.destroyTextTextures=function(a){a.deleteTexture(this.TextTexture);a.deleteTexture(this.TextHoverTexture);this.TextTexture=null;this.TextHoverTexture=null};CL3D.Overlay2DSceneNode.prototype.createNewTextTexturesIfNecessary=function(f){var d=false;var a=this.TextTexture==null||(d&&this.TextHoverTexture==null);if(!a){a=this.CreatedTextTextureText!=this.Text||this.CreatedTextTextureFontName!=this.FontName}if(!a){return}this.destroyTextTextures(f);var b=document.createElement("canvas");if(b==null){return}b.width=1;b.height=1;var h=b.getContext("2d");if(h==null){return}var i=12;var c=this.parseCopperCubeFontString(this.FontName);h.font=c;var e=h.measureText(this.Text);b.width=e.width;b.height=this.CurrentFontPixelHeight*1.2;h.fillStyle="rgba(0, 0, 0, 1)";h.fillRect(0,0,b.width,b.height);h.fillStyle="rgba(255, 255, 255, 1)";h.textBaseline="top";h.font=c;h.fillText(this.Text,0,0);var g=f.createTextureFrom2DCanvas(b,true);this.TextTexture=g;this.TextHoverTexture=g;this.CreatedTextTextureText=this.Text;this.CreatedTextTextureFontName=this.FontName};CL3D.Overlay2DSceneNode.prototype.getMaterialCount=function(){return 0};CL3D.Overlay2DSceneNode.prototype.getScreenCoordinatesRect=function(d,e){var b=e.getWidth();var c=e.getHeight();var a=new Object();if(this.SizeModeIsAbsolute){a.x=this.PosAbsoluteX;a.y=this.PosAbsoluteY;a.w=this.SizeAbsoluteWidth;a.h=this.SizeAbsoluteHeight}else{a.x=this.PosRelativeX*b;a.y=this.PosRelativeY*c;a.w=this.SizeRelativeWidth*b;a.h=this.SizeRelativeHeight*c}return a};CL3D.Overlay2DSceneNode.prototype.createClone=function(a){var b=new CL3D.Overlay2DSceneNode();this.cloneMembers(b,a);b.PosAbsoluteX=this.PosAbsoluteX;b.PosAbsoluteY=this.PosAbsoluteY;b.SizeAbsoluteWidth=this.SizeAbsoluteWidth;b.SizeAbsoluteHeight=this.SizeAbsoluteHeight;b.PosRelativeX=this.PosRelativeX;b.PosRelativeY=this.PosRelativeY;b.SizeRelativeWidth=this.SizeRelativeWidth;b.SizeRelativeHeight=this.SizeRelativeHeight;b.SizeModeIsAbsolute=this.SizeModeIsAbsolute;b.ShowBackGround=this.ShowBackGround;b.BackGroundColor=this.BackGroundColor;b.Texture=this.Texture;b.TextureHover=this.TextureHover;b.RetainAspectRatio=this.RetainAspectRatio;b.DrawText=this.DrawText;b.TextAlignment=this.TextAlignment;b.Text=this.Text;b.FontName=this.FontName;b.TextColor=this.TextColor;b.AnimateOnHover=this.AnimateOnHover;b.OnHoverSetFontColor=this.OnHoverSetFontColor;b.HoverFontColor=this.HoverFontColor;b.OnHoverSetBackgroundColor=this.OnHoverSetBackgroundColor;b.HoverBackgroundColor=this.HoverBackgroundColor;b.OnHoverDrawTexture=this.OnHoverDrawTexture;return b};CL3D.Overlay2DSceneNode.prototype.parseCopperCubeFontString=function(c){var d=12;var f="Arial";var g=false;var a=false;if(c.indexOf("#fnt_")==0){c=c.substr(5)}var k=c.split(";");for(var e=0;e<k.length;++e){var l=k[e];var b=l.toLowerCase();if(e==0){var j=parseInt(b);d=j}else{if(e==2){f=l}else{if(e==3){if(b.indexOf("italic")!=-1){g=true}}else{if(e==4){if(b.indexOf("bold")!=-1){a=true}}}}}}var h="";if(g){h+="italic "}if(a){h+="bold "}this.CurrentFontPixelHeight=(d*96/72);h+=this.CurrentFontPixelHeight+"px ";h+=f;return h};CL3D.HotspotSceneNode=function(){this.Box=new CL3D.Box3d();this.Width=0;this.Height=0};CL3D.HotspotSceneNode.prototype=new CL3D.SceneNode();CL3D.DummyTransformationSceneNode=function(){this.init();this.Box=new CL3D.Box3d()};CL3D.DummyTransformationSceneNode.prototype=new CL3D.SceneNode();CL3D.DummyTransformationSceneNode.prototype.createClone=function(a){var b=new CL3D.DummyTransformationSceneNode();this.cloneMembers(b,a);if(this.Box){b.Box=this.Box.clone()}return b};CL3D.AnimatedMeshSceneNode=function(){this.init();this.Box=new CL3D.Box3d();this.DoesCollision=false;this.Mesh=null;this.Selector=null;this.LastLODSkinnedAnimationTime=0;this.Transiting=0;this.TransitingBlend=0;this.Materials=new Array();this.FramesPerSecond=25/100;this.BeginFrameTime=CL3D.CLTimer.getTime();this.FrameWhenCurrentMeshWasGenerated=0;this.StartFrame=0;this.EndFrame=0;this.Looping=false;this.CurrentFrameNr=0;this.MinimalUpdateDelay=20};CL3D.AnimatedMeshSceneNode.prototype=new CL3D.SceneNode();CL3D.AnimatedMeshSceneNode.prototype.getBoundingBox=function(){return this.Box};CL3D.AnimatedMeshSceneNode.prototype.getNamedAnimationCount=function(){if(this.Mesh&&this.Mesh.NamedAnimationRanges){return this.Mesh.NamedAnimationRanges.length}return 0};CL3D.AnimatedMeshSceneNode.prototype.getNamedAnimationInfo=function(b){var a=this.getNamedAnimationCount();if(b>=0&&b<a){return this.Mesh.NamedAnimationRanges[b]}return null};CL3D.AnimatedMeshSceneNode.prototype.setAnimation=function(a){if(!this.Mesh){return false}var b=this.Mesh.getNamedAnimationRangeByName(a);if(!b){return false}this.setFrameLoop(b.Begin,b.End);this.setAnimationSpeed(b.FPS);return true};CL3D.AnimatedMeshSceneNode.prototype.setMesh=function(a){if(!a){return}this.Mesh=a;this.Box=a.getBoundingBox();this.setFrameLoop(0,a.getFrameCount())};CL3D.AnimatedMeshSceneNode.prototype.getType=function(){return"animatedmesh"};CL3D.AnimatedMeshSceneNode.prototype.OnRegisterSceneNode=function(a){if(this.Visible&&this.Mesh){a.registerNodeForRendering(this,CL3D.Scene.RENDER_MODE_DEFAULT);CL3D.SceneNode.prototype.OnRegisterSceneNode.call(this,a)}};CL3D.AnimatedMeshSceneNode.prototype.render=function(a){a.setWorld(this.AbsoluteTransformation);a.drawMesh(this.OwnedMesh)};CL3D.AnimatedMeshSceneNode.prototype.getMaterialCount=function(){if(this.OwnedMesh){return this.OwnedMesh.MeshBuffers.length}return 0};CL3D.AnimatedMeshSceneNode.prototype.getMaterial=function(a){if(this.Materials){if(a>=0&&a<this.Materials.length){return this.Materials[a]}else{if(this.Mesh&&this.Mesh.AnimatedMeshesToLink&&(a>=0)&&(this.Materials.length==a)&&(a<256)){var b=new CL3D.Material();this.Materials.push(b);return b}}}return null};CL3D.AnimatedMeshSceneNode.prototype.createClone=function(b){var d=new CL3D.AnimatedMeshSceneNode();this.cloneMembers(d,b);d.Mesh=this.Mesh;if(this.Box){d.Box=this.Box.clone()}d.DoesCollision=this.DoesCollision;d.Selector=this.Selector;d.LastLODSkinnedAnimationTime=this.LastLODSkinnedAnimationTime;d.Transiting=this.Transiting;d.TransitingBlend=this.TransitingBlend;d.Materials=new Array();for(var a=0;a<this.Materials.length;++a){d.Materials.push(this.Materials[a].clone())}d.FramesPerSecond=this.FramesPerSecond;d.BeginFrameTime=this.BeginFrameTime;d.FrameWhenCurrentMeshWasGenerated=this.FrameWhenCurrentMeshWasGenerated;d.StartFrame=this.StartFrame;d.EndFrame=this.EndFrame;d.Looping=this.Looping;d.CurrentFrameNr=this.CurrentFrameNr;d.MinimalUpdateDelay=this.MinimalUpdateDelay;return d};CL3D.AnimatedMeshSceneNode.prototype.setAnimationSpeed=function(a){this.FramesPerSecond=a};CL3D.AnimatedMeshSceneNode.prototype.setLoopMode=function(a){this.Looping=a};CL3D.AnimatedMeshSceneNode.prototype.setFrameLoop=function(c,a){if(!this.Mesh){return false}var b=this.Mesh.getFrameCount()-1;if(a<c){this.StartFrame=CL3D.clamp(a,0,b);this.EndFrame=CL3D.clamp(c,this.StartFrame,b)}else{this.StartFrame=CL3D.clamp(c,0,b);this.EndFrame=CL3D.clamp(a,this.StartFrame,b)}this.setCurrentFrame(this.StartFrame);return true};CL3D.AnimatedMeshSceneNode.prototype.setCurrentFrame=function(a){this.CurrentFrameNr=CL3D.clamp(a,this.StartFrame,this.EndFrame);this.BeginFrameTime=CL3D.CLTimer.getTime()-Math.floor((this.CurrentFrameNr-this.StartFrame)/this.FramesPerSecond)};CL3D.AnimatedMeshSceneNode.prototype.buildFrameNr=function(d){var c=0;if(this.Transiting!=0){this.TransitingBlend=(d-this.BeginFrameTime)*this.Transiting;if(this.TransitingBlend>1){this.Transiting=0;this.TransitingBlend=0}}if(this.StartFrame==this.EndFrame){return this.StartFrame}if(this.FramesPerSecond==0){return this.StartFrame}var b=0;if(this.Looping){var a=Math.abs(Math.floor((this.EndFrame-this.StartFrame)/this.FramesPerSecond));if(this.FramesPerSecond>0){b=this.StartFrame+((d-this.BeginFrameTime)%a)*this.FramesPerSecond}else{b=this.EndFrame-((d-this.BeginFrameTime)%a)*-this.FramesPerSecond}}else{if(this.FramesPerSecond>0){c=(d-this.BeginFrameTime)*this.FramesPerSecond;b=this.StartFrame+c;if(b>this.EndFrame){b=this.EndFrame}}else{c=(d-this.BeginFrameTime)*(-this.FramesPerSecond);b=this.EndFrame-c;if(b<this.StartFrame){b=this.StartFrame}}}return b};CL3D.AnimatedMeshSceneNode.prototype.getFrameNr=function(){return this.CurrentFrameNr};CL3D.AnimatedMeshSceneNode.prototype.calculateMeshForCurrentFrame=function(){var d=this.Mesh;if(!d){return}var b=false;b=d.animateMesh(this.getFrameNr(),1);if(b){d.skinMesh();d.updateBoundingBox();this.Box=d.getBoundingBox().clone();for(var c=0;c<d.LocalBuffers.length;++c){var a=d.LocalBuffers[c];a.update()}}this.FrameWhenCurrentMeshWasGenerated=this.CurrentFrameNr};CL3D.AnimatedMeshSceneNode.prototype.setMinimalUpdateDelay=function(a){this.MinimalUpdateDelay=a};CL3D.AnimatedMeshSceneNode.prototype.OnAnimate=function(c,e){var b=false;var a=CL3D.CLTimer.getTime();if(this.LastLODSkinnedAnimationTime==0||a-this.LastLODSkinnedAnimationTime>this.MinimalUpdateDelay){var d=this.buildFrameNr(e);b=this.CurrentFrameNr!=d;this.CurrentFrameNr=d;this.LastLODSkinnedAnimationTime=a}return CL3D.SceneNode.prototype.OnAnimate.call(this,c,e)};CL3D.AnimatedMeshSceneNode.prototype.render=function(c){c.setWorld(this.AbsoluteTransformation);var d=this.Mesh;if(d){this.calculateMeshForCurrentFrame();for(var b=0;b<d.LocalBuffers.length;++b){var a=d.LocalBuffers[b];if(b<this.Materials.length){a.Mat=this.Materials[b]}if(a.Transformation!=null){c.setWorld(this.AbsoluteTransformation.multiply(a.Transformation))}c.setMaterial(a.Mat);c.drawMeshBuffer(a);if(a.Transformation!=null){c.setWorld(this.AbsoluteTransformation)}}}};CL3D.Animator=function(){this.Type=-1};CL3D.Animator.prototype.getType=function(){return"none"};CL3D.Animator.prototype.animateNode=function(b,a){return false};CL3D.Animator.prototype.onMouseDown=function(a){};CL3D.Animator.prototype.onMouseWheel=function(a){};CL3D.Animator.prototype.onMouseUp=function(a){};CL3D.Animator.prototype.onMouseMove=function(a){};CL3D.Animator.prototype.onKeyDown=function(a){};CL3D.Animator.prototype.onKeyUp=function(a){};CL3D.Animator.prototype.reset=function(a){};CL3D.AnimatorCameraFPS=function(b,a){this.Type=-1;this.lastAnimTime=0;this.NoVerticalMovement=false;this.moveByMouseDown=true;this.moveByMouseMove=false;this.moveByPanoDrag=false;this.leftKeyDown=false;this.rightKeyDown=false;this.upKeyDown=false;this.downKeyDown=false;this.jumpKeyDown=false;this.relativeRotationX=0;this.relativeRotationY=0;this.minZoom=20;this.maxZoom=100;this.zoomSpeed=(this.maxZoom-this.minZoom)/50;this.startZoomValue=this.minZoom;this.targetZoomValue=90;this.lastAnimTime=CL3D.CLTimer.getTime();this.Camera=b;this.CursorControl=a;if(b){this.lookAt(b.getTarget())}};CL3D.AnimatorCameraFPS.prototype=new CL3D.Animator();CL3D.AnimatorCameraFPS.prototype.getType=function(){return"camerafps"};CL3D.AnimatorCameraFPS.prototype.MaxVerticalAngle=88;CL3D.AnimatorCameraFPS.prototype.MoveSpeed=0.06;CL3D.AnimatorCameraFPS.prototype.RotateSpeed=200;CL3D.AnimatorCameraFPS.prototype.JumpSpeed=0;CL3D.AnimatorCameraFPS.prototype.NoVerticalMovement=false;CL3D.AnimatorCameraFPS.prototype.MayMove=true;CL3D.AnimatorCameraFPS.prototype.MayZoom=true;CL3D.AnimatorCameraFPS.prototype.setMayMove=function(a){this.MayMove=a};CL3D.AnimatorCameraFPS.prototype.setLookByMouseDown=function(a){this.moveByMouseDown=a;this.moveByMouseMove=!a};CL3D.AnimatorCameraFPS.prototype.lookAt=function(b){if(this.Camera==null){return}var a=b.substract(this.Camera.Pos);a=a.getHorizontalAngle();this.relativeRotationX=a.X;this.relativeRotationY=a.Y;if(this.relativeRotationX>this.MaxVerticalAngle){this.relativeRotationX-=360}};CL3D.AnimatorCameraFPS.prototype.animateNode=function(k,u){if(this.Camera==null){return false}var b=CL3D.CLTimer.getTime();var j=b-this.lastAnimTime;if(j>250){j=250}this.lastAnimTime=b;var e=this.Camera.Pos.clone();if(this.MayMove&&(this.upKeyDown||this.downKeyDown)){var g=this.Camera.Pos.substract(this.Camera.getTarget());if(this.NoVerticalMovement){g.Y=0}g.normalize();if(this.upKeyDown){e.addToThis(g.multiplyWithScal(this.MoveSpeed*-j))}if(this.downKeyDown){e.addToThis(g.multiplyWithScal(this.MoveSpeed*j))}}if(this.MayMove&&(this.leftKeyDown||this.rightKeyDown)){var d=this.Camera.Pos.substract(this.Camera.getTarget()).crossProduct(this.Camera.getUpVector());d.normalize();if(this.leftKeyDown){d=d.multiplyWithScal(this.MoveSpeed*-j);e.addToThis(d);this.Camera.setTarget(this.Camera.getTarget().add(d))}if(this.rightKeyDown){d=d.multiplyWithScal(this.MoveSpeed*j);e.addToThis(d);this.Camera.setTarget(this.Camera.getTarget().add(d))}}this.Camera.Pos=e;if(this.MayZoom){var h=CL3D.radToDeg(this.Camera.getFov());this.targetZoomValue+=this.getAdditionalZoomDiff()*j;if(this.targetZoomValue<this.minZoom){this.targetZoomValue=this.minZoom}if(this.targetZoomValue>this.maxZoom){this.targetZoomValue=this.maxZoom}var r=this.zoomSpeed;r=Math.abs(this.targetZoomValue-h)/8;if(r<this.zoomSpeed){r=this.zoomSpeed}if(h<this.maxZoom-r&&h<this.targetZoomValue){h+=r;if(h>this.maxZoom){h=this.maxZoom}}if(h>this.minZoom+r&&h>this.targetZoomValue){h-=r;if(h<this.minZoom){h=this.minZoom}}this.Camera.setFov(CL3D.degToRad(h))}var w=new CL3D.Vect3d(0,0,1);var s=new CL3D.Matrix4();s.setRotationDegrees(new CL3D.Vect3d(this.relativeRotationX,this.relativeRotationY,0));s.transformVect(w);var t=300;var c=0;var m=1/50000;var l=1/50000;if(this.moveByMouseDown){}if(this.moveByMouseMove){var f=this.CursorControl.getRenderer().getHeight();var o=this.CursorControl.getMouseY();if(f>0&&o>0&&this.CursorControl.isMouseOverCanvas()){c=Math.sin((o-(f/2))/f)*100*0.5}}else{if(this.moveByMouseDown||this.moveByPanoDrag){if(this.CursorControl.isMouseDown()){c=this.CursorControl.getMouseY()-this.CursorControl.getMouseDownY();if(c!=0){this.CursorControl.LastCameraDragTime=b}}}}c+=this.getAdditionalYLookDiff();if(c>t){c=t}if(c<-t){c=-t}this.relativeRotationX+=c*(j*(this.RotateSpeed*l));if(this.relativeRotationX<-this.MaxVerticalAngle){this.relativeRotationX=-this.MaxVerticalAngle}if(this.relativeRotationX>this.MaxVerticalAngle){this.relativeRotationX=this.MaxVerticalAngle}var i=0;if(this.moveByMouseMove){var q=this.CursorControl.getRenderer().getWidth();var p=this.CursorControl.getMouseX();if(q>0&&p>0&&this.CursorControl.isMouseOverCanvas()){i=Math.sin((p-(q/2))/q)*100*0.5}}else{if(this.moveByMouseDown||this.moveByPanoDrag){if(this.CursorControl.isMouseDown()){i=(this.CursorControl.getMouseX()-this.CursorControl.getMouseDownX());if(i!=0){this.CursorControl.LastCameraDragTime=b}}}}i+=this.getAdditionalXLookDiff();if(i>t){i=t}if(i<-t){i=-t}this.relativeRotationY+=i*(j*(this.RotateSpeed*m));if(this.moveByMouseDown||this.moveByPanoDrag){this.CursorControl.setMouseDownWhereMouseIsNow()}if(this.MayMove&&this.jumpKeyDown){var v=k.getAnimatorOfType("collisionresponse");if(v&&!v.isFalling()){v.jump(this.JumpSpeed)}}this.Camera.setTarget(this.Camera.Pos.add(w));return false};CL3D.AnimatorCameraFPS.prototype.onMouseDown=function(a){CL3D.Animator.prototype.onMouseDown.call(this,a)};CL3D.AnimatorCameraFPS.prototype.onMouseWheel=function(a){CL3D.Animator.prototype.onMouseWheel.call(this,a);this.targetZoomValue+=a.delta*this.zoomSpeed;if(this.targetZoomValue<this.minZoom){this.targetZoomValue=this.minZoom}if(this.targetZoomValue>this.maxZoom){this.targetZoomValue=this.maxZoom}};CL3D.AnimatorCameraFPS.prototype.onMouseUp=function(a){CL3D.Animator.prototype.onMouseUp.call(this,a)};CL3D.AnimatorCameraFPS.prototype.onMouseMove=function(a){CL3D.Animator.prototype.onMouseMove.call(this,a)};CL3D.AnimatorCameraFPS.prototype.setKeyBool=function(b,a){if(a==37||a==65){this.leftKeyDown=b;if(b){this.rightKeyDown=false}}if(a==39||a==68){this.rightKeyDown=b;if(b){this.leftKeyDown=false}}if(a==38||a==87){this.upKeyDown=b;if(b){this.downKeyDown=false}}if(a==40||a==83){this.downKeyDown=b;if(b){this.upKeyDown=false}}if(a==32){this.jumpKeyDown=b}};CL3D.AnimatorCameraFPS.prototype.onKeyDown=function(a){this.setKeyBool(true,a.keyCode)};CL3D.AnimatorCameraFPS.prototype.onKeyUp=function(a){this.setKeyBool(false,a.keyCode)};CL3D.AnimatorCameraFPS.prototype.getAdditionalXLookDiff=function(){return 0};CL3D.AnimatorCameraFPS.prototype.getAdditionalYLookDiff=function(){return 0};CL3D.AnimatorCameraFPS.prototype.getAdditionalZoomDiff=function(){return 0};CL3D.AnimatorCameraModelViewer=function(b,a){this.Type=-1;this.RotateSpeed=0.06;this.Radius=100;this.NoVerticalMovement=false;this.lastAnimTime=CL3D.CLTimer.getTime();this.Camera=b;this.CursorControl=a};CL3D.AnimatorCameraModelViewer.prototype=new CL3D.Animator();CL3D.AnimatorCameraModelViewer.prototype.getType=function(){return"cameramodelviewer"};CL3D.AnimatorCameraModelViewer.prototype.RotateSpeed=0.06;CL3D.AnimatorCameraModelViewer.prototype.Radius=100;CL3D.AnimatorCameraModelViewer.prototype.NoVerticalMovement=false;CL3D.AnimatorCameraModelViewer.prototype.animateNode=function(e,c){if(this.Camera==null){return false}var b=CL3D.CLTimer.getTime();var a=b-this.lastAnimTime;if(a>250){a=250}this.lastAnimTime=b;var m=this.Camera.Pos.clone();var i=this.Camera.Target.clone();var l=i.substract(this.Camera.getAbsolutePosition());var f=0;var d=0;if(this.CursorControl.isMouseDown()){f=(this.CursorControl.getMouseX()-this.CursorControl.getMouseDownX())*this.RotateSpeed/50000;d=(this.CursorControl.getMouseY()-this.CursorControl.getMouseDownY())*this.RotateSpeed/50000}var k=l.crossProduct(this.Camera.UpVector);k.Y=0;k.normalize();if(!CL3D.iszero(f)){k.multiplyThisWithScal(a*f);m.addToThis(k)}if(!this.NoVerticalMovement&&!CL3D.iszero(d)){var h=this.Camera.UpVector.clone();h.normalize();var j=m.add(h.multiplyWithScal(a*d));var g=j.clone();g.Y=i.Y;var o=this.Radius/10;if(g.getDistanceTo(i)>o){m=j}}this.CursorControl.setMouseDownWhereMouseIsNow();l=m.substract(i);l.setLength(this.Radius);m=i.add(l);this.Camera.Pos=m;return false};CL3D.AnimatorFollowPath=function(a){this.TimeNeeded=5000;this.TriedToLinkWithPath=false;this.IsCamera=false;this.LookIntoMovementDirection=false;this.OnlyMoveWhenCameraActive=true;this.TimeDisplacement=0;this.LastTimeCameraWasInactive=true;this.EndMode=CL3D.AnimatorFollowPath.EFPFEM_START_AGAIN;this.SwitchedToNextCamera=false;this.Manager=a;this.StartTime=0;this.TriedToLinkWithPath=false;this.LastObject=null;this.PathNodeToFollow=null;this.SwitchedToNextCamera=false;this.PathToFollow=null;this.TimeDisplacement=0;this.AdditionalRotation=null;this.CameraToSwitchTo=null};CL3D.AnimatorFollowPath.prototype=new CL3D.Animator();CL3D.AnimatorFollowPath.EFPFEM_START_AGAIN=0;CL3D.AnimatorFollowPath.EFPFEM_STOP=1;CL3D.AnimatorFollowPath.EFPFEM_SWITCH_TO_CAMERA=2;CL3D.AnimatorFollowPath.prototype.getType=function(){return"followpath"};CL3D.AnimatorFollowPath.prototype.setOptions=function(b,c,a){this.EndMode=b;this.LookIntoMovementDirection=a;this.TimeNeeded=c};CL3D.AnimatorFollowPath.prototype.animateNode=function(d,c){if(d==null||!this.Manager||!this.TimeNeeded){return false}if(!(d===this.LastObject)){this.setNode(d);return false}this.linkWithPath();if(this.PathNodeToFollow==null){return false}var f=false;var a=null;if(this.IsCamera&&this.OnlyMoveWhenCameraActive){var e=!this.LastTimeCameraWasInactive;a=d;if(!(this.Manager.getActiveCamera()===a)){if(this.PathNodeToFollow.Nodes.length){a.Pos=this.PathNodeToFollow.getPathNodePosition(0)}this.LastTimeCameraWasInactive=true;return false}else{this.LastTimeCameraWasInactive=false}if(!this.StartTime||!e){this.StartTime=c}}if(!this.StartTime){this.StartTime=this.Manager.getStartTime()}var o=(c-this.StartTime+this.TimeDisplacement)/this.TimeNeeded;if(o>1&&!this.PathNodeToFollow.IsClosedCircle){switch(this.EndMode){case CL3D.AnimatorFollowPath.EFPFEM_START_AGAIN:o=o%1;break;case CL3D.AnimatorFollowPath.EFPFEM_STOP:o=1;break;case CL3D.AnimatorFollowPath.EFPFEM_SWITCH_TO_CAMERA:o=1;if(!this.SwitchedToNextCamera){this.switchToNextCamera();this.SwitchedToNextCamera=true}break}}else{this.SwitchedToNextCamera=false}var l=this.PathNodeToFollow.getPointOnPath(o);f=!l.equals(d.Pos);d.Pos=l;if(this.LookIntoMovementDirection&&this.PathNodeToFollow.Nodes.length){var g=o+0.001;var h;if(this.PathNodeToFollow.IsClosedCircle){h=this.PathNodeToFollow.getPointOnPath(g)}else{h=this.PathNodeToFollow.getPointOnPath(g)}if(!CL3D.iszero(h.getDistanceTo(l))){var k=h.substract(l);k.setLength(100);if(this.IsCamera){a=d;var j=l.add(k);f=f||!j.equals(a.Target);a.setTarget(j)}else{var b;if(!this.AdditionalRotation||this.AdditionalRotation.equalsZero()){b=k.getHorizontalAngle();f=f||!b.equals(d.Rot);d.Rot=b}else{var m=new CL3D.Matrix4();m.setRotationDegrees(k.getHorizontalAngle());var i=new CL3D.Matrix4();i.setRotationDegrees(this.AdditionalRotation);m=m.multiply(i);b=m.getRotationDegrees();f=f||!b.equals(d.Rot);d.Rot=b}}}}return f};CL3D.AnimatorFollowPath.prototype.setNode=function(a){this.LastObject=a;if(this.LastObject){this.IsCamera=(this.LastObject.getType()=="camera")}};CL3D.AnimatorFollowPath.prototype.linkWithPath=function(){if(this.PathNodeToFollow){return}if(this.TriedToLinkWithPath){return}if(!this.PathToFollow.length){return}if(!this.Manager){return}var a=this.Manager.getSceneNodeFromName(this.PathToFollow);if(a&&a.getType()=="path"){this.setPathToFollow(a)}};CL3D.AnimatorFollowPath.prototype.setPathToFollow=function(a){this.PathNodeToFollow=a};CL3D.AnimatorFollowPath.prototype.switchToNextCamera=function(){if(!this.Manager){return}if(!this.CameraToSwitchTo.length){return}var a=this.Manager.getSceneNodeFromName(this.CameraToSwitchTo);if(a&&a.getType()=="camera"){var b=this.Manager.getLastUsedRenderer();if(b){a.setAutoAspectIfNoFixedSet(b.getWidth(),b.getHeight())}this.Manager.setActiveCamera(a)}};CL3D.AnimatorFlyStraight=function(f,c,e,b,d,a){this.Start=new CL3D.Vect3d(0,0,0);this.End=new CL3D.Vect3d(40,40,40);this.StartTime=CL3D.CLTimer.getTime();this.TimeForWay=3000;this.Loop=false;this.DeleteMeAfterEndReached=false;this.AnimateCameraTargetInsteadOfPosition=false;this.TestShootCollisionWithBullet=false;this.ShootCollisionNodeToIgnore=null;this.ShootCollisionDamage=0;this.DeleteSceneNodeAfterEndReached=false;if(f){this.Start=f.clone()}if(c){this.End=c.clone()}if(e){this.TimeForWay=e}if(b){this.Loop=b}this.recalculateImidiateValues();if(d){this.DeleteMeAfterEndReached=d}if(a){this.AnimateCameraTargetInsteadOfPosition=a}};CL3D.AnimatorFlyStraight.prototype=new CL3D.Animator();CL3D.AnimatorFlyStraight.prototype.getType=function(){return"flystraight"};CL3D.AnimatorFlyStraight.prototype.animateNode=function(f,e){var b=(e-this.StartTime);var c=false;if(b!=0){var d=this.Start.clone();if(!this.Loop&&b>=this.TimeForWay){d=this.End.clone();c=true}else{d.addToThis(this.Vector.multiplyWithScal((b%this.TimeForWay)*this.TimeFactor))}if(this.AnimateCameraTargetInsteadOfPosition){if(f.getType()=="camera"){f.setTarget(d);var a=f.getAnimatorOfType("camerafps");if(a!=null){a.lookAt(d)}}}else{f.Pos=d}if(this.TestShootCollisionWithBullet){c=this.doShootCollisionTest(f)||c}if(c){if(this.DeleteMeAfterEndReached){f.removeAnimator(this)}if(this.DeleteSceneNodeAfterEndReached&&f.Parent){f.Parent.removeChild(f)}}return true}return false};CL3D.AnimatorFlyStraight.prototype.doShootCollisionTest=function(f){if(!f){return false}f.updateAbsolutePosition();var c=f.getTransformedBoundingBox();var e=false;var a=f.scene.getAllSceneNodesWithAnimator("gameai");for(var b=0;b<a.length;++b){if(a[b]===this.ShootCollisionNodeToIgnore){continue}var d=a[b].getAnimatorOfType("gameai");if(d&&!d.isAlive()){continue}if(c.intersectsWithBox(a[b].getTransformedBoundingBox())){d.OnHit(this.ShootCollisionDamage,a[b]);e=true;break}}return e};CL3D.AnimatorFlyStraight.prototype.recalculateImidiateValues=function(){this.Vector=this.End.substract(this.Start);this.WayLength=this.Vector.getLength();this.Vector.normalize();this.TimeFactor=this.WayLength/this.TimeForWay};CL3D.AnimatorFlyCircle=function(b,a,d,c){this.Center=new CL3D.Vect3d();this.Direction=new CL3D.Vect3d(0,1,0);this.VecU=new CL3D.Vect3d();this.VecV=new CL3D.Vect3d();this.StartTime=CL3D.CLTimer.getTime();this.Speed=0.01;this.Radius=100;if(b){this.Center=b.clone()}if(a){this.Radius=a}if(d){this.Direction=d.clone()}if(c){this.Speed=c}this.init()};CL3D.AnimatorFlyCircle.prototype=new CL3D.Animator();CL3D.AnimatorFlyCircle.prototype.getType=function(){return"flycircle"};CL3D.AnimatorFlyCircle.prototype.animateNode=function(e,d){var c=(d-this.StartTime);if(c!=0){var b=c*this.Speed;var a=this.VecU.multiplyWithScal(Math.cos(b)).add(this.VecV.multiplyWithScal(Math.sin(b)));a.multiplyThisWithScal(this.Radius);e.Pos=this.Center.add(a);return true}return false};CL3D.AnimatorFlyCircle.prototype.init=function(){this.Direction.normalize();if(this.Direction.Y!=0){this.VecV=new CL3D.Vect3d(50,0,0);this.VecV=this.VecV.crossProduct(this.Direction);this.VecV.normalize()}else{this.VecV=new CL3D.Vect3d(0,50,0);this.VecV=this.VecV.crossProduct(this.Direction);this.VecV.normalize()}this.VecU=this.VecV.crossProduct(this.Direction);this.VecU.normalize()};CL3D.AnimatorRotation=function(a){this.Rotation=new CL3D.Vect3d();if(a){this.Rotation=a.clone()}this.StartTime=CL3D.CLTimer.getTime();this.RotateToTargetAndStop=false;this.RotateToTargetEndTime=0;this.BeginRotation=null};CL3D.AnimatorRotation.prototype=new CL3D.Animator();CL3D.AnimatorRotation.prototype.getType=function(){return"rotation"};CL3D.AnimatorRotation.prototype.animateNode=function(g,f){var c=f-this.StartTime;if(!this.RotateToTargetAndStop){if(c!=0){g.Rot.addToThis(this.Rotation.multiplyWithScal(c/10));this.StartTime=f;return true}}else{if(this.RotateToTargetEndTime-this.StartTime==0){return false}var e=(f-this.StartTime)/(this.RotateToTargetEndTime-this.StartTime);if(e>1){g.removeAnimator(this)}else{var a=new CL3D.Quaternion();var b=this.Rotation.multiplyWithScal(CL3D.DEGTORAD);a.setFromEuler(b.X,b.Y,b.Z);var d=new CL3D.Quaternion();b=this.BeginRotation.multiplyWithScal(CL3D.DEGTORAD);d.setFromEuler(b.X,b.Y,b.Z);d.slerp(d,a,e);b=new CL3D.Vect3d();d.toEuler(b);b.multiplyThisWithScal(CL3D.RADTODEG);g.Rot=b;return true}}return false};CL3D.AnimatorRotation.prototype.setRotateToTargetAndStop=function(b,a,c){this.RotateToTargetAndStop=true;this.Rotation=b.clone();this.BeginRotation=a.clone();this.RotateToTargetEndTime=this.StartTime+c};CL3D.AnimatorAnimateTexture=function(a,c,b){this.Textures=new Array();this.Loop=true;this.TimePerFrame=20;this.TextureChangeType=0;this.TextureIndexToChange=0;this.MyStartTime=0;if(a){this.Textures=a}if(c){this.TimePerFrame=c}if(b==true){this.loop=false}};CL3D.AnimatorAnimateTexture.prototype=new CL3D.Animator();CL3D.AnimatorAnimateTexture.prototype.getType=function(){return"animatetexture"};CL3D.AnimatorAnimateTexture.prototype.animateNode=function(c,a){if(c==null||this.Textures==null){return false}var d=false;var h=null;if(this.Textures.length){var b=(this.MyStartTime==0)?c.scene.getStartTime():this.MyStartTime;var j=(a-b);var f=b+(this.TimePerFrame*this.Textures.length);var g=0;if(!this.Loop&&a>=f){g=this.Textures.length-1}else{if(this.TimePerFrame>0){g=Math.floor((j/this.TimePerFrame)%this.Textures.length)}else{g=0}}if(g<this.Textures.length){if(this.TextureChangeType==1){if(this.TextureIndexToChange>=0&&this.TextureIndexToChange<c.getMaterialCount()){h=c.getMaterial(this.TextureIndexToChange);if(h&&!(h.Tex1===this.Textures[g])){h.Tex1=this.Textures[g];d=true}}}else{var k=c.getMaterialCount();for(var e=0;e<k;++e){h=c.getMaterial(e);if(h&&!(h.Tex1===this.Textures[g])){h.Tex1=this.Textures[g];d=true}}}}}return d};CL3D.AnimatorAnimateTexture.prototype.reset=function(){this.MyStartTime=CL3D.CLTimer.getTime()};CL3D.AnimatorOnClick=function(d,c,a,b){this.engine=c;this.TimeLastClicked=0;this.PositionClickedX=-1;this.PositionClickedY=-1;this.Registered=false;this.LastUsedSceneNode=null;this.SMGr=d;this.FunctionToCall=a;this.BoundingBoxTestOnly=true;this.CollidesWithWorld=false;this.TheActionHandler=null;this.World=null;if(!(b==true)){d.registerSceneNodeAnimatorForEvents(this)}};CL3D.AnimatorOnClick.prototype=new CL3D.Animator();CL3D.AnimatorOnClick.prototype.getType=function(){return"onclick"};CL3D.AnimatorOnClick.prototype.animateNode=function(d,c){if(d==null){return false}if(this.TimeLastClicked){var a=CL3D.CLTimer.getTime();var b=a-this.TimeLastClicked;if(b<1500){this.TimeLastClicked=0;if(a-this.engine.LastCameraDragTime<250){return false}if(d.Visible&&this.isOverNode(d,this.PositionClickedX,this.PositionClickedY)){if(this.FunctionToCall){this.FunctionToCall()}this.invokeAction(d);return true}}}return false};CL3D.AnimatorOnClick.prototype.onMouseUp=function(a){this.PositionClickedX=this.engine.getMousePosXFromEvent(a);this.PositionClickedY=this.engine.getMousePosYFromEvent(a);this.TimeLastClicked=CL3D.CLTimer.getTime()};CL3D.AnimatorOnClick.prototype.invokeAction=function(a){if(this.TheActionHandler){this.TheActionHandler.execute(a)}};CL3D.AnimatorOnClick.prototype.isOverNode=function(g,f,d){if(g==null){return false}if(g.getType()=="2doverlay"){var e=g.getScreenCoordinatesRect(false,this.engine.getRenderer());if(e.x<=f&&e.y<=d&&e.x+e.w>=f&&e.y+e.h>=d){return true}}var b=this.engine.get3DPositionFrom2DPosition(f,d);if(b==null){return false}var h=this.SMGr.getActiveCamera();if(h==null){return false}var c=h.getAbsolutePosition();var a=new CL3D.Line3d();a.Start=c;a.End=b;return this.static_getCollisionDistanceWithNode(this.SMGr,g,a,this.BoundingBoxTestOnly,this.CollidesWithWorld,this.World,null)};CL3D.AnimatorOnClick.prototype.static_getDistanceToNearestCollisionPointWithWorld=function(d,e,b,g,c){var f=999999999999;if(!g||!d){return f}var a=g.getCollisionPointWithLine(e,b,true,null,c);if(a){return e.getDistanceTo(a)}return f};CL3D.AnimatorOnClick.prototype.getDistanceToNearestCollisionPointWithWorld=function(b,a){return this.static_getDistanceToNearestCollisionPointWithWorld(this.SMGr,b,a,this.World,true)};CL3D.AnimatorOnClick.prototype.static_getCollisionDistanceWithNode=function(b,k,h,e,f,j,l){var g=k.getBoundingBox();var d=0;var r=new CL3D.Matrix4(false);if(k.AbsoluteTransformation.getInverse(r)){if(g.intersectsWithLine(r.getTransformedVect(h.Start),r.getTransformedVect(h.End))){var q=null;if(k.getMesh&&k.OwnedMesh){q=k}var o=(q==null)||e;if(!o){var m=q.Selector;if(m==null){if(q.OwnedMesh&&q.OwnedMesh.GetPolyCount()>100){m=new CL3D.OctTreeTriangleSelector(q.OwnedMesh,q,0)}else{m=new CL3D.MeshTriangleSelector(q.OwnedMesh,q)}q.Selector=m}if(m){var c=m.getCollisionPointWithLine(h.Start,h.End,true,null,true);if(c!=null){if(f){d=this.static_getDistanceToNearestCollisionPointWithWorld(b,h.Start,c,j,true);var a=c.getDistanceTo(h.Start);if(d+CL3D.TOLERANCE<a){return false}else{if(l!=null){l.N=c.getDistanceTo(h.Start)}return true}}else{if(l!=null){l.N=h.Start.getDistanceTo(k.getTransformedBoundingBox().getCenter())}return true}}}else{o=true}}if(o){if(!f){if(l!=null){l.N=h.Start.getDistanceTo(k.getTransformedBoundingBox().getCenter())}return true}else{var t=h.Start.clone();g=k.getTransformedBoundingBox();var s=g.getExtent();s.multiplyThisWithScal(0.5);var p=CL3D.max3(s.X,s.Y,s.Z);p=Math.sqrt((p*p)+(p*p));var n=k.getTransformedBoundingBox().getCenter();d=this.static_getDistanceToNearestCollisionPointWithWorld(b,t,n,j,true);var i=n.getDistanceTo(t)-p;if(d<i){return false}else{if(l!=null){l.N=i}return true}}}}}return false};CL3D.AnimatorOnMove=function(b,a){this.engine=a;this.SMGr=b;this.ActionHandlerOnEnter=null;this.ActionHandlerOnLeave=null;this.TimeLastChecked=0;this.bLastTimeWasInside=0};CL3D.AnimatorOnMove.prototype=new CL3D.AnimatorOnClick(null,null,null,true);CL3D.AnimatorOnMove.prototype.getType=function(){return"onmove"};CL3D.AnimatorOnMove.prototype.animateNode=function(b,e){var d=(this.TimeLastChecked==0);var a=CL3D.CLTimer.getTime();if(d||a-this.TimeLastChecked>100){this.TimeLastChecked=a;var c=this.isOverNode(b,this.engine.getMouseX(),this.engine.getMouseY());if(d){this.bLastTimeWasInside=c}else{if(c!=this.bLastTimeWasInside){this.bLastTimeWasInside=c;if(c&&this.ActionHandlerOnEnter){this.ActionHandlerOnEnter.execute(b)}else{if(!c&&this.ActionHandlerOnLeave){this.ActionHandlerOnLeave.execute(b)}}return true}}}return false};CL3D.AnimatorOnProximity=function(e,c,b,d,a){this.TimeLastClicked=0;this.sceneManager=e;this.EnterType=0;this.ProximityType=0;this.Range=0;this.SceneNodeToTest=0;this.TheActionHandler=null;this.FunctionToCall=d;if(c){this.Radius=c}if(b){this.SceneNodeToTest=b}if(a){this.EnterType=1}this.IsInsideRadius=false};CL3D.AnimatorOnProximity.prototype=new CL3D.Animator();CL3D.AnimatorOnProximity.prototype.getType=function(){return"oncollide"};CL3D.AnimatorOnProximity.prototype.animateNode=function(g,f){if(g==null||this.sceneManager==null){return false}var e=false;var a=null;if(this.ProximityType==0){a=this.sceneManager.getActiveCamera()}else{if(this.SceneNodeToTest!=-1){a=this.sceneManager.getSceneNodeFromId(this.SceneNodeToTest)}}if(a){if(g===a){return false}var c=a.getAbsolutePosition();var b=g.getAbsolutePosition();var d=c.getDistanceTo(b)<this.Range;switch(this.EnterType){case 0:if(d&&!this.IsInsideRadius){this.invokeAction(a);e=true}break;case 1:if(!d&&this.IsInsideRadius){this.invokeAction(a);e=true}break}this.IsInsideRadius=d}return e};CL3D.AnimatorOnProximity.prototype.invokeAction=function(a){if(this.TheActionHandler){this.TheActionHandler.execute(a)}};CL3D.AnimatorCollisionResponse=function(a,e,d,c,b){this.Radius=a;this.Gravity=e;this.Translation=d;this.World=c;this.SlidingSpeed=b;this.Node=null;this.LastAnimationTime=null;this.LastPosition=new CL3D.Vect3d(0,0,0);this.Falling=false;this.FallStartTime=0;this.JumpForce=0;if(this.Gravity==null){this.Gravity=new CL3D.Vect3d(0,1,0)}if(this.Radius==null){this.Radius=new CL3D.Vect3d(30,50,30)}if(this.Translation==null){this.Translation=new CL3D.Vect3d(0,0,0)}if(this.SlidingSpeed==null){this.SlidingSpeed=0.0005}this.reset()};CL3D.AnimatorCollisionResponse.prototype=new CL3D.Animator();CL3D.AnimatorCollisionResponse.prototype.getType=function(){return"collisionresponse"};CL3D.AnimatorCollisionResponse.prototype.reset=function(){this.Node=null;this.LastAnimationTime=CL3D.CLTimer.getTime()};CL3D.AnimatorCollisionResponse.prototype.setWorld=function(a){this.World=a};CL3D.AnimatorCollisionResponse.prototype.getWorld=function(){return this.World};CL3D.AnimatorCollisionResponse.prototype.setGravity=function(a){this.Gravity=a};CL3D.AnimatorCollisionResponse.prototype.getGravity=function(){return this.Gravity};CL3D.AnimatorCollisionResponse.prototype.isFalling=function(){return this.Falling};CL3D.AnimatorCollisionResponse.prototype.animateNode=function(f,e){var m=(e-this.LastAnimationTime);if(!this.World){return false}if(m>150){m=150}this.LastAnimationTime=e;if(!(this.Node===f)){this.Node=f;this.LastPosition=f.Pos.clone()}var p=f.Pos.clone();var r=f.Pos.substract(this.LastPosition);var g=this.Gravity.multiplyWithScal(m);if(!this.Falling){g.multiplyThisWithScal(0.001)}else{var t=((e-this.FallStartTime)/1000);if(t>5){t=5}g.multiplyThisWithScal(t)}if(this.JumpForce>0){var k=this.Gravity.multiplyWithScal(m*this.JumpForce*0.001);g.substractFromThis(k);this.JumpForce-=m;if(this.JumpForce<0){this.JumpForce=0}}var c=r.add(g);if(!c.equalsZero()){this.SlidingSpeed=this.Radius.getLength()*0.000001;var b=null;if(f&&f.getType()=="camera"){b=f}var o;if(b){o=b.Target.substract(b.Pos)}var l=new CL3D.Triangle3d();var d=new Object();d.N=0;p=this.getCollisionResultPosition(this.World,this.LastPosition.substract(this.Translation),this.Radius,r,l,d,this.SlidingSpeed,g);p.addToThis(this.Translation);if(d.N<0.5){this.Falling=false}else{if(!this.Falling){this.FallStartTime=e}this.Falling=true}if(f.Pos.equals(p)){return false}f.Pos=p.clone();if(b&&o){var s=true;for(var j=0;j<f.Animators.length;++j){var q=f.Animators[j];if(q&&q.getType()=="cameramodelviewer"){s=false;break}}if(s){b.Target=f.Pos.add(o)}}}var h=this.LastPosition.equals(f.Pos);this.LastPosition=f.Pos.clone();return false};CL3D.AnimatorCollisionResponse.prototype.getCollisionResultPosition=function(c,e,h,d,j,g,b,m){if(!c||h.X==0||h.Y==0||h.Z==0){return e}var a=new Object();a.R3Position=e.clone();a.R3Velocity=d.clone();a.eRadius=h.clone();a.nearestDistance=99999999.9;a.selector=c;a.slidingSpeed=b;a.triangleHits=0;a.intersectionPoint=new CL3D.Vect3d();var k=a.R3Position.divideThroughVect(a.eRadius);var l=a.R3Velocity.divideThroughVect(a.eRadius);var f=this.collideWithWorld(0,a,k,l);g.N=0;if(!m.equalsZero()){a.R3Position=f.multiplyWithVect(a.eRadius);a.R3Velocity=m.clone();a.triangleHits=0;l=m.divideThroughVect(a.eRadius);f=this.collideWithWorld(0,a,f,l);g.N=(a.triangleHits==0)?1:0;if(g.N<0.5&&a.intersectionTriangle){var i=a.intersectionTriangle.getNormal();i.normalize();if(!(Math.abs(i.Y)>Math.abs(i.X)&&Math.abs(i.Y)>Math.abs(i.Z))){g.N=1}}}if(a.triangleHits){j=a.intersectionTriangle;j.pointA.multiplyThisWithVect(a.eRadius);j.pointB.multiplyThisWithVect(a.eRadius);j.pointC.multiplyThisWithVect(a.eRadius)}f.multiplyThisWithVect(a.eRadius);return f};CL3D.AnimatorCollisionResponse.prototype.collideWithWorld=function(l,c,k,m){var p=c.slidingSpeed;if(l>5){return k.clone()}c.velocity=m.clone();c.normalizedVelocity=m.clone();c.normalizedVelocity.normalize();c.basePoint=k.clone();c.foundCollision=false;c.nearestDistance=99999999.9;var h=new CL3D.Box3d();c.R3Position.copyTo(h.MinEdge);c.R3Position.copyTo(h.MaxEdge);h.addInternalPointByVector(c.R3Position.add(c.R3Velocity));h.MinEdge.substractFromThis(c.eRadius);h.MaxEdge.addToThis(c.eRadius);var e=new Array();var o=new CL3D.Matrix4();o.setScaleXYZ(1/c.eRadius.X,1/c.eRadius.Y,1/c.eRadius.Z);c.selector.getTrianglesInBox(h,o,e);for(var g=0;g<e.length;++g){this.testTriangleIntersection(c,e[g])}if(!c.foundCollision){return k.add(m)}var a=k.add(m);var r=k.clone();if(c.nearestDistance>=p){var n=m.clone();n.setLength(c.nearestDistance-p);r=c.basePoint.add(n);n.normalize();c.intersectionPoint.substractFromThis(n.multiplyWithScal(p))}var b=c.intersectionPoint.clone();var q=r.substract(c.intersectionPoint);q.normalize();var j=new CL3D.Plane3d();j.setPlane(b,q);var d=a.substract(q.multiplyWithScal(j.getDistanceTo(a)));var f=d.substract(c.intersectionPoint);if(f.getLength()<p){return r}return this.collideWithWorld(l+1,c,r,f)};CL3D.AnimatorCollisionResponse.prototype.testTriangleIntersection=function(s,y){var u=y.getPlane();if(!u.isFrontFacing(s.normalizedVelocity)){return}var n=0;var p=0;var j=false;var z=0;var o=u.getDistanceTo(s.basePoint);var F=u.Normal.dotProduct(s.velocity);if(CL3D.iszero(F)){if(Math.abs(o)>=1){return}else{j=true;p=0;n=1}}else{F=1/F;p=(-1-o)*F;n=(1-o)*F;if(p>n){var B=n;n=p;p=B}if(p>1||n<0){return}p=CL3D.clamp(p,0,1);n=CL3D.clamp(n,0,1)}var d=new CL3D.Vect3d();var k=false;var r=1;if(!j){var v=(s.basePoint.substract(u.Normal)).add(s.velocity.multiplyWithScal(p));if(y.isPointInsideFast(v)){k=true;r=p;d=v.clone()}}if(!k){var l=s.velocity.clone();var g=s.basePoint.clone();var x=l.getLengthSQ();var E=0;var C=0;var A=0;var q=new Object();q.N=0;E=x;C=2*(l.dotProduct(g.substract(y.pointA)));A=(y.pointA.substract(g)).getLengthSQ()-1;if(this.getLowestRoot(E,C,A,r,q)){r=q.N;k=true;d=y.pointA.clone()}if(!k){C=2*(l.dotProduct(g.substract(y.pointB)));A=(y.pointB.substract(g)).getLengthSQ()-1;if(this.getLowestRoot(E,C,A,r,q)){r=q.N;k=true;d=y.pointB.clone()}}if(!k){C=2*(l.dotProduct(g.substract(y.pointC)));A=(y.pointC.substract(g)).getLengthSQ()-1;if(this.getLowestRoot(E,C,A,r,q)){r=q.N;k=true;d=y.pointC.clone()}}var i=y.pointB.substract(y.pointA);var w=y.pointA.substract(g);var m=i.getLengthSQ();var h=i.dotProduct(l);var e=i.dotProduct(w);E=m*-x+h*h;C=m*(2*l.dotProduct(w))-2*h*e;A=m*(1-w.getLengthSQ())+e*e;if(this.getLowestRoot(E,C,A,r,q)){z=(h*q.N-e)/m;if(z>=0&&z<=1){r=q.N;k=true;d=y.pointA.add(i.multiplyWithScal(z))}}i=y.pointC.substract(y.pointB);w=y.pointB.substract(g);m=i.getLengthSQ();h=i.dotProduct(l);e=i.dotProduct(w);E=m*-x+h*h;C=m*(2*l.dotProduct(w))-2*h*e;A=m*(1-w.getLengthSQ())+e*e;if(this.getLowestRoot(E,C,A,r,q)){z=(h*q.N-e)/m;if(z>=0&&z<=1){r=q.N;k=true;d=y.pointB.add(i.multiplyWithScal(z))}}i=y.pointA.substract(y.pointC);w=y.pointC.substract(g);m=i.getLengthSQ();h=i.dotProduct(l);e=i.dotProduct(w);E=m*-x+h*h;C=m*(2*l.dotProduct(w))-2*h*e;A=m*(1-w.getLengthSQ())+e*e;if(this.getLowestRoot(E,C,A,r,q)){z=(h*q.N-e)/m;if(z>=0&&z<=1){r=q.N;k=true;d=y.pointC.add(i.multiplyWithScal(z))}}}if(k){var D=r*s.velocity.getLength();if(!s.foundCollision||D<s.nearestDistance){s.nearestDistance=D;s.intersectionPoint=d.clone();s.foundCollision=true;s.intersectionTriangle=y;++s.triangleHits}}};CL3D.AnimatorCollisionResponse.prototype.getLowestRoot=function(l,k,i,g,d){var j=k*k-(4*l*i);if(j<0){return false}var m=Math.sqrt(j);var f=(-k-m)/(2*l);var e=(-k+m)/(2*l);if(f>e){var h=e;e=f;f=h}if(f>0&&f<g){d.N=f;return true}if(e>0&&e<g){d.N=e;return true}return false};CL3D.AnimatorCollisionResponse.prototype.jump=function(a){if(this.JumpForce==0){this.JumpForce=a*100}};CL3D.AnimatorTimer=function(a){this.TimeLastTimed=0;this.SMGr=a;this.TheActionHandler=null;this.TickEverySeconds=0;this.TimeLastTimed=CL3D.CLTimer.getTime()};CL3D.AnimatorTimer.prototype=new CL3D.Animator();CL3D.AnimatorTimer.prototype.getType=function(){return"timer"};CL3D.AnimatorTimer.prototype.animateNode=function(c,b){if(c==null){return false}if(this.TickEverySeconds>0){var a=CL3D.CLTimer.getTime();if(a-this.TimeLastTimed>this.TickEverySeconds){this.TimeLastTimed=a;if(this.TheActionHandler){this.TheActionHandler.execute(c)}return true}}return false};CL3D.AnimatorOnKeyPress=function(b,a){this.SMGr=b;this.TheActionHandler=null;this.TickEverySeconds=0;this.TimeLastPressed=0;a.registerAnimatorForKeyUp(this);a.registerAnimatorForKeyDown(this);b.registerSceneNodeAnimatorForEvents(this)};CL3D.AnimatorOnKeyPress.prototype=new CL3D.Animator();CL3D.AnimatorOnKeyPress.prototype.getType=function(){return"keypress"};CL3D.AnimatorOnKeyPress.prototype.animateNode=function(d,c){if(d==null){return false}if(this.TimeLastPressed){var a=CL3D.CLTimer.getTime();var b=a-this.TimeLastPressed;if(b<1000){this.TimeLastPressed=0;if(this.TheActionHandler){this.TheActionHandler.execute(d)}return true}}return false};CL3D.AnimatorOnKeyPress.prototype.onKeyDown=function(a){if(this.KeyPressType==0&&a.keyCode==this.KeyCode){this.TimeLastPressed=CL3D.CLTimer.getTime()}};CL3D.AnimatorOnKeyPress.prototype.onKeyUp=function(a){if(this.KeyPressType==1&&a.keyCode==this.KeyCode){this.TimeLastPressed=CL3D.CLTimer.getTime()}};CL3D.AnimatorOnKeyPress.prototype.onMouseUp=function(a){if(this.KeyPressType==1){if(a.button>1&&this.KeyCode==2){this.TimeLastPressed=CL3D.CLTimer.getTime()}else{if(a.button<=1&&this.KeyCode==1){this.TimeLastPressed=CL3D.CLTimer.getTime()}}}};CL3D.AnimatorOnKeyPress.prototype.onMouseDown=function(a){if(this.KeyPressType==0){if(a.button>1&&this.KeyCode==2){this.TimeLastPressed=CL3D.CLTimer.getTime()}else{if(a.button<=1&&this.KeyCode==1){this.TimeLastPressed=CL3D.CLTimer.getTime()}}}};CL3D.AnimatorGameAI=function(b,a){this.AIType=0;this.MovementSpeed=0;this.ActivationRadius=0;this.CanFly=false;this.Health=100;this.Tags="";this.AttacksAIWithTags="";this.PatrolRadius=100;this.RotationSpeedMs=0;this.AdditionalRotationForLooking=new CL3D.Vect3d();this.StandAnimation="";this.WalkAnimation="";this.DieAnimation="";this.AttackAnimation="";this.ActionHandlerOnAttack=null;this.ActionHandlerOnActivate=null;this.ActionHandlerOnHit=null;this.ActionHandlerOnDie=null;this.CurrentCommand=0;this.NextAttackTargetScanTime=0;this.LastPatrolStartTime=0;this.CurrentCommandTargetPos=null;this.CurrentCommandStartTime=0;this.CurrentCommandTicksDone=0;this.CurrentCommandExpectedTickCount=0;this.BeginPositionWhenStartingCurrentCommand=0;this.HandleCurrentCommandTargetNode=null;this.AttackCommandExecuted=false;this.Activated=false;this.CurrentlyShooting=false;this.CurrentlyShootingLine=new CL3D.Line3d();this.World=null;this.TheObject=null;this.TheSceneManager=b;this.LastTime=0;this.StartPositionOfActor=new CL3D.Vect3d();this.NearestSceneNodeFromAIAnimator_NodeOut=null;this.NearestSceneNodeFromAIAnimator_maxDistance=0};CL3D.AnimatorGameAI.prototype=new CL3D.Animator();CL3D.AnimatorGameAI.prototype.getType=function(){return"gameai"};CL3D.AnimatorGameAI.prototype.animateNode=function(c,b){if(c==null||this.TheSceneManager==null){return false}var l=b-this.LastTime;if(l>150){l=150}this.LastTime=b;var o=0;var m=false;if(!(this.TheObject===c)){this.TheObject=c;c.updateAbsolutePosition();this.StartPositionOfActor=c.getAbsolutePosition()}var i=c.getAbsolutePosition();if(this.CurrentCommand==3){}else{if(this.CurrentCommand==1){o=this.getCharacterWidth(c);if(this.CurrentCommandTargetPos.substract(i).getLength()<o){this.CurrentCommand=0;this.setAnimation(c,0);m=true}else{var g=false;if(this.CurrentCommandTicksDone>2){var a=this.CurrentCommandTicksDone*(this.MovementSpeed/1000);var h=this.BeginPositionWhenStartingCurrentCommand.substract(i).getLength();if(h*2<a){this.CurrentCommand=0;g=true}}if(!g){this.CurrentCommandTicksDone+=l;var d=this.CurrentCommandTargetPos.substract(i);d.setLength((this.MovementSpeed/1000)*l);c.Pos.addToThis(d)}m=this.animateRotation(c,(b-this.CurrentCommandStartTime),this.CurrentCommandTargetPos.substract(i),this.RotationSpeedMs)}}else{if(this.CurrentCommand==2){this.CurrentCommandTicksDone+=l;if(!this.AttackCommandExecuted&&this.CurrentCommandTicksDone>(this.CurrentCommandExpectedTickCount/2)){this.CurrentlyShooting=true;if(this.ActionHandlerOnAttack){this.ActionHandlerOnAttack.execute(c)}this.CurrentlyShooting=false;this.AttackCommandExecuted=true;m=true}if(this.CurrentCommandTicksDone>this.CurrentCommandExpectedTickCount){this.CurrentCommand=0}else{m=this.animateRotation(c,(b-this.CurrentCommandStartTime),this.CurrentCommandTargetPos.substract(i),Math.min(this.RotationSpeedMs,this.CurrentCommandExpectedTickCount))}}else{if(this.CurrentCommand==0){if(this.AIType==1||this.AIType==2){var k=this.scanForAttackTargetIfNeeded(b,i);if(k!=null){var n=this.getAttackDistanceFromWeapon();if(!this.Activated&&this.ActionHandlerOnActivate){this.ActionHandlerOnActivate.execute(c)}this.Activated=true;m=true;if(k.getAbsolutePosition().getDistanceTo(i)<n){if(this.isNodeVisibleFromNode(k,c)){this.CurrentlyShootingLine.Start=c.getTransformedBoundingBox().getCenter();this.CurrentlyShootingLine.End=k.getTransformedBoundingBox().getCenter();this.attackTarget(c,k,k.getAbsolutePosition(),i,b)}else{this.moveToTarget(c,k.getAbsolutePosition(),i,b)}}else{this.moveToTarget(c,k.getAbsolutePosition(),i,b)}}else{if(this.AIType==2){var f=10000;if(this.MovementSpeed){f=this.PatrolRadius/(this.MovementSpeed/1000)}if(!this.LastPatrolStartTime||b>this.LastPatrolStartTime+f){var e=this.PatrolRadius;this.LastPatrolStartTime=b;var j=new CL3D.Vect3d((Math.random()-0.5)*e,(Math.random()-0.5)*e,(Math.random()-0.5)*e);j.addToThis(this.StartPositionOfActor);if(!this.CanFly){j.Y=this.StartPositionOfActor.Y}o=this.getCharacterWidth(c);if(!(j.substract(i).getLength()<o)){this.moveToTarget(c,j,i,b);m=true}}}}}}}}}return m};CL3D.AnimatorGameAI.prototype.animateRotation=function(c,j,h,a){if(!c){return false}var b=(c.getType()=="camera");if(b){return false}if(!this.CanFly){h.Y=0}var i=new CL3D.Matrix4();i.setRotationDegrees(h.getHorizontalAngle());var g=new CL3D.Matrix4();g.setRotationDegrees(this.AdditionalRotationForLooking);i=i.multiply(g);var f=i.getRotationDegrees();var l=c.Rot.clone();var k=Math.min(j,a)/a;k=CL3D.clamp(k,0,1);f.multiplyThisWithScal(CL3D.DEGTORAD);l.multiplyThisWithScal(CL3D.DEGTORAD);var e=new CL3D.Quaternion();e.setFromEuler(f.X,f.Y,f.Z);var d=new CL3D.Quaternion();d.setFromEuler(l.X,l.Y,l.Z);d.slerp(d,e,k);d.toEuler(f);f.multiplyThisWithScal(CL3D.RADTODEG);if(c.Rot.equals(f)){return false}c.Rot=f;return true};CL3D.AnimatorGameAI.prototype.moveToTarget=function(c,d,b,a){this.CurrentCommand=1;this.CurrentCommandTargetPos=d;this.CurrentCommandStartTime=a;this.BeginPositionWhenStartingCurrentCommand=b;this.CurrentCommandTicksDone=0;this.CurrentCommandExpectedTickCount=0;this.setAnimation(c,1)};CL3D.AnimatorGameAI.prototype.attackTarget=function(e,a,f,d,b){this.CurrentCommand=2;this.CurrentCommandTargetPos=f;this.CurrentCommandStartTime=b;this.HandleCurrentCommandTargetNode=a;this.BeginPositionWhenStartingCurrentCommand=d;this.CurrentCommandTicksDone=0;this.CurrentCommandExpectedTickCount=500;this.AttackCommandExecuted=false;var c=this.setAnimation(e,2);if(c!=0){this.CurrentCommandExpectedTickCount=c}};CL3D.AnimatorGameAI.prototype.die=function(d,c,a){this.CurrentCommand=3;this.CurrentCommandStartTime=a;this.BeginPositionWhenStartingCurrentCommand=c;this.CurrentCommandTicksDone=0;this.CurrentCommandExpectedTickCount=500;var b=this.setAnimation(d,3)};CL3D.AnimatorGameAI.prototype.isNodeVisibleFromNode=function(b,a){if(!b||!a){return false}return this.isPositionVisibleFromPosition(b.getTransformedBoundingBox().getCenter(),a.getTransformedBoundingBox().getCenter())};CL3D.AnimatorGameAI.prototype.isPositionVisibleFromPosition=function(b,a){if(!this.World||!this.TheSceneManager){return true}if(this.World.getCollisionPointWithLine(b,a,true,null,true)!=null){return false}return true};CL3D.AnimatorGameAI.prototype.getNearestSceneNodeFromAIAnimatorAndDistance=function(e,f,a){if(!e||!e.Visible){return}var d=false;var g=f.getDistanceTo(e.getAbsolutePosition());if(g<this.NearestSceneNodeFromAIAnimator_maxDistance){var b=e.getAnimatorOfType("gameai");if(b&&a!=""&&!(b===this)&&b.isAlive()){d=b.Tags.indexOf(a)!=-1}}if(d){this.NearestSceneNodeFromAIAnimator_maxDistance=g;this.NearestSceneNodeFromAIAnimator_NodeOut=e}for(var c=0;c<e.Children.length;++c){var h=e.Children[c];this.getNearestSceneNodeFromAIAnimatorAndDistance(h,f,a)}};CL3D.AnimatorGameAI.prototype.scanForAttackTargetIfNeeded=function(b,a){if(this.ActivationRadius<=0||!this.TheObject||this.AttacksAIWithTags.length==0||!this.TheSceneManager){return null}if(!this.NextAttackTargetScanTime||b>this.NextAttackTargetScanTime){this.NearestSceneNodeFromAIAnimator_maxDistance=this.ActivationRadius;this.NearestSceneNodeFromAIAnimator_NodeOut=null;this.getNearestSceneNodeFromAIAnimatorAndDistance(this.TheSceneManager.getRootSceneNode(),a,this.AttacksAIWithTags);this.NextAttackTargetScanTime=b+500+(Math.random()*1000);return this.NearestSceneNodeFromAIAnimator_NodeOut}return null};CL3D.AnimatorGameAI.prototype.getAttackDistanceFromWeapon=function(){var a=1000;if(this.ActionHandlerOnAttack){var b=this.ActionHandlerOnAttack.findAction("Shoot");if(b){a=b.getWeaponRange()}}return a};CL3D.AnimatorGameAI.prototype.getCharacterWidth=function(a){if(a!=null){return 10}var b=a.getTransformedBoundingBox().getExtent();b.Y=0;return b.getLength()};CL3D.AnimatorGameAI.prototype.getAnimationNameFromType=function(a){switch(a){case 0:return this.StandAnimation;case 1:return this.WalkAnimation;case 2:return this.AttackAnimation;case 3:return this.DieAnimation}return""};CL3D.AnimatorGameAI.prototype.setAnimation=function(e,d){if(!e||e.getType()!="animatedmesh"){return 0}var c=e;var a=c.Mesh;if(!a){return 0}var b=a.getNamedAnimationRangeByName(this.getAnimationNameFromType(d));if(b){c.setFrameLoop(b.Begin,b.End);if(b.FPS!=0){c.setAnimationSpeed(b.FPS)}c.setLoopMode(d==1||d==0);return(b.End-b.Begin)*b.FPS*1000}else{c.setFrameLoop(1,1);c.setLoopMode(false)}return 0};CL3D.AnimatorGameAI.prototype.isCurrentlyShooting=function(){return this.CurrentlyShooting};CL3D.AnimatorGameAI.prototype.getCurrentlyShootingLine=function(){return this.CurrentlyShootingLine};CL3D.AnimatorGameAI.prototype.isAlive=function(){return this.Health>0};CL3D.AnimatorGameAI.prototype.OnHit=function(a,b){if(!b){return}if(this.Health==0){return}this.Health-=a;if(this.Health<0){this.Health=0}if(this.Health==0){if(this.ActionHandlerOnDie!=null){this.ActionHandlerOnDie.execute(b)}this.die(b,b.getAbsolutePosition(),0)}else{if(this.ActionHandlerOnHit!=null){this.ActionHandlerOnHit.execute(b)}}};CL3D.CopperCubeVariables=new Array();CL3D.CopperCubeVariable=function(){this.Name="";this.StringValue="";this.ActiveValueType=0;this.IntValue=0;this.FloatValue=0};CL3D.CopperCubeVariable.getVariable=function(g,f){if(g==null){return null}var e=g.toLowerCase();var c=CL3D.CopperCubeVariables;for(var d=0;d<c.length;++d){var b=c[d];if(b!=null&&b.getName().toLowerCase()==e){return b}}if(f==true){var a=new CL3D.CopperCubeVariable();a.setName(g);c.push(a);return a}return null};CL3D.CopperCubeVariable.prototype.isString=function(){return this.ActiveValueType==0};CL3D.CopperCubeVariable.prototype.isFloat=function(){return this.ActiveValueType==2};CL3D.CopperCubeVariable.prototype.isInt=function(){return this.ActiveValueType==1};CL3D.CopperCubeVariable.prototype.getName=function(){return this.Name};CL3D.CopperCubeVariable.prototype.setName=function(a){this.Name=a};CL3D.CopperCubeVariable.prototype.setAsCopy=function(a){if(a==null){return}this.ActiveValueType=a.ActiveValueType;this.StringValue=a.StringValue;this.IntValue=a.IntValue;this.FloatValue=a.FloatValue};CL3D.CopperCubeVariable.prototype.getValueAsString=function(){switch(this.ActiveValueType){case 1:return String(this.IntValue);case 2:if((this.FloatValue%1)==0){return String(this.FloatValue)}else{return this.FloatValue.toFixed(6)}}return this.StringValue};CL3D.CopperCubeVariable.prototype.getValueAsInt=function(){switch(this.ActiveValueType){case 0:return Math.floor(this.StringValue);case 1:return this.IntValue;case 2:return this.FloatValue}return 0};CL3D.CopperCubeVariable.prototype.getValueAsFloat=function(){switch(this.ActiveValueType){case 0:return Number(this.StringValue);case 1:return this.IntValue;case 2:return this.FloatValue}return 0};CL3D.CopperCubeVariable.prototype.setValueAsString=function(a){this.ActiveValueType=0;this.StringValue=a};CL3D.CopperCubeVariable.prototype.setValueAsInt=function(a){this.ActiveValueType=1;this.IntValue=a};CL3D.CopperCubeVariable.prototype.setValueAsFloat=function(a){this.ActiveValueType=2;this.FloatValue=a};CL3D.AnimatorKeyboardControlled=function(b,a){this.lastAnimTime=0;this.SMGr=b;this.MoveSpeed=0;this.RunSpeed=0;this.RotateSpeed=0;this.JumpSpeed=0;this.FollowSmoothingSpeed=15;this.AdditionalRotationForLooking=new CL3D.Vect3d();this.StandAnimation="";this.WalkAnimation="";this.JumpAnimation="";this.RunAnimation="";this.LastAnimationTime=CL3D.CLTimer.getTime();this.WasMovingLastFrame=false;this.ShiftIsDown=false;this.Registered=false;this.leftKeyDown=false;this.rightKeyDown=false;this.upKeyDown=false;this.downKeyDown=false;this.jumpKeyDown=false;this.firstUpdate=true;a.registerAnimatorForKeyUp(this);a.registerAnimatorForKeyDown(this)};CL3D.AnimatorKeyboardControlled.prototype=new CL3D.Animator();CL3D.AnimatorKeyboardControlled.prototype.getType=function(){return"keyboardcontrolled"};CL3D.AnimatorKeyboardControlled.prototype.setKeyBool=function(b,a){if(a==37||a==65){this.leftKeyDown=b;if(b){this.rightKeyDown=false}}if(a==39||a==68){this.rightKeyDown=b;if(b){this.leftKeyDown=false}}if(a==38||a==87){this.upKeyDown=b;if(b){this.downKeyDown=false}}if(a==40||a==83){this.downKeyDown=b;if(b){this.upKeyDown=false}}if(a==32){this.jumpKeyDown=b}};CL3D.AnimatorKeyboardControlled.prototype.onKeyDown=function(a){this.ShiftIsDown=(a.shiftKey==1);this.setKeyBool(true,a.keyCode)};CL3D.AnimatorKeyboardControlled.prototype.onKeyUp=function(a){this.ShiftIsDown=(a.shiftKey==1);this.setKeyBool(false,a.keyCode)};CL3D.AnimatorKeyboardControlled.prototype.animateNode=function(f,d){var c=d-this.lastAnimTime;if(c>250){c=250}this.lastAnimTime=d;var g=false;this.LastAnimationTime=d;var q=f.Rot;if(this.leftKeyDown){q.Y-=c*this.RotateSpeed*0.001;g=true}if(this.rightKeyDown){q.Y+=c*this.RotateSpeed*0.001;g=true}var l=f.Pos;var o=new CL3D.Matrix4();o.setRotationDegrees(q);var r=new CL3D.Vect3d(0,0,1);var j=new CL3D.Matrix4();j.setRotationDegrees(this.AdditionalRotationForLooking);o=o.multiply(j);o.rotateVect(r);var n=this.ShiftIsDown;r.setLength((n?this.RunSpeed:this.MoveSpeed)*c);var e=this.downKeyDown;var h=this.upKeyDown;if(h||e){var p=r.clone();if(e){p.multiplyThisWithScal(-1)}f.Pos.addToThis(p);this.setAnimation(f,n?3:1,e);this.WasMovingLastFrame=true;g=true}else{if(this.WasMovingLastFrame){var i=false;var m=f.getAnimatorOfType("collisionresponse");if(m){i=m.isFalling()}if(!i){this.setAnimation(f,0,false)}this.WasMovingLastFrame=false}}if(this.jumpKeyDown){var k=f.getAnimatorOfType("collisionresponse");if(k&&!k.isFalling()){k.jump(this.JumpSpeed);this.setAnimation(f,2,false);g=true}}return g};CL3D.AnimatorKeyboardControlled.prototype.getAnimationNameFromType=function(a){switch(a){case 0:return this.StandAnimation;case 1:return this.WalkAnimation;case 2:return this.JumpAnimation;case 3:return this.RunAnimation}return""};CL3D.AnimatorKeyboardControlled.prototype.setAnimation=function(g,f,a){if(!g||g.getType()!="animatedmesh"){return 0}var d=g;var b=d.Mesh;if(!b){return 0}var c=b.getNamedAnimationRangeByName(this.getAnimationNameFromType(f));if(c){var e=1*c.FPS;if(a){e*=-1}if(!(d.EndFrame==c.End&&d.StartFrame==c.Begin&&CL3D.equals(d.FramesPerSecond,e))){d.setFrameLoop(c.Begin,c.End);if(e){d.setAnimationSpeed(e)}d.setLoopMode(f==0||f==1||f==3)}return(c.End-c.Begin)*c.FPS*1000}else{d.setFrameLoop(1,1);d.setLoopMode(false)}return 0};CL3D.Animator3rdPersonCamera=function(a){this.lastAnimTime=0;this.SMGr=a;this.SceneNodeIDToFollow=-1;this.FollowSmoothingSpeed=15;this.AdditionalRotationForLooking=new CL3D.Vect3d();this.FollowMode=0;this.TargetHeight=0;this.LastAnimationTime=0;this.InitialDeltaToObject=new CL3D.Vect3d();this.DeltaToCenterOfFollowObject=new CL3D.Vect3d();this.NodeToFollow=null;this.TriedToLinkWithNode=false;this.firstUpdate=true};CL3D.Animator3rdPersonCamera.prototype=new CL3D.Animator();CL3D.Animator3rdPersonCamera.prototype.getType=function(){return"3rdpersoncamera"};CL3D.Animator3rdPersonCamera.prototype.animateNode=function(k,r){var i=r-this.lastAnimTime;if(i>250){i=250}this.lastAnimTime=r;var e=false;if(k==null){return false}var m=k;this.linkWithNode(k.scene);if(!this.NodeToFollow){return false}var e=false;var n=m.Target.clone();m.Target=this.NodeToFollow.getAbsolutePosition();m.Target.addToThis(this.DeltaToCenterOfFollowObject);m.Target.Y+=this.TargetHeight;if(!m.Target.equals(n)){e=true}if(this.firstUpdate){this.NodeToFollow.updateAbsolutePosition();m.updateAbsolutePosition();this.DeltaToCenterOfFollowObject=this.NodeToFollow.getBoundingBox().getExtent();this.DeltaToCenterOfFollowObject.Y=this.DeltaToCenterOfFollowObject.Y/2;this.DeltaToCenterOfFollowObject.X=0;this.DeltaToCenterOfFollowObject.Z=0;this.lastAnimTime=r;this.firstUpdate=false}if(!(m.scene.getActiveCamera()===m)){return false}if(this.InitialDeltaToObject.equalsZero()){this.InitialDeltaToObject=this.NodeToFollow.getAbsolutePosition().substract(m.getAbsolutePosition())}var a=this.NodeToFollow.Rot;var p=new CL3D.Matrix4();p.setRotationDegrees(a);var j=new CL3D.Matrix4();j.setRotationDegrees(this.AdditionalRotationForLooking);p=p.multiply(j);switch(this.FollowMode){case 0:break;case 2:var d=this.NodeToFollow.getAbsolutePosition().substract(this.InitialDeltaToObject);if(!m.Pos.equals(d)){e=true}m.Pos=d;break;case 1:var g=this.InitialDeltaToObject.clone();p.rotateVect(g);var f=this.NodeToFollow.getAbsolutePosition().substract(g);var s=m.getAbsolutePosition().getDistanceTo(f);var c=this.InitialDeltaToObject.getLength();var l=s>c*2.2;if(CL3D.equals(this.FollowSmoothingSpeed,0)||l){if(!m.Pos.equals(f)){e=true}m.Pos=f.clone();if(l){var q=k.getAnimatorOfType("collisionresponse");if(q){q.reset()}e=true}}else{var o=Math.sqrt(s)*(i/1000)*this.FollowSmoothingSpeed;if(o>s){o=s}var h=f.substract(m.Pos);h.setLength(o);h.addToThis(m.Pos);if(!m.Pos.equals(h)){e=true}m.Pos=h}break}return e};CL3D.Animator3rdPersonCamera.prototype.linkWithNode=function(a){if(this.TriedToLinkWithNode){return}if(this.SceneNodeIDToFollow==-1){return}if(a==null){return}var b=a.getSceneNodeFromId(this.SceneNodeIDToFollow);if(b&&!(b===this.NodeToFollow)){this.NodeToFollow=b;this.firstUpdate=true}this.TriedToLinkWithNode=true};startCopperLichtFromFile=function(b,a){var d=new CL3D.CopperLicht(b,true);d.load(a);return d};CL3D.CopperLicht=function(d,e,c,a){if((e==null||e==true)&&CL3D.gCCDebugOutput==null){CL3D.gCCDebugOutput=new CL3D.DebugOutput(d,a)}this.ElementIdOfCanvas=d;this.MainElement=document.getElementById(this.ElementIdOfCanvas);this.Document=new CL3D.CCDocument();this.TheRenderer=null;this.IsPaused=false;this.NextCameraToSetActive=null;this.TheTextureManager=new CL3D.TextureManager();this.LoadingAFile=false;this.LoadingAnimationCounter=0;this.FPS=60;this.OnAnimate=null;this.OnBeforeDrawAll=null;this.OnAfterDrawAll=null;this.OnLoadingComplete=null;this.RegisteredAnimatorsForKeyUp=new Array();this.RegisteredAnimatorsForKeyDown=new Array();this.MouseIsDown=false;this.MouseX=0;this.MouseY=0;this.MouseDownX=0;this.MouseDownY=0;this.MouseIsInside=true;this.LastCameraDragTime=0;this.updateCanvasTopLeftPosition();if(c){this.FPS=c}var b=this;setInterval(function(){b.loadingUpdateIntervalHandler()},500)};CL3D.CopperLicht.prototype.initRenderer=function(){return this.createRenderer()};CL3D.CopperLicht.prototype.getRenderer=function(){return this.TheRenderer};CL3D.CopperLicht.prototype.getScene=function(){if(this.Document==null){return null}return this.Document.getCurrentScene()};CL3D.CopperLicht.prototype.registerEventHandlers=function(){var a=this;document.onkeydown=function(c){a.handleKeyDown(c)};document.onkeyup=function(c){a.handleKeyUp(c)};var b=this.MainElement;if(b!=null){b.onmousemove=function(c){a.handleMouseMove(c)};b.onmousedown=function(c){a.handleMouseDown(c)};b.onmouseup=function(c){a.handleMouseUp(c)};b.onmouseover=function(c){a.MouseIsInside=true};b.onmouseout=function(c){a.MouseIsInside=false}}};CL3D.CopperLicht.prototype.load=function(b){if(!this.createRenderer()){return false}var c=this;this.LoadingAFile=true;var a=new CL3D.CCFileLoader(b);a.load(function(d){c.parseFile(d,b)})};CL3D.CopperLicht.prototype.createRenderer=function(){if(this.TheRenderer!=null){return true}var e=this.MainElement;if(e==null){return false}var b=e;this.TheRenderer=new CL3D.Renderer();if(this.TheRenderer.init(b)==false){return false}if(this.TheTextureManager){this.TheTextureManager.TheRenderer=this.TheRenderer}this.registerEventHandlers();var d=this;var a=1000/this.FPS;setInterval(function(){d.draw3DIntervalHandler()},a);return true};CL3D.CopperLicht.prototype.draw3DIntervalHandler=function(){this.draw3dScene();if(CL3D.gCCDebugOutput!=null){var b=this.Document.getCurrentScene();var a=null;if(b!=null&&b.UseCulling){a=" nodes rendered: "+b.NodeCountRenderedLastTime}CL3D.gCCDebugOutput.updatefps(a)}};CL3D.CopperLicht.prototype.loadingUpdateIntervalHandler=function(){if(!CL3D.gCCDebugOutput){return}++this.LoadingAnimationCounter;var b=0;var c=0;if(this.TheTextureManager){b=this.TheTextureManager.getCountOfTexturesToLoad();c=this.TheTextureManager.getTextureCount()}if(this.LoadingAFile||b){var a="Loading";if(b>0){a="Textures loaded: "+(c-b)+"/"+c}switch(this.LoadingAnimationCounter%4){case 0:a+=("   ");break;case 1:a+=(".  ");break;case 2:a+=(".. ");break;case 3:a+=("...");break}CL3D.gCCDebugOutput.setLoadingText(a)}else{CL3D.gCCDebugOutput.setLoadingText(null)}};CL3D.CopperLicht.prototype.isLoading=function(a,b){return this.LoadingAFile};CL3D.CopperLicht.prototype.parseFile=function(b,c){this.LoadingAFile=false;var a=new CL3D.FlaceLoader();var d=a.loadFile(b,c,this.TheTextureManager,this);if(d!=null){this.Document=d;this.gotoScene(d.getCurrentScene());this.draw3dScene();if(this.OnLoadingComplete!=null){this.OnLoadingComplete()}}};CL3D.CopperLicht.prototype.draw3dScene=function(){if(this.Document==null||this.TheRenderer==null){return}this.updateCanvasTopLeftPosition();this.internalOnBeforeRendering();var a=this.Document.getCurrentScene();if(!this.IsPaused&&a){if(this.OnAnimate){this.OnAnimate()}this.TheRenderer.registerFrame();if(a.doAnimate(this.TheRenderer)){this.TheRenderer.beginScene(a.BackgroundColor);if(this.OnBeforeDrawAll){this.OnBeforeDrawAll()}a.drawAll(this.TheRenderer);if(this.OnAfterDrawAll){this.OnAfterDrawAll()}this.TheRenderer.endScene()}}this.internalOnAfterRendering()};CL3D.CopperLicht.prototype.internalOnAfterRendering=function(){this.setNextCameraActiveIfNeeded()};CL3D.CopperLicht.prototype.internalOnBeforeRendering=function(){this.setNextCameraActiveIfNeeded()};CL3D.CopperLicht.prototype.getScenes=function(){if(this.Document){return this.Document.Scenes}return 0};CL3D.CopperLicht.prototype.addScene=function(a){if(this.Document){this.Document.Scenes.push(a);if(this.Document.Scenes.length==1){this.Document.setCurrentScene(a)}}};CL3D.CopperLicht.prototype.gotoSceneByName=function(f,e){if(!this.Document){return false}var b=this.Document.Scenes;var c=f;if(e){c=c.toLowerCase()}for(var d=0;d<b.length;++d){var a=b[d].Name;if(e){a=a.toLowerCase()}if(c==a){this.gotoScene(b[d]);return}}};CL3D.CopperLicht.prototype.gotoScene=function(f){if(!f){return false}var k=f.getSceneType()=="panorama";var l=f.getSceneType()=="free";var c=null;this.Document.setCurrentScene(f);if(f.WasAlreadyActivatedOnce){c=f.getActiveCamera()}else{f.WasAlreadyActivatedOnce=true;var b=false;var h=f.getAllSceneNodesOfType("camera");if(h){for(var e=0;e<h.length;++e){var d=h[e];if(d&&d.Active){c=d;b=true;c.setAutoAspectIfNoFixedSet(this.TheRenderer.width,this.TheRenderer.height);break}}}if(!b){var a=4/3;if(this.TheRenderer.width&&this.TheRenderer.height){a=this.TheRenderer.width/this.TheRenderer.height}c=new CL3D.CameraSceneNode();c.setAspectRatio(a);f.RootNode.addChild(c);var j=null;var g=null;if(!k){g=new CL3D.AnimatorCameraFPS(c,this);c.addAnimator(g)}if(l){if(f.DefaultCameraPos!=null){c.Pos=f.DefaultCameraPos.clone()}if(f.DefaultCameraTarget!=null){if(g!=null){g.lookAt(f.DefaultCameraTarget)}else{c.setTarget(f.DefaultCameraTarget)}}}if(g){g.setMayMove(!k)}}f.setActiveCamera(c);f.CollisionWorld=f.createCollisionGeometry(true);this.setCollisionWorldForAllSceneNodes(f.getRootSceneNode(),f.CollisionWorld)}f.setRedrawMode(this.Document.UpdateMode);f.forceRedrawNextFrame();return true};CL3D.CopperLicht.prototype.setNextCameraActiveIfNeeded=function(){if(this.NextCameraToSetActive==null){return}var a=this.Document.getCurrentScene();if(a==null){return}if(this.NextCameraToSetActive.scene===a){if(this.TheRenderer){this.NextCameraToSetActive.setAutoAspectIfNoFixedSet(this.TheRenderer.getWidth(),this.TheRenderer.getHeight())}a.setActiveCamera(this.NextCameraToSetActive);this.NextCameraToSetActive=null}};CL3D.CopperLicht.prototype.handleKeyDown=function(b){var d=this.getScene();if(d==null){return}var c=d.getActiveCamera();if(c!=null){c.onKeyDown(b)}for(var a=0;a<this.RegisteredAnimatorsForKeyUp.length;++a){this.RegisteredAnimatorsForKeyDown[a].onKeyDown(b)}};CL3D.CopperLicht.prototype.handleKeyUp=function(b){var d=this.getScene();if(d==null){return}var c=d.getActiveCamera();if(c!=null){c.onKeyUp(b)}for(var a=0;a<this.RegisteredAnimatorsForKeyUp.length;++a){this.RegisteredAnimatorsForKeyUp[a].onKeyUp(b)}};CL3D.CopperLicht.prototype.registerAnimatorForKeyUp=function(a){if(a!=null){this.RegisteredAnimatorsForKeyUp.push(a)}};CL3D.CopperLicht.prototype.registerAnimatorForKeyDown=function(a){if(a!=null){this.RegisteredAnimatorsForKeyDown.push(a)}};CL3D.CopperLicht.prototype.updateCanvasTopLeftPosition=function(c){var a=0;var d=0;var b=this.MainElement;while(b!=null){a+=b.offsetLeft;d+=b.offsetTop;b=b.offsetParent}this.CanvasTopLeftX=a;this.CanvasTopLeftY=d};CL3D.CopperLicht.prototype.getMousePosXFromEvent=function(a){if(a.pageX){return a.pageX-this.CanvasTopLeftX}else{return a.clientX-this.MainElement.offsetLeft+document.body.scrollLeft}};CL3D.CopperLicht.prototype.getMousePosYFromEvent=function(a){if(a.pageY){return a.pageY-this.CanvasTopLeftY}else{return a.clientY-this.MainElement.offsetTop+document.body.scrollTop}};CL3D.CopperLicht.prototype.handleMouseDown=function(a){this.MouseIsDown=true;this.MouseIsInside=true;if(a){this.MouseDownX=this.getMousePosXFromEvent(a);this.MouseDownY=this.getMousePosYFromEvent(a)}var c=this.getScene();if(c==null){return}var b=c.getActiveCamera();if(b!=null){b.onMouseDown(a)}c.postMouseDownToAnimators(a)};CL3D.CopperLicht.prototype.isMouseOverCanvas=function(){return this.MouseIsInside};CL3D.CopperLicht.prototype.getMouseX=function(){return this.MouseX};CL3D.CopperLicht.prototype.getMouseY=function(){return this.MouseY};CL3D.CopperLicht.prototype.isMouseDown=function(){return this.MouseIsDown};CL3D.CopperLicht.prototype.getMouseDownX=function(){return this.MouseDownX};CL3D.CopperLicht.prototype.getMouseDownY=function(){return this.MouseDownY};CL3D.CopperLicht.prototype.setMouseDownWhereMouseIsNow=function(){this.MouseDownX=this.MouseX;this.MouseDownY=this.MouseY};CL3D.CopperLicht.prototype.handleMouseUp=function(a){this.MouseIsDown=false;var c=this.getScene();if(c==null){return}var b=c.getActiveCamera();if(b!=null){b.onMouseUp(a)}c.postMouseUpToAnimators(a)};CL3D.CopperLicht.prototype.handleMouseMove=function(a){if(a){this.MouseX=this.getMousePosXFromEvent(a);this.MouseY=this.getMousePosYFromEvent(a)}var c=this.getScene();if(c==null){return}var b=c.getActiveCamera();if(b!=null){b.onMouseMove(a)}};CL3D.CopperLicht.prototype.OnAnimate=null;CL3D.CopperLicht.prototype.OnAfterDrawAll=null;CL3D.CopperLicht.prototype.OnBeforeDrawAll=null;CL3D.CopperLicht.prototype.OnLoadingComplete=null;CL3D.CopperLicht.prototype.get3DPositionFrom2DPosition=function(m,k){var a=this.TheRenderer;if(a==null){return null}var c=a.getProjection();var l=a.getView();if(c==null||l==null){return null}var b=c.multiply(l);var i=new CL3D.ViewFrustrum();i.setFrom(b);var d=i.getFarLeftUp();var g=i.getFarRightUp().substract(d);var f=i.getFarLeftDown().substract(d);var n=a.getWidth();var e=a.getHeight();var p=m/n;var o=k/e;var j=d.add(g.multiplyWithScal(p)).add(f.multiplyWithScal(o));return j};CL3D.CopperLicht.prototype.get2DPositionFrom3DPosition=function(b){var j=new CL3D.Matrix4(false);var a=this.TheRenderer;if(!a.Projection){return null}a.Projection.copyTo(j);j=j.multiply(a.View);var i=a.getWidth()/2;var e=a.getHeight()/2;var h=i;var g=e;if(e==0||i==0){return null}var d=new CL3D.Vect3d(b.X,b.Y,b.Z);d.W=1;j.multiplyWith1x4Matrix(d);var c=d.W==0?1:(1/d.W);if(d.Z<0){return null}var f=new CL3D.Vect2d();f.X=i*(d.X*c)+h;f.Y=g-(e*(d.Y*c));return f};CL3D.CopperLicht.prototype.setActiveCameraNextFrame=function(a){if(a==null){return}this.NextCameraToSetActive=a};CL3D.CopperLicht.prototype.getTextureManager=function(){return this.TheTextureManager};CL3D.CopperLicht.prototype.setCollisionWorldForAllSceneNodes=function(g,e){if(!g){return}for(var a=0;a<g.Animators.length;++a){var d=g.Animators[a];if(d){if(d.getType()=="collisionresponse"){d.setWorld(e)}else{if(d.getType()=="onclick"||d.getType()=="onmove"){d.World=e}else{if(d.getType()=="gameai"){d.World=e}}}}}for(var b=0;b<g.Children.length;++b){var f=g.Children[b];if(f){this.setCollisionWorldForAllSceneNodes(f,e)}}};CL3D.Scene=function(){this.RootNode=new CL3D.SceneNode();this.RootNode.scene=this;this.Name="";this.BackgroundColor=0;this.CollisionWorld=null;this.LastUsedRenderer=null;this.StartTime=0;this.ActiveCamera=null;this.ForceRedrawThisFrame=false;this.LastViewProj=new CL3D.Matrix4();this.TheSkyBoxSceneNode=null;this.RedrawMode=2;this.CurrentRenderMode=0;this.SceneNodesToRender=new Array();this.SceneNodesToRenderTransparent=new Array();this.LightsToRender=new Array();this.Overlay2DToRender=new Array();this.RegisteredSceneNodeAnimatorsForEventsList=new Array();this.NodeCountRenderedLastTime=0;this.UseCulling=false;this.WasAlreadyActivatedOnce=false};CL3D.Scene.prototype.init=function(){this.RootNode=new CL3D.SceneNode();this.RootNode.scene=this;this.Name="";this.LastViewProj=new CL3D.Matrix4()};CL3D.Scene.prototype.getSceneType=function(){return"unknown"};CL3D.Scene.prototype.doAnimate=function(b){this.LastUsedRenderer=b;if(this.StartTime=0){this.StartTime=CL3D.CLTimer.getTime()}this.TheSkyBoxSceneNode=null;var d=this.RootNode.OnAnimate(this,CL3D.CLTimer.getTime());var e=this.HasViewChangedSinceLastRedraw();var c=b?b.getAndResetTextureWasLoadedFlag():false;var a=this.ForceRedrawThisFrame||(this.RedrawMode==0&&(e||c))||(this.RedrawMode==1&&(e||d||c))||(this.RedrawMode==2);if(!a){return false}this.ForceRedrawThisFrame=false;return true};CL3D.Scene.prototype.getCurrentRenderMode=function(){return this.CurrentRenderMode};CL3D.Scene.prototype.drawAll=function(f){this.SceneNodesToRender=new Array();this.SceneNodesToRenderTransparent=new Array();this.LightsToRender=new Array();this.Overlay2DToRender=new Array();this.RootNode.OnRegisterSceneNode(this);this.CurrentRenderMode=CL3D.Scene.RENDER_MODE_CAMERA;var b=null;if(this.ActiveCamera){b=this.ActiveCamera.getAbsolutePosition();this.ActiveCamera.render(f)}this.CurrentRenderMode=CL3D.Scene.RENDER_MODE_SKYBOX;if(this.SkyBoxSceneNode){this.SkyBoxSceneNode.render(f)}f.clearDynamicLights();var d;var a=0;this.CurrentRenderMode=CL3D.Scene.RENDER_MODE_DEFAULT;for(d=0;d<this.LightsToRender.length;++d){this.LightsToRender[d].render(f)}a+=this.LightsToRender.length;var h=null;if(this.UseCulling){var e=null;var c=f.getProjection();var g=f.getView();if(c!=null&&g!=null&&b!=null){var e=new CL3D.ViewFrustrum();e.setFrom(c.multiply(g));h=e.getBoundingBox(b)}}this.CurrentRenderMode=CL3D.Scene.RENDER_MODE_LIGHTS;for(d=0;d<this.SceneNodesToRender.length;++d){var j=this.SceneNodesToRender[d];if(h==null||h.intersectsWithBox(j.getTransformedBoundingBox())){j.render(f);a+=1}}this.CurrentRenderMode=CL3D.Scene.RENDER_MODE_TRANSPARENT;if(b!=null){this.SceneNodesToRenderTransparent.sort(function(l,i){var m=b.getDistanceFromSQ(l.getAbsolutePosition());var k=b.getDistanceFromSQ(i.getAbsolutePosition());if(m<k){return 1}if(m>k){return -1}return 0})}for(d=0;d<this.SceneNodesToRenderTransparent.length;++d){var j=this.SceneNodesToRenderTransparent[d];if(h==null||h.intersectsWithBox(j.getTransformedBoundingBox())){j.render(f);a+=1}}this.CurrentRenderMode=CL3D.Scene.RENDER_MODE_2DOVERLAY;for(d=0;d<this.Overlay2DToRender.length;++d){this.Overlay2DToRender[d].render(f)}a+=this.Overlay2DToRender.length;this.NodeCountRenderedLastTime=a;this.StoreViewMatrixForRedrawCheck()};CL3D.Scene.prototype.HasViewChangedSinceLastRedraw=function(){if(!this.ActiveCamera){return true}var a=new CL3D.Matrix4(false);this.ActiveCamera.Projection.copyTo(a);a=a.multiply(this.ActiveCamera.ViewMatrix);return !a.equals(this.LastViewProj)};CL3D.Scene.prototype.StoreViewMatrixForRedrawCheck=function(){if(!this.ActiveCamera){return}this.ActiveCamera.Projection.copyTo(this.LastViewProj);this.LastViewProj=this.LastViewProj.multiply(this.ActiveCamera.ViewMatrix)};CL3D.Scene.prototype.getLastUsedRenderer=function(){return this.LastUsedRenderer};CL3D.Scene.prototype.setBackgroundColor=function(a){this.BackgroundColor=a};CL3D.Scene.prototype.getBackgroundColor=function(){return this.BackgroundColor};CL3D.Scene.prototype.getName=function(){return this.Name};CL3D.Scene.prototype.setName=function(a){this.Name=a};CL3D.Scene.prototype.setRedrawMode=function(a){this.RedrawMode=a};CL3D.Scene.prototype.setActiveCamera=function(a){this.ActiveCamera=a};CL3D.Scene.prototype.getActiveCamera=function(){return this.ActiveCamera};CL3D.Scene.prototype.forceRedrawNextFrame=function(){this.ForceRedrawThisFrame=true};CL3D.Scene.prototype.getStartTime=function(){return this.StartTime};CL3D.Scene.prototype.registerNodeForRendering=function(a,b){if(b==null){b=CL3D.Scene.RENDER_MODE_DEFAULT}switch(b){case CL3D.Scene.RENDER_MODE_SKYBOX:this.SkyBoxSceneNode=a;break;case CL3D.Scene.RENDER_MODE_DEFAULT:this.SceneNodesToRender.push(a);break;case CL3D.Scene.RENDER_MODE_LIGHTS:this.LightsToRender.push(a);break;case CL3D.Scene.RENDER_MODE_CAMERA:break;case CL3D.Scene.RENDER_MODE_TRANSPARENT:this.SceneNodesToRenderTransparent.push(a);break;case CL3D.Scene.RENDER_MODE_2DOVERLAY:this.Overlay2DToRender.push(a);break}};CL3D.Scene.prototype.getAllSceneNodesOfType=function(b){if(this.RootNode==null){return null}var a=new Array();this.getAllSceneNodesOfTypeImpl(this.RootNode,b,a);return a};CL3D.Scene.prototype.getAllSceneNodesOfTypeImpl=function(g,f,b){if(g.getType()==f){b.push(g)}for(var d=0;d<g.Children.length;++d){var e=g.Children[d];this.getAllSceneNodesOfTypeImpl(e,f,b)}};CL3D.Scene.prototype.getAllSceneNodesWithAnimator=function(b){if(this.RootNode==null){return null}var a=new Array();this.getAllSceneNodesWithAnimatorImpl(this.RootNode,b,a);return a};CL3D.Scene.prototype.getAllSceneNodesWithAnimatorImpl=function(f,d,b){if(f.getAnimatorOfType(d)!=null){b.push(f)}for(var c=0;c<f.Children.length;++c){var e=f.Children[c];this.getAllSceneNodesWithAnimatorImpl(e,d,b)}};CL3D.Scene.prototype.getSceneNodeFromName=function(a){if(this.RootNode==null){return null}return this.getSceneNodeFromNameImpl(this.RootNode,a)};CL3D.Scene.prototype.getSceneNodeFromNameImpl=function(e,a){if(e.Name==a){return e}for(var b=0;b<e.Children.length;++b){var d=e.Children[b];var c=this.getSceneNodeFromNameImpl(d,a);if(c){return c}}return null};CL3D.Scene.prototype.getSceneNodeFromId=function(a){if(this.RootNode==null){return null}return this.getSceneNodeFromIdImpl(this.RootNode,a)};CL3D.Scene.prototype.getSceneNodeFromIdImpl=function(e,d){if(e.Id==d){return e}for(var a=0;a<e.Children.length;++a){var c=e.Children[a];var b=this.getSceneNodeFromIdImpl(c,d);if(b){return b}}return null};CL3D.Scene.prototype.getRootSceneNode=function(){return this.RootNode};CL3D.Scene.prototype.registerSceneNodeAnimatorForEvents=function(b){if(b==null){return}for(var c=0;c<this.RegisteredSceneNodeAnimatorsForEventsList.length;++c){var d=this.RegisteredSceneNodeAnimatorsForEventsList[c];if(d===b){return}}this.RegisteredSceneNodeAnimatorsForEventsList.push(b)};CL3D.Scene.prototype.unregisterSceneNodeAnimatorForEvents=function(b){if(b==null){return}for(var c=0;c<this.RegisteredSceneNodeAnimatorsForEventsList.length;++c){var d=this.RegisteredSceneNodeAnimatorsForEventsList[c];if(d===b){this.RegisteredSceneNodeAnimatorsForEventsList.splice(c,1);return}}};CL3D.Scene.prototype.postMouseDownToAnimators=function(c){for(var a=0;a<this.RegisteredSceneNodeAnimatorsForEventsList.length;++a){var b=this.RegisteredSceneNodeAnimatorsForEventsList[a];b.onMouseDown(c)}};CL3D.Scene.prototype.postMouseUpToAnimators=function(c){for(var a=0;a<this.RegisteredSceneNodeAnimatorsForEventsList.length;++a){var b=this.RegisteredSceneNodeAnimatorsForEventsList[a];b.onMouseUp(c)}};CL3D.Scene.prototype.getCollisionGeometry=function(){return this.CollisionWorld};CL3D.Scene.prototype.createCollisionGeometry=function(f,g){var d=this.getAllSceneNodesOfType("mesh");if(d==null){return null}var b=null;if(g){g.clear();b=g}else{b=new CL3D.MetaTriangleSelector()}for(var e=0;e<d.length;++e){var c=d[e];if(c&&c.DoesCollision){var a=null;if(c.Selector){a=c.Selector}else{if(c.OwnedMesh&&c.OwnedMesh.GetPolyCount()>100){a=new CL3D.OctTreeTriangleSelector(c.OwnedMesh,c)}else{a=new CL3D.MeshTriangleSelector(c.OwnedMesh,c)}}if(f&&c.Selector==null){c.Selector=a}b.addSelector(a)}}return b};CL3D.Scene.REDRAW_WHEN_CAM_MOVED=2;CL3D.Scene.REDRAW_WHEN_SCENE_CHANGED=1;CL3D.Scene.REDRAW_EVERY_FRAME=2;CL3D.Scene.RENDER_MODE_SKYBOX=1;CL3D.Scene.RENDER_MODE_DEFAULT=0;CL3D.Scene.RENDER_MODE_LIGHTS=2;CL3D.Scene.RENDER_MODE_CAMERA=3;CL3D.Scene.RENDER_MODE_TRANSPARENT=4;CL3D.Scene.RENDER_MODE_2DOVERLAY=5;CL3D.PanoramaScene=function(){this.init()};CL3D.PanoramaScene.prototype=new CL3D.Scene();CL3D.PanoramaScene.prototype.getSceneType=function(){return"panorama"};CL3D.Free3dScene=function(){this.init();this.DefaultCameraPos=new CL3D.Vect3d();this.DefaultCameraTarget=new CL3D.Vect3d()};CL3D.Free3dScene.prototype=new CL3D.Scene();CL3D.Free3dScene.prototype.getSceneType=function(){return"free"};CL3D.FlaceLoader=function(){this.Document=null;this.Data=null;this.Filename="";this.NextTagPos=0;this.TheTextureManager=null;this.CursorControl=null;this.PathRoot="";this.TheMeshCache=null;this.loadFile=function(c,e,g,h){this.Filename=e;this.TheTextureManager=g;this.CursorControl=h;this.TheMeshCache=new CL3D.MeshCache();if(c.length==0){CL3D.gCCDebugOutput.printError("Error: Could not load file '"+e+"'");var f=navigator.appVersion;if(f!=null&&f.indexOf("Chrome")!=-1){CL3D.gCCDebugOutput.printError("<i>For using local files with Chrome, add the parameter '--allow-file-access-from-files' when starting the browser.</i>",true)}return null}if(e.indexOf(".ccbjs")){c=CL3D.base64decode(c)}var b=new CL3D.CCDocument();this.Document=b;var d=this.Filename;var a=d.lastIndexOf("/");if(a!=-1){d=d.substring(0,a+1)}this.PathRoot=d;this.Data=new CL3D.BinaryStream(c);if(!this.parseFile()){return null}return b};this.parseFile=function(){var e=this.Data.readSI32();if(e!=1701014630){return false}var c=this.Data.readSI32();var b=this.Data.readUI32();var d=0;while(this.Data.bytesAvailable()>0){var a=this.readTag();++d;if(d==1&&a!=1){return false}switch(a){case 1:this.readDocument();break;case 12:this.readEmbeddedFiles();break;default:this.SkipToNextTag()}}return true};this.SkipToNextTag=function(){this.Data.seek(this.NextTagPos,true)};this.readTag=function(){var b=0;b=this.Data.readUnsignedShort();var a=0;a=this.Data.readUnsignedInt();this.CurrentTagSize=a;this.NextTagPos=this.Data.getPosition()+a;return b};this.ReadMatrix=function(){var a=new CL3D.Matrix4(false);this.ReadIntoExistingMatrix(a);return a};this.ReadIntoExistingMatrix=function(a){for(var b=0;b<16;++b){a.setByIndex(b,this.Data.readFloat())}};this.ReadQuaternion=function(){var a=new CL3D.Quaternion();a.W=this.Data.readFloat();a.X=this.Data.readFloat();a.Y=this.Data.readFloat();a.Z=this.Data.readFloat();return a};this.ReadString=function(e){var d=this.Data.readUnsignedInt();if(d>1024*1024*100){return""}if(d<=0){return""}var c=[];for(var a=0;a<d;++a){var b=this.Data.readNumber(1);if(b!=0){c.push(String.fromCharCode(b))}}return c.join("")};this.readDocument=function(){var d=this.NextTagPos;while(this.Data.bytesAvailable()>0&&this.Data.getPosition()<d){var a=this.readTag();switch(a){case 1004:this.Document.CurrentScene=this.Data.readInt();break;case 20:this.readPublishSettings();break;case 2:var b=this.Data.readInt();var c=null;switch(b){case 0:c=new CL3D.Free3dScene();this.readFreeScene(c);break;case 1:c=new CL3D.PanoramaScene();this.readPanoramaScene(c);break;default:this.SkipToNextTag()}this.Document.addScene(c);break;default:this.SkipToNextTag()}}};this.readPublishSettings=function(){this.Data.readInt();this.Document.ApplicationTitle=this.ReadString();var b=this.NextTagPos;while(this.Data.bytesAvailable()>0&&this.Data.getPosition()<b){var a=this.readTag();switch(a){case 21:this.SkipToNextTag();break;case 22:this.SkipToNextTag();break;default:this.SkipToNextTag()}}};this.readFreeScene=function(c){var b=this.NextTagPos;this.readScene(c);while(this.Data.bytesAvailable()>0&&this.Data.getPosition()<b){var a=this.readTag();switch(a){case 1007:c.DefaultCameraPos=this.Read3DVectF();c.DefaultCameraTarget=this.Read3DVectF();break;case 8:this.ReadSceneGraph(c);break;default:this.SkipToNextTag()}}};this.readPanoramaScene=function(a){this.SkipToNextTag()};this.Read3DVectF=function(){var a=new CL3D.Vect3d();a.X=this.Data.readFloat();a.Y=this.Data.readFloat();a.Z=this.Data.readFloat();return a};this.Read2DVectF=function(){var a=new CL3D.Vect2d();a.X=this.Data.readFloat();a.Y=this.Data.readFloat();return a};this.Read3DBoxF=function(){var a=new CL3D.Box3d();a.MinEdge=this.Read3DVectF();a.MaxEdge=this.Read3DVectF();return a};this.readScene=function(b){var a=this.readTag();if(a==26){b.Name=this.ReadString();b.BackgroundColor=this.Data.readInt()}else{this.JumpBackFromTagReading()}};this.JumpBackFromTagReading=function(){this.Data.position-=10};this.ReadSceneGraph=function(c){var b=this.NextTagPos;while(this.Data.bytesAvailable()>0&&this.Data.getPosition()<b){var a=this.readTag();switch(a){case 9:this.ReadSceneNode(c,c.RootNode,0);break;default:this.SkipToNextTag()}}};this.ReadSceneNode=function(u,p,v){if(p==null){return}var e=this.NextTagPos;var c=this.Data.readInt();var j=this.Data.readInt();var z=this.ReadString();var d=this.Read3DVectF();var i=this.Read3DVectF();var w=this.Read3DVectF();var h=this.Data.readBoolean();var k=this.Data.readInt();var f=null;var n=0;if(v==0){p.Visible=h;p.Name=z;p.Culling=k}while(this.Data.bytesAvailable()>0&&this.Data.getPosition()<e){var y=this.readTag();switch(y){case 9:this.ReadSceneNode(u,f?f:p,v+1);break;case 10:switch(c){case 2037085030:var s=new CL3D.SkyBoxSceneNode();s.Type=c;s.Pos=d;s.Rot=i;s.Scale=w;s.Visible=h;s.Name=z;s.Culling=k;s.Id=j;s.scene=u;this.readFlaceMeshNode(s);p.addChild(s);f=s;f.updateAbsolutePosition();break;case 1752395110:var l=new CL3D.MeshSceneNode();l.Type=c;l.Pos=d;l.Rot=i;l.Scale=w;l.Visible=h;l.Name=z;l.Culling=k;l.Id=j;l.scene=u;this.readFlaceMeshNode(l);p.addChild(l);f=l;f.updateAbsolutePosition();break;case 1835950438:var t=new CL3D.AnimatedMeshSceneNode();t.Type=c;t.Pos=d;t.Rot=i;t.Scale=w;t.Visible=h;t.Name=z;t.Culling=k;t.Id=j;t.scene=u;this.readFlaceAnimatedMeshNode(t);p.addChild(t);f=t;f.updateAbsolutePosition();break;case 1953526632:var q=new CL3D.HotspotSceneNode(this.CursorControl,null);q.Type=c;q.Pos=d;q.Rot=i;q.Scale=w;q.Visible=h;q.Name=z;q.Culling=k;q.Id=j;q.scene=u;this.readFlaceHotspotNode(q);p.addChild(q);f=q;f.updateAbsolutePosition();break;case 1819042406:var a=new CL3D.BillboardSceneNode();a.Type=c;a.Pos=d;a.Rot=i;a.Scale=w;a.Visible=h;a.Name=z;a.Culling=k;a.Id=j;a.scene=u;this.readFlaceBillBoardNode(a);p.addChild(a);f=a;f.updateAbsolutePosition();break;case 1835098982:var r=new CL3D.CameraSceneNode();r.Type=c;r.Pos=d;r.Rot=i;r.Scale=w;r.Visible=h;r.Name=z;r.Culling=k;r.scene=u;r.Id=j;this.readFlaceCameraNode(r);p.addChild(r);f=r;f.updateAbsolutePosition();break;case 1752461414:var x=new CL3D.PathSceneNode();x.Type=c;x.Pos=d;x.Rot=i;x.Scale=w;x.Visible=h;x.Name=z;x.Culling=k;x.Id=j;x.scene=u;this.readFlacePathNode(x);p.addChild(x);f=x;f.updateAbsolutePosition();break;case 1954112614:var b=new CL3D.DummyTransformationSceneNode();b.Type=c;b.Pos=d;b.Rot=i;b.Scale=w;b.Visible=h;b.Name=z;b.Culling=k;b.Id=j;b.scene=u;b.Box=this.Read3DBoxF();for(var m=0;m<16;++m){this.Data.readFloat()}p.addChild(b);f=b;f.updateAbsolutePosition();break;case 1868837478:var o=new CL3D.Overlay2DSceneNode(this.CursorControl);o.Type=c;o.Pos=d;o.Rot=i;o.Scale=w;o.Visible=h;o.Name=z;o.Culling=k;o.Id=j;o.scene=u;this.readFlace2DOverlay(o);p.addChild(o);f=o;f.updateAbsolutePosition();break;default:this.SkipToNextTag();break}break;case 11:var g=this.ReadMaterial();if(f&&f.getMaterial(n)){f.getMaterial(n).setFrom(g)}++n;break;case 25:this.ReadAnimator(f,u);break;default:this.SkipToNextTag()}}};this.readFlaceMeshNode=function(c){var d=this.NextTagPos;c.Box=this.Read3DBoxF();this.Data.readBoolean();this.Data.readBoolean();c.DoesCollision=this.Data.readBoolean();this.Data.readBoolean();while(this.Data.bytesAvailable()>0&&this.Data.getPosition()<d){var b=this.readTag();switch(b){case 14:var a=this.ReadMesh();c.OwnedMesh=a;break;default:this.SkipToNextTag()}}};this.ReadMesh=function(){var b=new CL3D.Mesh();b.Box=this.Read3DBoxF();var d=this.NextTagPos;while(this.Data.bytesAvailable()>0&&this.Data.getPosition()<d){var a=this.readTag();switch(a){case 15:var c=this.ReadMeshBuffer();if(c!=null){b.AddMeshBuffer(c)}break;default:this.SkipToNextTag()}}return b};this.ReadMeshBuffer=function(){var h=new CL3D.MeshBuffer();h.Box=this.Read3DBoxF();var a=this.NextTagPos;while(this.Data.bytesAvailable()>0&&this.Data.getPosition()<a){var n=this.readTag();switch(n){case 11:h.Mat=this.ReadMaterial();break;case 16:var j=Math.floor(this.CurrentTagSize/2);for(var f=0;f<j;++f){h.Indices.push(this.Data.readShort())}break;case 17:var k=Math.floor(this.CurrentTagSize/36);for(var m=0;m<k;++m){var b=new CL3D.Vertex3D();b.Pos=this.Read3DVectF();b.Normal=this.Read3DVectF();b.Color=this.Data.readInt();b.TCoords=this.Read2DVectF();b.TCoords2=new CL3D.Vect2d();h.Vertices.push(b)}break;case 18:var i=Math.floor(this.CurrentTagSize/44);for(var d=0;d<i;++d){var g=new CL3D.Vertex3D();g.Pos=this.Read3DVectF();g.Normal=this.Read3DVectF();g.Color=this.Data.readInt();g.TCoords=this.Read2DVectF();g.TCoords2=this.Read2DVectF();h.Vertices.push(g)}break;case 19:var c=this.CurrentTagSize/60;for(var l=0;l<c;++l){var e=new CL3D.Vertex3D();e.Pos=this.Read3DVectF();e.Normal=this.Read3DVectF();e.Color=this.Data.readInt();e.TCoords=this.Read2DVectF();e.TCoords2=new CL3D.Vect2d();this.Read3DVectF();this.Read3DVectF();h.Vertices.push(e)}break;default:this.SkipToNextTag()}}return h};this.ReadMaterial=function(){var c=new CL3D.Material();c.Type=this.Data.readInt();this.Data.readInt();this.Data.readInt();this.Data.readInt();this.Data.readInt();this.Data.readFloat();this.Data.readInt();this.Data.readInt();this.Data.readBoolean();this.Data.readBoolean();c.Lighting=this.Data.readBoolean();c.ZWriteEnabled=this.Data.readBoolean();this.Data.readByte();this.Data.readBoolean();this.Data.readBoolean();this.Data.readBoolean();this.Data.readBoolean();for(var b=0;b<4;++b){var a=this.ReadTextureRef();switch(b){case 0:c.Tex1=a;break;case 1:c.Tex2=a;break}this.Data.readBoolean();this.Data.readBoolean();this.Data.readBoolean();var d=this.Data.readShort();if(d!=0){switch(b){case 0:c.ClampTexture1=true;break;case 1:break}}}return c};this.ReadFileStrRef=function(){return this.ReadString()};this.ReadTextureRef=function(){var b=this.ReadFileStrRef();var a=this.PathRoot+b;if(this.TheTextureManager!=null&&b!=""){return this.TheTextureManager.getTexture(a,true)}return null};this.readFlaceHotspotNode=function(b){var c=this.NextTagPos;b.Box=this.Read3DBoxF();b.Width=this.Data.readInt();b.Height=this.Data.readInt();while(this.Data.bytesAvailable()>0&&this.Data.getPosition()<c){var a=this.readTag();switch(a){case 3:this.readHotspotData(b);break;default:this.SkipToNextTag()}}};this.readHotspotData=function(b){var c=this.NextTagPos;b.caption=this.ReadString();b.TheTexture=this.ReadTextureRef();this.Read2DVectF();this.Data.readInt();b.dateLimit=this.ReadString();b.useDateLimit=this.Data.readBoolean();while(this.Data.bytesAvailable()>0&&this.Data.getPosition()<c){var a=this.readTag();switch(a){case 6:b.bExecuteJavaScript=true;b.executeJavaScript=this.ReadString();break;case 4:b.bGotoScene=true;b.gotoScene=this.ReadString();break;case 5:b.bOpenWebsite=true;b.website=this.ReadString();b.websiteTarget=this.ReadString();break;default:this.SkipToNextTag()}}};this.readFlaceCameraNode=function(a){a.Box=this.Read3DBoxF();a.Target=this.Read3DVectF();a.UpVector=this.Read3DVectF();a.Fovy=this.Data.readFloat();a.Aspect=this.Data.readFloat();a.ZNear=this.Data.readFloat();a.ZFar=this.Data.readFloat();a.Active=this.Data.readBoolean()};this.readFlaceBillBoardNode=function(b){b.MeshBuffer.Box=this.Read3DBoxF();b.Box=b.MeshBuffer.Box;b.SizeX=this.Data.readFloat();b.SizeY=this.Data.readFloat();var a=this.Data.readByte();b.IsVertical=(a&2)!=0};this.readFlacePathNode=function(a){a.Box=this.Read3DBoxF();a.Tightness=this.Data.readFloat();a.IsClosedCircle=this.Data.readBoolean();this.Data.readInt();var b=this.Data.readInt();for(var c=0;c<b;++c){a.Nodes.push(this.Read3DVectF())}};this.readFlace2DOverlay=function(a){this.Data.readInt();a.SizeModeIsAbsolute=this.Data.readBoolean();if(a.SizeModeIsAbsolute){a.PosAbsoluteX=this.Data.readInt();a.PosAbsoluteY=this.Data.readInt();a.SizeAbsoluteWidth=this.Data.readInt();a.SizeAbsoluteHeight=this.Data.readInt()}else{a.PosRelativeX=this.Data.readFloat();a.PosRelativeY=this.Data.readFloat();a.SizeRelativeWidth=this.Data.readFloat();a.SizeRelativeHeight=this.Data.readFloat()}a.ShowBackGround=this.Data.readBoolean();a.BackGroundColor=this.Data.readInt();a.Texture=this.ReadTextureRef();a.TextureHover=this.ReadTextureRef();a.RetainAspectRatio=this.Data.readBoolean();a.DrawText=this.Data.readBoolean();a.TextAlignment=this.Data.readByte();a.Text=this.ReadString();a.FontName=this.ReadString();a.TextColor=this.Data.readInt();a.AnimateOnHover=this.Data.readBoolean();a.OnHoverSetFontColor=this.Data.readBoolean();a.HoverFontColor=this.Data.readInt();a.OnHoverSetBackgroundColor=this.Data.readBoolean();a.HoverBackgroundColor=this.Data.readInt();a.OnHoverDrawTexture=this.Data.readBoolean()};this.ReadAnimator=function(s,x){if(!s){this.SkipToNextTag();return}var u;var p;var d=this.Data.readInt();var y=null;switch(d){case 100:var a=new CL3D.AnimatorRotation();a.Rotation=this.Read3DVectF();y=a;break;case 101:var o=new CL3D.AnimatorFlyStraight();o.Start=this.Read3DVectF();o.End=this.Read3DVectF();o.TimeForWay=this.Data.readInt();o.Loop=this.Data.readBoolean();o.recalculateImidiateValues();y=o;break;case 102:var l=new CL3D.AnimatorFlyCircle();l.Center=this.Read3DVectF();l.Direction=this.Read3DVectF();l.Radius=this.Data.readFloat();l.Speed=this.Data.readFloat();l.init();y=l;break;case 103:var r=new CL3D.AnimatorCollisionResponse();r.Radius=this.Read3DVectF();r.Gravity=this.Read3DVectF();r.Translation=this.Read3DVectF();this.Read3DVectF();r.SlidingSpeed=this.Data.readFloat();y=r;break;case 104:var b=new CL3D.AnimatorCameraFPS(s,this.CursorControl);b.MaxVerticalAngle=this.Data.readFloat();b.MoveSpeed=this.Data.readFloat();b.RotateSpeed=this.Data.readFloat();b.JumpSpeed=this.Data.readFloat();b.NoVerticalMovement=this.Data.readBoolean();var g=this.Data.readInt();if(g&1){b.moveByMouseMove=false;b.moveByMouseDown=true}else{b.moveByMouseMove=true;b.moveByMouseDown=false}y=b;break;case 105:var c=new CL3D.AnimatorCameraModelViewer(s,this.CursorControl);c.Radius=this.Data.readFloat();c.RotateSpeed=this.Data.readFloat();c.NoVerticalMovement=this.Data.readBoolean();this.Data.readInt();y=c;break;case 106:var k=new CL3D.AnimatorFollowPath(x);k.TimeNeeded=this.Data.readInt();k.LookIntoMovementDirection=this.Data.readBoolean();k.PathToFollow=this.ReadString();k.OnlyMoveWhenCameraActive=this.Data.readBoolean();k.AdditionalRotation=this.Read3DVectF();k.EndMode=this.Data.readByte();k.CameraToSwitchTo=this.ReadString();this.Data.readInt();y=k;break;case 107:var j=new CL3D.AnimatorOnClick(x,this.CursorControl);j.BoundingBoxTestOnly=this.Data.readBoolean();j.CollidesWithWorld=this.Data.readBoolean();this.Data.readInt();j.TheActionHandler=this.ReadActionHandlerSection(x);y=j;break;case 108:var e=new CL3D.AnimatorOnProximity(x);e.EnterType=this.Data.readInt();e.ProximityType=this.Data.readInt();e.Range=this.Data.readFloat();e.SceneNodeToTest=this.Data.readInt();this.Data.readInt();e.TheActionHandler=this.ReadActionHandlerSection(x);y=e;break;case 109:var f=new CL3D.AnimatorAnimateTexture();f.TextureChangeType=this.Data.readInt();f.TimePerFrame=this.Data.readInt();f.TextureIndexToChange=this.Data.readInt();f.Loop=this.Data.readBoolean();var n=this.Data.readInt();f.Textures=new Array();for(var t=0;t<n;++t){f.Textures.push(this.ReadTextureRef())}y=f;break;case 110:var j=new CL3D.AnimatorOnMove(x,this.CursorControl);j.BoundingBoxTestOnly=this.Data.readBoolean();j.CollidesWithWorld=this.Data.readBoolean();this.Data.readInt();j.ActionHandlerOnLeave=this.ReadActionHandlerSection(x);j.ActionHandlerOnEnter=this.ReadActionHandlerSection(x);y=j;break;case 111:var q=new CL3D.AnimatorTimer(x);q.TickEverySeconds=this.Data.readInt();this.Data.readInt();q.TheActionHandler=this.ReadActionHandlerSection(x);y=q;break;case 112:var w=new CL3D.AnimatorOnKeyPress(x,this.CursorControl);w.KeyPressType=this.Data.readInt();w.KeyCode=this.Data.readInt();w.IfCameraOnlyDoIfActive=this.Data.readBoolean();this.Data.readInt();w.TheActionHandler=this.ReadActionHandlerSection(x);y=w;break;case 113:var h=new CL3D.AnimatorGameAI(x);h.AIType=this.Data.readInt();h.MovementSpeed=this.Data.readFloat();h.ActivationRadius=this.Data.readFloat();h.CanFly=this.Data.readBoolean();h.Health=this.Data.readInt();h.Tags=this.ReadString();h.AttacksAIWithTags=this.ReadString();h.PatrolRadius=this.Data.readFloat();h.RotationSpeedMs=this.Data.readInt();h.AdditionalRotationForLooking=this.Read3DVectF();h.StandAnimation=this.ReadString();h.WalkAnimation=this.ReadString();h.DieAnimation=this.ReadString();h.AttackAnimation=this.ReadString();this.Data.readInt();h.ActionHandlerOnAttack=this.ReadActionHandlerSection(x);h.ActionHandlerOnActivate=this.ReadActionHandlerSection(x);h.ActionHandlerOnHit=this.ReadActionHandlerSection(x);h.ActionHandlerOnDie=this.ReadActionHandlerSection(x);y=h;break;case 114:var v=new CL3D.Animator3rdPersonCamera();v.SceneNodeIDToFollow=this.Data.readInt();v.AdditionalRotationForLooking=this.Read3DVectF();v.FollowMode=this.Data.readInt();v.FollowSmoothingSpeed=this.Data.readFloat();v.TargetHeight=this.Data.readFloat();this.Data.readInt();y=v;break;case 115:var m=new CL3D.AnimatorKeyboardControlled(x,this.CursorControl);this.Data.readInt();m.RunSpeed=this.Data.readFloat();m.MoveSpeed=this.Data.readFloat();m.RotateSpeed=this.Data.readFloat();m.JumpSpeed=this.Data.readFloat();m.AdditionalRotationForLooking=this.Read3DVectF();m.StandAnimation=this.ReadString();m.WalkAnimation=this.ReadString();m.JumpAnimation=this.ReadString();m.RunAnimation=this.ReadString();this.Data.readInt();y=m;break;default:this.SkipToNextTag();return}if(y){s.addAnimator(y)}};this.ReadActionHandlerSection=function(b){var c=this.Data.readInt();if(c){var a=new CL3D.ActionHandler(b);this.ReadActionHandler(a,b);return a}return null};this.ReadActionHandler=function(c,f){var a=this.readTag();if(a!=29){this.SkipToNextTag();return}var b=this.NextTagPos;while(this.Data.bytesAvailable()>0&&this.Data.getPosition()<b){a=this.readTag();if(a==30){var d=this.Data.readInt();var e=this.ReadAction(d,f);if(e){c.addAction(e)}}else{this.SkipToNextTag()}}};this.readEmbeddedFiles=function(){var f=this.NextTagPos;while(this.Data.bytesAvailable()>0&&this.Data.getPosition()<f){var a=this.readTag();switch(a){case 13:var b=this.Data.readInt();var d=this.ReadString();var c=this.Data.readInt();if(b&4){var e=this.TheMeshCache.getMeshFromName(d);if(e){this.readSkinnedMesh(e,c)}}this.SkipToNextTag();break;default:this.SkipToNextTag()}}};this.readFlaceAnimatedMeshNode=function(c){c.Box=this.Read3DBoxF();this.Data.readBoolean();this.Data.readInt();var b=this.Data.readInt();var a=this.Data.readInt();c.FramesPerSecond=this.Data.readFloat();this.Data.readByte();c.Looping=this.Data.readBoolean();this.Data.readInt();c.setMesh(this.ReadAnimatedMeshRef(c));c.StartFrame=b;c.EndFrame=a};this.ReadAnimatedMeshRef=function(a){var b=this.ReadFileStrRef();var c=this.TheMeshCache.getMeshFromName(b);if(c==null){var d=new CL3D.SkinnedMesh();d.Name=b;this.TheMeshCache.addMesh(d);c=d}if(a!=null&&c!=null){if(c.AnimatedMeshesToLink==null){c.AnimatedMeshesToLink=new Array()}c.AnimatedMeshesToLink.push(a)}return c};this.readSkinnedMesh=function(a,n){if(a==null){return}this.Data.readInt();a.DefaultFPS=this.Data.readFloat();var u=this.NextTagPos;var v=this.Data.getPosition()+n;var m=new Array();var s=0;while(this.Data.bytesAvailable()>0&&this.Data.getPosition()<u&&this.Data.getPosition()<v){var w=this.readTag();if(w==33){var q=new CL3D.SkinnedMeshJoint();q.Name=this.ReadString();q.LocalMatrix=this.ReadMatrix();q.GlobalInversedMatrix=this.ReadMatrix();a.AllJoints.push(q);var d=this.Data.readInt();m.push(q);if(d>=0&&d<m.length){var t=m[d];t.Children.push(q)}var f=this.Data.readInt();for(var o=0;o<f;++o){q.AttachedMeshes.push(this.Data.readInt())}var c=this.Data.readInt();for(s=0;s<c;++s){var g=new CL3D.SkinnedMeshPositionKey();g.frame=this.Data.readFloat();g.position=this.Read3DVectF();q.PositionKeys.push(g)}c=this.Data.readInt();for(s=0;s<c;++s){var b=new CL3D.SkinnedMeshScaleKey();b.frame=this.Data.readFloat();b.scale=this.Read3DVectF();q.ScaleKeys.push(b)}c=this.Data.readInt();for(s=0;s<c;++s){var r=new CL3D.SkinnedMeshRotationKey();r.frame=this.Data.readFloat();r.rotation=this.ReadQuaternion();q.RotationKeys.push(r)}c=this.Data.readInt();for(s=0;s<c;++s){var h=new CL3D.SkinnedMeshWeight();h.buffer_id=this.Data.readUnsignedShort();h.vertex_id=this.Data.readInt();h.strength=this.Data.readFloat();q.Weights.push(h)}}else{if(w==15){var p=this.ReadMeshBuffer();if(p!=null){a.AddMeshBuffer(p)}}else{if(w==34){var l=new CL3D.NamedAnimationRange();l.Name=this.ReadString();l.Begin=this.Data.readFloat();l.End=this.Data.readFloat();l.FPS=this.Data.readFloat();a.addNamedAnimationRange(l)}else{this.SkipToNextTag()}}}}try{a.finalize()}catch(e){CL3D.gCCDebugOutput.printError("error finalizing skinned mesh: "+e)}if(a.AnimatedMeshesToLink&&a.AnimatedMeshesToLink.length){for(s=0;s<a.AnimatedMeshesToLink.length;++s){var k=a.AnimatedMeshesToLink[s];if(k){k.setFrameLoop(k.StartFrame,k.EndFrame)}}a.AnimatedMeshesToLink=null}};this.ReadAction=function(d,p){var i=0;switch(d){case 0:var o=new CL3D.Action.MakeSceneNodeInvisible();o.InvisibleMakeType=this.Data.readInt();o.SceneNodeToMakeInvisible=this.Data.readInt();o.ChangeCurrentSceneNode=this.Data.readBoolean();this.Data.readInt();return o;case 1:var h=new CL3D.Action.ChangeSceneNodePosition();h.PositionChangeType=this.Data.readInt();h.SceneNodeToChangePosition=this.Data.readInt();h.ChangeCurrentSceneNode=this.Data.readBoolean();h.Vector=this.Read3DVectF();h.RelativeToCurrentSceneNode=this.Data.readBoolean();h.SceneNodeRelativeTo=this.Data.readInt();i=this.Data.readInt();if(i&1){h.UseAnimatedMovement=true;h.TimeNeededForMovementMs=this.Data.readInt()}return h;case 2:var g=new CL3D.Action.ChangeSceneNodeRotation();g.RotationChangeType=this.Data.readInt();g.SceneNodeToChangeRotation=this.Data.readInt();g.ChangeCurrentSceneNode=this.Data.readBoolean();g.Vector=this.Read3DVectF();g.RotateAnimated=false;i=this.Data.readInt();if(i&1){g.RotateAnimated=true;g.TimeNeededForRotationMs=this.Data.readInt()}return g;case 3:var f=new CL3D.Action.ChangeSceneNodeScale();f.ScaleChangeType=this.Data.readInt();f.SceneNodeToChangeScale=this.Data.readInt();f.ChangeCurrentSceneNode=this.Data.readBoolean();f.Vector=this.Read3DVectF();this.Data.readInt();return f;case 4:var e=new CL3D.Action.ChangeSceneNodeTexture();e.TextureChangeType=this.Data.readInt();e.SceneNodeToChange=this.Data.readInt();e.ChangeCurrentSceneNode=this.Data.readBoolean();e.TheTexture=this.ReadTextureRef();if(e.TextureChangeType==1){e.IndexToChange=this.Data.readInt()}this.Data.readInt();return e;case 5:this.SkipToNextTag();case 6:this.SkipToNextTag();return null;case 7:var q=new CL3D.Action.ExecuteJavaScript();this.Data.readInt();q.JScript=this.ReadString();return q;case 8:var r=new CL3D.Action.OpenWebpage();this.Data.readInt();r.Webpage=this.ReadString();r.Target=this.ReadString();return r;case 9:var s=new CL3D.Action.SetSceneNodeAnimation();s.SceneNodeToChangeAnim=this.Data.readInt();s.ChangeCurrentSceneNode=this.Data.readBoolean();s.Loop=this.Data.readBoolean();s.AnimName=this.ReadString();this.Data.readInt();return s;case 10:var c=new CL3D.Action.SwitchToScene(this.CursorControl);c.SceneName=this.ReadString();this.Data.readInt();return c;case 11:var l=new CL3D.Action.SetActiveCamera(this.CursorControl);l.CameraToSetActive=this.Data.readInt();this.Data.readInt();return l;case 12:var j=new CL3D.Action.SetCameraTarget();j.PositionChangeType=this.Data.readInt();j.SceneNodeToChangePosition=this.Data.readInt();j.ChangeCurrentSceneNode=this.Data.readBoolean();j.Vector=this.Read3DVectF();j.RelativeToCurrentSceneNode=this.Data.readBoolean();j.SceneNodeRelativeTo=this.Data.readInt();i=this.Data.readInt();if(i&1){j.UseAnimatedMovement=true;j.TimeNeededForMovementMs=this.Data.readInt()}return j;case 13:var b=new CL3D.Action.Shoot();b.ShootType=this.Data.readInt();b.Damage=this.Data.readInt();b.BulletSpeed=this.Data.readFloat();b.SceneNodeToUseAsBullet=this.Data.readInt();b.WeaponRange=this.Data.readFloat();i=this.Data.readInt();if(i&1){b.SceneNodeToShootFrom=this.Data.readInt();b.ShootToCameraTarget=this.Data.readBoolean();b.AdditionalDirectionRotation=this.Read3DVectF()}return b;case 14:this.SkipToNextTag();return null;case 15:var m=new CL3D.Action.SetOverlayText();this.Data.readInt();m.SceneNodeToChange=this.Data.readInt();m.ChangeCurrentSceneNode=this.Data.readBoolean();m.Text=this.ReadString();return m;case 16:var n=new CL3D.Action.SetOrChangeAVariable();this.Data.readInt();n.VariableName=this.ReadString();n.Operation=this.Data.readInt();n.ValueType=this.Data.readInt();n.Value=this.ReadString();return n;case 17:var a=new CL3D.Action.IfVariable();this.Data.readInt();a.VariableName=this.ReadString();a.ComparisonType=this.Data.readInt();a.ValueType=this.Data.readInt();a.Value=this.ReadString();a.TheActionHandler=this.ReadActionHandlerSection(p);return a;case 18:var k=new CL3D.Action.RestartBehaviors();k.SceneNodeToRestart=this.Data.readInt();k.ChangeCurrentSceneNode=this.Data.readBoolean();this.Data.readInt();return k;default:this.SkipToNextTag()}return null}};CL3D.CCDocument=function(){this.CurrentScene=-1;this.ApplicationTitle="";this.Scenes=new Array();this.UpdateMode=CL3D.Scene.REDRAW_EVERY_FRAME;this.CanvasWidth=320;this.CanvasHeight=200;this.addScene=function(a){this.Scenes.push(a)};this.getCurrentScene=function(a){if(this.CurrentScene<0||this.CurrentScene>=this.Scenes.length){return null}return this.Scenes[this.CurrentScene]};this.setCurrentScene=function(b){for(var a=0;a<this.Scenes.length;++a){if(this.Scenes[a]===b){this.CurrentScene=a;return}}}};CL3D.base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);CL3D.base64decode=function(j){var f,d,b,a;var g,h,e;var c=CL3D.base64DecodeChars;h=j.length;g=0;e="";while(g<h){do{f=c[j.charCodeAt(g++)&255]}while(g<h&&f==-1);if(f==-1){break}do{d=c[j.charCodeAt(g++)&255]}while(g<h&&d==-1);if(d==-1){break}e+=String.fromCharCode((f<<2)|((d&48)>>4));do{b=j.charCodeAt(g++)&255;if(b==61){return e}b=c[b]}while(g<h&&b==-1);if(b==-1){break}e+=String.fromCharCode(((d&15)<<4)|((b&60)>>2));do{a=j.charCodeAt(g++)&255;if(a==61){return e}a=c[a]}while(g<h&&a==-1);if(a==-1){break}e+=String.fromCharCode(((b&3)<<6)|a)}return e};CL3D.TriangleSelector=function(){};CL3D.TriangleSelector.prototype.getAllTriangles=function(a,b){};CL3D.TriangleSelector.prototype.getTrianglesInBox=function(c,a,b){this.getAllTriangles(a,b)};CL3D.TriangleSelector.prototype.getCollisionPointWithLine=function(e,d,f,m,a){if(!e||!d){return null}if(this.Node!=null&&a&&this.Node.Visible==false){return null}var h=new CL3D.Box3d();h.MinEdge=e.clone();h.MaxEdge=e.clone();h.addInternalPointByVector(d);var l=new Array();this.getTrianglesInBox(h,null,l);var c=d.substract(e);c.normalize();var g;var b=999999999.9;var k=d.substract(e).getLengthSQ();var v=Math.min(e.X,d.X);var t=Math.max(e.X,d.X);var s=Math.min(e.Y,d.Y);var r=Math.max(e.Y,d.Y);var q=Math.min(e.Z,d.Z);var p=Math.max(e.Z,d.Z);var w=null;for(var o=0;o<l.length;++o){var n=l[o];if(f&&!n.getPlane().isFrontFacing(c)){continue}if(v>n.pointA.X&&v>n.pointB.X&&v>n.pointC.X){continue}if(t<n.pointA.X&&t<n.pointB.X&&t<n.pointC.X){continue}if(s>n.pointA.Y&&s>n.pointB.Y&&s>n.pointC.Y){continue}if(r<n.pointA.Y&&r<n.pointB.Y&&r<n.pointC.Y){continue}if(q>n.pointA.Z&&q>n.pointB.Z&&q>n.pointC.Z){continue}if(p<n.pointA.Z&&p<n.pointB.Z&&p<n.pointC.Z){continue}if(e.getDistanceFromSQ(n.pointA)>=b&&e.getDistanceFromSQ(n.pointB)>=b&&e.getDistanceFromSQ(n.pointC)>=b){continue}g=n.getIntersectionWithLine(e,c);if(g){var u=g.getDistanceFromSQ(e);var j=g.getDistanceFromSQ(d);if(u<k&&j<k&&u<b){b=u;if(m){n.copyTo(m)}w=g}}}if(w){return w.clone()}return null};CL3D.MeshTriangleSelector=function(k,i){if(!k){return}this.Node=i;this.Triangles=new Array();for(var g=0;g<k.MeshBuffers.length;++g){var h=k.MeshBuffers[g];if(h){var c=h.Indices.length;for(var a=0;a<c;a+=3){var f=h.Vertices[h.Indices[a]];var e=h.Vertices[h.Indices[a+1]];var d=h.Vertices[h.Indices[a+2]];this.Triangles.push(new CL3D.Triangle3d(f.Pos,e.Pos,d.Pos))}}}};CL3D.MeshTriangleSelector.prototype=new CL3D.TriangleSelector();CL3D.MeshTriangleSelector.prototype.getAllTriangles=function(a,d){if(!this.Node.AbsoluteTransformation){return}var c;if(a){c=a.multiply(this.Node.AbsoluteTransformation)}else{c=this.Node.AbsoluteTransformation}var b;if(c.isIdentity()){for(b=0;b<this.Triangles.length;++b){d.push(this.Triangles[b])}}else{if(c.isTranslateOnly()){for(b=0;b<this.Triangles.length;++b){d.push(new CL3D.Triangle3d(c.getTranslatedVect(this.Triangles[b].pointA),c.getTranslatedVect(this.Triangles[b].pointB),c.getTranslatedVect(this.Triangles[b].pointC)))}}else{for(b=0;b<this.Triangles.length;++b){d.push(new CL3D.Triangle3d(c.getTransformedVect(this.Triangles[b].pointA),c.getTransformedVect(this.Triangles[b].pointB),c.getTransformedVect(this.Triangles[b].pointC)))}}}};CL3D.MeshTriangleSelector.prototype.getTrianglesInBox=function(c,a,b){this.getAllTriangles(a,b)};CL3D.MetaTriangleSelector=function(){this.Selectors=new Array()};CL3D.MetaTriangleSelector.prototype=new CL3D.TriangleSelector();CL3D.MetaTriangleSelector.prototype.getAllTriangles=function(a,c){for(var b=0;b<this.Selectors.length;++b){this.Selectors[b].getAllTriangles(a,c)}};CL3D.MetaTriangleSelector.prototype.getTrianglesInBox=function(d,a,c){for(var b=0;b<this.Selectors.length;++b){this.Selectors[b].getTrianglesInBox(d,a,c)}};CL3D.MetaTriangleSelector.prototype.addSelector=function(a){this.Selectors.push(a)};CL3D.MetaTriangleSelector.prototype.clear=function(){this.Selectors=new Array()};CL3D.MetaTriangleSelector.prototype.getCollisionPointWithLine=function(a,d,e,j,h){var c=999999999.9;var b=null;var k=null;if(j){k=new CL3D.Triangle3d()}for(var g=0;g<this.Selectors.length;++g){var l=this.Selectors[g].getCollisionPointWithLine(a,d,e,k,h);if(l!=null){var f=l.getDistanceFromSQ(a);if(f<c){b=l.clone();c=f;if(j){k.copyTo(j)}}}}return b};CL3D.SOctTreeNode=function(){this.Triangles=new Array();this.Box=new CL3D.Box3d();this.Child=new Array()};CL3D.OctTreeTriangleSelector=function(m,k,g){this.DebugNodeCount=0;this.DebugPolyCount=0;if(g==null){this.MinimalPolysPerNode=64}else{this.MinimalPolysPerNode=g}if(!m){return}this.Node=k;this.Root=new CL3D.SOctTreeNode();this.Triangles=new Array();for(var h=0;h<m.MeshBuffers.length;++h){var i=m.MeshBuffers[h];if(i){var c=i.Indices.length;for(var a=0;a<c;a+=3){var f=i.Vertices[i.Indices[a]];var e=i.Vertices[i.Indices[a+1]];var d=i.Vertices[i.Indices[a+2]];var l=new CL3D.Triangle3d(f.Pos,e.Pos,d.Pos);this.Root.Triangles.push(l);this.Triangles.push(l)}}}this.constructTree(this.Root)};CL3D.OctTreeTriangleSelector.prototype=new CL3D.TriangleSelector();CL3D.OctTreeTriangleSelector.prototype.constructTree=function(c){++this.DebugNodeCount;c.Box.MinEdge=c.Triangles[0].pointA.clone();c.Box.MaxEdge=c.Box.MinEdge.clone();var h;var b=c.Triangles.length;for(var e=1;e<b;++e){h=c.Triangles[e];c.Box.addInternalPointByVector(h.pointA);c.Box.addInternalPointByVector(h.pointB);c.Box.addInternalPointByVector(h.pointC)}if(!c.Box.MinEdge.equals(c.Box.MaxEdge)&&b>this.MinimalPolysPerNode){var j=c.Box.getCenter();var d=c.Box.getEdges();var f=new CL3D.Box3d();for(var a=0;a<8;++a){var g=new Array();f.MinEdge=j.clone();f.MaxEdge=j.clone();f.addInternalPointByVector(d[a]);c.Child.push(new CL3D.SOctTreeNode());for(var e=0;e<c.Triangles.length;++e){h=c.Triangles[e];if(h.isTotalInsideBox(f)){c.Child[a].Triangles.push(h)}else{g.push(h)}}c.Triangles=g;if(c.Child[a].Triangles.length==0){c.Child[a]=null}else{this.constructTree(c.Child[a])}}}this.DebugPolyCount+=c.Triangles.length};CL3D.OctTreeTriangleSelector.prototype.getAllTriangles=function(a,b){CL3D.MeshTriangleSelector.prototype.getAllTriangles.call(this,a,b)};CL3D.OctTreeTriangleSelector.prototype.getTrianglesInBox=function(e,b,d){if(!this.Node.AbsoluteTransformation){return}var c=new CL3D.Matrix4();var a=e.clone();if(this.Node){c=this.Node.getAbsoluteTransformation().clone();c.makeInverse();c.transformBoxEx(a)}c.makeIdentity();if(b){c=b.clone()}if(this.Node){c=c.multiply(this.Node.getAbsoluteTransformation())}if(this.Root){this.getTrianglesFromOctTree(this.Root,d,a,c)}};CL3D.OctTreeTriangleSelector.prototype.getTrianglesFromOctTree=function(g,e,f,a){if(!g.Box.intersectsWithBox(f)){return}var d=g.Triangles.length;var b;if(a.isIdentity()){for(b=0;b<d;++b){e.push(g.Triangles[b])}}else{if(a.isTranslateOnly()){for(b=0;b<d;++b){e.push(new CL3D.Triangle3d(a.getTranslatedVect(g.Triangles[b].pointA),a.getTranslatedVect(g.Triangles[b].pointB),a.getTranslatedVect(g.Triangles[b].pointC)))}}else{for(b=0;b<d;++b){e.push(new CL3D.Triangle3d(a.getTransformedVect(g.Triangles[b].pointA),a.getTransformedVect(g.Triangles[b].pointB),a.getTransformedVect(g.Triangles[b].pointC)))}}}for(b=0;b<8;++b){var h=g.Child[b];if(h!=null){this.getTrianglesFromOctTree(h,e,f,a)}}};
/** ../_core/scripts/jquery.js **/
/*!
 * jQuery JavaScript Library v1.6.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Jun 30 14:16:56 2011 -0400
 */
(function( window, undefined ) {

// Use the correct document accordingly with window argument (sandbox)
var document = window.document,
	navigator = window.navigator,
	location = window.location;
var jQuery = (function() {

// Define a local copy of jQuery
var jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// A simple way to check for HTML strings or ID strings
	// (both of which we optimize for)
	quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Check if a string has a non-whitespace character in it
	rnotwhite = /\S/,

	// Used for trimming whitespace
	trimLeft = /^\s+/,
	trimRight = /\s+$/,

	// Check for digits
	rdigit = /\d/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

	// Useragent RegExp
	rwebkit = /(webkit)[ \/]([\w.]+)/,
	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
	rmsie = /(msie) ([\w.]+)/,
	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

	// Matches dashed string for camelizing
	rdashAlpha = /-([a-z])/ig,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// Keep a UserAgent string for use with jQuery.browser
	userAgent = navigator.userAgent,

	// For matching the engine and version of the browser
	browserMatch,

	// The deferred used on DOM ready
	readyList,

	// The ready event handler
	DOMContentLoaded,

	// Save a reference to some core methods
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), or $(undefined)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// The body element only exists once, optimize finding it
		if ( selector === "body" && !context && document.body ) {
			this.context = document;
			this[0] = document.body;
			this.selector = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = quickExpr.exec( selector );
			}

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = (context ? context.ownerDocument || context : document);

					// If a single string is passed in and it's a single tag
					// just do a createElement and skip the rest
					ret = rsingleTag.exec( selector );

					if ( ret ) {
						if ( jQuery.isPlainObject( context ) ) {
							selector = [ document.createElement( ret[1] ) ];
							jQuery.fn.attr.call( selector, context, true );

						} else {
							selector = [ doc.createElement( ret[1] ) ];
						}

					} else {
						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
						selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes;
					}

					return jQuery.merge( this, selector );

				// HANDLE: $("#id")
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return (context || rootjQuery).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if (selector.selector !== undefined) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.6.2",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return slice.call( this, 0 );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = this.constructor();

		if ( jQuery.isArray( elems ) ) {
			push.apply( ret, elems );

		} else {
			jQuery.merge( ret, elems );
		}

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + (this.selector ? " " : "") + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Attach the listeners
		jQuery.bindReady();

		// Add the callback
		readyList.done( fn );

		return this;
	},

	eq: function( i ) {
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, +i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ),
			"slice", slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {
		// Either a released hold or an DOMready/load event and not yet ready
		if ( (wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady) ) {
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 1 );
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.trigger ) {
				jQuery( document ).trigger( "ready" ).unbind( "ready" );
			}
		}
	},

	bindReady: function() {
		if ( readyList ) {
			return;
		}

		readyList = jQuery._Deferred();

		// Catch cases where $(document).ready() is called after the
		// browser event has already occurred.
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			return setTimeout( jQuery.ready, 1 );
		}

		// Mozilla, Opera and webkit nightlies currently support this event
		if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else if ( document.attachEvent ) {
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {
				doScrollCheck();
			}
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	// A crude way of determining if an object is a window
	isWindow: function( obj ) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	},

	isNaN: function( obj ) {
		return obj == null || !rdigit.test( obj ) || isNaN( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
			!hasOwn.call(obj, "constructor") &&
			!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw msg;
	},

	parseJSON: function( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return (new Function( "return " + data ))();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	// (xml & tmp used internally)
	parseXML: function( data , xml , tmp ) {

		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data , "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}

		tmp = xml.documentElement;

		if ( ! tmp || ! tmp.nodeName || tmp.nodeName === "parsererror" ) {
			jQuery.error( "Invalid XML: " + data );
		}

		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Converts a dashed string to camelCased string;
	// Used by both the css and data modules
	camelCase: function( string ) {
		return string.replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction( object );

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return object;
	},

	// Use native String.trim function wherever possible
	trim: trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
		},

	// results is for internal usage only
	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			// The window, strings (and functions) also have 'length'
			// The extra typeof function check is to prevent crashes
			// in Safari 2 (See: #3039)
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			var type = jQuery.type( array );

			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
				push.call( ret, array );
			} else {
				jQuery.merge( ret, array );
			}
		}

		return ret;
	},

	inArray: function( elem, array ) {

		if ( indexOf ) {
			return indexOf.call( array, elem );
		}

		for ( var i = 0, length = array.length; i < length; i++ ) {
			if ( array[ i ] === elem ) {
				return i;
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var i = first.length,
			j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var ret = [], retVal;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key, ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		if ( typeof context === "string" ) {
			var tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		var args = slice.call( arguments, 2 ),
			proxy = function() {
				return fn.apply( context, args.concat( slice.call( arguments ) ) );
			};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

		return proxy;
	},

	// Mutifunctional method to get and set values to a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, key, value, exec, fn, pass ) {
		var length = elems.length;

		// Setting many attributes
		if ( typeof key === "object" ) {
			for ( var k in key ) {
				jQuery.access( elems, k, key[k], exec, fn, value );
			}
			return elems;
		}

		// Setting one attribute
		if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = !pass && exec && jQuery.isFunction(value);

			for ( var i = 0; i < length; i++ ) {
				fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
			}

			return elems;
		}

		// Getting an attribute
		return length ? fn( elems[0], key ) : undefined;
	},

	now: function() {
		return (new Date()).getTime();
	},

	// Use of jQuery.browser is frowned upon.
	// More details: http://docs.jquery.com/Utilities/jQuery.browser
	uaMatch: function( ua ) {
		ua = ua.toLowerCase();

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},

	sub: function() {
		function jQuerySub( selector, context ) {
			return new jQuerySub.fn.init( selector, context );
		}
		jQuery.extend( true, jQuerySub, this );
		jQuerySub.superclass = this;
		jQuerySub.fn = jQuerySub.prototype = this();
		jQuerySub.fn.constructor = jQuerySub;
		jQuerySub.sub = this.sub;
		jQuerySub.fn.init = function init( selector, context ) {
			if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
				context = jQuerySub( context );
			}

			return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
		};
		jQuerySub.fn.init.prototype = jQuerySub.fn;
		var rootjQuerySub = jQuerySub(document);
		return jQuerySub;
	},

	browser: {}
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

browserMatch = jQuery.uaMatch( userAgent );
if ( browserMatch.browser ) {
	jQuery.browser[ browserMatch.browser ] = true;
	jQuery.browser.version = browserMatch.version;
}

// Deprecated, use jQuery.browser.webkit instead
if ( jQuery.browser.webkit ) {
	jQuery.browser.safari = true;
}

// IE doesn't match non-breaking spaces with \s
if ( rnotwhite.test( "\xA0" ) ) {
	trimLeft = /^[\s\xA0]+/;
	trimRight = /[\s\xA0]+$/;
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);

// Cleanup functions for the document ready method
if ( document.addEventListener ) {
	DOMContentLoaded = function() {
		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		jQuery.ready();
	};

} else if ( document.attachEvent ) {
	DOMContentLoaded = function() {
		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};
}

// The DOM ready check for Internet Explorer
function doScrollCheck() {
	if ( jQuery.isReady ) {
		return;
	}

	try {
		// If IE is used, use the trick by Diego Perini
		// http://javascript.nwbox.com/IEContentLoaded/
		document.documentElement.doScroll("left");
	} catch(e) {
		setTimeout( doScrollCheck, 1 );
		return;
	}

	// and execute any waiting functions
	jQuery.ready();
}

return jQuery;

})();


var // Promise methods
	promiseMethods = "done fail isResolved isRejected promise then always pipe".split( " " ),
	// Static reference to slice
	sliceDeferred = [].slice;

jQuery.extend({
	// Create a simple deferred (one callbacks list)
	_Deferred: function() {
		var // callbacks list
			callbacks = [],
			// stored [ context , args ]
			fired,
			// to avoid firing when already doing so
			firing,
			// flag to know if the deferred has been cancelled
			cancelled,
			// the deferred itself
			deferred  = {

				// done( f1, f2, ...)
				done: function() {
					if ( !cancelled ) {
						var args = arguments,
							i,
							length,
							elem,
							type,
							_fired;
						if ( fired ) {
							_fired = fired;
							fired = 0;
						}
						for ( i = 0, length = args.length; i < length; i++ ) {
							elem = args[ i ];
							type = jQuery.type( elem );
							if ( type === "array" ) {
								deferred.done.apply( deferred, elem );
							} else if ( type === "function" ) {
								callbacks.push( elem );
							}
						}
						if ( _fired ) {
							deferred.resolveWith( _fired[ 0 ], _fired[ 1 ] );
						}
					}
					return this;
				},

				// resolve with given context and args
				resolveWith: function( context, args ) {
					if ( !cancelled && !fired && !firing ) {
						// make sure args are available (#8421)
						args = args || [];
						firing = 1;
						try {
							while( callbacks[ 0 ] ) {
								callbacks.shift().apply( context, args );
							}
						}
						finally {
							fired = [ context, args ];
							firing = 0;
						}
					}
					return this;
				},

				// resolve with this as context and given arguments
				resolve: function() {
					deferred.resolveWith( this, arguments );
					return this;
				},

				// Has this deferred been resolved?
				isResolved: function() {
					return !!( firing || fired );
				},

				// Cancel
				cancel: function() {
					cancelled = 1;
					callbacks = [];
					return this;
				}
			};

		return deferred;
	},

	// Full fledged deferred (two callbacks list)
	Deferred: function( func ) {
		var deferred = jQuery._Deferred(),
			failDeferred = jQuery._Deferred(),
			promise;
		// Add errorDeferred methods, then and promise
		jQuery.extend( deferred, {
			then: function( doneCallbacks, failCallbacks ) {
				deferred.done( doneCallbacks ).fail( failCallbacks );
				return this;
			},
			always: function() {
				return deferred.done.apply( deferred, arguments ).fail.apply( this, arguments );
			},
			fail: failDeferred.done,
			rejectWith: failDeferred.resolveWith,
			reject: failDeferred.resolve,
			isRejected: failDeferred.isResolved,
			pipe: function( fnDone, fnFail ) {
				return jQuery.Deferred(function( newDefer ) {
					jQuery.each( {
						done: [ fnDone, "resolve" ],
						fail: [ fnFail, "reject" ]
					}, function( handler, data ) {
						var fn = data[ 0 ],
							action = data[ 1 ],
							returned;
						if ( jQuery.isFunction( fn ) ) {
							deferred[ handler ](function() {
								returned = fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise().then( newDefer.resolve, newDefer.reject );
								} else {
									newDefer[ action ]( returned );
								}
							});
						} else {
							deferred[ handler ]( newDefer[ action ] );
						}
					});
				}).promise();
			},
			// Get a promise for this deferred
			// If obj is provided, the promise aspect is added to the object
			promise: function( obj ) {
				if ( obj == null ) {
					if ( promise ) {
						return promise;
					}
					promise = obj = {};
				}
				var i = promiseMethods.length;
				while( i-- ) {
					obj[ promiseMethods[i] ] = deferred[ promiseMethods[i] ];
				}
				return obj;
			}
		});
		// Make sure only one callback list will be used
		deferred.done( failDeferred.cancel ).fail( deferred.cancel );
		// Unexpose cancel
		delete deferred.cancel;
		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}
		return deferred;
	},

	// Deferred helper
	when: function( firstParam ) {
		var args = arguments,
			i = 0,
			length = args.length,
			count = length,
			deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
				firstParam :
				jQuery.Deferred();
		function resolveFunc( i ) {
			return function( value ) {
				args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				if ( !( --count ) ) {
					// Strange bug in FF4:
					// Values changed onto the arguments object sometimes end up as undefined values
					// outside the $.when method. Cloning the object into a fresh array solves the issue
					deferred.resolveWith( deferred, sliceDeferred.call( args, 0 ) );
				}
			};
		}
		if ( length > 1 ) {
			for( ; i < length; i++ ) {
				if ( args[ i ] && jQuery.isFunction( args[ i ].promise ) ) {
					args[ i ].promise().then( resolveFunc(i), deferred.reject );
				} else {
					--count;
				}
			}
			if ( !count ) {
				deferred.resolveWith( deferred, args );
			}
		} else if ( deferred !== firstParam ) {
			deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
		}
		return deferred.promise();
	}
});



jQuery.support = (function() {

	var div = document.createElement( "div" ),
		documentElement = document.documentElement,
		all,
		a,
		select,
		opt,
		input,
		marginDiv,
		support,
		fragment,
		body,
		testElementParent,
		testElement,
		testElementStyle,
		tds,
		events,
		eventName,
		i,
		isSupported;

	// Preliminary tests
	div.setAttribute("className", "t");
	div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

	all = div.getElementsByTagName( "*" );
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return {};
	}

	// First batch of supports tests
	select = document.createElement( "select" );
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName( "input" )[ 0 ];

	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName( "tbody" ).length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName( "link" ).length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute( "href" ) === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.55$/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent( "onclick" );
	}

	// Check if a radio maintains it's value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute("type", "radio");
	support.radioValue = input.value === "t";

	input.setAttribute("checked", "checked");
	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.firstChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	div.innerHTML = "";

	// Figure out if the W3C box model works as expected
	div.style.width = div.style.paddingLeft = "1px";

	body = document.getElementsByTagName( "body" )[ 0 ];
	// We use our own, invisible, body unless the body is already present
	// in which case we use a div (#9239)
	testElement = document.createElement( body ? "div" : "body" );
	testElementStyle = {
		visibility: "hidden",
		width: 0,
		height: 0,
		border: 0,
		margin: 0
	};
	if ( body ) {
		jQuery.extend( testElementStyle, {
			position: "absolute",
			left: -1000,
			top: -1000
		});
	}
	for ( i in testElementStyle ) {
		testElement.style[ i ] = testElementStyle[ i ];
	}
	testElement.appendChild( div );
	testElementParent = body || documentElement;
	testElementParent.insertBefore( testElement, testElementParent.firstChild );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	support.boxModel = div.offsetWidth === 2;

	if ( "zoom" in div.style ) {
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		// (IE < 8 does this)
		div.style.display = "inline";
		div.style.zoom = 1;
		support.inlineBlockNeedsLayout = ( div.offsetWidth === 2 );

		// Check if elements with layout shrink-wrap their children
		// (IE 6 does this)
		div.style.display = "";
		div.innerHTML = "<div style='width:4px;'></div>";
		support.shrinkWrapBlocks = ( div.offsetWidth !== 2 );
	}

	div.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
	tds = div.getElementsByTagName( "td" );

	// Check if table cells still have offsetWidth/Height when they are set
	// to display:none and there are still other visible table cells in a
	// table row; if so, offsetWidth/Height are not reliable for use when
	// determining if an element has been hidden directly using
	// display:none (it is still safe to use offsets if a parent element is
	// hidden; don safety goggles and see bug #4512 for more information).
	// (only IE 8 fails this test)
	isSupported = ( tds[ 0 ].offsetHeight === 0 );

	tds[ 0 ].style.display = "";
	tds[ 1 ].style.display = "none";

	// Check if empty table cells still have offsetWidth/Height
	// (IE < 8 fail this test)
	support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );
	div.innerHTML = "";

	// Check if div with explicit width and no margin-right incorrectly
	// gets computed margin-right based on width of container. For more
	// info see bug #3333
	// Fails in WebKit before Feb 2011 nightlies
	// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	if ( document.defaultView && document.defaultView.getComputedStyle ) {
		marginDiv = document.createElement( "div" );
		marginDiv.style.width = "0";
		marginDiv.style.marginRight = "0";
		div.appendChild( marginDiv );
		support.reliableMarginRight =
			( parseInt( ( document.defaultView.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;
	}

	// Remove the body element we added
	testElement.innerHTML = "";
	testElementParent.removeChild( testElement );

	// Technique from Juriy Zaytsev
	// http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for( i in {
			submit: 1,
			change: 1,
			focusin: 1
		} ) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	// Null connected elements to avoid leaks in IE
	testElement = fragment = select = opt = body = marginDiv = div = input = null;

	return support;
})();

// Keep track of boxModel
jQuery.boxModel = jQuery.support.boxModel;




var rbrace = /^(?:\{.*\}|\[.*\])$/,
	rmultiDash = /([a-z])([A-Z])/g;

jQuery.extend({
	cache: {},

	// Please use with caution
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];

		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var internalKey = jQuery.expando, getByName = typeof name === "string", thisCache,

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ jQuery.expando ] : elem[ jQuery.expando ] && jQuery.expando;

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || (pvt && id && !cache[ id ][ internalKey ])) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ jQuery.expando ] = id = ++jQuery.uuid;
			} else {
				id = jQuery.expando;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// TODO: This is a hack for 1.5 ONLY. Avoids exposing jQuery
			// metadata on plain JS objects when the object is serialized using
			// JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ][ internalKey ] = jQuery.extend(cache[ id ][ internalKey ], name);
			} else {
				cache[ id ] = jQuery.extend(cache[ id ], name);
			}
		}

		thisCache = cache[ id ];

		// Internal jQuery data is stored in a separate object inside the object's data
		// cache in order to avoid key collisions between internal data and user-defined
		// data
		if ( pvt ) {
			if ( !thisCache[ internalKey ] ) {
				thisCache[ internalKey ] = {};
			}

			thisCache = thisCache[ internalKey ];
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// TODO: This is a hack for 1.5 ONLY. It will be removed in 1.6. Users should
		// not attempt to inspect the internal events object using jQuery.data, as this
		// internal data object is undocumented and subject to change.
		if ( name === "events" && !thisCache[name] ) {
			return thisCache[ internalKey ] && thisCache[ internalKey ].events;
		}

		return getByName ? 
			// Check for both converted-to-camel and non-converted data property names
			thisCache[ jQuery.camelCase( name ) ] || thisCache[ name ] :
			thisCache;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var internalKey = jQuery.expando, isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,

			// See jQuery.data for more information
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {
			var thisCache = pvt ? cache[ id ][ internalKey ] : cache[ id ];

			if ( thisCache ) {
				delete thisCache[ name ];

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !isEmptyDataObject(thisCache) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( pvt ) {
			delete cache[ id ][ internalKey ];

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject(cache[ id ]) ) {
				return;
			}
		}

		var internalCache = cache[ id ][ internalKey ];

		// Browsers that fail expando deletion also refuse to delete expandos on
		// the window, but it will allow it on all other JS objects; other browsers
		// don't care
		if ( jQuery.support.deleteExpando || cache != window ) {
			delete cache[ id ];
		} else {
			cache[ id ] = null;
		}

		// We destroyed the entire user cache at once because it's faster than
		// iterating through each key, but we need to continue to persist internal
		// data if it existed
		if ( internalCache ) {
			cache[ id ] = {};
			// TODO: This is a hack for 1.5 ONLY. Avoids exposing jQuery
			// metadata on plain JS objects when the object is serialized using
			// JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}

			cache[ id ][ internalKey ] = internalCache;

		// Otherwise, we need to eliminate the expando on the node to avoid
		// false lookups in the cache for entries that no longer exist
		} else if ( isNode ) {
			// IE does not allow us to delete expando properties from nodes,
			// nor does it have a removeAttribute function on Document nodes;
			// we must handle all of these cases
			if ( jQuery.support.deleteExpando ) {
				delete elem[ jQuery.expando ];
			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( jQuery.expando );
			} else {
				elem[ jQuery.expando ] = null;
			}
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		if ( elem.nodeName ) {
			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

			if ( match ) {
				return !(match === true || elem.getAttribute("classid") !== match);
			}
		}

		return true;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var data = null;

		if ( typeof key === "undefined" ) {
			if ( this.length ) {
				data = jQuery.data( this[0] );

				if ( this[0].nodeType === 1 ) {
			    var attr = this[0].attributes, name;
					for ( var i = 0, l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( this[0], name, data[ name ] );
						}
					}
				}
			}

			return data;

		} else if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		var parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			// Try to fetch any internally stored data first
			if ( data === undefined && this.length ) {
				data = jQuery.data( this[0], key );
				data = dataAttr( this[0], key, data );
			}

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;

		} else {
			return this.each(function() {
				var $this = jQuery( this ),
					args = [ parts[0], value ];

				$this.triggerHandler( "setData" + parts[1] + "!", args );
				jQuery.data( this, key, value );
				$this.triggerHandler( "changeData" + parts[1] + "!", args );
			});
		}
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		var name = "data-" + key.replace( rmultiDash, "$1-$2" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				!jQuery.isNaN( data ) ? parseFloat( data ) :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// TODO: This is a hack for 1.5 ONLY to allow objects with a single toJSON
// property to be considered empty objects; this property always exists in
// order to make sure JSON.stringify does not expose internal metadata
function isEmptyDataObject( obj ) {
	for ( var name in obj ) {
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}




function handleQueueMarkDefer( elem, type, src ) {
	var deferDataKey = type + "defer",
		queueDataKey = type + "queue",
		markDataKey = type + "mark",
		defer = jQuery.data( elem, deferDataKey, undefined, true );
	if ( defer &&
		( src === "queue" || !jQuery.data( elem, queueDataKey, undefined, true ) ) &&
		( src === "mark" || !jQuery.data( elem, markDataKey, undefined, true ) ) ) {
		// Give room for hard-coded callbacks to fire first
		// and eventually mark/queue something else on the element
		setTimeout( function() {
			if ( !jQuery.data( elem, queueDataKey, undefined, true ) &&
				!jQuery.data( elem, markDataKey, undefined, true ) ) {
				jQuery.removeData( elem, deferDataKey, true );
				defer.resolve();
			}
		}, 0 );
	}
}

jQuery.extend({

	_mark: function( elem, type ) {
		if ( elem ) {
			type = (type || "fx") + "mark";
			jQuery.data( elem, type, (jQuery.data(elem,type,undefined,true) || 0) + 1, true );
		}
	},

	_unmark: function( force, elem, type ) {
		if ( force !== true ) {
			type = elem;
			elem = force;
			force = false;
		}
		if ( elem ) {
			type = type || "fx";
			var key = type + "mark",
				count = force ? 0 : ( (jQuery.data( elem, key, undefined, true) || 1 ) - 1 );
			if ( count ) {
				jQuery.data( elem, key, count, true );
			} else {
				jQuery.removeData( elem, key, true );
				handleQueueMarkDefer( elem, type, "mark" );
			}
		}
	},

	queue: function( elem, type, data ) {
		if ( elem ) {
			type = (type || "fx") + "queue";
			var q = jQuery.data( elem, type, undefined, true );
			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !q || jQuery.isArray(data) ) {
					q = jQuery.data( elem, type, jQuery.makeArray(data), true );
				} else {
					q.push( data );
				}
			}
			return q || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift(),
			defer;

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift("inprogress");
			}

			fn.call(elem, function() {
				jQuery.dequeue(elem, type);
			});
		}

		if ( !queue.length ) {
			jQuery.removeData( elem, type + "queue", true );
			handleQueueMarkDefer( elem, type, "queue" );
		}
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined ) {
			return jQuery.queue( this[0], type );
		}
		return this.each(function() {
			var queue = jQuery.queue( this, type, data );

			if ( type === "fx" && queue[0] !== "inprogress" ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue( type, function() {
			var elem = this;
			setTimeout(function() {
				jQuery.dequeue( elem, type );
			}, time );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, object ) {
		if ( typeof type !== "string" ) {
			object = type;
			type = undefined;
		}
		type = type || "fx";
		var defer = jQuery.Deferred(),
			elements = this,
			i = elements.length,
			count = 1,
			deferDataKey = type + "defer",
			queueDataKey = type + "queue",
			markDataKey = type + "mark",
			tmp;
		function resolve() {
			if ( !( --count ) ) {
				defer.resolveWith( elements, [ elements ] );
			}
		}
		while( i-- ) {
			if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||
					( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||
						jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&
					jQuery.data( elements[ i ], deferDataKey, jQuery._Deferred(), true ) )) {
				count++;
				tmp.done( resolve );
			}
		}
		resolve();
		return defer.promise();
	}
});




var rclass = /[\n\t\r]/g,
	rspace = /\s+/,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea)?$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	rinvalidChar = /\:|^on/,
	formHook, boolHook;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.attr );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},
	
	prop: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.prop );
	},
	
	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, i, l, elem, className, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}

		if ( (value && typeof value === "string") || value === undefined ) {
			classNames = (value || "").split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 && elem.className ) {
					if ( value ) {
						className = (" " + elem.className + " ").replace( rclass, " " );
						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							className = className.replace(" " + classNames[ c ] + " ", " ");
						}
						elem.className = jQuery.trim( className );

					} else {
						elem.className = "";
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space seperated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ";
		for ( var i = 0, l = this.length; i < l; i++ ) {
			if ( (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret,
			elem = this[0];
		
		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.nodeName.toLowerCase() ] || jQuery.valHooks[ elem.type ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ? 
					// handle most common string cases
					ret.replace(rreturn, "") : 
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return undefined;
		}

		var isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var self = jQuery(this), val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.nodeName.toLowerCase() ] || jQuery.valHooks[ this.type ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				// Nothing was selected
				if ( index < 0 ) {
					return null;
				}

				// Loop through all the selected options
				for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
					var option = options[ i ];

					// Don't return options that are disabled or in a disabled optgroup
					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
				if ( one && !values.length && options.length ) {
					return jQuery( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attrFn: {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true
	},
	
	attrFix: {
		// Always normalize to ensure hook usage
		tabindex: "tabIndex"
	},
	
	attr: function( elem, name, value, pass ) {
		var nType = elem.nodeType;
		
		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return undefined;
		}

		if ( pass && name in jQuery.attrFn ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( !("getAttribute" in elem) ) {
			return jQuery.prop( elem, name, value );
		}

		var ret, hooks,
			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// Normalize the name if needed
		if ( notxml ) {
			name = jQuery.attrFix[ name ] || name;

			hooks = jQuery.attrHooks[ name ];

			if ( !hooks ) {
				// Use boolHook for boolean attributes
				if ( rboolean.test( name ) ) {

					hooks = boolHook;

				// Use formHook for forms and if the name contains certain characters
				} else if ( formHook && name !== "className" &&
					(jQuery.nodeName( elem, "form" ) || rinvalidChar.test( name )) ) {

					hooks = formHook;
				}
			}
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return undefined;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, "" + value );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, name ) {
		var propName;
		if ( elem.nodeType === 1 ) {
			name = jQuery.attrFix[ name ] || name;
		
			if ( jQuery.support.getSetAttribute ) {
				// Use removeAttribute in browsers that support it
				elem.removeAttribute( name );
			} else {
				jQuery.attr( elem, name, "" );
				elem.removeAttributeNode( elem.getAttributeNode( name ) );
			}

			// Set corresponding property to false for boolean attributes
			if ( rboolean.test( name ) && (propName = jQuery.propFix[ name ] || name) in elem ) {
				elem[ propName ] = false;
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabIndex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		},
		// Use the value property for back compat
		// Use the formHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( formHook && jQuery.nodeName( elem, "button" ) ) {
					return formHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( formHook && jQuery.nodeName( elem, "button" ) ) {
					return formHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},
	
	prop: function( elem, name, value ) {
		var nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return undefined;
		}

		var ret, hooks,
			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return (elem[ name ] = value);
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== undefined ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},
	
	propHooks: {}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		return jQuery.prop( elem, name ) ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !jQuery.support.getSetAttribute ) {

	// propFix is more comprehensive and contains all fixes
	jQuery.attrFix = jQuery.propFix;
	
	// Use this for any attribute on a form in IE6/7
	formHook = jQuery.attrHooks.name = jQuery.attrHooks.title = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			// Return undefined if nodeValue is empty string
			return ret && ret.nodeValue !== "" ?
				ret.nodeValue :
				undefined;
		},
		set: function( elem, value, name ) {
			// Check form objects in IE (multiple bugs related)
			// Only use nodeValue if the attribute node exists on the form
			var ret = elem.getAttributeNode( name );
			if ( ret ) {
				ret.nodeValue = value;
				return value;
			}
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return (elem.style.cssText = "" + value);
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	});
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return (elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0);
			}
		}
	});
});




var rnamespaces = /\.(.*)$/,
	rformElems = /^(?:textarea|input|select)$/i,
	rperiod = /\./g,
	rspaces = / /g,
	rescape = /[^\w\s.|`]/g,
	fcleanup = function( nm ) {
		return nm.replace(rescape, "\\$&");
	};

/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code originated from
 * Dean Edwards' addEvent library.
 */
jQuery.event = {

	// Bind an event to an element
	// Original by Dean Edwards
	add: function( elem, types, handler, data ) {
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		if ( handler === false ) {
			handler = returnFalse;
		} else if ( !handler ) {
			// Fixes bug #7229. Fix recommended by jdalton
			return;
		}

		var handleObjIn, handleObj;

		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
		}

		// Make sure that the function being executed has a unique ID
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure
		var elemData = jQuery._data( elem );

		// If no elemData is found then we must be trying to bind to one of the
		// banned noData elements
		if ( !elemData ) {
			return;
		}

		var events = elemData.events,
			eventHandle = elemData.handle;

		if ( !events ) {
			elemData.events = events = {};
		}

		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.handle.apply( eventHandle.elem, arguments ) :
					undefined;
			};
		}

		// Add elem as a property of the handle function
		// This is to prevent a memory leak with non-native events in IE.
		eventHandle.elem = elem;

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = types.split(" ");

		var type, i = 0, namespaces;

		while ( (type = types[ i++ ]) ) {
			handleObj = handleObjIn ?
				jQuery.extend({}, handleObjIn) :
				{ handler: handler, data: data };

			// Namespaced event handlers
			if ( type.indexOf(".") > -1 ) {
				namespaces = type.split(".");
				type = namespaces.shift();
				handleObj.namespace = namespaces.slice(0).sort().join(".");

			} else {
				namespaces = [];
				handleObj.namespace = "";
			}

			handleObj.type = type;
			if ( !handleObj.guid ) {
				handleObj.guid = handler.guid;
			}

			// Get the current list of functions bound to this event
			var handlers = events[ type ],
				special = jQuery.event.special[ type ] || {};

			// Init the event handler queue
			if ( !handlers ) {
				handlers = events[ type ] = [];

				// Check for a special event handler
				// Only use addEventListener/attachEvent if the special
				// events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add the function to the element's handler list
			handlers.push( handleObj );

			// Keep track of which events have been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, pos ) {
		// don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		if ( handler === false ) {
			handler = returnFalse;
		}

		var ret, type, fn, j, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem ),
			events = elemData && elemData.events;

		if ( !elemData || !events ) {
			return;
		}

		// types is actually an event object here
		if ( types && types.type ) {
			handler = types.handler;
			types = types.type;
		}

		// Unbind all events for the element
		if ( !types || typeof types === "string" && types.charAt(0) === "." ) {
			types = types || "";

			for ( type in events ) {
				jQuery.event.remove( elem, type + types );
			}

			return;
		}

		// Handle multiple events separated by a space
		// jQuery(...).unbind("mouseover mouseout", fn);
		types = types.split(" ");

		while ( (type = types[ i++ ]) ) {
			origType = type;
			handleObj = null;
			all = type.indexOf(".") < 0;
			namespaces = [];

			if ( !all ) {
				// Namespaced event handlers
				namespaces = type.split(".");
				type = namespaces.shift();

				namespace = new RegExp("(^|\\.)" +
					jQuery.map( namespaces.slice(0).sort(), fcleanup ).join("\\.(?:.*\\.)?") + "(\\.|$)");
			}

			eventType = events[ type ];

			if ( !eventType ) {
				continue;
			}

			if ( !handler ) {
				for ( j = 0; j < eventType.length; j++ ) {
					handleObj = eventType[ j ];

					if ( all || namespace.test( handleObj.namespace ) ) {
						jQuery.event.remove( elem, origType, handleObj.handler, j );
						eventType.splice( j--, 1 );
					}
				}

				continue;
			}

			special = jQuery.event.special[ type ] || {};

			for ( j = pos || 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( handler.guid === handleObj.guid ) {
					// remove the given handler for the given type
					if ( all || namespace.test( handleObj.namespace ) ) {
						if ( pos == null ) {
							eventType.splice( j--, 1 );
						}

						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}

					if ( pos != null ) {
						break;
					}
				}
			}

			// remove generic event handler if no more handlers exist
			if ( eventType.length === 0 || pos != null && eventType.length === 1 ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				ret = null;
				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			var handle = elemData.handle;
			if ( handle ) {
				handle.elem = null;
			}

			delete elemData.events;
			delete elemData.handle;

			if ( jQuery.isEmptyObject( elemData ) ) {
				jQuery.removeData( elem, undefined, true );
			}
		}
	},
	
	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Event object or event type
		var type = event.type || event,
			namespaces = [],
			exclusive;

		if ( type.indexOf("!") >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.exclusive = exclusive;
		event.namespace = namespaces.join(".");
		event.namespace_re = new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)");
		
		// triggerHandler() and global events don't bubble or run the default action
		if ( onlyHandlers || !elem ) {
			event.preventDefault();
			event.stopPropagation();
		}

		// Handle a global trigger
		if ( !elem ) {
			// TODO: Stop taunting the data cache; remove global events and always attach to document
			jQuery.each( jQuery.cache, function() {
				// internalKey variable is just used to make it easier to find
				// and potentially change this stuff later; currently it just
				// points to jQuery.expando
				var internalKey = jQuery.expando,
					internalCache = this[ internalKey ];
				if ( internalCache && internalCache.events && internalCache.events[ type ] ) {
					jQuery.event.trigger( event, data, internalCache.handle.elem );
				}
			});
			return;
		}

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		event.target = elem;

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		var cur = elem,
			// IE doesn't like method names with a colon (#3533, #8272)
			ontype = type.indexOf(":") < 0 ? "on" + type : "";

		// Fire event on the current element, then bubble up the DOM tree
		do {
			var handle = jQuery._data( cur, "handle" );

			event.currentTarget = cur;
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Trigger an inline bound script
			if ( ontype && jQuery.acceptData( cur ) && cur[ ontype ] && cur[ ontype ].apply( cur, data ) === false ) {
				event.result = false;
				event.preventDefault();
			}

			// Bubble up to document, then to window
			cur = cur.parentNode || cur.ownerDocument || cur === event.target.ownerDocument && window;
		} while ( cur && !event.isPropagationStopped() );

		// If nobody prevented the default action, do it now
		if ( !event.isDefaultPrevented() ) {
			var old,
				special = jQuery.event.special[ type ] || {};

			if ( (!special._default || special._default.call( elem.ownerDocument, event ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction)() check here because IE6/7 fails that test.
				// IE<9 dies on focus to hidden element (#1486), may want to revisit a try/catch.
				try {
					if ( ontype && elem[ type ] ) {
						// Don't re-trigger an onFOO event when we call its FOO() method
						old = elem[ ontype ];

						if ( old ) {
							elem[ ontype ] = null;
						}

						jQuery.event.triggered = type;
						elem[ type ]();
					}
				} catch ( ieError ) {}

				if ( old ) {
					elem[ ontype ] = old;
				}

				jQuery.event.triggered = undefined;
			}
		}
		
		return event.result;
	},

	handle: function( event ) {
		event = jQuery.event.fix( event || window.event );
		// Snapshot the handlers list since a called handler may add/remove events.
		var handlers = ((jQuery._data( this, "events" ) || {})[ event.type ] || []).slice(0),
			run_all = !event.exclusive && !event.namespace,
			args = Array.prototype.slice.call( arguments, 0 );

		// Use the fix-ed Event rather than the (read-only) native event
		args[0] = event;
		event.currentTarget = this;

		for ( var j = 0, l = handlers.length; j < l; j++ ) {
			var handleObj = handlers[ j ];

			// Triggered event must 1) be non-exclusive and have no namespace, or
			// 2) have namespace(s) a subset or equal to those in the bound event.
			if ( run_all || event.namespace_re.test( handleObj.namespace ) ) {
				// Pass in a reference to the handler function itself
				// So that we can later remove it
				event.handler = handleObj.handler;
				event.data = handleObj.data;
				event.handleObj = handleObj;

				var ret = handleObj.handler.apply( this, args );

				if ( ret !== undefined ) {
					event.result = ret;
					if ( ret === false ) {
						event.preventDefault();
						event.stopPropagation();
					}
				}

				if ( event.isImmediatePropagationStopped() ) {
					break;
				}
			}
		}
		return event.result;
	},

	props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// store a copy of the original event object
		// and "clone" to set read-only properties
		var originalEvent = event;
		event = jQuery.Event( originalEvent );

		for ( var i = this.props.length, prop; i; ) {
			prop = this.props[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary
		if ( !event.target ) {
			// Fixes #1925 where srcElement might not be defined either
			event.target = event.srcElement || document;
		}

		// check if target is a textnode (safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Add relatedTarget, if necessary
		if ( !event.relatedTarget && event.fromElement ) {
			event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
		}

		// Calculate pageX/Y if missing and clientX/Y available
		if ( event.pageX == null && event.clientX != null ) {
			var eventDocument = event.target.ownerDocument || document,
				doc = eventDocument.documentElement,
				body = eventDocument.body;

			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
		}

		// Add which for key events
		if ( event.which == null && (event.charCode != null || event.keyCode != null) ) {
			event.which = event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
		if ( !event.metaKey && event.ctrlKey ) {
			event.metaKey = event.ctrlKey;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button !== undefined ) {
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
		}

		return event;
	},

	// Deprecated, use jQuery.guid instead
	guid: 1E8,

	// Deprecated, use jQuery.proxy instead
	proxy: jQuery.proxy,

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: jQuery.bindReady,
			teardown: jQuery.noop
		},

		live: {
			add: function( handleObj ) {
				jQuery.event.add( this,
					liveConvert( handleObj.origType, handleObj.selector ),
					jQuery.extend({}, handleObj, {handler: liveHandler, guid: handleObj.handler.guid}) );
			},

			remove: function( handleObj ) {
				jQuery.event.remove( this, liveConvert( handleObj.origType, handleObj.selector ), handleObj );
			}
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		if ( elem.detachEvent ) {
			elem.detachEvent( "on" + type, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !this.preventDefault ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// timeStamp is buggy for some events on Firefox(#3843)
	// So we won't rely on the native value
	this.timeStamp = jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Checks if an event happened on an element within another element
// Used in jQuery.event.special.mouseenter and mouseleave handlers
var withinElement = function( event ) {

	// Check if mouse(over|out) are still within the same parent element
	var related = event.relatedTarget,
		inside = false,
		eventType = event.type;

	event.type = event.data;

	if ( related !== this ) {

		if ( related ) {
			inside = jQuery.contains( this, related );
		}

		if ( !inside ) {

			jQuery.event.handle.apply( this, arguments );

			event.type = eventType;
		}
	}
},

// In case of event delegation, we only need to rename the event.type,
// liveHandler will take care of the rest.
delegate = function( event ) {
	event.type = event.data;
	jQuery.event.handle.apply( this, arguments );
};

// Create mouseenter and mouseleave events
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		setup: function( data ) {
			jQuery.event.add( this, fix, data && data.selector ? delegate : withinElement, orig );
		},
		teardown: function( data ) {
			jQuery.event.remove( this, fix, data && data.selector ? delegate : withinElement );
		}
	};
});

// submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function( data, namespaces ) {
			if ( !jQuery.nodeName( this, "form" ) ) {
				jQuery.event.add(this, "click.specialSubmit", function( e ) {
					var elem = e.target,
						type = elem.type;

					if ( (type === "submit" || type === "image") && jQuery( elem ).closest("form").length ) {
						trigger( "submit", this, arguments );
					}
				});

				jQuery.event.add(this, "keypress.specialSubmit", function( e ) {
					var elem = e.target,
						type = elem.type;

					if ( (type === "text" || type === "password") && jQuery( elem ).closest("form").length && e.keyCode === 13 ) {
						trigger( "submit", this, arguments );
					}
				});

			} else {
				return false;
			}
		},

		teardown: function( namespaces ) {
			jQuery.event.remove( this, ".specialSubmit" );
		}
	};

}

// change delegation, happens here so we have bind.
if ( !jQuery.support.changeBubbles ) {

	var changeFilters,

	getVal = function( elem ) {
		var type = elem.type, val = elem.value;

		if ( type === "radio" || type === "checkbox" ) {
			val = elem.checked;

		} else if ( type === "select-multiple" ) {
			val = elem.selectedIndex > -1 ?
				jQuery.map( elem.options, function( elem ) {
					return elem.selected;
				}).join("-") :
				"";

		} else if ( jQuery.nodeName( elem, "select" ) ) {
			val = elem.selectedIndex;
		}

		return val;
	},

	testChange = function testChange( e ) {
		var elem = e.target, data, val;

		if ( !rformElems.test( elem.nodeName ) || elem.readOnly ) {
			return;
		}

		data = jQuery._data( elem, "_change_data" );
		val = getVal(elem);

		// the current data will be also retrieved by beforeactivate
		if ( e.type !== "focusout" || elem.type !== "radio" ) {
			jQuery._data( elem, "_change_data", val );
		}

		if ( data === undefined || val === data ) {
			return;
		}

		if ( data != null || val ) {
			e.type = "change";
			e.liveFired = undefined;
			jQuery.event.trigger( e, arguments[1], elem );
		}
	};

	jQuery.event.special.change = {
		filters: {
			focusout: testChange,

			beforedeactivate: testChange,

			click: function( e ) {
				var elem = e.target, type = jQuery.nodeName( elem, "input" ) ? elem.type : "";

				if ( type === "radio" || type === "checkbox" || jQuery.nodeName( elem, "select" ) ) {
					testChange.call( this, e );
				}
			},

			// Change has to be called before submit
			// Keydown will be called before keypress, which is used in submit-event delegation
			keydown: function( e ) {
				var elem = e.target, type = jQuery.nodeName( elem, "input" ) ? elem.type : "";

				if ( (e.keyCode === 13 && !jQuery.nodeName( elem, "textarea" ) ) ||
					(e.keyCode === 32 && (type === "checkbox" || type === "radio")) ||
					type === "select-multiple" ) {
					testChange.call( this, e );
				}
			},

			// Beforeactivate happens also before the previous element is blurred
			// with this event you can't trigger a change event, but you can store
			// information
			beforeactivate: function( e ) {
				var elem = e.target;
				jQuery._data( elem, "_change_data", getVal(elem) );
			}
		},

		setup: function( data, namespaces ) {
			if ( this.type === "file" ) {
				return false;
			}

			for ( var type in changeFilters ) {
				jQuery.event.add( this, type + ".specialChange", changeFilters[type] );
			}

			return rformElems.test( this.nodeName );
		},

		teardown: function( namespaces ) {
			jQuery.event.remove( this, ".specialChange" );

			return rformElems.test( this.nodeName );
		}
	};

	changeFilters = jQuery.event.special.change.filters;

	// Handle when the input is .focus()'d
	changeFilters.focus = changeFilters.beforeactivate;
}

function trigger( type, elem, args ) {
	// Piggyback on a donor event to simulate a different one.
	// Fake originalEvent to avoid donor's stopPropagation, but if the
	// simulated event prevents default then we do the same on the donor.
	// Don't pass args or remember liveFired; they apply to the donor event.
	var event = jQuery.extend( {}, args[ 0 ] );
	event.type = type;
	event.originalEvent = {};
	event.liveFired = undefined;
	jQuery.event.handle.call( elem, event );
	if ( event.isDefaultPrevented() ) {
		args[ 0 ].preventDefault();
	}
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0;

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};

		function handler( donor ) {
			// Donor event is always a native one; fix it and switch its type.
			// Let focusin/out handler cancel the donor focus/blur event.
			var e = jQuery.event.fix( donor );
			e.type = fix;
			e.originalEvent = {};
			jQuery.event.trigger( e, null, e.target );
			if ( e.isDefaultPrevented() ) {
				donor.preventDefault();
			}
		}
	});
}

jQuery.each(["bind", "one"], function( i, name ) {
	jQuery.fn[ name ] = function( type, data, fn ) {
		var handler;

		// Handle object literals
		if ( typeof type === "object" ) {
			for ( var key in type ) {
				this[ name ](key, data, type[key], fn);
			}
			return this;
		}

		if ( arguments.length === 2 || data === false ) {
			fn = data;
			data = undefined;
		}

		if ( name === "one" ) {
			handler = function( event ) {
				jQuery( this ).unbind( event, handler );
				return fn.apply( this, arguments );
			};
			handler.guid = fn.guid || jQuery.guid++;
		} else {
			handler = fn;
		}

		if ( type === "unload" && name !== "one" ) {
			this.one( type, data, fn );

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				jQuery.event.add( this[i], type, handler, data );
			}
		}

		return this;
	};
});

jQuery.fn.extend({
	unbind: function( type, fn ) {
		// Handle object literals
		if ( typeof type === "object" && !type.preventDefault ) {
			for ( var key in type ) {
				this.unbind(key, type[key]);
			}

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				jQuery.event.remove( this[i], type, fn );
			}
		}

		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.live( types, data, fn, selector );
	},

	undelegate: function( selector, types, fn ) {
		if ( arguments.length === 0 ) {
			return this.unbind( "live" );

		} else {
			return this.die( types, null, fn, selector );
		}
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},

	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery.data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery.data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

var liveMap = {
	focus: "focusin",
	blur: "focusout",
	mouseenter: "mouseover",
	mouseleave: "mouseout"
};

jQuery.each(["live", "die"], function( i, name ) {
	jQuery.fn[ name ] = function( types, data, fn, origSelector /* Internal Use Only */ ) {
		var type, i = 0, match, namespaces, preType,
			selector = origSelector || this.selector,
			context = origSelector ? this : jQuery( this.context );

		if ( typeof types === "object" && !types.preventDefault ) {
			for ( var key in types ) {
				context[ name ]( key, data, types[key], selector );
			}

			return this;
		}

		if ( name === "die" && !types &&
					origSelector && origSelector.charAt(0) === "." ) {

			context.unbind( origSelector );

			return this;
		}

		if ( data === false || jQuery.isFunction( data ) ) {
			fn = data || returnFalse;
			data = undefined;
		}

		types = (types || "").split(" ");

		while ( (type = types[ i++ ]) != null ) {
			match = rnamespaces.exec( type );
			namespaces = "";

			if ( match )  {
				namespaces = match[0];
				type = type.replace( rnamespaces, "" );
			}

			if ( type === "hover" ) {
				types.push( "mouseenter" + namespaces, "mouseleave" + namespaces );
				continue;
			}

			preType = type;

			if ( liveMap[ type ] ) {
				types.push( liveMap[ type ] + namespaces );
				type = type + namespaces;

			} else {
				type = (liveMap[ type ] || type) + namespaces;
			}

			if ( name === "live" ) {
				// bind live handler
				for ( var j = 0, l = context.length; j < l; j++ ) {
					jQuery.event.add( context[j], "live." + liveConvert( type, selector ),
						{ data: data, selector: selector, handler: fn, origType: type, origHandler: fn, preType: preType } );
				}

			} else {
				// unbind live handler
				context.unbind( "live." + liveConvert( type, selector ), fn );
			}
		}

		return this;
	};
});

function liveHandler( event ) {
	var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret,
		elems = [],
		selectors = [],
		events = jQuery._data( this, "events" );

	// Make sure we avoid non-left-click bubbling in Firefox (#3861) and disabled elements in IE (#6911)
	if ( event.liveFired === this || !events || !events.live || event.target.disabled || event.button && event.type === "click" ) {
		return;
	}

	if ( event.namespace ) {
		namespace = new RegExp("(^|\\.)" + event.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)");
	}

	event.liveFired = this;

	var live = events.live.slice(0);

	for ( j = 0; j < live.length; j++ ) {
		handleObj = live[j];

		if ( handleObj.origType.replace( rnamespaces, "" ) === event.type ) {
			selectors.push( handleObj.selector );

		} else {
			live.splice( j--, 1 );
		}
	}

	match = jQuery( event.target ).closest( selectors, event.currentTarget );

	for ( i = 0, l = match.length; i < l; i++ ) {
		close = match[i];

		for ( j = 0; j < live.length; j++ ) {
			handleObj = live[j];

			if ( close.selector === handleObj.selector && (!namespace || namespace.test( handleObj.namespace )) && !close.elem.disabled ) {
				elem = close.elem;
				related = null;

				// Those two events require additional checking
				if ( handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave" ) {
					event.type = handleObj.preType;
					related = jQuery( event.relatedTarget ).closest( handleObj.selector )[0];

					// Make sure not to accidentally match a child element with the same selector
					if ( related && jQuery.contains( elem, related ) ) {
						related = elem;
					}
				}

				if ( !related || related !== elem ) {
					elems.push({ elem: elem, handleObj: handleObj, level: close.level });
				}
			}
		}
	}

	for ( i = 0, l = elems.length; i < l; i++ ) {
		match = elems[i];

		if ( maxLevel && match.level > maxLevel ) {
			break;
		}

		event.currentTarget = match.elem;
		event.data = match.handleObj.data;
		event.handleObj = match.handleObj;

		ret = match.handleObj.origHandler.apply( match.elem, arguments );

		if ( ret === false || event.isPropagationStopped() ) {
			maxLevel = match.level;

			if ( ret === false ) {
				stop = false;
			}
			if ( event.isImmediatePropagationStopped() ) {
				break;
			}
		}
	}

	return stop;
}

function liveConvert( type, selector ) {
	return (type && type !== "*" ? type + "." : "") + selector.replace(rperiod, "`").replace(rspaces, "&");
}

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.bind( name, data, fn ) :
			this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}
});



/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true,
	rBackslash = /\\/g,
	rNonWord = /\W/;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set );
			}
		}

	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var match,
			type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace( rBackslash, "" );
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( "*" ) :
			[];
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				var found, item,
					filter = Expr.filter[ type ],
					left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw "Syntax error, unrecognized expression: " + msg;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],

	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		},
		type: function( elem ) {
			return elem.getAttribute( "type" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !rNonWord.test( part ),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !rNonWord.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( match[1] );
			}
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace( rBackslash, "" ) + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace( rBackslash, "" );
		},

		TAG: function( match, curLoop ) {
			return match[1].replace( rBackslash, "" ).toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				match[2] = match[2].replace(/^\+|\s*/g, '');

				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}
			else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1] = match[1].replace( rBackslash, "" );
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			// Handle if an un-quoted value was used
			match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},
	
	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},
		
		selected: function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}
			
			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			var attr = elem.getAttribute( "type" ), type = elem.type;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc) 
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
		},

		radio: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
		},

		file: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
		},

		password: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
		},

		submit: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "submit" === elem.type;
		},

		image: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
		},

		reset: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "reset" === elem.type;
		},

		button: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && "button" === elem.type || name === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		},

		focus: function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( name );
			}
		},

		CHILD: function( elem, match ) {
			var type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					if ( type === "first" ) { 
						return true; 
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					return true;

				case "nth":
					var first = match[2],
						last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 

						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
		},
		
		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Utility function for retreiving the text value of an array of DOM nodes
Sizzle.getText = function( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += Sizzle.getText( elem.childNodes );
		}
	}

	return ret;
};

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	// release memory in IE
	root = form = null;
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	// release memory in IE
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				// See if we find a selector to speed up
				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
				
				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
					// Speed-up: Sizzle("TAG")
					if ( match[1] ) {
						return makeArray( context.getElementsByTagName( query ), extra );
					
					// Speed-up: Sizzle(".CLASS")
					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
						return makeArray( context.getElementsByClassName( match[2] ), extra );
					}
				}
				
				if ( context.nodeType === 9 ) {
					// Speed-up: Sizzle("body")
					// The body element only exists once, optimize finding it
					if ( query === "body" && context.body ) {
						return makeArray( [ context.body ], extra );
						
					// Speed-up: Sizzle("#ID")
					} else if ( match && match[3] ) {
						var elem = context.getElementById( match[3] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id === match[3] ) {
								return makeArray( [ elem ], extra );
							}
							
						} else {
							return makeArray( [], extra );
						}
					}
					
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || id,
						hasParent = context.parentNode,
						relativeHierarchySelector = /^\s*[+~]/.test( query );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( /'/g, "\\$&" );
					}
					if ( relativeHierarchySelector && hasParent ) {
						context = context.parentNode;
					}

					try {
						if ( !relativeHierarchySelector || hasParent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
						}

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		// release memory in IE
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

	if ( matches ) {
		// Check to see if it's possible to do matchesSelector
		// on a disconnected node (IE 9 fails this)
		var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
			pseudoWorks = false;

		try {
			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( document.documentElement, "[test!='']:sizzle" );
	
		} catch( pseudoError ) {
			pseudoWorks = true;
		}

		Sizzle.matchesSelector = function( node, expr ) {
			// Make sure that attribute selectors are quoted
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try { 
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						var ret = matches.call( node, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || !disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9, so check for that
								node.document && node.document.nodeType !== 11 ) {
							return ret;
						}
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	// release memory in IE
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;
			
			elem = elem[dir];

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})();


var runtil = /Until$/,
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
	// Note: This RegExp should be improved, or likely pulled from Sizzle
	rmultiselector = /,/,
	isSimple = /^.[^:#\[\.,]*$/,
	slice = Array.prototype.slice,
	POS = jQuery.expr.match.POS,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var self = this,
			i, l;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		var ret = this.pushStack( "", "find", selector ),
			length, n, r;

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target );
		return this.filter(function() {
			for ( var i = 0, l = targets.length; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && ( typeof selector === "string" ?
			jQuery.filter( selector, this ).length > 0 :
			this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var ret = [], i, l, cur = this[0];
		
		// Array
		if ( jQuery.isArray( selectors ) ) {
			var match, selector,
				matches = {},
				level = 1;

			if ( cur && selectors.length ) {
				for ( i = 0, l = selectors.length; i < l; i++ ) {
					selector = selectors[i];

					if ( !matches[ selector ] ) {
						matches[ selector ] = POS.test( selector ) ?
							jQuery( selector, context || this.context ) :
							selector;
					}
				}

				while ( cur && cur.ownerDocument && cur !== context ) {
					for ( selector in matches ) {
						match = matches[ selector ];

						if ( match.jquery ? match.index( cur ) > -1 : jQuery( cur ).is( match ) ) {
							ret.push({ selector: selector, elem: cur, level: level });
						}
					}

					cur = cur.parentNode;
					level++;
				}
			}

			return ret;
		}

		// String
		var pos = POS.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( i = 0, l = this.length; i < l; i++ ) {
			cur = this[i];

			while ( cur ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;

				} else {
					cur = cur.parentNode;
					if ( !cur || !cur.ownerDocument || cur === context || cur.nodeType === 11 ) {
						break;
					}
				}
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {
		if ( !elem || typeof elem === "string" ) {
			return jQuery.inArray( this[0],
				// If it receives a string, the selector is used
				// If it receives nothing, the siblings are used
				elem ? jQuery( elem ) : this.parent().children() );
		}
		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	andSelf: function() {
		return this.add( this.prevObject );
	}
});

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return jQuery.nth( elem, 2, "nextSibling" );
	},
	prev: function( elem ) {
		return jQuery.nth( elem, 2, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( elem.parentNode.firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.makeArray( elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until ),
			// The variable 'args' was introduced in
			// https://github.com/jquery/jquery/commit/52a0238
			// to work around a bug in Chrome 10 (Dev) and should be removed when the bug is fixed.
			// http://code.google.com/p/v8/issues/detail?id=1050
			args = slice.call(arguments);

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, args.join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	nth: function( cur, result, dir, elem ) {
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType === 1 && ++num === result ) {
				break;
			}
		}

		return cur;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return (elem === qualifier) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return (jQuery.inArray( elem, qualifier ) >= 0) === keep;
	});
}




var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnocache = /<(?:script|object|embed|option|style)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	};

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE can't serialize <link> and <script> tags normally
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "div<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( text ) {
		if ( jQuery.isFunction(text) ) {
			return this.each(function(i) {
				var self = jQuery( this );

				self.text( text.call(this, i, self.text()) );
			});
		}

		if ( typeof text !== "object" && text !== undefined ) {
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );
		}

		return jQuery.text( this );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		return this.each(function() {
			jQuery( this ).wrapAll( html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		} else if ( arguments.length ) {
			var set = jQuery(arguments[0]);
			set.push.apply( set, this.toArray() );
			return this.pushStack( set, "before", arguments );
		}
	},

	after: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		} else if ( arguments.length ) {
			var set = this.pushStack( this, "after", arguments );
			set.push.apply( set, jQuery(arguments[0]).toArray() );
			return set;
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		if ( value === undefined ) {
			return this[0] && this[0].nodeType === 1 ?
				this[0].innerHTML.replace(rinlinejQuery, "") :
				null;

		// See if we can take a shortcut and just use innerHTML
		} else if ( typeof value === "string" && !rnocache.test( value ) &&
			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
			!wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {

			value = value.replace(rxhtmlTag, "<$1></$2>");

			try {
				for ( var i = 0, l = this.length; i < l; i++ ) {
					// Remove element nodes and prevent memory leaks
					if ( this[i].nodeType === 1 ) {
						jQuery.cleanData( this[i].getElementsByTagName("*") );
						this[i].innerHTML = value;
					}
				}

			// If using innerHTML throws an exception, use the fallback method
			} catch(e) {
				this.empty().append( value );
			}

		} else if ( jQuery.isFunction( value ) ) {
			this.each(function(i){
				var self = jQuery( this );

				self.html( value.call(this, i, self.html()) );
			});

		} else {
			this.empty().append( value );
		}

		return this;
	},

	replaceWith: function( value ) {
		if ( this[0] && this[0].parentNode ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		} else {
			return this.length ?
				this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
				this;
		}
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {
		var results, first, fragment, parent,
			value = args[0],
			scripts = [];

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback, true );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call(this, i, table ? self.html() : undefined);
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			parent = value && value.parentNode;

			// If we're in a fragment, just use that instead of building a new one
			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
				results = { fragment: parent };

			} else {
				results = jQuery.buildFragment( args, this, scripts );
			}

			fragment = results.fragment;

			if ( fragment.childNodes.length === 1 ) {
				first = fragment = fragment.firstChild;
			} else {
				first = fragment.firstChild;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {
					callback.call(
						table ?
							root(this[i], first) :
							this[i],
						// Make sure that we do not leak memory by inadvertently discarding
						// the original fragment (which might have attached data) instead of
						// using it; in addition, use the original fragment object for the last
						// item instead of first because it can end up being emptied incorrectly
						// in certain situations (Bug #8070).
						// Fragments from the fragment cache must always be cloned and never used
						// in place.
						results.cacheable || (l > 1 && i < lastIndex) ?
							jQuery.clone( fragment, true, true ) :
							fragment
					);
				}
			}

			if ( scripts.length ) {
				jQuery.each( scripts, evalScript );
			}
		}

		return this;
	}
});

function root( elem, cur ) {
	return jQuery.nodeName(elem, "table") ?
		(elem.getElementsByTagName("tbody")[0] ||
		elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
		elem;
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var internalKey = jQuery.expando,
		oldData = jQuery.data( src ),
		curData = jQuery.data( dest, oldData );

	// Switch to use the internal data object, if it exists, for the next
	// stage of data copying
	if ( (oldData = oldData[ internalKey ]) ) {
		var events = oldData.events;
				curData = curData[ internalKey ] = jQuery.extend({}, oldData);

		if ( events ) {
			delete curData.handle;
			curData.events = {};

			for ( var type in events ) {
				for ( var i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type + ( events[ type ][ i ].namespace ? "." : "" ) + events[ type ][ i ].namespace, events[ type ][ i ], events[ type ][ i ].data );
				}
			}
		}
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 fail to clone children inside object elements that use
	// the proprietary classid attribute value (rather than the type
	// attribute) to identify the type of content to display
	if ( nodeName === "object" ) {
		dest.outerHTML = src.outerHTML;

	} else if ( nodeName === "input" && (src.type === "checkbox" || src.type === "radio") ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set
		if ( src.checked ) {
			dest.defaultChecked = dest.checked = src.checked;
		}

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults, doc;

  // nodes may contain either an explicit document object,
  // a jQuery collection or context object.
  // If nodes[0] contains a valid object to assign to doc
  if ( nodes && nodes[0] ) {
    doc = nodes[0].ownerDocument || nodes[0];
  }

  // Ensure that an attr object doesn't incorrectly stand in as a document object
	// Chrome and Firefox seem to allow this to occur and will throw exception
	// Fixes #8950
	if ( !doc.createDocumentFragment ) {
		doc = document;
	}

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	if ( args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document &&
		args[0].charAt(0) === "<" && !rnocache.test( args[0] ) && (jQuery.support.checkClone || !rchecked.test( args[0] )) ) {

		cacheable = true;

		cacheresults = jQuery.fragments[ args[0] ];
		if ( cacheresults && cacheresults !== 1 ) {
			fragment = cacheresults;
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ args[0] ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [],
			insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;

		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;

		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = (i > 0 ? this.clone(true) : this).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( "getElementsByTagName" in elem ) {
		return elem.getElementsByTagName( "*" );

	} else if ( "querySelectorAll" in elem ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( elem.type === "checkbox" || elem.type === "radio" ) {
		elem.defaultChecked = elem.checked;
	}
}
// Finds all inputs and passes them to fixDefaultChecked
function findInputs( elem ) {
	if ( jQuery.nodeName( elem, "input" ) ) {
		fixDefaultChecked( elem );
	} else if ( "getElementsByTagName" in elem ) {
		jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var clone = elem.cloneNode(true),
				srcElements,
				destElements,
				i;

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName
			// instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				cloneFixAttributes( srcElements[i], destElements[i] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var checkScriptType;

		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		var ret = [], j;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Trim whitespace, otherwise indexOf won't work as expected
					var tag = (rtagName.exec( elem ) || ["", ""])[1].toLowerCase(),
						wrap = wrapMap[ tag ] || wrapMap._default,
						depth = wrap[0],
						div = context.createElement("div");

					// Go to html and back, then peel off extra wrappers
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						var hasBody = rtbody.test(elem),
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;
				}
			}

			// Resets defaultChecked for any radios and checkboxes
			// about to be appended to the DOM in IE 6/7 (#8060)
			var len;
			if ( !jQuery.support.appendChecked ) {
				if ( elem[0] && typeof (len = elem.length) === "number" ) {
					for ( j = 0; j < len; j++ ) {
						findInputs( elem[j] );
					}
				} else {
					findInputs( elem );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			checkScriptType = function( elem ) {
				return !elem.type || rscriptType.test( elem.type );
			};
			for ( i = 0; ret[i]; i++ ) {
				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );

				} else {
					if ( ret[i].nodeType === 1 ) {
						var jsTags = jQuery.grep( ret[i].getElementsByTagName( "script" ), checkScriptType );

						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
					}
					fragment.appendChild( ret[i] );
				}
			}
		}

		return ret;
	},

	cleanData: function( elems ) {
		var data, id, cache = jQuery.cache, internalKey = jQuery.expando, special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
				continue;
			}

			id = elem[ jQuery.expando ];

			if ( id ) {
				data = cache[ id ] && cache[ id ][ internalKey ];

				if ( data && data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						// This is a shortcut to avoid jQuery.event.remove's overhead
						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}

					// Null the DOM reference to avoid IE6/7/8 leak (#7054)
					if ( data.handle ) {
						data.handle.elem = null;
					}
				}

				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}

				delete cache[ id ];
			}
		}
	}
});

function evalScript( i, elem ) {
	if ( elem.src ) {
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});
	} else {
		jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "/*$0*/" ) );
	}

	if ( elem.parentNode ) {
		elem.parentNode.removeChild( elem );
	}
}



var ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	// fixed for IE9, see #8346
	rupper = /([A-Z]|^ms)/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,
	rrelNum = /^[+\-]=/,
	rrelNumFilter = /[^+\-\.\de]+/g,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],
	curCSS,

	getComputedStyle,
	currentStyle;

jQuery.fn.css = function( name, value ) {
	// Setting 'undefined' is a no-op
	if ( arguments.length === 2 && value === undefined ) {
		return this;
	}

	return jQuery.access( this, name, value, true, function( elem, name, value ) {
		return value !== undefined ?
			jQuery.style( elem, name, value ) :
			jQuery.css( elem, name );
	});
};

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity", "opacity" );
					return ret === "" ? "1" : ret;

				} else {
					return elem.style.opacity;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, origName = jQuery.camelCase( name ),
			style = elem.style, hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Make sure that NaN and null values aren't set. See: #7116
			if ( type === "number" && isNaN( value ) || value == null ) {
				return;
			}

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && rrelNum.test( value ) ) {
				value = +value.replace( rrelNumFilter, "" ) + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra ) {
		var ret, hooks;

		// Make sure that we're working with the right name
		name = jQuery.camelCase( name );
		hooks = jQuery.cssHooks[ name ];
		name = jQuery.cssProps[ name ] || name;

		// cssFloat needs a special treatment
		if ( name === "cssFloat" ) {
			name = "float";
		}

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		// Otherwise, if a way to get the computed value exists, use that
		} else if ( curCSS ) {
			return curCSS( elem, name );
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};

		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	}
});

// DEPRECATED, Use jQuery.css() instead
jQuery.curCSS = jQuery.css;

jQuery.each(["height", "width"], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			var val;

			if ( computed ) {
				if ( elem.offsetWidth !== 0 ) {
					return getWH( elem, name, extra );
				} else {
					jQuery.swap( elem, cssShow, function() {
						val = getWH( elem, name, extra );
					});
				}

				return val;
			}
		},

		set: function( elem, value ) {
			if ( rnumpx.test( value ) ) {
				// ignore negative width and height values #1599
				value = parseFloat( value );

				if ( value >= 0 ) {
					return value + "px";
				}

			} else {
				return value;
			}
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( parseFloat( RegExp.$1 ) / 100 ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle;

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// Set the alpha filter to set the opacity
			var opacity = jQuery.isNaN( value ) ?
				"" :
				"alpha(opacity=" + value * 100 + ")",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery(function() {
	// This hook cannot be added until DOM ready because the support test
	// for it is not run until after DOM ready
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				var ret;
				jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						ret = curCSS( elem, "margin-right", "marginRight" );
					} else {
						ret = elem.style.marginRight;
					}
				});
				return ret;
			}
		};
	}
});

if ( document.defaultView && document.defaultView.getComputedStyle ) {
	getComputedStyle = function( elem, name ) {
		var ret, defaultView, computedStyle;

		name = name.replace( rupper, "-$1" ).toLowerCase();

		if ( !(defaultView = elem.ownerDocument.defaultView) ) {
			return undefined;
		}

		if ( (computedStyle = defaultView.getComputedStyle( elem, null )) ) {
			ret = computedStyle.getPropertyValue( name );
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}
		}

		return ret;
	};
}

if ( document.documentElement.currentStyle ) {
	currentStyle = function( elem, name ) {
		var left,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			rsLeft = elem.runtimeStyle && elem.runtimeStyle[ name ],
			style = elem.style;

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {
			// Remember the original values
			left = style.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : (ret || 0);
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

curCSS = getComputedStyle || currentStyle;

function getWH( elem, name, extra ) {

	// Start with offset property
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		which = name === "width" ? cssWidth : cssHeight;

	if ( val > 0 ) {
		if ( extra !== "border" ) {
			jQuery.each( which, function() {
				if ( !extra ) {
					val -= parseFloat( jQuery.css( elem, "padding" + this ) ) || 0;
				}
				if ( extra === "margin" ) {
					val += parseFloat( jQuery.css( elem, extra + this ) ) || 0;
				} else {
					val -= parseFloat( jQuery.css( elem, "border" + this + "Width" ) ) || 0;
				}
			});
		}

		return val + "px";
	}

	// Fall back to computed then uncomputed css if necessary
	val = curCSS( elem, name, name );
	if ( val < 0 || val == null ) {
		val = elem.style[ name ] || 0;
	}
	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Add padding, border, margin
	if ( extra ) {
		jQuery.each( which, function() {
			val += parseFloat( jQuery.css( elem, "padding" + this ) ) || 0;
			if ( extra !== "padding" ) {
				val += parseFloat( jQuery.css( elem, "border" + this + "Width" ) ) || 0;
			}
			if ( extra === "margin" ) {
				val += parseFloat( jQuery.css( elem, extra + this ) ) || 0;
			}
		});
	}

	return val + "px";
}

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth,
			height = elem.offsetHeight;

		return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rselectTextarea = /^(?:select|textarea)/i,
	rspacesAjax = /\s+/,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Document location
	ajaxLocation,

	// Document location segments
	ajaxLocParts;

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		if ( jQuery.isFunction( func ) ) {
			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
				i = 0,
				length = dataTypes.length,
				dataType,
				list,
				placeBefore;

			// For each dataType in the dataTypeExpression
			for(; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters ),
		selection;

	for(; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf( " " );
		if ( off >= 0 ) {
			var selector = url.slice( off, url.length );
			url = url.slice( 0, off );
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = undefined;

			// Otherwise, build a param string
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			// Complete callback (responseText is used internally)
			complete: function( jqXHR, status, responseText ) {
				// Store the response as specified by the jqXHR object
				responseText = jqXHR.responseText;
				// If successful, inject the HTML into all the matched elements
				if ( jqXHR.isResolved() ) {
					// #4825: Get the actual response in case
					// a dataFilter is present in ajaxSettings
					jqXHR.done(function( r ) {
						responseText = r;
					});
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(responseText.replace(rscript, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						responseText );
				}

				if ( callback ) {
					self.each( callback, [ responseText, status, jqXHR ] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},

	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.bind( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function ( target, settings ) {
		if ( !settings ) {
			// Only one parameter, we extend ajaxSettings
			settings = target;
			target = jQuery.extend( true, jQuery.ajaxSettings, settings );
		} else {
			// target was provided, we extend into it
			jQuery.extend( true, target, jQuery.ajaxSettings, settings );
		}
		// Flatten fields we don't want deep extended
		for( var field in { context: 1, url: 1 } ) {
			if ( field in settings ) {
				target[ field ] = settings[ field ];
			} else if( field in jQuery.ajaxSettings ) {
				target[ field ] = jQuery.ajaxSettings[ field ];
			}
		}
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": "*/*"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery._Deferred(),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// ifModified key
			ifModifiedKey,
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// The jqXHR state
			state = 0,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || "abort";
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, statusText, responses, headers ) {

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status ? 4 : 0;

			var isSuccess,
				success,
				error,
				response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
				lastModified,
				etag;

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
						jQuery.lastModified[ ifModifiedKey ] = lastModified;
					}
					if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
						jQuery.etag[ ifModifiedKey ] = etag;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					try {
						success = ajaxConvert( s, response );
						statusText = "success";
						isSuccess = true;
					} catch(e) {
						// We have a parsererror
						statusText = "parsererror";
						error = e;
					}
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = statusText;

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.resolveWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.done;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.then( tmp, tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );

		// Determine if a cross-domain request is in order
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefiler, stop there
		if ( state === 2 ) {
			return false;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( (ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", */*; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already
				jqXHR.abort();
				return false;

		}

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( status < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					jQuery.error( e );
				}
			}
		}

		return jqXHR;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a, traditional ) {
		var s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : value;
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( var prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	}
});

function buildParams( prefix, obj, traditional, add ) {
	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && obj != null && typeof obj === "object" ) {
		// Serialize object item.
		for ( var name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// This is still on the jQuery object... for now
// Want to move this to jQuery.ajax some day
jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields,
		ct,
		type,
		finalDataType,
		firstDataType;

	// Fill responseXXX fields
	for( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	var dataTypes = s.dataTypes,
		converters = {},
		i,
		key,
		length = dataTypes.length,
		tmp,
		// Current and previous dataTypes
		current = dataTypes[ 0 ],
		prev,
		// Conversion expression
		conversion,
		// Conversion function
		conv,
		// Conversion functions (transitive conversion)
		conv1,
		conv2;

	// For each dataType in the chain
	for( i = 1; i < length; i++ ) {

		// Create converters map
		// with lowercased keys
		if ( i === 1 ) {
			for( key in s.converters ) {
				if( typeof key === "string" ) {
					converters[ key.toLowerCase() ] = s.converters[ key ];
				}
			}
		}

		// Get the dataTypes
		prev = current;
		current = dataTypes[ i ];

		// If current is auto dataType, update it to prev
		if( current === "*" ) {
			current = prev;
		// If no auto and dataTypes are actually different
		} else if ( prev !== "*" && prev !== current ) {

			// Get the converter
			conversion = prev + " " + current;
			conv = converters[ conversion ] || converters[ "* " + current ];

			// If there is no direct converter, search transitively
			if ( !conv ) {
				conv2 = undefined;
				for( conv1 in converters ) {
					tmp = conv1.split( " " );
					if ( tmp[ 0 ] === prev || tmp[ 0 ] === "*" ) {
						conv2 = converters[ tmp[1] + " " + current ];
						if ( conv2 ) {
							conv1 = converters[ conv1 ];
							if ( conv1 === true ) {
								conv = conv2;
							} else if ( conv2 === true ) {
								conv = conv1;
							}
							break;
						}
					}
				}
			}
			// If we found no converter, dispatch an error
			if ( !( conv || conv2 ) ) {
				jQuery.error( "No conversion from " + conversion.replace(" "," to ") );
			}
			// If found converter is not an equivalence
			if ( conv !== true ) {
				// Convert with 1 or 2 converters accordingly
				response = conv ? conv( response ) : conv2( conv1(response) );
			}
		}
	}
	return response;
}




var jsc = jQuery.now(),
	jsre = /(\=)\?(&|$)|\?\?/i;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		return jQuery.expando + "_" + ( jsc++ );
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var inspectData = s.contentType === "application/x-www-form-urlencoded" &&
		( typeof s.data === "string" );

	if ( s.dataTypes[ 0 ] === "jsonp" ||
		s.jsonp !== false && ( jsre.test( s.url ) ||
				inspectData && jsre.test( s.data ) ) ) {

		var responseContainer,
			jsonpCallback = s.jsonpCallback =
				jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,
			previous = window[ jsonpCallback ],
			url = s.url,
			data = s.data,
			replace = "$1" + jsonpCallback + "$2";

		if ( s.jsonp !== false ) {
			url = url.replace( jsre, replace );
			if ( s.url === url ) {
				if ( inspectData ) {
					data = data.replace( jsre, replace );
				}
				if ( s.data === data ) {
					// Add callback manually
					url += (/\?/.test( url ) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
				}
			}
		}

		s.url = url;
		s.data = data;

		// Install callback
		window[ jsonpCallback ] = function( response ) {
			responseContainer = [ response ];
		};

		// Clean-up function
		jqXHR.always(function() {
			// Set callback back to previous value
			window[ jsonpCallback ] = previous;
			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( previous ) ) {
				window[ jsonpCallback ]( responseContainer[ 0 ] );
			}
		});

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( jsonpCallback + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Delegate to script
		return "script";
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});




var // #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0,
	xhrCallbacks;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var xhr = s.xhr(),
						handle,
						i;

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occured
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}
									responses.text = xhr.responseText;

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					// if we're in sync mode or it's in cache
					// and has been retrieved directly (IE6 & IE7)
					// we need to manually fire the callback
					if ( !s.async || xhr.readyState === 4 ) {
						callback();
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}




var elemdisplay = {},
	iframe, iframeDoc,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	],
	fxNow,
	requestAnimationFrame = window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame;

jQuery.fn.extend({
	show: function( speed, easing, callback ) {
		var elem, display;

		if ( speed || speed === 0 ) {
			return this.animate( genFx("show", 3), speed, easing, callback);

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				elem = this[i];

				if ( elem.style ) {
					display = elem.style.display;

					// Reset the inline display of this element to learn if it is
					// being hidden by cascaded rules or not
					if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
						display = elem.style.display = "";
					}

					// Set elements which have been overridden with display: none
					// in a stylesheet to whatever the default browser style is
					// for such an element
					if ( display === "" && jQuery.css( elem, "display" ) === "none" ) {
						jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
					}
				}
			}

			// Set the display of most of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				elem = this[i];

				if ( elem.style ) {
					display = elem.style.display;

					if ( display === "" || display === "none" ) {
						elem.style.display = jQuery._data(elem, "olddisplay") || "";
					}
				}
			}

			return this;
		}
	},

	hide: function( speed, easing, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, easing, callback);

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				if ( this[i].style ) {
					var display = jQuery.css( this[i], "display" );

					if ( display !== "none" && !jQuery._data( this[i], "olddisplay" ) ) {
						jQuery._data( this[i], "olddisplay", display );
					}
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				if ( this[i].style ) {
					this[i].style.display = "none";
				}
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2, callback ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2, callback);
		}

		return this;
	},

	fadeTo: function( speed, to, easing, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, easing, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete, [ false ] );
		}

		// Do not change referenced properties as per-property easing will be lost
		prop = jQuery.extend( {}, prop );

		return this[ optall.queue === false ? "each" : "queue" ](function() {
			// XXX 'this' does not always have a nodeName when running the
			// test suite

			if ( optall.queue === false ) {
				jQuery._mark( this );
			}

			var opt = jQuery.extend( {}, optall ),
				isElement = this.nodeType === 1,
				hidden = isElement && jQuery(this).is(":hidden"),
				name, val, p,
				display, e,
				parts, start, end, unit;

			// will store per property easing and be used to determine when an animation is complete
			opt.animatedProperties = {};

			for ( p in prop ) {

				// property name normalization
				name = jQuery.camelCase( p );
				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
				}

				val = prop[ name ];

				// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
				if ( jQuery.isArray( val ) ) {
					opt.animatedProperties[ name ] = val[ 1 ];
					val = prop[ name ] = val[ 0 ];
				} else {
					opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
				}

				if ( val === "hide" && hidden || val === "show" && !hidden ) {
					return opt.complete.call( this );
				}

				if ( isElement && ( name === "height" || name === "width" ) ) {
					// Make sure that nothing sneaks out
					// Record all 3 overflow attributes because IE does not
					// change the overflow attribute when overflowX and
					// overflowY are set to the same value
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

					// Set display property to inline-block for height/width
					// animations on inline elements that are having width/height
					// animated
					if ( jQuery.css( this, "display" ) === "inline" &&
							jQuery.css( this, "float" ) === "none" ) {
						if ( !jQuery.support.inlineBlockNeedsLayout ) {
							this.style.display = "inline-block";

						} else {
							display = defaultDisplay( this.nodeName );

							// inline-level elements accept inline-block;
							// block-level elements need to be inline with layout
							if ( display === "inline" ) {
								this.style.display = "inline-block";

							} else {
								this.style.display = "inline";
								this.style.zoom = 1;
							}
						}
					}
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			for ( p in prop ) {
				e = new jQuery.fx( this, opt, p );
				val = prop[ p ];

				if ( rfxtypes.test(val) ) {
					e[ val === "toggle" ? hidden ? "show" : "hide" : val ]();

				} else {
					parts = rfxnum.exec( val );
					start = e.cur();

					if ( parts ) {
						end = parseFloat( parts[2] );
						unit = parts[3] || ( jQuery.cssNumber[ p ] ? "" : "px" );

						// We need to compute starting value
						if ( unit !== "px" ) {
							jQuery.style( this, p, (end || 1) + unit);
							start = ((end || 1) / e.cur()) * start;
							jQuery.style( this, p, start + unit);
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] ) {
							end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			}

			// For JS strict compliance
			return true;
		});
	},

	stop: function( clearQueue, gotoEnd ) {
		if ( clearQueue ) {
			this.queue([]);
		}

		this.each(function() {
			var timers = jQuery.timers,
				i = timers.length;
			// clear marker counters if we know they won't be
			if ( !gotoEnd ) {
				jQuery._unmark( true, this );
			}
			while ( i-- ) {
				if ( timers[i].elem === this ) {
					if (gotoEnd) {
						// force the next step to be the last
						timers[i](true);
					}

					timers.splice(i, 1);
				}
			}
		});

		// start the next in the queue if the last step wasn't forced
		if ( !gotoEnd ) {
			this.dequeue();
		}

		return this;
	}

});

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout( clearFxNow, 0 );
	return ( fxNow = jQuery.now() );
}

function clearFxNow() {
	fxNow = undefined;
}

// Generate parameters to create a standard animation
function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function() {
		obj[ this ] = type;
	});

	return obj;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show", 1),
	slideUp: genFx("hide", 1),
	slideToggle: genFx("toggle", 1),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

		// Queueing
		opt.old = opt.complete;
		opt.complete = function( noUnmark ) {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue !== false ) {
				jQuery.dequeue( this );
			} else if ( noUnmark !== false ) {
				jQuery._unmark( this );
			}
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		options.orig = options.orig || {};
	}

});

jQuery.fx.prototype = {
	// Simple function for setting a style value
	update: function() {
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );
	},

	// Get the current size
	cur: function() {
		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {
			return this.elem[ this.prop ];
		}

		var parsed,
			r = jQuery.css( this.elem, this.prop );
		// Empty strings, null, undefined and "auto" are converted to 0,
		// complex values such as "rotate(1rad)" are returned as is,
		// simple values such as "10px" are parsed to Float.
		return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
	},

	// Start an animation from one number to another
	custom: function( from, to, unit ) {
		var self = this,
			fx = jQuery.fx,
			raf;

		this.startTime = fxNow || createFxNow();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? "" : "px" );
		this.now = this.start;
		this.pos = this.state = 0;

		function t( gotoEnd ) {
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			// Use requestAnimationFrame instead of setInterval if available
			if ( requestAnimationFrame ) {
				timerId = true;
				raf = function() {
					// When timerId gets set to null at any point, this stops
					if ( timerId ) {
						requestAnimationFrame( raf );
						fx.tick();
					}
				};
				requestAnimationFrame( raf );
			} else {
				timerId = setInterval( fx.tick, fx.interval );
			}
		}
	},

	// Simple 'show' function
	show: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any
		// flash of content
		this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());

		// Start by showing the element
		jQuery( this.elem ).show();
	},

	// Simple 'hide' function
	hide: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom(this.cur(), 0);
	},

	// Each step of an animation
	step: function( gotoEnd ) {
		var t = fxNow || createFxNow(),
			done = true,
			elem = this.elem,
			options = this.options,
			i, n;

		if ( gotoEnd || t >= options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			options.animatedProperties[ this.prop ] = true;

			for ( i in options.animatedProperties ) {
				if ( options.animatedProperties[i] !== true ) {
					done = false;
				}
			}

			if ( done ) {
				// Reset the overflow
				if ( options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {

					jQuery.each( [ "", "X", "Y" ], function (index, value) {
						elem.style[ "overflow" + value ] = options.overflow[index];
					});
				}

				// Hide the element if the "hide" operation was done
				if ( options.hide ) {
					jQuery(elem).hide();
				}

				// Reset the properties, if the item has been hidden or shown
				if ( options.hide || options.show ) {
					for ( var p in options.animatedProperties ) {
						jQuery.style( elem, p, options.orig[p] );
					}
				}

				// Execute the complete function
				options.complete.call( elem );
			}

			return false;

		} else {
			// classical easing cannot be used with an Infinity duration
			if ( options.duration == Infinity ) {
				this.now = t;
			} else {
				n = t - this.startTime;
				this.state = n / options.duration;

				// Perform the easing function, defaults to swing
				this.pos = jQuery.easing[ options.animatedProperties[ this.prop ] ]( this.state, n, 0, 1, options.duration );
				this.now = this.start + ((this.end - this.start) * this.pos);
			}
			// Perform the next step of the animation
			this.update();
		}

		return true;
	}
};

jQuery.extend( jQuery.fx, {
	tick: function() {
		for ( var timers = jQuery.timers, i = 0 ; i < timers.length ; ++i ) {
			if ( !timers[i]() ) {
				timers.splice(i--, 1);
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
	},

	interval: 13,

	stop: function() {
		clearInterval( timerId );
		timerId = null;
	},

	speeds: {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	},

	step: {
		opacity: function( fx ) {
			jQuery.style( fx.elem, "opacity", fx.now );
		},

		_default: function( fx ) {
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
				fx.elem.style[ fx.prop ] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
			} else {
				fx.elem[ fx.prop ] = fx.now;
			}
		}
	}
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

// Try to restore the default display value of an element
function defaultDisplay( nodeName ) {

	if ( !elemdisplay[ nodeName ] ) {

		var body = document.body,
			elem = jQuery( "<" + nodeName + ">" ).appendTo( body ),
			display = elem.css( "display" );

		elem.remove();

		// If the simple way fails,
		// get element's real default display by attaching it to a temp iframe
		if ( display === "none" || display === "" ) {
			// No iframe to use yet, so create it
			if ( !iframe ) {
				iframe = document.createElement( "iframe" );
				iframe.frameBorder = iframe.width = iframe.height = 0;
			}

			body.appendChild( iframe );

			// Create a cacheable copy of the iframe document on first call.
			// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
			// document to it; WebKit & Firefox won't allow reusing the iframe document.
			if ( !iframeDoc || !iframe.createElement ) {
				iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
				iframeDoc.write( ( document.compatMode === "CSS1Compat" ? "<!doctype html>" : "" ) + "<html><body>" );
				iframeDoc.close();
			}

			elem = iframeDoc.createElement( nodeName );

			iframeDoc.body.appendChild( elem );

			display = jQuery.css( elem, "display" );

			body.removeChild( iframe );
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return elemdisplay[ nodeName ];
}




var rtable = /^t(?:able|d|h)$/i,
	rroot = /^(?:body|html)$/i;

if ( "getBoundingClientRect" in document.documentElement ) {
	jQuery.fn.offset = function( options ) {
		var elem = this[0], box;

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		try {
			box = elem.getBoundingClientRect();
		} catch(e) {}

		var doc = elem.ownerDocument,
			docElem = doc.documentElement;

		// Make sure we're not dealing with a disconnected DOM node
		if ( !box || !jQuery.contains( docElem, elem ) ) {
			return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
		}

		var body = doc.body,
			win = getWindow(doc),
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
			scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
			top  = box.top  + scrollTop  - clientTop,
			left = box.left + scrollLeft - clientLeft;

		return { top: top, left: left };
	};

} else {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		jQuery.offset.initialize();

		var computedStyle,
			offsetParent = elem.offsetParent,
			prevOffsetParent = elem,
			doc = elem.ownerDocument,
			docElem = doc.documentElement,
			body = doc.body,
			defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop,
			left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
				break;
			}

			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
			top  -= elem.scrollTop;
			left -= elem.scrollLeft;

			if ( elem === offsetParent ) {
				top  += elem.offsetTop;
				left += elem.offsetLeft;

				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
			}

			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
			}

			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
			top  += body.offsetTop;
			left += body.offsetLeft;
		}

		if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
			top  += Math.max( docElem.scrollTop, body.scrollTop );
			left += Math.max( docElem.scrollLeft, body.scrollLeft );
		}

		return { top: top, left: left };
	};
}

jQuery.offset = {
	initialize: function() {
		var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat( jQuery.css(body, "marginTop") ) || 0,
			html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";

		jQuery.extend( container.style, { position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden" } );

		container.innerHTML = html;
		body.insertBefore( container, body.firstChild );
		innerDiv = container.firstChild;
		checkDiv = innerDiv.firstChild;
		td = innerDiv.nextSibling.firstChild.firstChild;

		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

		checkDiv.style.position = "fixed";
		checkDiv.style.top = "20px";

		// safari subtracts parent border width here which is 5px
		this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
		checkDiv.style.position = checkDiv.style.top = "";

		innerDiv.style.overflow = "hidden";
		innerDiv.style.position = "relative";

		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);

		body.removeChild( container );
		jQuery.offset.initialize = jQuery.noop;
	},

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		jQuery.offset.initialize();

		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if (options.top != null) {
			props.top = (options.top - curOffset.top) + curTop;
		}
		if (options.left != null) {
			props.left = (options.left - curOffset.left) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({
	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ["Left", "Top"], function( i, name ) {
	var method = "scroll" + name;

	jQuery.fn[ method ] = function( val ) {
		var elem, win;

		if ( val === undefined ) {
			elem = this[ 0 ];

			if ( !elem ) {
				return null;
			}

			win = getWindow( elem );

			// Return the scroll offset
			return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
				jQuery.support.boxModel && win.document.documentElement[ method ] ||
					win.document.body[ method ] :
				elem[ method ];
		}

		// Set the scroll offset
		return this.each(function() {
			win = getWindow( this );

			if ( win ) {
				win.scrollTo(
					!i ? val : jQuery( win ).scrollLeft(),
					 i ? val : jQuery( win ).scrollTop()
				);

			} else {
				this[ method ] = val;
			}
		});
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}




// Create width, height, innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function( i, name ) {

	var type = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn[ "inner" + name ] = function() {
		var elem = this[0];
		return elem && elem.style ?
			parseFloat( jQuery.css( elem, type, "padding" ) ) :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn[ "outer" + name ] = function( margin ) {
		var elem = this[0];
		return elem && elem.style ?
			parseFloat( jQuery.css( elem, type, margin ? "margin" : "border" ) ) :
			null;
	};

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		var elem = this[0];
		if ( !elem ) {
			return size == null ? null : this;
		}

		if ( jQuery.isFunction( size ) ) {
			return this.each(function( i ) {
				var self = jQuery( this );
				self[ type ]( size.call( this, i, self[ type ]() ) );
			});
		}

		if ( jQuery.isWindow( elem ) ) {
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
			var docElemProp = elem.document.documentElement[ "client" + name ];
			return elem.document.compatMode === "CSS1Compat" && docElemProp ||
				elem.document.body[ "client" + name ] || docElemProp;

		// Get document width or height
		} else if ( elem.nodeType === 9 ) {
			// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
			return Math.max(
				elem.documentElement["client" + name],
				elem.body["scroll" + name], elem.documentElement["scroll" + name],
				elem.body["offset" + name], elem.documentElement["offset" + name]
			);

		// Get or set width or height on the element
		} else if ( size === undefined ) {
			var orig = jQuery.css( elem, type ),
				ret = parseFloat( orig );

			return jQuery.isNaN( ret ) ? orig : ret;

		// Set the width or height on the element (default to pixels if value is unitless)
		} else {
			return this.css( type, typeof size === "string" ? size : size + "px" );
		}
	};

});


// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;
})(window);

/** ../_core/scripts/jquery.cookie.js **/
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

/** ../_core/scripts/jquery.positionAncestor.js **/
/**
 * Get the current coordinates of the first element in the set of matched
 * elements, relative to the closest positioned ancestor element that
 * matches the selector.
 * @param {Object} selector
 */
jQuery.fn.positionAncestor = function(selector) {
    var left = 0;
    var top = 0;
    this.each(function(index, element) {
        // check if current element has an ancestor matching a selector
        // and that ancestor is positioned
        var $ancestor = $(this).closest(selector);
        if ($ancestor.length && $ancestor.css("position") !== "static") {
            var $child = $(this);
            var childMarginEdgeLeft = $child.offset().left - parseInt($child.css("marginLeft"), 10);
            var childMarginEdgeTop = $child.offset().top - parseInt($child.css("marginTop"), 10);
            var ancestorPaddingEdgeLeft = $ancestor.offset().left + parseInt($ancestor.css("borderLeftWidth"), 10);
            var ancestorPaddingEdgeTop = $ancestor.offset().top + parseInt($ancestor.css("borderTopWidth"), 10);
            left = childMarginEdgeLeft - ancestorPaddingEdgeLeft;
            top = childMarginEdgeTop - ancestorPaddingEdgeTop;
            // we have found the ancestor and computed the position
            // stop iterating
            return false;
        }
    });
    return {
        left:    left,
        top:    top
    }
};


/** ../_core/scripts/jquery.url.js **/
// JQuery URL Parser plugin - https://github.com/allmarkedup/jQuery-URL-Parser
// Written by Mark Perkins, mark@allmarkedup.com
// License: http://unlicense.org/ (i.e. do what you want with it!)

;(function($, undefined) {
    
    var tag2attr = {
        a       : 'href',
        img     : 'src',
        form    : 'action',
        base    : 'href',
        script  : 'src',
        iframe  : 'src',
        link    : 'href'
    },
    
	key = ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","fragment"], // keys available to query
	
	aliases = { "anchor" : "fragment" }, // aliases for backwards compatability

	parser = {
		strict  : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
		loose   :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
	},
	
	querystring_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g, // supports both ampersand and semicolon-delimted query string key/value pairs
	
	fragment_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g; // supports both ampersand and semicolon-delimted fragment key/value pairs
	
	function parseUri( url, strictMode )
	{
		var str = decodeURI( url ),
		    res   = parser[ strictMode || false ? "strict" : "loose" ].exec( str ),
		    uri = { attr : {}, param : {}, seg : {} },
		    i   = 14;
		
		while ( i-- )
		{
			uri.attr[ key[i] ] = res[i] || "";
		}
		
		// build query and fragment parameters
		
		uri.param['query'] = {};
		uri.param['fragment'] = {};
		
		uri.attr['query'].replace( querystring_parser, function ( $0, $1, $2 ){
			if ($1)
			{
				uri.param['query'][$1] = $2;
			}
		});
		
		uri.attr['fragment'].replace( fragment_parser, function ( $0, $1, $2 ){
			if ($1)
			{
				uri.param['fragment'][$1] = $2;
			}
		});
				
		// split path and fragement into segments
		
        uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g,'').split('/');
        
        uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g,'').split('/');
        
        // compile a 'base' domain attribute
        
        uri.attr['base'] = uri.attr.host ? uri.attr.protocol+"://"+uri.attr.host + (uri.attr.port ? ":"+uri.attr.port : '') : '';
        
		return uri;
	};
	
	function getAttrName( elm )
	{
		var tn = elm.tagName;
		if ( tn !== undefined ) return tag2attr[tn.toLowerCase()];
		return tn;
	}
	
	$.fn.url = function( strictMode )
	{
	    var url = '';
	    
	    if ( this.length )
	    {
	        url = $(this).attr( getAttrName(this[0]) ) || '';
	    }
	    
        return $.url({ url : url, strict : strictMode });
	};
	
	$.url = function( opts )
	{
	    var url     = '',
	        strict  = false;

	    if ( typeof opts === 'string' )
	    {
	        url = opts;
	    }
	    else
	    {
	        opts = opts || {};
	        strict = opts.strict || strict;
            url = opts.url === undefined ? window.location.toString() : opts.url;
	    }
	    	            
        return {
            
            data : parseUri(url, strict),
            
            // get various attributes from the URI
            attr : function( attr )
            {
                attr = aliases[attr] || attr;
                return attr !== undefined ? this.data.attr[attr] : this.data.attr;
            },
            
            // return query string parameters
            param : function( param )
            {
                return param !== undefined ? this.data.param.query[param] : this.data.param.query;
            },
            
            // return fragment parameters
            fparam : function( param )
            {
                return param !== undefined ? this.data.param.fragment[param] : this.data.param.fragment;
            },
            
            // return path segments
            segment : function( seg )
            {
                if ( seg === undefined )
                {
                    return this.data.seg.path;                    
                }
                else
                {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.path[seg];                    
                }
            },
            
            // return fragment segments
            fsegment : function( seg )
            {
                if ( seg === undefined )
                {
                    return this.data.seg.fragment;                    
                }
                else
                {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.fragment[seg];                    
                }
            }
            
        };
        
	};
	
})(jQuery);
/** ../_core/scripts/json2.js **/

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    "use strict";

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

/** ../_core/scripts/morpheus.js **/
/*!
  * Morpheus - A Brilliant Animator
  * https://github.com/ded/morpheus - (c) Dustin Diaz 2011
  * License MIT
  */
!function (context, doc, win) {

  var html = doc.documentElement,
      rgbOhex = /^rgb\(|#/,
      relVal = /^([+\-])=([\d\.]+)/,
      numUnit = /^(?:[\+\-]=)?\d+(?:\.\d+)?(%|in|cm|mm|em|ex|pt|pc|px)$/,
      // does this browser support the opacity property?
      opasity = function () {
        return typeof doc.createElement('a').style.opacity !== 'undefined';
      }(),
      // these elements do not require 'px'
      unitless = { lineHeight: 1, zoom: 1, zIndex: 1, opacity: 1 },

      // initial style is determined by the elements themselves
      getStyle = doc.defaultView && doc.defaultView.getComputedStyle ?
        function (el, property) {
          var value = null;
          var computed = doc.defaultView.getComputedStyle(el, '');
          computed && (value = computed[camelize(property)]);
          return el.style[property] || value;
        } : html.currentStyle ?

        function (el, property) {
          property = camelize(property);

          if (property == 'opacity') {
            var val = 100;
            try {
              val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;
            } catch (e1) {
              try {
                val = el.filters('alpha').opacity;
              } catch (e2) {}
            }
            return val / 100;
          }
          var value = el.currentStyle ? el.currentStyle[property] : null;
          return el.style[property] || value;
        } :

        function (el, property) {
          return el.style[camelize(property)];
        },

      rgb = function (r, g, b) {
        return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
      },

      // convert rgb and short hex to long hex
      toHex = function (c) {
        var m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c);
        return (m ? rgb(m[1], m[2], m[3]) : c)
        .replace(/#(\w)(\w)(\w)$/, '#$1$1$2$2$3$3'); // short to long
      },

      // change font-size => fontSize etc.
      camelize = function (s) {
        return s.replace(/-(.)/g, function (m, m1) {
          return m1.toUpperCase();
        });
      },

      fun = function (f) {
        return typeof f == 'function';
      },

      frame = function () {
        // native animation frames
        // http://webstuff.nfshost.com/anim-timing/Overview.html
        // http://dev.chromium.org/developers/design-documents/requestanimationframe-implementation
        return win.requestAnimationFrame  ||
          win.webkitRequestAnimationFrame ||
          win.mozRequestAnimationFrame    ||
          win.oRequestAnimationFrame      ||
          win.msRequestAnimationFrame     ||
          function (callback) {
            win.setTimeout(function () {
              callback(+new Date());
            }, 10);
          };
      }();

  /**
    * Core tween method that requests each frame
    * @param duration: time in milliseconds. defaults to 1000
    * @param fn: tween frame callback function receiving 'position'
    * @param done {optional}: complete callback function
    * @param ease {optional}: easing method. defaults to easeOut
    * @param from {optional}: integer to start from
    * @param to {optional}: integer to end at
    * @returns method to stop the animation
    */
  function tween(duration, fn, done, ease, from, to) {
    ease = ease || function (t) {
      // default to a pleasant-to-the-eye easeOut (like native animations)
      return Math.sin(t * Math.PI / 2)
    };
    var time = duration || 1000,
        diff = to - from,
        start = +new Date(),
        stop = 0,
        end = 0;
    frame(run);

    function run(t) {
      var delta = t - start;
      if (delta > time || stop) {
        to = isFinite(to) ? to : 1;
        stop ? end && fn(to) : fn(to);
        done && done();
        return;
      }
      // if you don't specify a 'to' you can use tween as a generic delta tweener
      // cool, eh?
      isFinite(to) ?
        fn((diff * ease(delta / time)) + from) :
        fn(ease(delta / time));
      frame(run);
    }
    return {
      stop: function (jump) {
        stop = 1;
        end = jump; // jump to end of animation?
      }
    }
  }

  /**
    * generic bezier method for animating x|y coordinates
    * minimum of 2 points required (start and end).
    * first point start, last point end
    * additional control points are optional (but why else would you use this anyway ;)
    * @param points: array containing control points
       [[0, 0], [100, 200], [200, 100]]
    * @param pos: current be(tween) position represented as float  0 - 1
    * @return [x, y]
    */
  function bezier(points, pos) {
    var n = points.length, r = [], i, j;
    for (i = 0; i < n; ++i) {
      r[i] = [points[i][0], points[i][1]];
    }
    for (j = 1; j < n; ++j) {
      for (i = 0; i < n - j; ++i) {
        r[i][0] = (1 - pos) * r[i][0] + pos * r[parseInt(i + 1, 10)][0];
        r[i][1] = (1 - pos) * r[i][1] + pos * r[parseInt(i + 1, 10)][1];
      }
    }
    return [r[0][0], r[0][1]];
  }

  // this gets you the next hex in line according to a 'position'
  function nextColor(pos, start, finish) {
    var r = [], i, e;
    for (i = 0; i < 6; i++) {
      from = Math.min(15, parseInt(start.charAt(i),  16));
      to   = Math.min(15, parseInt(finish.charAt(i), 16));
      e = Math.floor((to - from) * pos + from);
      e = e > 15 ? 15 : e < 0 ? 0 : e;
      r[i] = e.toString(16);
    }
    return '#' + r.join('');
  }

  // this retreives the frame value within a sequence
  function getTweenVal(pos, units, begin, end, k, i, v) {
    if (typeof begin[i][k] == 'string') {
      return nextColor(pos, begin[i][k], end[i][k]);
    } else {
      // round so we don't get crazy long floats
      v = Math.round(((end[i][k] - begin[i][k]) * pos + begin[i][k]) * 1000) / 1000;
      // some css properties don't require a unit (like zIndex, lineHeight, opacity)
      !(k in unitless) && (v += units[i][k] || 'px');
      return v;
    }
  }

  // support for relative movement via '+=n' or '-=n'
  function by(val, start, m, r, i) {
    return (m = relVal.exec(val)) ?
      (i = parseFloat(m[2])) && (r = (start + i)) && m[1] == '+' ?
      r : start - i :
      parseFloat(val);
  }

  /**
    * morpheus:
    * @param element(s): HTMLElement(s)
    * @param options: mixed bag between CSS Style properties & animation options
    *  - {n} CSS properties|values
    *     - value can be strings, integers,
    *     - or callback function that receives element to be animated. method must return value to be tweened
    *     - relative animations start with += or -= followed by integer
    *  - duration: time in ms - defaults to 1000(ms)
    *  - easing: a transition method - defaults to an 'easeOut' algorithm
    *  - complete: a callback method for when all elements have finished
    *  - bezier: array of arrays containing x|y coordinates that define the bezier points. defaults to none
    *     - this may also be a function that receives element to be animated. it must return a value
    */
  function morpheus(elements, options) {
    var els = elements ? (els = isFinite(elements.length) ? elements : [elements]) : [], i,
        complete = options.complete,
        duration = options.duration,
        ease = options.easing,
        points = options.bezier,
        begin = [],
        end = [],
        units = [],
        bez = [],
        originalLeft,
        originalTop;

    delete options.complete;
    delete options.duration;
    delete options.easing;
    delete options.bezier;

    if (points) {
      // remember the original values for top|left
      originalLeft = options.left;
      originalTop = options.top;
      delete options.right;
      delete options.bottom;
      delete options.left;
      delete options.top;
    }

    for (i = els.length; i--;) {

      // record beginning and end states to calculate positions
      begin[i] = {};
      end[i] = {};
      units[i] = {};

      // are we 'moving'?
      if (points) {

        var left = getStyle(els[i], 'left'),
            top = getStyle(els[i], 'top'),
            xy = [by(fun(originalLeft) ? originalLeft(els[i]) : originalLeft || 0, parseFloat(left)),
                  by(fun(originalTop) ? originalTop(els[i]) : originalTop || 0, parseFloat(top))];

        bez[i] = fun(points) ? points(els[i], xy) : points;
        bez[i].push(xy);
        bez[i].unshift([
          parseInt(left, 10),
          parseInt(top, 10)
        ]);
      }

      for (var k in options) {
        var v = getStyle(els[i], k), unit,
            tmp = fun(options[k]) ? options[k](els[i]) : options[k]
        if (typeof tmp == 'string' &&
            rgbOhex.test(tmp) &&
            !rgbOhex.test(v)) {
          delete options[k]; // remove key :(
          continue; // cannot animate colors like 'orange' or 'transparent'
                    // only #xxx, #xxxxxx, rgb(n,n,n)
        }

        begin[i][k] = typeof tmp == 'string' && rgbOhex.test(tmp) ?
          toHex(v).slice(1) :
          parseFloat(v);
        end[i][k] = typeof tmp == 'string' && tmp.charAt(0) == '#' ?
          toHex(tmp).slice(1) :
          by(tmp, parseFloat(v));
        // record original unit
        typeof tmp == 'string' && (unit = tmp.match(numUnit)) && (units[i][k] = unit[1]);
      }
    }
    // ONE TWEEN TO RULE THEM ALL
    return tween(duration, function (pos, v, xy) {
      // normally not a fan of optimizing for() loops, but we want something
      // fast for animating
      for (i = els.length; i--;) {
        if (points) {
          xy = bezier(bez[i], pos);
          els[i].style.left = xy[0] + 'px';
          els[i].style.top = xy[1] + 'px';
        }
        for (var k in options) {
          v = getTweenVal(pos, units, begin, end, k, i);
          k == 'opacity' && !opasity ?
            (els[i].style.filter = 'alpha(opacity=' + (v * 100) + ')') :
            (els[i].style[camelize(k)] = v);
        }
      }
    }, complete, ease);
  }

  // expose useful methods
  morpheus.tween = tween;
  morpheus.getStyle = getStyle;
  morpheus.bezier = bezier;

  typeof module !== 'undefined' && module.exports &&
    (module.exports = morpheus);
  context['morpheus'] = morpheus;

}(this, document, window);
/** ../_core/scripts/socket.io.js **/
/*! Socket.IO.js build:0.7.3, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports) {

  /**
   * IO namespace.
   *
   * @namespace
   */

  var io = exports;

  /**
   * Socket.IO version
   *
   * @api public
   */

  io.version = '0.7.3';

  /**
   * Protocol implemented.
   *
   * @api public
   */

  io.protocol = 1;

  /**
   * Available transports, these will be populated with the available transports
   *
   * @api public
   */

  io.transports = [];

  /**
   * Keep track of jsonp callbacks.
   *
   * @api private
   */

  io.j = [];

  /**
   * Keep track of our io.Sockets
   *
   * @api private
   */
  io.sockets = {};


  /**
   * Manages connections to hosts.
   *
   * @param {String} uri
   * @Param {Boolean} force creation of new socket (defaults to false)
   * @api public
   */

  io.connect = function (host, details) {
    var uri = io.util.parseUri(host)
      , uuri
      , socket;

    if ('undefined' != typeof document) {
      uri.host = uri.host || document.domain;
      uri.port = uri.port || document.location.port;
    }

    uuri = io.util.uniqueUri(uri);

    var options = {
        host: uri.host
      , secure: uri.protocol == 'https'
      , port: uri.port || 80
    };
    io.util.merge(options, details);

    if (options['force new connection'] || !io.sockets[uuri]) {
      socket = new io.Socket(options);
    }

    if (!options['force new connection'] && socket) {
      io.sockets[uuri] = socket;
    }

    socket = socket || io.sockets[uuri];

    // if path is different from '' or /
    return socket.of(uri.path.length > 1 ? uri.path : '');
  };

})('object' === typeof module ? module.exports : (window.io = {}));

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports) {

  /**
   * Utilities namespace.
   *
   * @namespace
   */

  var util = exports.util = {};

  /**
   * Parses an URI
   *
   * @author Steven Levithan <stevenlevithan.com> (MIT license)
   * @api public
   */

  var re = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

  var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password',
               'host', 'port', 'relative', 'path', 'directory', 'file', 'query',
               'anchor'];

  util.parseUri = function (str) {
    var m = re.exec(str || '')
      , uri = {}
      , i = 14;

    while (i--) {
      uri[parts[i]] = m[i] || '';
    }

    return uri;
  };

  /**
   * Produces a unique url that identifies a Socket.IO connection.
   *
   * @param {Object} uri
   * @api public
   */

  util.uniqueUri = function (uri) {
    var protocol = uri.protocol
      , host = uri.host
      , port = uri.port;

    if ('undefined' != typeof document) {
      host = host || document.domain;
      port = port || (protocol == 'https'
        && document.location.protocol !== 'https:' ? 443 : document.location.port);
    } else {
      host = host || 'localhost';

      if (!port && protocol == 'https') {
        port = 443;
      }
    }

    return (protocol || 'http') + '://' + host + ':' + (port || 80);
  };

  /**
   * Executes the given function when the page is loaded.
   *
   *     io.util.load(function () { console.log('page loaded'); });
   *
   * @param {Function} fn
   * @api public
   */

  var pageLoaded = false;

  util.load = function (fn) {
    if (document.readyState === 'complete' || pageLoaded) {
      return fn();
    }

    util.on(window, 'load', fn, false);
  };

  /**
   * Adds an event.
   *
   * @api private
   */

  util.on = function (element, event, fn, capture) {
    if (element.attachEvent) {
      element.attachEvent('on' + event, fn);
    } else {
      element.addEventListener(event, fn, capture);
    }
  };

  /**
   * Generates the correct `XMLHttpRequest` for regular and cross domain requests.
   *
   * @param {Boolean} [xdomain] Create a request that can be used cross domain.
   * @returns {XMLHttpRequest|false} If we can create a XMLHttpRequest.
   * @api private
   */

  util.request = function (xdomain) {
    if ('undefined' != typeof window) {
      if (xdomain && window.XDomainRequest) {
        return new XDomainRequest();
      };

      if (window.XMLHttpRequest && (!xdomain || util.ua.hasCORS)) {
        return new XMLHttpRequest();
      };

      if (!xdomain) {
        try {
          return new window.ActiveXObject('Microsoft.XMLHTTP');
        } catch(e) { }
      }
    }

    return null;
  };

  /**
   * XHR based transport constructor.
   *
   * @constructor
   * @api public
   */

  /**
   * Change the internal pageLoaded value.
   */

  if ('undefined' != typeof window) {
    util.load(function () {
      pageLoaded = true;
    });
  }

  /**
   * Defers a function to ensure a spinner is not displayed by the browser
   *
   * @param {Function} fn
   * @api public
   */

  util.defer = function (fn) {
    if (!util.ua.webkit) {
      return fn();
    }

    util.load(function () {
      setTimeout(fn, 100);
    });
  };

  /**
   * Merges two objects.
   *
   * @api public
   */
  
  util.merge = function merge (target, additional, deep, lastseen) {
    var seen = lastseen || []
      , depth = typeof deep == 'undefined' ? 2 : deep
      , prop;

    for (prop in additional) {
      if (additional.hasOwnProperty(prop) && util.indexOf(seen, prop) < 0) {
        if (typeof target[prop] !== 'object' || !depth) {
          target[prop] = additional[prop];
          seen.push(additional[prop]);
        } else {
          util.merge(target[prop], additional[prop], depth - 1, seen);
        }
      }
    }

    return target;
  };

  /**
   * Merges prototypes from objects
   *
   * @api public
   */
  
  util.mixin = function (ctor, ctor2) {
    util.merge(ctor.prototype, ctor2.prototype);
  };

  /**
   * Shortcut for prototypical and static inheritance.
   *
   * @api private
   */

  util.inherit = function (ctor, ctor2) {
    ctor.prototype = new ctor2;
    util.merge(ctor, ctor2);
  };

  /**
   * Checks if the given object is an Array.
   *
   *     io.util.isArray([]); // true
   *     io.util.isArray({}); // false
   *
   * @param Object obj
   * @api public
   */

  util.isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  /**
   * Intersects values of two arrays into a third
   *
   * @api public
   */

  util.intersect = function (arr, arr2) {
    var ret = []
      , longest = arr.length > arr2.length ? arr : arr2
      , shortest = arr.length > arr2.length ? arr2 : arr

    for (var i = 0, l = shortest.length; i < l; i++) {
      if (~util.indexOf(longest, shortest[i]))
        ret.push(shortest[i]);
    }

    return ret;
  }

  /**
   * Array indexOf compatibility.
   *
   * @see bit.ly/a5Dxa2
   * @api public
   */

  util.indexOf = function (arr, o, i) {
    if (Array.prototype.indexOf) {
      return Array.prototype.indexOf.call(arr, o, i);
    }

    for (var j = arr.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0
        ; i < j && arr[i] !== o; i++);

    return j <= i ? -1 : i;
  };

  /**
   * Converts enumerables to array.
   *
   * @api public
   */

  util.toArray = function (enu) {
    var arr = [];

    for (var i = 0, l = enu.length; i < l; i++)
      arr.push(enu[i]);

    return arr;
  };

  /**
   * UA / engines detection namespace.
   *
   * @namespace
   */

  util.ua = {};

  /**
   * Whether the UA supports CORS for XHR.
   *
   * @api public
   */

  util.ua.hasCORS = 'undefined' != typeof window && window.XMLHttpRequest &&
  (function () {
    try {
      var a = new XMLHttpRequest();
    } catch (e) {
      return false;
    }

    return a.withCredentials != undefined;
  })();

  /**
   * Detect webkit.
   *
   * @api public
   */

  util.ua.webkit = 'undefined' != typeof navigator
    && /webkit/i.test(navigator.userAgent);

})('undefined' != typeof window ? io : module.exports);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.EventEmitter = EventEmitter;

  /**
   * Event emitter constructor.
   *
   * @api public.
   */

  function EventEmitter () {};

  /**
   * Adds a listener
   *
   * @api public
   */

  EventEmitter.prototype.on = function (name, fn) {
    if (!this.$events) {
      this.$events = {};
    }

    if (!this.$events[name]) {
      this.$events[name] = fn;
    } else if (io.util.isArray(this.$events[name])) {
      this.$events[name].push(fn);
    } else {
      this.$events[name] = [this.$events[name], fn];
    }

    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  /**
   * Adds a volatile listener.
   *
   * @api public
   */

  EventEmitter.prototype.once = function (name, fn) {
    var self = this;

    function on () {
      self.removeListener(name, on);
      fn.apply(this, arguments);
    };

    on.listener = fn;
    this.on(name, on);

    return this;
  };

  /**
   * Removes a listener.
   *
   * @api public
   */

  EventEmitter.prototype.removeListener = function (name, fn) {
    if (this.$events && this.$events[name]) {
      var list = this.$events[name];

      if (io.util.isArray(list)) {
        var pos = -1;

        for (var i = 0, l = list.length; i < l; i++) {
          if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
            pos = i;
            break;
          }
        }

        if (pos < 0) {
          return this;
        }

        list.splice(pos, 1);

        if (!list.length) {
          delete this.$events[name];
        }
      } else if (list === fn || (list.listener && list.listener === fn)) {
        delete this.$events[name];
      }
    }

    return this;
  };

  /**
   * Removes all listeners for an event.
   *
   * @api public
   */

  EventEmitter.prototype.removeAllListeners = function (name) {
    // TODO: enable this when node 0.5 is stable
    //if (name === undefined) {
      //this.$events = {};
      //return this;
    //}

    if (this.$events && this.$events[name]) {
      this.$events[name] = null;
    }

    return this;
  };

  /**
   * Gets all listeners for a certain event.
   *
   * @api publci
   */

  EventEmitter.prototype.listeners = function (name) {
    if (!this.$events) {
      this.$events = {};
    }

    if (!this.$events[name]) {
      this.$events[name] = [];
    }

    if (!io.util.isArray(this.$events[name])) {
      this.$events[name] = [this.$events[name]];
    }

    return this.$events[name];
  };

  /**
   * Emits an event.
   *
   * @api public
   */

  EventEmitter.prototype.emit = function (name) {
    if (!this.$events) {
      return false;
    }

    var handler = this.$events[name];

    if (!handler) {
      return false;
    }

    var args = Array.prototype.slice.call(arguments, 1);

    if ('function' == typeof handler) {
      handler.apply(this, args);
    } else if (io.util.isArray(handler)) {
      var listeners = handler.slice();

      for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i].apply(this, args);
      }
    } else {
      return false;
    }

    return true;
  };

})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Based on JSON2 (http://www.JSON.org/js.html).
 */

(function (exports, nativeJSON) {
  "use strict";

  // use native JSON if it's available
  if (nativeJSON && nativeJSON.parse){
    return exports.JSON = {
      parse: nativeJSON.parse
    , stringify: nativeJSON.stringify
    }
  }

  var JSON = exports.JSON = {};

  function f(n) {
      // Format integers to have at least two digits.
      return n < 10 ? '0' + n : n;
  }

  function date(d, key) {
    return isFinite(d.valueOf()) ?
        d.getUTCFullYear()     + '-' +
        f(d.getUTCMonth() + 1) + '-' +
        f(d.getUTCDate())      + 'T' +
        f(d.getUTCHours())     + ':' +
        f(d.getUTCMinutes())   + ':' +
        f(d.getUTCSeconds())   + 'Z' : null;
  };

  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {    // table of character substitutions
          '\b': '\\b',
          '\t': '\\t',
          '\n': '\\n',
          '\f': '\\f',
          '\r': '\\r',
          '"' : '\\"',
          '\\': '\\\\'
      },
      rep;


  function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

      escapable.lastIndex = 0;
      return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
          var c = meta[a];
          return typeof c === 'string' ? c :
              '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + string + '"';
  }


  function str(key, holder) {

// Produce a string from holder[key].

      var i,          // The loop counter.
          k,          // The member key.
          v,          // The member value.
          length,
          mind = gap,
          partial,
          value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

      if (value instanceof Date) {
          value = date(key);
      }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

      if (typeof rep === 'function') {
          value = rep.call(holder, key, value);
      }

// What happens next depends on the value's type.

      switch (typeof value) {
      case 'string':
          return quote(value);

      case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

          return isFinite(value) ? String(value) : 'null';

      case 'boolean':
      case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

          return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

      case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

          if (!value) {
              return 'null';
          }

// Make an array to hold the partial results of stringifying this object value.

          gap += indent;
          partial = [];

// Is the value an array?

          if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

              length = value.length;
              for (i = 0; i < length; i += 1) {
                  partial[i] = str(i, value) || 'null';
              }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

              v = partial.length === 0 ? '[]' : gap ?
                  '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                  '[' + partial.join(',') + ']';
              gap = mind;
              return v;
          }

// If the replacer is an array, use it to select the members to be stringified.

          if (rep && typeof rep === 'object') {
              length = rep.length;
              for (i = 0; i < length; i += 1) {
                  if (typeof rep[i] === 'string') {
                      k = rep[i];
                      v = str(k, value);
                      if (v) {
                          partial.push(quote(k) + (gap ? ': ' : ':') + v);
                      }
                  }
              }
          } else {

// Otherwise, iterate through all of the keys in the object.

              for (k in value) {
                  if (Object.prototype.hasOwnProperty.call(value, k)) {
                      v = str(k, value);
                      if (v) {
                          partial.push(quote(k) + (gap ? ': ' : ':') + v);
                      }
                  }
              }
          }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

          v = partial.length === 0 ? '{}' : gap ?
              '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
              '{' + partial.join(',') + '}';
          gap = mind;
          return v;
      }
  }

// If the JSON object does not yet have a stringify method, give it one.

  JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

      var i;
      gap = '';
      indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

      if (typeof space === 'number') {
          for (i = 0; i < space; i += 1) {
              indent += ' ';
          }

// If the space parameter is a string, it will be used as the indent string.

      } else if (typeof space === 'string') {
          indent = space;
      }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

      rep = replacer;
      if (replacer && typeof replacer !== 'function' &&
              (typeof replacer !== 'object' ||
              typeof replacer.length !== 'number')) {
          throw new Error('JSON.stringify');
      }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

      return str('', {'': value});
  };

// If the JSON object does not yet have a parse method, give it one.

  JSON.parse = function (text, reviver) {
  // The parse method takes a text and an optional reviver function, and returns
  // a JavaScript value if the text is a valid JSON text.

      var j;

      function walk(holder, key) {

  // The walk method is used to recursively walk the resulting structure so
  // that modifications can be made.

          var k, v, value = holder[key];
          if (value && typeof value === 'object') {
              for (k in value) {
                  if (Object.prototype.hasOwnProperty.call(value, k)) {
                      v = walk(value, k);
                      if (v !== undefined) {
                          value[k] = v;
                      } else {
                          delete value[k];
                      }
                  }
              }
          }
          return reviver.call(holder, key, value);
      }


  // Parsing happens in four stages. In the first stage, we replace certain
  // Unicode characters with escape sequences. JavaScript handles many characters
  // incorrectly, either silently deleting them, or treating them as line endings.

      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
          text = text.replace(cx, function (a) {
              return '\\u' +
                  ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
          });
      }

  // In the second stage, we run the text against regular expressions that look
  // for non-JSON patterns. We are especially concerned with '()' and 'new'
  // because they can cause invocation, and '=' because it can cause mutation.
  // But just to be safe, we want to reject all unexpected forms.

  // We split the second stage into 4 regexp operations in order to work around
  // crippling inefficiencies in IE's and Safari's regexp engines. First we
  // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
  // replace all simple value tokens with ']' characters. Third, we delete all
  // open brackets that follow a colon or comma or that begin the text. Finally,
  // we look to see that the remaining characters are only whitespace or ']' or
  // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

      if (/^[\],:{}\s]*$/
              .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                  .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                  .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

  // In the third stage we use the eval function to compile the text into a
  // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
  // in JavaScript: it can begin a block or an object literal. We wrap the text
  // in parens to eliminate the ambiguity.

          j = eval('(' + text + ')');

  // In the optional fourth stage, we recursively walk the new structure, passing
  // each name/value pair to a reviver function for possible transformation.

          return typeof reviver === 'function' ?
              walk({'': j}, '') : j;
      }

  // If the text is not JSON parseable, then a SyntaxError is thrown.

      throw new SyntaxError('JSON.parse');
  };

})(
    'undefined' != typeof io ? io : module.exports
  , typeof JSON !== 'undefined' ? JSON : undefined
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Parser namespace.
   *
   * @namespace
   */

  var parser = exports.parser = {};

  /**
   * Packet types.
   */

  var packets = parser.packets = [
      'disconnect'
    , 'connect'
    , 'heartbeat'
    , 'message'
    , 'json'
    , 'event'
    , 'ack'
    , 'error'
    , 'noop'
  ];

  /**
   * Errors reasons.
   */

  var reasons = parser.reasons = [
      'transport not supported'
    , 'client not handshaken'
    , 'unauthorized'
  ];

  /**
   * Errors advice.
   */

  var advice = parser.advice = [
      'reconnect'
  ];

  /**
   * Shortcuts.
   */

  var JSON = io.JSON
    , indexOf = io.util.indexOf;

  /**
   * Encodes a packet.
   *
   * @api private
   */

  parser.encodePacket = function (packet) {
    var type = indexOf(packets, packet.type)
      , id = packet.id || ''
      , endpoint = packet.endpoint || ''
      , ack = packet.ack
      , data = null;

    switch (packet.type) {
      case 'error':
        var reason = packet.reason ? indexOf(reasons, packet.reason) : ''
          , adv = packet.advice ? indexOf(advice, packet.advice) : ''

        if (reason !== '' || adv !== '')
          data = reason + (adv !== '' ? ('+' + adv) : '')

        break;

      case 'message':
        if (packet.data !== '')
          data = packet.data;
        break;

      case 'event':
        var ev = { name: packet.name };

        if (packet.args && packet.args.length) {
          ev.args = packet.args;
        }

        data = JSON.stringify(ev);
        break;

      case 'json':
        data = JSON.stringify(packet.data);
        break;

      case 'connect':
        if (packet.qs)
          data = packet.qs;
        break;

      case 'ack':
        data = packet.ackId
          + (packet.args && packet.args.length
              ? '+' + JSON.stringify(packet.args) : '');
        break;
    }

    // construct packet with required fragments
    var encoded = [
        type
      , id + (ack == 'data' ? '+' : '')
      , endpoint
    ];

    // data fragment is optional
    if (data !== null && data !== undefined)
      encoded.push(data);

    return encoded.join(':');
  };

  /**
   * Encodes multiple messages (payload).
   *
   * @param {Array} messages
   * @api private
   */

  parser.encodePayload = function (packets) {
    var decoded = '';

    if (packets.length == 1)
      return packets[0];

    for (var i = 0, l = packets.length; i < l; i++) {
      var packet = packets[i];
      decoded += '\ufffd' + packet.length + '\ufffd' + packets[i]
    }

    return decoded;
  };

  /**
   * Decodes a packet
   *
   * @api private
   */

  var regexp = /^([^:]+):([0-9]+)?(\+)?:([^:]+)?:?(.*)?$/;

  parser.decodePacket = function (data) {
    var pieces = data.match(regexp);

    if (!pieces) return {};

    var id = pieces[2] || ''
      , data = pieces[5] || ''
      , packet = {
            type: packets[pieces[1]]
          , endpoint: pieces[4] || ''
        };

    // whether we need to acknowledge the packet
    if (id) {
      packet.id = id;
      if (pieces[3])
        packet.ack = 'data';
      else
        packet.ack = true;
    }

    // handle different packet types
    switch (packet.type) {
      case 'error':
        var pieces = data.split('+');
        packet.reason = reasons[pieces[0]] || '';
        packet.advice = advice[pieces[1]] || '';
        break;

      case 'message':
        packet.data = data || '';
        break;

      case 'event':
        try {
          var opts = JSON.parse(data);
          packet.name = opts.name;
          packet.args = opts.args;
        } catch (e) { }

        packet.args = packet.args || [];
        break;

      case 'json':
        try {
          packet.data = JSON.parse(data);
        } catch (e) { }
        break;

      case 'connect':
        packet.qs = data || '';
        break;

      case 'ack':
        var pieces = data.match(/^([0-9]+)(\+)?(.*)/);
        if (pieces) {
          packet.ackId = pieces[1];
          packet.args = [];

          if (pieces[3]) {
            try {
              packet.args = pieces[3] ? JSON.parse(pieces[3]) : [];
            } catch (e) { }
          }
        }
        break;

      case 'disconnect':
      case 'heartbeat':
        break;
    };

    return packet;
  };

  /**
   * Decodes data payload. Detects multiple messages
   *
   * @return {Array} messages
   * @api public
   */

  parser.decodePayload = function (data) {
    if (data[0] == '\ufffd') {
      var ret = [];

      for (var i = 1, length = ''; i < data.length; i++) {
        if (data[i] == '\ufffd') {
          ret.push(parser.decodePacket(data.substr(i + 1).substr(0, length)));
          i += Number(length) + 1;
          length = '';
        } else {
          length += data[i];
        }
      }

      return ret;
    } else {
      return [parser.decodePacket(data)];
    }
  };

})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.Transport = Transport;

  /**
   * This is the transport template for all supported transport methods.
   *
   * @constructor
   * @api public
   */

  function Transport (socket, sessid) {
    this.socket = socket;
    this.sessid = sessid;
  };

  /**
   * Apply EventEmitter mixin.
   */

  io.util.mixin(Transport, io.EventEmitter);

  /**
   * Handles the response from the server. When a new response is received
   * it will automatically update the timeout, decode the message and
   * forwards the response to the onMessage function for further processing.
   *
   * @param {String} data Response from the server.
   * @api private
   */

  Transport.prototype.onData = function (data) {
    this.clearCloseTimeout();
    this.setCloseTimeout();

    if (data !== '') {
      // todo: we should only do decodePayload for xhr transports
      var msgs = io.parser.decodePayload(data);

      if (msgs && msgs.length) {
        for (var i = 0, l = msgs.length; i < l; i++) {
          this.onPacket(msgs[i]);
        }
      }
    }

    return this;
  };

  /**
   * Handles packets.
   *
   * @api private
   */

  Transport.prototype.onPacket = function (packet) {
    if (packet.type == 'heartbeat') {
      return this.onHeartbeat();
    }

    if (packet.type == 'connect' && packet.endpoint == '') {
      this.onConnect();
    }

    this.socket.onPacket(packet);

    return this;
  };

  /**
   * Sets close timeout
   *
   * @api private
   */
  
  Transport.prototype.setCloseTimeout = function () {
    if (!this.closeTimeout) {
      var self = this;

      this.closeTimeout = setTimeout(function () {
        self.onDisconnect();
      }, this.socket.closeTimeout);
    }
  };

  /**
   * Called when transport disconnects.
   *
   * @api private
   */

  Transport.prototype.onDisconnect = function () {
    if (this.close) this.close();
    this.clearTimeouts();
    this.socket.onDisconnect();
    return this;
  };

  /**
   * Called when transport connects
   *
   * @api private
   */

  Transport.prototype.onConnect = function () {
    this.socket.onConnect();
    return this;
  }

  /**
   * Clears close timeout
   *
   * @api private
   */

  Transport.prototype.clearCloseTimeout = function () {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  };

  /**
   * Clear timeouts
   *
   * @api private
   */

  Transport.prototype.clearTimeouts = function () {
    this.clearCloseTimeout();

    if (this.reopenTimeout) {
      clearTimeout(this.reopenTimeout);
    }
  };

  /**
   * Sends a packet
   *
   * @param {Object} packet object.
   * @api private
   */

  Transport.prototype.packet = function (packet) {
    this.send(io.parser.encodePacket(packet));
  };

  /**
   * Send the received heartbeat message back to server. So the server
   * knows we are still connected.
   *
   * @param {String} heartbeat Heartbeat response from the server.
   * @api private
   */

  Transport.prototype.onHeartbeat = function (heartbeat) {
    this.packet({ type: 'heartbeat' });
  };
 
  /**
   * Called when the transport opens.
   *
   * @api private
   */

  Transport.prototype.onOpen = function () {
    this.open = true;
    this.clearCloseTimeout();
    this.socket.onOpen();
  };

  /**
   * Notifies the base when the connection with the Socket.IO server
   * has been disconnected.
   *
   * @api private
   */

  Transport.prototype.onClose = function () {
    var self = this;

    /* FIXME: reopen delay causing a infinit loop
    this.reopenTimeout = setTimeout(function () {
      self.open();
    }, this.socket.options['reopen delay']);*/

    this.open = false;
    this.setCloseTimeout();
    this.socket.onClose();
  };

  /**
   * Generates a connection url based on the Socket.IO URL Protocol.
   * See <https://github.com/learnboost/socket.io-node/> for more details.
   *
   * @returns {String} Connection url
   * @api private
   */

  Transport.prototype.prepareUrl = function () {
    var options = this.socket.options;

    return this.scheme() + '://'
      + options.host + ':' + options.port + '/'
      + options.resource + '/' + io.protocol
      + '/' + this.name + '/' + this.sessid;
  };
})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.Socket = Socket;

  /**
   * Create a new `Socket.IO client` which can establish a persisent
   * connection with a Socket.IO enabled server.
   *
   * @api public
   */

  function Socket (options) {
    this.options = {
        port: 80
      , secure: false
      , document: document
      , resource: 'socket.io'
      , transports: io.transports
      , 'connect timeout': 10000
      , 'try multiple transports': true
      , 'reconnect': true
      , 'reconnection delay': 500
      , 'reopen delay': 3000
      , 'max reconnection attempts': 10
      , 'sync disconnect on unload': true
      , 'auto connect': true
    };

    io.util.merge(this.options, options);

    this.connected = false;
    this.open = false;
    this.connecting = false;
    this.reconnecting = false;
    this.namespaces = {};
    this.buffer = [];
    this.doBuffer = false;

    if (this.options['sync disconnect on unload'] &&
        (!this.isXDomain() || io.util.ua.hasCORS)) {
      var self = this;

      io.util.on(window, 'beforeunload', function () {
        self.disconnectSync();
      }, false);
    }

    if (this.options['auto connect']) {
      this.connect();
    }
};

  /**
   * Apply EventEmitter mixin.
   */

  io.util.mixin(Socket, io.EventEmitter);

  /**
   * Returns a namespace listener/emitter for this socket
   *
   * @api public
   */

  Socket.prototype.of = function (name) {
    if (!this.namespaces[name]) {
      this.namespaces[name] = new io.SocketNamespace(this, name);

      if (name !== '') {
        this.namespaces[name].packet({ type: 'connect' });
      }
    }

    return this.namespaces[name];
  };

  /**
   * Emits the given event to the Socket and all namespaces
   *
   * @api private
   */

  Socket.prototype.publish = function () {
    this.emit.apply(this, arguments);

    var nsp;

    for (var i in this.namespaces) {
      if (this.namespaces.hasOwnProperty(i)) {
        nsp = this.of(i);
        nsp.$emit.apply(nsp, arguments);
      }
    }
  };

  /**
   * Performs the handshake
   *
   * @api private
   */

  function empty () { };

  Socket.prototype.handshake = function (fn) {
    var self = this
      , options = this.options;

    function complete (data) {
      if (data instanceof Error) {
        self.onError(data.message);
      } else {
        fn.apply(null, data.split(':'));
      }
    };

    var url = [
          'http' + (options.secure ? 's' : '') + ':/'
        , options.host + ':' + options.port
        , this.options.resource
        , io.protocol
        , '?t=' + + new Date
      ].join('/');

    if (this.isXDomain()) {
      var insertAt = document.getElementsByTagName('script')[0]
        , script = document.createElement('SCRIPT');

      script.src = url + '&jsonp=' + io.j.length;
      insertAt.parentNode.insertBefore(script, insertAt);

      io.j.push(function (data) {
        complete(data);
        script.parentNode.removeChild(script);
      });
    } else {
      var xhr = io.util.request();

      xhr.open('GET', url);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          xhr.onreadystatechange = empty;

          if (xhr.status == 200) {
            complete(xhr.responseText);
          } else {
            !self.reconnecting && self.onError(xhr.responseText);
          }
        }
      };
      xhr.send(null);
    }
  };

  /**
   * Find an available transport based on the options supplied in the constructor.
   *
   * @api private
   */

  Socket.prototype.getTransport = function (override) {
    var transports = override || this.transports, match;

    for (var i = 0, transport; transport = transports[i]; i++) {
      if (io.Transport[transport]
        && io.Transport[transport].check(this)
        && (!this.isXDomain() || io.Transport[transport].xdomainCheck())) {
        return new io.Transport[transport](this, this.sessionid);
      }
    }

    return null;
  };

  /**
   * Connects to the server.
   *
   * @param {Function} [fn] Callback.
   * @returns {io.Socket}
   * @api public
   */

  Socket.prototype.connect = function (fn) {
    if (this.connecting) {
      return this;
    }

    var self = this;

    this.handshake(function (sid, heartbeat, close, transports) {
      self.sessionid = sid;
      self.closeTimeout = close * 1000;
      self.heartbeatTimeout = heartbeat * 1000;
      self.transports = io.util.intersect(
          transports.split(',')
        , self.options.transports
      );
      self.transport = self.getTransport();

      if (!self.transport) {
        return;
      }

      self.connecting = true;
      self.publish('connecting', self.transport.name);

      self.transport.open();

      if (self.options.connectTimeout) {
        self.connectTimeoutTimer = setTimeout(function () {
          if (!self.connected) {
            if (self.options['try multiple transports']) {
              if (!self.remainingTransports) {
                self.remainingTransports = self.transports.slice(0);
              }

              var transports = self.remainingTransports;

              while (transports.length > 0 && transports.splice(0,1)[0] !=
                self.transport.name) {}

              if (transports.length) {
                self.transport = self.getTransport(transports);
                self.connect();
              }
            }

            if (!self.remainingTransports || self.remainingTransports.length == 0) {
              self.publish('connect_failed');
            }
          }

          if(self.remainingTransports && self.remainingTransports.length == 0) {
            delete self.remainingTransports;
          }
        }, self.options['connect timeout']);
      }

      if (fn && typeof fn == 'function') {
        self.once('connect', fn);
      }
    });

    return this;
  };

  /**
   * Sends a message.
   *
   * @param {Object} data packet.
   * @returns {io.Socket}
   * @api public
   */

  Socket.prototype.packet = function (data) {
    if (this.connected && !this.doBuffer) {
      this.transport.packet(data);
    } else {
      this.buffer.push(data);
    }

    return this;
  };

  /**
   * Sets buffer state
   *
   * @api private
   */

  Socket.prototype.setBuffer = function (v) {
    this.doBuffer = v;

    if (!v && this.connected && this.buffer.length) {
      this.transport.payload(this.buffer);
      this.buffer = [];
    }
  };

  /**
   * Disconnect the established connect.
   *
   * @returns {io.Socket}
   * @api public
   */

  Socket.prototype.disconnect = function () {
    if (this.connected) {
      if (this.open) {
        this.of('').packet({ type: 'disconnect' });
      }

      // handle disconnection immediately
      this.onDisconnect('booted');
    }

    return this;
  };

  /**
   * Disconnects the socket with a sync XHR.
   *
   * @api private
   */

  Socket.prototype.disconnectSync = function () {
    // ensure disconnection
    var xhr = io.util.request()
      , uri = this.resource + '/' + io.protocol + '/' + this.sessionid;

    xhr.open('GET', uri, true);

    // handle disconnection immediately
    this.onDisconnect('booted');
  };

  /**
   * Check if we need to use cross domain enabled transports. Cross domain would
   * be a different port or different domain name.
   *
   * @returns {Boolean}
   * @api private
   */

  Socket.prototype.isXDomain = function () {
    var locPort = window.location.port || 80;
    return this.options.host !== document.domain || this.options.port != locPort;
  };

  /**
   * Called upon handshake.
   *
   * @api private
   */

  Socket.prototype.onConnect = function () {
    this.connected = true;
    this.connecting = false;
    if (!this.doBuffer) {
      // make sure to flush the buffer
      this.setBuffer(false);
    }
    this.emit('connect');
  };

  /**
   * Called when the transport opens
   *
   * @api private
   */

  Socket.prototype.onOpen = function () {
    this.open = true;
  };

  /**
   * Called when the transport closes.
   *
   * @api private
   */

  Socket.prototype.onClose = function () {
    this.open = false;
  };

  /**
   * Called when the transport first opens a connection
   *
   * @param text
   */

  Socket.prototype.onPacket = function (packet) {
    this.of(packet.endpoint).onPacket(packet);
  };

  /**
   * Handles an error.
   *
   * @api private
   */

  Socket.prototype.onError = function (err) {
    if (err && err.advice) {
      if (err.advice === 'reconnect') {
        this.disconnect();
        this.reconnect();
      }
    }

    this.publish('error', err && err.reason ? err.reason : err);
  };

  /**
   * Called when the transport disconnects.
   *
   * @api private
   */

  Socket.prototype.onDisconnect = function (reason) {
    var wasConnected = this.connected;

    this.connected = false;
    this.connecting = false;
    this.open = false;

    if (wasConnected) {
      this.transport.close();
      this.transport.clearTimeouts();
      this.publish('disconnect', reason);

      if ('booted' != reason && this.options.reconnect && !this.reconnecting) {
        this.reconnect();
      }
    }
  };

  /**
   * Called upon reconnection.
   *
   * @api private
   */

  Socket.prototype.reconnect = function () {
    this.reconnecting = true;
    this.reconnectionAttempts = 0;
    this.reconnectionDelay = this.options['reconnection delay'];

    var self = this
      , maxAttempts = this.options['max reconnection attempts']
      , tryMultiple = this.options['try multiple transports']

    function reset () {
      if (self.connected) {
        self.publish('reconnect', self.transport.name, self.reconnectionAttempts);
      }

      self.removeListener('connect_failed', maybeReconnect);
      self.removeListener('connect', maybeReconnect);

      self.reconnecting = false;

      delete self.reconnectionAttempts;
      delete self.reconnectionDelay;
      delete self.reconnectionTimer;
      delete self.redoTransports;

      self.options['try multiple transports'] = tryMultiple;
    };

    function maybeReconnect () {
      if (!self.reconnecting) {
        return;
      }

      if (self.connected) {
        return reset();
      };

      if (self.connecting && self.reconnecting) {
        return self.reconnectionTimer = setTimeout(maybeReconnect, 1000);
      }

      if (self.reconnectionAttempts++ >= maxAttempts) {
        if (!self.redoTransports) {
          self.on('connect_failed', maybeReconnect);
          self.options['try multiple transports'] = true;
          self.transport = self.getTransport();
          self.redoTransports = true;
          self.connect();
        } else {
          self.publish('reconnect_failed');
          reset();
        }
      } else {
        self.reconnectionDelay *= 2; // exponential back off
        self.connect();
        self.publish('reconnecting', self.reconnectionDelay, self.reconnectionAttempts);
        self.reconnectionTimer = setTimeout(maybeReconnect, self.reconnectionDelay);
      }
    };

    this.options['try multiple transports'] = false;
    this.reconnectionTimer = setTimeout(maybeReconnect, this.reconnectionDelay);

    this.on('connect', maybeReconnect);
  };

})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);
/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.SocketNamespace = SocketNamespace;

  /**
   * Socket namespace constructor.
   *
   * @constructor
   * @api public
   */

  function SocketNamespace (socket, name) {
    this.socket = socket;
    this.name = name || '';
    this.flags = {};
    this.json = new Flag(this, 'json');
    this.ackPackets = 0;
    this.acks = {};
  };

  /**
   * Apply EventEmitter mixin.
   */

  io.util.mixin(SocketNamespace, io.EventEmitter);

  /**
   * Copies emit since we override it
   *
   * @api private
   */

  SocketNamespace.prototype.$emit = io.EventEmitter.prototype.emit;

  /**
   * Sends a packet.
   *
   * @api private
   */

  SocketNamespace.prototype.packet = function (packet) {
    packet.endpoint = this.name;
    this.socket.packet(packet);
    this.flags = {};
    return this;
  };

  /**
   * Sends a message
   *
   * @api public
   */

  SocketNamespace.prototype.send = function (data, fn) {
    var packet = {
        type: this.flags.json ? 'json' : 'message'
      , data: data
    };

    if ('function' == typeof fn) {
      packet.id = ++this.ackPackets;
      packet.ack = true;
      this.acks[packet.id] = fn;
    }

    return this.packet(packet);
  };

  /**
   * Emits an event
   *
   * @api public
   */
  
  SocketNamespace.prototype.emit = function (name) {
    var args = Array.prototype.slice.call(arguments, 1)
      , lastArg = args[args.length - 1]
      , packet = {
            type: 'event'
          , name: name
        };

    if ('function' == typeof lastArg) {
      packet.id = ++this.ackPackets;
      packet.ack = 'data';
      this.acks[packet.id] = lastArg;
      args = args.slice(0, args.length - 1);
    }

    packet.args = args;

    return this.packet(packet);
  };

  /**
   * Disconnects the namespace
   *
   * @api private
   */

  SocketNamespace.prototype.disconnect = function () {
    if (this.name === '') {
      this.socket.disconnect();
    } else {
      this.packet({ type: 'disconnect' });
      this.$emit('disconnect');
    }

    return this;
  };

  /**
   * Handles a packet
   *
   * @api private
   */

  SocketNamespace.prototype.onPacket = function (packet) {
    var self = this;

    function ack () {
      self.packet({
          type: 'ack'
        , args: io.util.toArray(arguments)
        , ackId: packet.id
      });
    };

    switch (packet.type) {
      case 'connect':
        this.$emit('connect');
        break;

      case 'disconnect':
        if (this.name === '') {
          this.socket.onDisconnect(packet.reason || 'booted');
        } else {
          this.$emit('disconnect', packet.reason);
        }
        break;

      case 'message':
      case 'json':
        var params = ['message', packet.data];

        if (packet.ack == 'data') {
          params.push(ack);
        } else if (packet.ack) {
          this.packet({ type: 'ack', ackId: packet.id });
        }

        this.$emit.apply(this, params);
        break;

      case 'event':
        var params = [packet.name].concat(packet.args);

        if (packet.ack == 'data')
          params.push(ack);

        this.$emit.apply(this, params);
        break;

      case 'ack':
        if (this.acks[packet.ackId]) {
          this.acks[packet.ackId].apply(this, packet.args);
          delete this.acks[packet.ackId];
        }
        break;

      case 'error':
        if (packet.advice){
          this.socket.onError(packet);
        } else {
          if (packet.reason == 'unauthorized') {
            this.$emit('connect_failed', packet.reason);
          } else {
            this.$emit('error', packet.reason);
          }
        }
        break;
    }
  };

  /**
   * Flag interface.
   *
   * @api private
   */

  function Flag (nsp, name) {
    this.namespace = nsp;
    this.name = name;
  };

  /**
   * Send a message
   *
   * @api public
   */

  Flag.prototype.send = function () {
    this.namespace.flags[this.name] = true;
    this.namespace.send.apply(this.namespace, arguments);
  };

  /**
   * Emit an event
   *
   * @api public
   */

  Flag.prototype.emit = function () {
    this.namespace.flags[this.name] = true;
    this.namespace.emit.apply(this.namespace, arguments);
  };

})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.websocket = WS;

  /**
   * The WebSocket transport uses the HTML5 WebSocket API to establish an
   * persistent connection with the Socket.IO server. This transport will also
   * be inherited by the FlashSocket fallback as it provides a API compatible
   * polyfill for the WebSockets.
   *
   * @constructor
   * @extends {io.Transport}
   * @api public
   */

  function WS (socket) {
    io.Transport.apply(this, arguments);
  };

  /**
   * Inherits from Transport.
   */

  io.util.inherit(WS, io.Transport);

  /**
   * Transport name
   *
   * @api public
   */

  WS.prototype.name = 'websocket';

  /**
   * Initializes a new `WebSocket` connection with the Socket.IO server. We attach
   * all the appropriate listeners to handle the responses from the server.
   *
   * @returns {Transport}
   * @api public
   */

  WS.prototype.open = function () {
    this.websocket = new WebSocket(this.prepareUrl());

    var self = this;
    this.websocket.onopen = function () {
      self.onOpen();
      self.socket.setBuffer(false);
    };
    this.websocket.onmessage = function (ev) {
      self.onData(ev.data);
    };
    this.websocket.onclose = function () {
      self.onClose();
      self.socket.setBuffer(true);
    };
    this.websocket.onerror = function (e) {
      self.onError(e);
    };

    return this;
  };

  /**
   * Send a message to the Socket.IO server. The message will automatically be
   * encoded in the correct message format.
   *
   * @returns {Transport}
   * @api public
   */

  WS.prototype.send = function (data) {
    this.websocket.send(data);
    return this;
  };

  /**
   * Payload
   *
   * @api private
   */

  WS.prototype.payload = function (arr) {
    for (var i = 0, l = arr.length; i < l; i++) {
      this.packet(arr[i]);
    }
    return this;
  };

  /**
   * Disconnect the established `WebSocket` connection.
   *
   * @returns {Transport}
   * @api public
   */

  WS.prototype.close = function () {
    this.websocket.close();
    return this;
  };

  /**
   * Handle the errors that `WebSocket` might be giving when we
   * are attempting to connect or send messages.
   *
   * @param {Error} e The error.
   * @api private
   */

  WS.prototype.onError = function (e) {
    this.socket.onError(e);
  };

  /**
   * Returns the appropriate scheme for the URI generation.
   *
   * @api private
   */
  WS.prototype.scheme = function () {
    return this.socket.options.secure ? 'wss' : 'ws';
  };

  /**
   * Checks if the browser has support for native `WebSockets` and that
   * it's not the polyfill created for the FlashSocket transport.
   *
   * @return {Boolean}
   * @api public
   */

  WS.check = function () {
    return 'WebSocket' in window && !('__addTask' in WebSocket);
  };

  /**
   * Check if the `WebSocket` transport support cross domain communications.
   *
   * @returns {Boolean}
   * @api public
   */

  WS.xdomainCheck = function () {
    return true;
  };

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('websocket');

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.flashsocket = Flashsocket;

  /**
   * The Flashsocket transport. This is a API wrapper for the HTML5 WebSocket
   * specification. It uses a .swf file to communicate with the server. If you want
   * to serve the .swf file from a other server than where the Socket.IO script is
   * coming from you need to use the insecure version of the .swf. More information
   * about this can be found on the github page.
   *
   * @constructor
   * @extends {io.Transport.websocket}
   * @api public
   */

  function Flashsocket () {
    io.Transport.websocket.apply(this, arguments);
  };

  /**
   * Inherits from Transport.
   */

  io.util.inherit(Flashsocket, io.Transport.websocket);

  /**
   * Transport name
   *
   * @api public
   */

  Flashsocket.prototype.name = 'flashsocket';

  /**
   *Disconnect the established `Flashsocket` connection. This is done by adding a 
   * new task to the Flashsocket. The rest will be handled off by the `WebSocket` 
   * transport.
   *
   * @returns {Transport}
   * @api public
   */

  Flashsocket.prototype.open = function () {
    var self = this, args = arguments;
    WebSocket.__addTask(function () {
      io.Transport.websocket.prototype.open.apply(self, args);
    });
    return this;
  };
  
  /**
   * Sends a message to the Socket.IO server. This is done by adding a new
   * task to the Flashsocket. The rest will be handled off by the `WebSocket` 
   * transport.
   *
   * @returns {Transport}
   * @api public
   */

  Flashsocket.prototype.send = function () {
    var self = this, args = arguments;
    WebSocket.__addTask(function () {
      io.Transport.websocket.prototype.send.apply(self, args);
    });
    return this;
  };

  /**
   * Disconnects the established `Flashsocket` connection.
   *
   * @returns {Transport}
   * @api public
   */

  Flashsocket.prototype.close = function () {
    WebSocket.__tasks.length = 0;
    io.Transport.websocket.prototype.close.call(this);
    return this;
  };

  /**
   * Check if the Flashsocket transport is supported as it requires that the Adobe
   * Flash Player plugin version `10.0.0` or greater is installed. And also check if
   * the polyfill is correctly loaded.
   *
   * @returns {Boolean}
   * @api public
   */

  Flashsocket.check = function (socket) {
    if (
        typeof WebSocket == 'undefined'
      || !('__initialize' in WebSocket) || !swfobject
    ) return false;

    var supported = swfobject.getFlashPlayerVersion().major >= 10
      , options = socket.options
      , path = [
          'http' + (options.secure ? 's' : '') + ':/'
        , options.host + ':' + options.port
        , options.resource
        , 'static/flashsocket'
        , 'WebSocketMain' + (socket.isXDomain() ? 'Insecure' : '') + '.swf'
      ];

    // Only start downloading the swf file when the checked that this browser
    // actually supports it
    if (supported && !Flashsocket.loaded) {
      if (typeof WEB_SOCKET_SWF_LOCATION === 'undefined') {
        // Set the correct file based on the XDomain settings
        WEB_SOCKET_SWF_LOCATION = path.join('/');
      }

      WebSocket.__initialize();
      Flashsocket.loaded = true;
    }

    return supported;
  };

  /**
   * Check if the Flashsocket transport can be used as cross domain / cross origin 
   * transport. Because we can't see which type (secure or insecure) of .swf is used
   * we will just return true.
   *
   * @returns {Boolean}
   * @api public
   */

  Flashsocket.xdomainCheck = function () {
    return true;
  };

  /**
   * Disable AUTO_INITIALIZATION
   */

  if (typeof window != 'undefined') {
    WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = true;
  }

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('flashsocket');
})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();// Copyright: Hiroshi Ichikawa <http://gimite.net/en/>
// License: New BSD License
// Reference: http://dev.w3.org/html5/websockets/
// Reference: http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol

(function() {
  
  if (window.WebSocket) return;

  var console = window.console;
  if (!console || !console.log || !console.error) {
    console = {log: function(){ }, error: function(){ }};
  }
  
  if (!swfobject.hasFlashPlayerVersion("10.0.0")) {
    console.error("Flash Player >= 10.0.0 is required.");
    return;
  }
  if (location.protocol == "file:") {
    console.error(
      "WARNING: web-socket-js doesn't work in file:///... URL " +
      "unless you set Flash Security Settings properly. " +
      "Open the page via Web server i.e. http://...");
  }

  /**
   * This class represents a faux web socket.
   * @param {string} url
   * @param {array or string} protocols
   * @param {string} proxyHost
   * @param {int} proxyPort
   * @param {string} headers
   */
  WebSocket = function(url, protocols, proxyHost, proxyPort, headers) {
    var self = this;
    self.__id = WebSocket.__nextId++;
    WebSocket.__instances[self.__id] = self;
    self.readyState = WebSocket.CONNECTING;
    self.bufferedAmount = 0;
    self.__events = {};
    if (!protocols) {
      protocols = [];
    } else if (typeof protocols == "string") {
      protocols = [protocols];
    }
    // Uses setTimeout() to make sure __createFlash() runs after the caller sets ws.onopen etc.
    // Otherwise, when onopen fires immediately, onopen is called before it is set.
    setTimeout(function() {
      WebSocket.__addTask(function() {
        WebSocket.__flash.create(
            self.__id, url, protocols, proxyHost || null, proxyPort || 0, headers || null);
      });
    }, 0);
  };

  /**
   * Send data to the web socket.
   * @param {string} data  The data to send to the socket.
   * @return {boolean}  True for success, false for failure.
   */
  WebSocket.prototype.send = function(data) {
    if (this.readyState == WebSocket.CONNECTING) {
      throw "INVALID_STATE_ERR: Web Socket connection has not been established";
    }
    // We use encodeURIComponent() here, because FABridge doesn't work if
    // the argument includes some characters. We don't use escape() here
    // because of this:
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Functions#escape_and_unescape_Functions
    // But it looks decodeURIComponent(encodeURIComponent(s)) doesn't
    // preserve all Unicode characters either e.g. "\uffff" in Firefox.
    // Note by wtritch: Hopefully this will not be necessary using ExternalInterface.  Will require
    // additional testing.
    var result = WebSocket.__flash.send(this.__id, encodeURIComponent(data));
    if (result < 0) { // success
      return true;
    } else {
      this.bufferedAmount += result;
      return false;
    }
  };

  /**
   * Close this web socket gracefully.
   */
  WebSocket.prototype.close = function() {
    if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) {
      return;
    }
    this.readyState = WebSocket.CLOSING;
    WebSocket.__flash.close(this.__id);
  };

  /**
   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
   *
   * @param {string} type
   * @param {function} listener
   * @param {boolean} useCapture
   * @return void
   */
  WebSocket.prototype.addEventListener = function(type, listener, useCapture) {
    if (!(type in this.__events)) {
      this.__events[type] = [];
    }
    this.__events[type].push(listener);
  };

  /**
   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
   *
   * @param {string} type
   * @param {function} listener
   * @param {boolean} useCapture
   * @return void
   */
  WebSocket.prototype.removeEventListener = function(type, listener, useCapture) {
    if (!(type in this.__events)) return;
    var events = this.__events[type];
    for (var i = events.length - 1; i >= 0; --i) {
      if (events[i] === listener) {
        events.splice(i, 1);
        break;
      }
    }
  };

  /**
   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
   *
   * @param {Event} event
   * @return void
   */
  WebSocket.prototype.dispatchEvent = function(event) {
    var events = this.__events[event.type] || [];
    for (var i = 0; i < events.length; ++i) {
      events[i](event);
    }
    var handler = this["on" + event.type];
    if (handler) handler(event);
  };

  /**
   * Handles an event from Flash.
   * @param {Object} flashEvent
   */
  WebSocket.prototype.__handleEvent = function(flashEvent) {
    if ("readyState" in flashEvent) {
      this.readyState = flashEvent.readyState;
    }
    if ("protocol" in flashEvent) {
      this.protocol = flashEvent.protocol;
    }
    
    var jsEvent;
    if (flashEvent.type == "open" || flashEvent.type == "error") {
      jsEvent = this.__createSimpleEvent(flashEvent.type);
    } else if (flashEvent.type == "close") {
      // TODO implement jsEvent.wasClean
      jsEvent = this.__createSimpleEvent("close");
    } else if (flashEvent.type == "message") {
      var data = decodeURIComponent(flashEvent.message);
      jsEvent = this.__createMessageEvent("message", data);
    } else {
      throw "unknown event type: " + flashEvent.type;
    }
    
    this.dispatchEvent(jsEvent);
  };
  
  WebSocket.prototype.__createSimpleEvent = function(type) {
    if (document.createEvent && window.Event) {
      var event = document.createEvent("Event");
      event.initEvent(type, false, false);
      return event;
    } else {
      return {type: type, bubbles: false, cancelable: false};
    }
  };
  
  WebSocket.prototype.__createMessageEvent = function(type, data) {
    if (document.createEvent && window.MessageEvent && !window.opera) {
      var event = document.createEvent("MessageEvent");
      event.initMessageEvent("message", false, false, data, null, null, window, null);
      return event;
    } else {
      // IE and Opera, the latter one truncates the data parameter after any 0x00 bytes.
      return {type: type, data: data, bubbles: false, cancelable: false};
    }
  };
  
  /**
   * Define the WebSocket readyState enumeration.
   */
  WebSocket.CONNECTING = 0;
  WebSocket.OPEN = 1;
  WebSocket.CLOSING = 2;
  WebSocket.CLOSED = 3;

  WebSocket.__flash = null;
  WebSocket.__instances = {};
  WebSocket.__tasks = [];
  WebSocket.__nextId = 0;
  
  /**
   * Load a new flash security policy file.
   * @param {string} url
   */
  WebSocket.loadFlashPolicyFile = function(url){
    WebSocket.__addTask(function() {
      WebSocket.__flash.loadManualPolicyFile(url);
    });
  };

  /**
   * Loads WebSocketMain.swf and creates WebSocketMain object in Flash.
   */
  WebSocket.__initialize = function() {
    if (WebSocket.__flash) return;
    
    if (WebSocket.__swfLocation) {
      // For backword compatibility.
      window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation;
    }
    if (!window.WEB_SOCKET_SWF_LOCATION) {
      console.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
      return;
    }
    var container = document.createElement("div");
    container.id = "webSocketContainer";
    // Hides Flash box. We cannot use display: none or visibility: hidden because it prevents
    // Flash from loading at least in IE. So we move it out of the screen at (-100, -100).
    // But this even doesn't work with Flash Lite (e.g. in Droid Incredible). So with Flash
    // Lite, we put it at (0, 0). This shows 1x1 box visible at left-top corner but this is
    // the best we can do as far as we know now.
    container.style.position = "absolute";
    if (WebSocket.__isFlashLite()) {
      container.style.left = "0px";
      container.style.top = "0px";
    } else {
      container.style.left = "-100px";
      container.style.top = "-100px";
    }
    var holder = document.createElement("div");
    holder.id = "webSocketFlash";
    container.appendChild(holder);
    document.body.appendChild(container);
    // See this article for hasPriority:
    // http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
    swfobject.embedSWF(
      WEB_SOCKET_SWF_LOCATION,
      "webSocketFlash",
      "1" /* width */,
      "1" /* height */,
      "10.0.0" /* SWF version */,
      null,
      null,
      {hasPriority: true, swliveconnect : true, allowScriptAccess: "always"},
      null,
      function(e) {
        if (!e.success) {
          console.error("[WebSocket] swfobject.embedSWF failed");
        }
      });
  };
  
  /**
   * Called by Flash to notify JS that it's fully loaded and ready
   * for communication.
   */
  WebSocket.__onFlashInitialized = function() {
    // We need to set a timeout here to avoid round-trip calls
    // to flash during the initialization process.
    setTimeout(function() {
      WebSocket.__flash = document.getElementById("webSocketFlash");
      WebSocket.__flash.setCallerUrl(location.href);
      WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
      for (var i = 0; i < WebSocket.__tasks.length; ++i) {
        WebSocket.__tasks[i]();
      }
      WebSocket.__tasks = [];
    }, 0);
  };
  
  /**
   * Called by Flash to notify WebSockets events are fired.
   */
  WebSocket.__onFlashEvent = function() {
    setTimeout(function() {
      try {
        // Gets events using receiveEvents() instead of getting it from event object
        // of Flash event. This is to make sure to keep message order.
        // It seems sometimes Flash events don't arrive in the same order as they are sent.
        var events = WebSocket.__flash.receiveEvents();
        for (var i = 0; i < events.length; ++i) {
          WebSocket.__instances[events[i].webSocketId].__handleEvent(events[i]);
        }
      } catch (e) {
        console.error(e);
      }
    }, 0);
    return true;
  };
  
  // Called by Flash.
  WebSocket.__log = function(message) {
    console.log(decodeURIComponent(message));
  };
  
  // Called by Flash.
  WebSocket.__error = function(message) {
    console.error(decodeURIComponent(message));
  };
  
  WebSocket.__addTask = function(task) {
    if (WebSocket.__flash) {
      task();
    } else {
      WebSocket.__tasks.push(task);
    }
  };
  
  /**
   * Test if the browser is running flash lite.
   * @return {boolean} True if flash lite is running, false otherwise.
   */
  WebSocket.__isFlashLite = function() {
    if (!window.navigator || !window.navigator.mimeTypes) {
      return false;
    }
    var mimeType = window.navigator.mimeTypes["application/x-shockwave-flash"];
    if (!mimeType || !mimeType.enabledPlugin || !mimeType.enabledPlugin.filename) {
      return false;
    }
    return mimeType.enabledPlugin.filename.match(/flashlite/i) ? true : false;
  };
  
  if (!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION) {
    if (window.addEventListener) {
      window.addEventListener("load", function(){
        WebSocket.__initialize();
      }, false);
    } else {
      window.attachEvent("onload", function(){
        WebSocket.__initialize();
      });
    }
  }
  
})();

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   *
   * @api public
   */
  
  exports.XHR = XHR;

  /**
   * XHR constructor
   *
   * @costructor
   * @api public
   */

  function XHR (socket) {
    if (!socket) return;

    io.Transport.apply(this, arguments);
    this.sendBuffer = [];
  };

  /**
   * Inherits from Transport.
   */

  io.util.inherit(XHR, io.Transport);

  /**
   * Establish a connection
   *
   * @returns {Transport}
   * @api public
   */

  XHR.prototype.open = function () {
    this.socket.setBuffer(false);
    this.onOpen();
    this.get();

    // we need to make sure the request succeeds since we have no indication
    // whether the request opened or not until it succeeded.
    this.setCloseTimeout();

    return this;
  };

  /**
   * Check if we need to send data to the Socket.IO server, if we have data in our
   * buffer we encode it and forward it to the `post` method.
   *
   * @api private
   */

  XHR.prototype.payload = function (payload) {
    var msgs = [];

    for (var i = 0, l = payload.length; i < l; i++) {
      msgs.push(io.parser.encodePacket(payload[i]));
    }

    this.send(io.parser.encodePayload(msgs));
  };

  /**
   * Send data to the Socket.IO server.
   *
   * @param data The message
   * @returns {Transport}
   * @api public
   */

  XHR.prototype.send = function (data) {
    this.post(data);
    return this;
  };

  /**
   * Posts a encoded message to the Socket.IO server.
   *
   * @param {String} data A encoded message.
   * @api private
   */

  function empty () { };

  XHR.prototype.post = function (data) {
    var self = this;
    this.socket.setBuffer(true);

    function stateChange () {
      if (this.readyState == 4) {
        this.onreadystatechange = empty;
        self.posting = false;

        if (this.status == 200){
          self.socket.setBuffer(false);
        } else {
          self.onClose();
        }
      }
    }

    function onload () {
      this.onload = empty;
      self.socket.setBuffer(false);
    };

    this.sendXHR = this.request('POST');

    if (window.XDomainRequest && this.sendXHR instanceof XDomainRequest) {
      this.sendXHR.onload = this.sendXHR.onerror = onload;
    } else {
      this.sendXHR.onreadystatechange = stateChange;
    }

    this.sendXHR.send(data);
  };

  /**
   * Disconnects the established `XHR` connection.
   *
   * @returns {Transport} 
   * @api public
   */

  XHR.prototype.close = function () {
    this.onClose();
    return this;
  };

  /**
   * Generates a configured XHR request
   *
   * @param {String} url The url that needs to be requested.
   * @param {String} method The method the request should use.
   * @returns {XMLHttpRequest}
   * @api private
   */

  XHR.prototype.request = function (method) {
    var req = io.util.request(this.socket.isXDomain());
    req.open(method || 'GET', this.prepareUrl() + '?t' + (+ new Date));

    if (method == 'POST') {
      try {
        if (req.setRequestHeader) {
          req.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        } else {
          // XDomainRequest
          req.contentType = 'text/plain';
        }
      } catch (e) {}
    }

    return req;
  };

  /**
   * Returns the scheme to use for the transport URLs.
   *
   * @api private
   */

  XHR.prototype.scheme = function () {
    return this.socket.options.secure ? 'https' : 'http';
  };

  /**
   * Check if the XHR transports are supported
   *
   * @param {Boolean} xdomain Check if we support cross domain requests.
   * @returns {Boolean}
   * @api public
   */

  XHR.check = function (socket, xdomain) {
    try {
      if (io.util.request(xdomain)) {
        return true;
      }
    } catch(e) {}

    return false;
  };
  
  /**
   * Check if the XHR transport supports corss domain requests.
   * 
   * @returns {Boolean}
   * @api public
   */

  XHR.xdomainCheck = function () {
    return XHR.check(null, true);
  };

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.htmlfile = HTMLFile;

  /**
   * The HTMLFile transport creates a `forever iframe` based transport
   * for Internet Explorer. Regular forever iframe implementations will 
   * continuously trigger the browsers buzy indicators. If the forever iframe
   * is created inside a `htmlfile` these indicators will not be trigged.
   *
   * @constructor
   * @extends {io.Transport.XHR}
   * @api public
   */

  function HTMLFile (socket) {
    io.Transport.XHR.apply(this, arguments);
  };

  /**
   * Inherits from XHR transport.
   */

  io.util.inherit(HTMLFile, io.Transport.XHR);

  /**
   * Transport name
   *
   * @api public
   */

  HTMLFile.prototype.name = 'htmlfile';

  /**
   * Creates a new ActiveX `htmlfile` with a forever loading iframe
   * that can be used to listen to messages. Inside the generated
   * `htmlfile` a reference will be made to the HTMLFile transport.
   *
   * @api private
   */

  HTMLFile.prototype.get = function () {
    this.doc = new ActiveXObject('htmlfile');
    this.doc.open();
    this.doc.write('<html></html>');
    this.doc.close();
    this.doc.parentWindow.s = this;

    var iframeC = this.doc.createElement('div');
    iframeC.className = 'socketio';

    this.doc.body.appendChild(iframeC);
    this.iframe = this.doc.createElement('iframe');

    iframeC.appendChild(this.iframe);

    this.iframe.src = this.prepareUrl() + '/?t=' + (+ new Date);

    var self = this;

    io.util.on(window, 'unload', function () {
      self.destroy();
    });
  };

  /**
   * The Socket.IO server will write script tags inside the forever
   * iframe, this function will be used as callback for the incoming
   * information.
   *
   * @param {String} data The message
   * @param {document} doc Reference to the context
   * @api private
   */

  HTMLFile.prototype._ = function (data, doc) {
    this.onData(data);
    try {
      var script = doc.getElementsByTagName('script')[0];
      script.parentNode.removeChild(script);
    } catch (e) { }
  };

  /**
   * Destroy the established connection, iframe and `htmlfile`.
   * And calls the `CollectGarbage` function of Internet Explorer
   * to release the memory.
   *
   * @api private
   */

  HTMLFile.prototype.destroy = function () {
    if (this.iframe){
      try {
        this.iframe.src = 'about:blank';
      } catch(e){}

      this.doc = null;
      this.iframe.parentNode.removeChild(this.iframe);
      this.iframe = null;

      CollectGarbage();
    }
  };

  /**
   * Disconnects the established connection.
   *
   * @returns {Transport} Chaining.
   * @api public
   */

  HTMLFile.prototype.close = function () {
    this.destroy();
    return io.Transport.XHR.prototype.close.call(this);
  };

  /**
   * Checks if the browser supports this transport. The browser
   * must have an `ActiveXObject` implementation.
   *
   * @return {Boolean}
   * @api public
   */

  HTMLFile.check = function () {
    if ('ActiveXObject' in window){
      try {
        var a = new ActiveXObject('htmlfile');
        return a && io.Transport.XHR.check();
      } catch(e){}
    }
    return false;
  };

  /**
   * Check if cross domain requests are supported.
   *
   * @returns {Boolean}
   * @api public
   */

  HTMLFile.xdomainCheck = function () {
    // we can probably do handling for sub-domains, we should
    // test that it's cross domain but a subdomain here
    return false;
  };

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('htmlfile');

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports['xhr-polling'] = XHRPolling;

  /**
   * The XHR-polling transport uses long polling XHR requests to create a
   * "persistent" connection with the server.
   *
   * @constructor
   * @api public
   */

  function XHRPolling () {
    io.Transport.XHR.apply(this, arguments);
  };

  /**
   * Inherits from XHR transport.
   */

  io.util.inherit(XHRPolling, io.Transport.XHR);

  /**
   * Transport name
   *
   * @api public
   */

  XHRPolling.prototype.name = 'xhr-polling';

  /** 
   * Establish a connection, for iPhone and Android this will be done once the page
   * is loaded.
   *
   * @returns {Transport} Chaining.
   * @api public
   */

  XHRPolling.prototype.open = function () {
    var self = this;

    io.util.defer(function () {
      io.Transport.XHR.prototype.open.call(self);
    });

    return false;
  };

  /**
   * Starts a XHR request to wait for incoming messages.
   *
   * @api private
   */

  function empty () {};

  XHRPolling.prototype.get = function () {
    if (!this.open) return;

    var self = this;

    function stateChange () {
      if (this.readyState == 4) {
        this.onreadystatechange = empty;

        if (this.status == 200) {
          self.onData(this.responseText);
          self.get();
        } else {
          self.onClose();
        }
      }
    };

    function onload () {
      this.onload = empty;
      self.onData(this.responseText);
      self.get();
    };

    this.xhr = this.request();

    if (window.XDomainRequest && this.xhr instanceof XDomainRequest) {
      this.xhr.onload = this.xhr.onerror = onload;
    } else {
      this.xhr.onreadystatechange = stateChange;
    }

    this.xhr.send(null);
  };

  /**
   * Handle the unclean close behavior.
   *
   * @api private
   */

  XHRPolling.prototype.onClose = function () {
    io.Transport.XHR.prototype.onClose.call(this);

    if (this.xhr) {
      this.xhr.onreadystatechange = this.xhr.onload = empty;
      try {
        this.xhr.abort();
      } catch(e){}
      this.xhr = null;
    }
  };

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('xhr-polling');

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports['jsonp-polling'] = JSONPPolling;

  /**
   * The JSONP transport creates an persistent connection by dynamically
   * inserting a script tag in the page. This script tag will receive the
   * information of the Socket.IO server. When new information is received
   * it creates a new script tag for the new data stream.
   *
   * @constructor
   * @extends {io.Transport.xhr-polling}
   * @api public
   */

  function JSONPPolling (socket) {
    io.Transport['xhr-polling'].apply(this, arguments);

    this.index = io.j.length;

    var self = this;

    io.j.push(function (msg) {
      self._(msg);
    });
  };

  /**
   * Inherits from XHR polling transport.
   */

  io.util.inherit(JSONPPolling, io.Transport['xhr-polling']);

  /**
   * Transport name
   *
   * @api public
   */

  JSONPPolling.prototype.name = 'jsonp-polling';

  /**
   * Posts a encoded message to the Socket.IO server using an iframe.
   * The iframe is used because script tags can create POST based requests.
   * The iframe is positioned outside of the view so the user does not
   * notice it's existence.
   *
   * @param {String} data A encoded message.
   * @api private
   */

  JSONPPolling.prototype.post = function (data) {
    var self = this;

    if (!this.form) {
      var form = document.createElement('FORM')
        , area = document.createElement('TEXTAREA')
        , id = this.iframeId = 'socketio_iframe_' + this.index
        , iframe;

      form.className = 'socketio';
      form.style.position = 'absolute';
      form.style.top = '-1000px';
      form.style.left = '-1000px';
      form.target = id;
      form.method = 'POST';
      area.name = 'd';
      form.appendChild(area);
      document.body.appendChild(form);

      this.form = form;
      this.area = area;
    }

    this.form.action = this.prepareUrl() + '?t=' + (+new Date) + '&i=' + this.index;

    function complete () {
      initIframe();
      self.socket.setBuffer(false);
    };

    function initIframe () {
      if (self.iframe) {
        self.form.removeChild(self.iframe);
      }

      try {
        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
        iframe = document.createElement('<iframe name="'+ self.iframeId +'">');
      } catch (e) {
        iframe = document.createElement('iframe');
        iframe.name = self.iframeId;
      }

      iframe.id = self.iframeId;

      self.form.appendChild(iframe);
      self.iframe = iframe;
    };

    initIframe();

    this.area.value = data;

    try {
      this.form.submit();
    } catch(e) {}

    if (this.iframe.attachEvent) {
      iframe.onreadystatechange = function () {
        if (self.iframe.readyState == 'complete') {
          complete();
        }
      };
    } else {
      this.iframe.onload = complete;
    }
  };
  
  /**
   * Creates a new JSONP poll that can be used to listen
   * for messages from the Socket.IO server.
   *
   * @api private
   */

  JSONPPolling.prototype.get = function () {
    var self = this
      , script = document.createElement('SCRIPT');

    if (this.script) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    script.async = true;
    script.src = this.prepareUrl() + '/?t=' + (+new Date) + '&i=' + this.index;
    script.onerror = function () {
      self.onClose();
    };

    var insertAt = document.getElementsByTagName('script')[0]
    insertAt.parentNode.insertBefore(script, insertAt);
    this.script = script;
  };

  /**
   * Callback function for the incoming message stream from the Socket.IO server.
   *
   * @param {String} data The message
   * @api private
   */

  JSONPPolling.prototype._ = function (msg) {
    this.onData(msg);
    if (this.open) {
      this.get();
    }
    return this;
  };

  /**
   * Checks if browser supports this transport.
   *
   * @return {Boolean}
   * @api public
   */

  JSONPPolling.check = function () {
    return true;
  };

  /**
   * Check if cross domain requests are supported
   *
   * @returns {Boolean}
   * @api public
   */

  JSONPPolling.xdomainCheck = function () {
    return true;
  };

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('jsonp-polling');

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/** ../_core/scripts/underscore.js **/
//     Underscore.js 1.1.6
//     (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **CommonJS**, with backwards-compatibility
  // for the old `require()` API. If we're not in CommonJS, add `_` to the
  // global object.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = _;
    _._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.1.6';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects implementing `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (_.isNumber(obj.length)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = memo !== void 0;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial && index === 0) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError("Reduce of empty array with no initial value");
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return memo !== void 0 ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = (_.isArray(obj) ? obj.slice() : _.toArray(obj)).reverse();
    return _.reduce(reversed, iterator, memo, context);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result = iterator.call(context, value, index, list)) return breaker;
    });
    return result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    any(obj, function(value) {
      if (found = value === target) return true;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (method.call ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.max.apply(Math, obj);
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.min.apply(Math, obj);
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(iterable) {
    if (!iterable)                return [];
    if (iterable.toArray)         return iterable.toArray();
    if (_.isArray(iterable))      return iterable;
    if (_.isArguments(iterable))  return slice.call(iterable);
    return _.values(iterable);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.toArray(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head`. The **guard** check allows it to work
  // with `_.map`.
  _.first = _.head = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Get the last element of an array.
  _.last = function(array) {
    return array[array.length - 1];
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(_.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    var values = slice.call(arguments, 1);
    return _.filter(array, function(value){ return !_.include(values, value); });
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted) {
    return _.reduce(array, function(memo, el, i) {
      if (0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) memo[memo.length] = el;
      return memo;
    }, []);
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (array[i] === item) return i;
    return -1;
  };


  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function(func, obj) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(obj, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return hasOwnProperty.call(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(func, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Internal function used to implement `_.throttle` and `_.debounce`.
  var limit = function(func, wait, debounce) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var throttler = function() {
        timeout = null;
        func.apply(context, args);
      };
      if (debounce) clearTimeout(timeout);
      if (debounce || !timeout) timeout = setTimeout(throttler, wait);
    };
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    return limit(func, wait, false);
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds.
  _.debounce = function(func, wait) {
    return limit(func, wait, true);
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = slice.call(arguments);
    return function() {
      var args = slice.call(arguments);
      for (var i=funcs.length-1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };


  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (hasOwnProperty.call(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    return _.filter(_.keys(obj), function(key){ return _.isFunction(obj[key]); }).sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (source[prop] !== void 0) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    // Check object identity.
    if (a === b) return true;
    // Different types?
    var atype = typeof(a), btype = typeof(b);
    if (atype != btype) return false;
    // Basic equality test (watch out for coercions).
    if (a == b) return true;
    // One is falsy and the other truthy.
    if ((!a && b) || (a && !b)) return false;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // One of them implements an isEqual()?
    if (a.isEqual) return a.isEqual(b);
    // Check dates' integer values.
    if (_.isDate(a) && _.isDate(b)) return a.getTime() === b.getTime();
    // Both are NaN?
    if (_.isNaN(a) && _.isNaN(b)) return false;
    // Compare regular expressions.
    if (_.isRegExp(a) && _.isRegExp(b))
      return a.source     === b.source &&
             a.global     === b.global &&
             a.ignoreCase === b.ignoreCase &&
             a.multiline  === b.multiline;
    // If a is not an object by this point, we can't handle it.
    if (atype !== 'object') return false;
    // Check for different array lengths before comparing contents.
    if (a.length && (a.length !== b.length)) return false;
    // Nothing else worked, deep compare the contents.
    var aKeys = _.keys(a), bKeys = _.keys(b);
    // Different object sizes?
    if (aKeys.length != bKeys.length) return false;
    // Recursive comparison of contents.
    for (var key in a) if (!(key in b) || !_.isEqual(a[key], b[key])) return false;
    return true;
  };

  // Is a given array or object empty?
  _.isEmpty = function(obj) {
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (hasOwnProperty.call(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return !!(obj && hasOwnProperty.call(obj, 'callee'));
  };

  // Is a given value a function?
  _.isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
  };

  // Is the given value `NaN`? `NaN` happens to be the only value in JavaScript
  // that does not equal itself.
  _.isNaN = function(obj) {
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false;
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(str, data) {
    var c  = _.templateSettings;
    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.interpolate, function(match, code) {
           return "'," + code.replace(/\\'/g, "'") + ",'";
         })
         .replace(c.evaluate || null, function(match, code) {
           return "');" + code.replace(/\\'/g, "'")
                              .replace(/[\r\n\t]/g, ' ') + "__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";
    var func = new Function('obj', tmpl);
    return data ? func(data) : func;
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      method.apply(this._wrapped, arguments);
      return result(this._wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

})();

/** ../_core/scripts/underscore.date.js **/
// Underscore.date
//
// (c) 2011 Tim Wood
// Underscore.date is freely distributable under the terms of the MIT license.
//
// Version 0.5.0

(function (undefined) {

    var _date;

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    }
    
    // helper function for _.addTime and _.subtractTime
    function dateAddRemove(date, input, adding) {
        var ms = (input.ms || 0) +
            (input.s  || 0) * 1e3 + // 1000
            (input.m  || 0) * 6e4 + // 1000 * 60
            (input.h  || 0) * 36e5 + // 1000 * 60 * 60
            (input.d  || 0) * 864e5 + // 1000 * 60 * 60 * 24
            (input.w  || 0) * 6048e5, // 1000 * 60 * 60 * 24 * 7
            M = (input.M || 0) + 
            (input.y || 0) * 12,
            currentDate;
        if (ms) {
            date.setMilliseconds(date.getMilliseconds() + ms * adding);
        }
        if (M) {
            currentDate = date.getDate();
            date.setDate(1);
            date.setMonth(date.getMonth() + M * adding);
            date.setDate(Math.min(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(), currentDate)); 
        }
        return date;
    }
    
    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }
    
    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromArray(input) {
        return new Date(input[0], input[1] || 0, input[2] || 1, input[3] || 0, input[4] || 0, input[5] || 0, input[6] || 0);
    }
    
    // date from string and format string
    function makeDateFromStringAndFormat(string, format) {
        var inArray = [0],
            charactersToPutInArray = /[0-9a-zA-Z]+/g,
            inputParts = [],
            formatParts = [],
            i,
            isPm;
        
        // function to convert string input to date
        function addTime(format, input) {
            switch (format) {
            // MONTH
            case 'M' :
                // fall through to MM
            case 'MM' :
                inArray[1] = ~~input - 1;
                break;
            // DAY OF MONTH
            case 'D' : 
                // fall through to DDDD
            case 'DD' : 
                // fall through to DDDD
            case 'DDD' :
                // fall through to DDDD
            case 'DDDD' :
                inArray[2] = ~~input;
                break;
            // YEAR
            case 'YY' : 
                input = ~~input;
                inArray[0] = input + (input > 70 ? 1900 : 2000);
                break;
            case 'YYYY' : 
                inArray[0] = ~~input;
                break;
            // AM / PM
            case 'a' : 
                // fall through to A
            case 'A' :
                isPm = (input.toLowerCase() === 'pm');
                break;
            // 24 HOUR 
            case 'H' : 
                // fall through to hh
            case 'HH' : 
                // fall through to hh
            case 'h' : 
                // fall through to hh
            case 'hh' : 
                inArray[3] = ~~input;
                break;
            // MINUTE
            case 'm' : 
                // fall through to mm
            case 'mm' : 
                inArray[4] = ~~input;
                break;
            // SECOND
            case 's' : 
                // fall through to ss
            case 'ss' : 
                inArray[5] = ~~input;
                break;
            }
        }
        
        // add input parts to array
        string.replace(charactersToPutInArray, function (input) {
            inputParts.push(input);
        });
        
        // add format parts to array
        format.replace(charactersToPutInArray, function (input) {
            formatParts.push(input);
        });
        
        for (i = 0; i < formatParts.length; i++) {
            addTime(formatParts[i], inputParts[i]);
        }
        
        // handle am pm
        if (isPm && inArray[3] < 12) {
            inArray[3] += 12;
        }
        
        return dateFromArray(inArray);
    }
    
    // UnderscoreDate prototype object
    function UnderscoreDate(input, format) {
        if (input && input.date instanceof Date) {
            this.date = input.date;
        } else if (format) {
            this.date = makeDateFromStringAndFormat(input, format);
        } else {
            this.date = input === undefined ? new Date() :
                input instanceof Date ? input : 
                isArray(input) ? dateFromArray(input) :
                new Date(input);
        }
    }
    
    _date = function (input, format) {
        return new UnderscoreDate(input, format);
    };
    
    
    _date.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    _date.monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    _date.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    _date.weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    _date.relativeTime = {
        future: "in %s",
        past: "%s ago",
        s: "seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    };
    _date.ordinal = function (number) {
        var b = number % 10;
        return (~~ (number % 100 / 10) === 1) ? 'th' : 
            (b === 1) ? 'st' : 
            (b === 2) ? 'nd' : 
            (b === 3) ? 'rd' : 'th';
    };
    
    // convert any input to milliseconds
    function makeInputMilliseconds(input) {
        return isNaN(input) ? new UnderscoreDate(input).date.getTime() : input;
    }
    
    // helper function for _date.from() and _date.fromNow()
    function substituteTimeAgo(string, number) {
        return _date.relativeTime[string].replace(/%d/i, number || 1);
    }
    
    function msApart(time, now) {
        return makeInputMilliseconds(time) - makeInputMilliseconds(now);
    }
    
    function relativeTime(milliseconds) {
        var seconds = Math.abs(milliseconds) / 1000,
            minutes = seconds / 60,
            hours = minutes / 60,
            days = hours / 24,
            years = days / 365;
        return seconds < 45 && substituteTimeAgo('s', ~~ seconds) ||
            seconds < 90 && substituteTimeAgo('m') ||
            minutes < 45 && substituteTimeAgo('mm', ~~ minutes) ||
            minutes < 90 && substituteTimeAgo('h') ||
            hours < 24 && substituteTimeAgo('hh', ~~ hours) ||
            hours < 48 && substituteTimeAgo('d') ||
            days < 25 && substituteTimeAgo('dd', ~~ days) ||
            days < 45 && substituteTimeAgo('M') ||
            days < 350 && substituteTimeAgo('MM', ~~ ((days + 15) / 30)) ||
            years < 2 && substituteTimeAgo('y') ||
            substituteTimeAgo('yy', ~~ years);
    }
    
    UnderscoreDate.prototype = {
        
        valueOf : function () {
            return this.date.getTime();
        },
        
        format : function (inputString) {
            // shortcuts to this and getting time functions
            // done to save bytes in minification
            var date = this.date,
                currentMonth = date.getMonth(),
                currentDate = date.getDate(),
                currentYear = date.getFullYear(),
                currentDay = date.getDay(),
                currentHours = date.getHours(),
                currentMinutes = date.getMinutes(),
                currentSeconds = date.getSeconds(),
                currentString = date.toString(),
                charactersToReplace = /(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|dddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|zz?)/g,
                nonuppercaseLetters = /[^A-Z]/g;
            // check if the character is a format
            // return formatted string or non string.
            //
            // uses switch/case instead of an object of named functions (like http://phpjs.org/functions/date:380) 
            // for minification and performance
            // see http://jsperf.com/object-of-functions-vs-switch for performance comparison
            function replaceFunction(input) {
                // create a couple variables to be used later inside one of the cases.
                var a, b;
                switch (input) {
                    // MONTH
                case 'M' : 
                    return currentMonth + 1;
                case 'Mo' : 
                    return (currentMonth + 1) + _date.ordinal(currentMonth + 1);
                case 'MM' :
                    return leftZeroFill(currentMonth + 1, 2);
                case 'MMM' : 
                    return _date.monthsShort[currentMonth];
                case 'MMMM' : 
                    return _date.months[currentMonth];
                // DAY OF MONTH
                case 'D' : 
                    return currentDate;
                case 'Do' : 
                    return currentDate + _date.ordinal(currentDate);
                case 'DD' : 
                    return leftZeroFill(currentDate, 2);
                // DAY OF YEAR
                case 'DDD' :
                    a = new Date(currentYear, currentMonth, currentDate);
                    b = new Date(currentYear, 0, 1);
                    return ~~ (((a - b) / 864e5) + 1.5);
                case 'DDDo' : 
                    a = replaceFunction('DDD');
                    return a + _date.ordinal(a);
                case 'DDDD' :
                    return leftZeroFill(replaceFunction('DDD'), 3);
                // WEEKDAY
                case 'd' :
                    return currentDay;
                case 'do' : 
                    return currentDay + _date.ordinal(currentDay);
                case 'ddd' : 
                    return _date.weekdaysShort[currentDay];
                case 'dddd' : 
                    return _date.weekdays[currentDay];
                // WEEK OF YEAR
                case 'w' : 
                    a = new Date(currentYear, currentMonth, currentDate - currentDay + 5);
                    b = new Date(a.getFullYear(), 0, 4);
                    return ~~ ((a - b) / 864e5 / 7 + 1.5);
                case 'wo' : 
                    a = replaceFunction('w');
                    return a + _date.ordinal(a);
                case 'ww' : 
                    return leftZeroFill(replaceFunction('w'), 2);
                // YEAR
                case 'YY' : 
                    return (currentYear + '').slice(-2);
                case 'YYYY' : 
                    return currentYear;
                // AM / PM
                case 'a' : 
                    return currentHours > 11 ? 'pm' : 'am';
                case 'A' :
                    return currentHours > 11 ? 'PM' : 'AM';
                // 24 HOUR 
                case 'H' : 
                    return currentHours;
                case 'HH' : 
                    return leftZeroFill(currentHours, 2);
                // 12 HOUR 
                case 'h' : 
                    return currentHours % 12 || 12;
                case 'hh' : 
                    return leftZeroFill(currentHours % 12 || 12, 2);
                // MINUTE
                case 'm' : 
                    return currentMinutes;
                case 'mm' : 
                    return leftZeroFill(currentMinutes, 2);
                // SECOND
                case 's' : 
                    return currentSeconds;
                case 'ss' : 
                    return leftZeroFill(currentSeconds, 2);
                // TIMEZONE
                case 'z' :
                    return replaceFunction('zz').replace(nonuppercaseLetters, '');
                case 'zz' : 
                    a = currentString.indexOf('(');
                    if (a > -1) {
                        return currentString.slice(a + 1, currentString.indexOf(')'));
                    }
                    return currentString.slice(currentString.indexOf(':')).replace(nonuppercaseLetters, '');
                // DEFAULT
                default :
                    return input.replace("\\", "");
                }
            }
            return inputString.replace(charactersToReplace, replaceFunction);
        },
        
        
        add : function (input) {
            this.date = dateAddRemove(this.date, input, 1);
            return this;
        },
        
        
        subtract : function (input) {
            this.date = dateAddRemove(this.date, input, -1);
            return this;
        },
        
        
        from : function (time, withoutSuffix, asMilliseconds) {
            var difference = msApart(this.date, time),
                string = difference < 0 ? _date.relativeTime.past : _date.relativeTime.future;
            return asMilliseconds ? difference : 
                withoutSuffix ? relativeTime(difference) :
                string.replace(/%s/i, relativeTime(difference));
        },
        
        
        fromNow : function (withoutSuffix, asMilliseconds) {
            return this.from(new UnderscoreDate(), withoutSuffix, asMilliseconds);
        },
        
        
        isLeapYear : function () {
            var year = this.date.getFullYear();
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        }
    };
    
    // CommonJS module is defined
    if (window === undefined && module !== undefined) {
        // Export module
        module.exports = _date;
    // Integrate with Underscore.js
    } else {
        if (this._ !== undefined && this._.mixin !== undefined) {
            this._.mixin({date : _date});
        }
        this._date = _date;
    }
    
}());

/** ../_core/scripts/underscore.string.js **/
// Underscore.string
// (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
// Underscore.strings is freely distributable under the terms of the MIT license.
// Documentation: https://github.com/edtsech/underscore.string
// Some code is borrowed from MooTools and Alexandru Marasteanu.

// Version 1.1.5

(function(){
    // ------------------------- Baseline setup ---------------------------------

    // Establish the root object, "window" in the browser, or "global" on the server.
    var root = this;

    var nativeTrim = String.prototype.trim;

    var parseNumber = function(source) { return source * 1 || 0; };

    function str_repeat(i, m) {
        for (var o = []; m > 0; o[--m] = i);
        return o.join('');
    }

    function defaultToWhiteSpace(characters){
        if (characters) {
            return _s.escapeRegExp(characters);
        }
        return '\\s';
    }

    var _s = {

        isBlank: function(str){
            return !!str.match(/^\s*$/);
        },

        capitalize : function(str) {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        },

        chop: function(str, step){
            step = step || str.length;
            var arr = [];
            for (var i = 0; i < str.length;) {
                arr.push(str.slice(i,i + step));
                i = i + step;
            }
            return arr;
        },

        clean: function(str){
            return _s.strip(str.replace(/\s+/g, ' '));
        },

        count: function(str, substr){
            var count = 0, index;
            for (var i=0; i < str.length;) {
                index = str.indexOf(substr, i);
                index >= 0 && count++;
                i = i + (index >= 0 ? index : 0) + substr.length;
            }
            return count;
        },

        chars: function(str) {
            return str.split('');
        },

        escapeHTML: function(str) {
            return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
                                  .replace(/"/g, '&quot;').replace(/'/g, "&apos;");
        },

        unescapeHTML: function(str) {
            return String(str||'').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                                  .replace(/&quot;/g, '"').replace(/&apos;/g, "'");
        },

        escapeRegExp: function(str){
            // From MooTools core 1.2.4
            return String(str||'').replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
        },

        insert: function(str, i, substr){
            var arr = str.split('');
            arr.splice(i, 0, substr);
            return arr.join('');
        },

        includes: function(str, needle){
            return str.indexOf(needle) !== -1;
        },

        join: function(sep) {
            // TODO: Could this be faster by converting
            // arguments to Array and using array.join(sep)?
            sep = String(sep);
            var str = "";
            for (var i=1; i < arguments.length; i += 1) {
                str += String(arguments[i]);
                if ( i !== arguments.length-1 ) {
                    str += sep;
                }
            }
            return str;
        },

        lines: function(str) {
            return str.split("\n");
        },

//        reverse: function(str){
//            return Array.prototype.reverse.apply(str.split('')).join('');
//        },

        splice: function(str, i, howmany, substr){
            var arr = str.split('');
            arr.splice(i, howmany, substr);
            return arr.join('');
        },

        startsWith: function(str, starts){
            return str.length >= starts.length && str.substring(0, starts.length) === starts;
        },

        endsWith: function(str, ends){
            return str.length >= ends.length && str.substring(str.length - ends.length) === ends;
        },

        succ: function(str){
            var arr = str.split('');
            arr.splice(str.length-1, 1, String.fromCharCode(str.charCodeAt(str.length-1) + 1));
            return arr.join('');
        },

        titleize: function(str){
            var arr = str.split(' '),
                word;
            for (var i=0; i < arr.length; i++) {
                word = arr[i].split('');
                if(typeof word[0] !== 'undefined') word[0] = word[0].toUpperCase();
                i+1 === arr.length ? arr[i] = word.join('') : arr[i] = word.join('') + ' ';
            }
            return arr.join('');
        },

        camelize: function(str){
          return _s.trim(str).replace(/(\-|_|\s)+(.)?/g, function(match, separator, chr) {
            return chr ? chr.toUpperCase() : '';
          });
        },

        underscored: function(str){
          return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/\-|\s+/g, '_').toLowerCase();
        },

        dasherize: function(str){
          return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1-$2').replace(/^([A-Z]+)/, '-$1').replace(/\_|\s+/g, '-').toLowerCase();
        },

        trim: function(str, characters){
            if (!characters && nativeTrim) {
                return nativeTrim.call(str);
            }
            characters = defaultToWhiteSpace(characters);
            return str.replace(new RegExp('\^[' + characters + ']+|[' + characters + ']+$', 'g'), '');
        },

        ltrim: function(str, characters){
            characters = defaultToWhiteSpace(characters);
            return str.replace(new RegExp('\^[' + characters + ']+', 'g'), '');
        },

        rtrim: function(str, characters){
            characters = defaultToWhiteSpace(characters);
            return str.replace(new RegExp('[' + characters + ']+$', 'g'), '');
        },

        truncate: function(str, length, truncateStr){
            truncateStr = truncateStr || '...';
            return str.slice(0,length) + truncateStr;
        },

        words: function(str, delimiter) {
            delimiter = delimiter || " ";
            return str.split(delimiter);
        },


        pad: function(str, length, padStr, type) {

            var padding = '';
            var padlen  = 0;

            if (!padStr) { padStr = ' '; }
            else if (padStr.length > 1) { padStr = padStr[0]; }
            switch(type) {
                case "right":
                    padlen = (length - str.length);
                    padding = str_repeat(padStr, padlen);
                    str = str+padding;
                    break;
                case "both":
                    padlen = (length - str.length);
                    padding = {
                        'left' : str_repeat(padStr, Math.ceil(padlen/2)),
                        'right': str_repeat(padStr, Math.floor(padlen/2))
                    };
                    str = padding.left+str+padding.right;
                    break;
                default: // "left"
                    padlen = (length - str.length);
                    padding = str_repeat(padStr, padlen);;
                    str = padding+str;
            }
            return str;
        },

        lpad: function(str, length, padStr) {
            return _s.pad(str, length, padStr);
        },

        rpad: function(str, length, padStr) {
            return _s.pad(str, length, padStr, 'right');
        },

        lrpad: function(str, length, padStr) {
            return _s.pad(str, length, padStr, 'both');
        },


        /**
         * Credits for this function goes to
         * http://www.diveintojavascript.com/projects/sprintf-for-javascript
         *
         * Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
         * All rights reserved.
         * */
        sprintf: function(){

            var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
            while (f) {
                if (m = /^[^\x25]+/.exec(f)) {
                    o.push(m[0]);
                }
                else if (m = /^\x25{2}/.exec(f)) {
                    o.push('%');
                }
                else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
                    if (((a = arguments[m[1] || i++]) == null) || (a == undefined)) {
                        throw('Too few arguments.');
                    }
                    if (/[^s]/.test(m[7]) && (typeof(a) != 'number')) {
                        throw('Expecting number but found ' + typeof(a));
                    }
                    switch (m[7]) {
                        case 'b': a = a.toString(2); break;
                        case 'c': a = String.fromCharCode(a); break;
                        case 'd': a = parseInt(a); break;
                        case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
                        case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break;
                        case 'o': a = a.toString(8); break;
                        case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break;
                        case 'u': a = Math.abs(a); break;
                        case 'x': a = a.toString(16); break;
                        case 'X': a = a.toString(16).toUpperCase(); break;
                    }
                    a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+'+ a : a);
                    c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
                    x = m[5] - String(a).length - s.length;
                    p = m[5] ? str_repeat(c, x) : '';
                    o.push(s + (m[4] ? a + p : p + a));
                }
                else {
                    throw('Huh ?!');
                }
                f = f.substring(m[0].length);
            }
            return o.join('');
        },

        toNumber: function(str, decimals) {
           return parseNumber(parseNumber(str).toFixed(parseNumber(decimals)));
         },

         strRight: function(sourceStr, sep){
           var pos =  (!sep) ? -1 : sourceStr.indexOf(sep);
           return (pos != -1) ? sourceStr.slice(pos+sep.length, sourceStr.length) : sourceStr;
         },

         strRightBack: function(sourceStr, sep){
           var pos =  (!sep) ? -1 : sourceStr.lastIndexOf(sep);
           return (pos != -1) ? sourceStr.slice(pos+sep.length, sourceStr.length) : sourceStr;
         },

         strLeft: function(sourceStr, sep){
           var pos = (!sep) ? -1 : sourceStr.indexOf(sep);
           return (pos != -1) ? sourceStr.slice(0, pos) : sourceStr;
         },

         strLeftBack: function(sourceStr, sep){
           var pos = sourceStr.lastIndexOf(sep);
           return (pos != -1) ? sourceStr.slice(0, pos) : sourceStr;
         }

    };

    // Aliases

    _s.strip  = _s.trim;
    _s.lstrip = _s.ltrim;
    _s.rstrip = _s.rtrim;
    _s.center = _s.lrpad;
    _s.ljust  = _s.lpad;
    _s.rjust  = _s.rpad;

    // CommonJS module is defined
    if (typeof window === 'undefined' && typeof module !== 'undefined') {
        // Export module
        module.exports = _s;

    // Integrate with Underscore.js
    } else if (typeof root._ !== 'undefined') {
        root._.mixin(_s);

    // Or define it
    } else {
        root._ = _s;
    }

}());

/** server/pub/_scripts/Client.js **/
(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.Client = (function() {
    function Client() {
      this.syncControls = __bind(this.syncControls, this);
      this.onWindowResize = __bind(this.onWindowResize, this);
      this.init = __bind(this.init, this);
      this.doPageFixups = __bind(this.doPageFixups, this);      var cookie;
      this.sleepy = false;
      this.allControls = {};
      this.controlClings = {};
      this.lastFixup = 0;
      this.pageWindow = $(window);
      this.pageBody = $('#smio_body');
      cookie = $.cookie('smoo');
      this.pageUrl = $.url();
      try {
        this.smioCookie = JSON.parse(cookie);
      } catch (err) {
        this.smioCookie = null;
      }
      if (!this.smioCookie) {
        this.smioCookie = {};
      }
      this.sessionID = this.smioCookie['sessid'];
      this.disp = new smio.Dispatcher(this, false);
      this.pageWindow.resize(_.debounce((__bind(function() {
        return this.onWindowResize();
      }, this)), 300));
      this.recalcing = false;
    }
    Client.prototype.doPageFixups = function() {
      var clingee, clinger, clingerID, gpos, gw, spos, sw, tpos, _ref;
      if ((!this.recalcing) && ((!this.sleepy) || ((new Date().getTime() - this.lastFixup) >= 5000))) {
        this.recalcing = true;
        $('.smio-dt').each(__bind(function(i, span) {
          var $span, dt;
          $span = $(span);
          if ((dt = smio.Util.Number.tryParse($span.attr('data-dt'), 0))) {
            return $span.text(_date(dt).fromNow());
          }
        }, this));
        _ref = this.controlClings;
        for (clingerID in _ref) {
          clingee = _ref[clingerID];
          clinger = this.allControls[clingerID];
          if (clinger && clingee && clinger.el && clingee.el && (tpos = clingee.el.offset()) && (spos = clinger.el.offset())) {
            gpos = {
              top: tpos.top + clingee.el.outerHeight() - 6,
              left: tpos.left
            };
            gw = clingee.el.outerWidth() + 40;
            sw = clinger.el.outerWidth();
            if ((gpos.left !== spos.left) || (gpos.top !== spos.top) || (gw !== sw)) {
              clinger.el.css({
                top: gpos.top,
                left: gpos.left,
                width: gw + 'px'
              });
            }
            smio.Control.setClingerOpacity(clinger, clingee);
          }
        }
        this.lastFixup = new Date().getTime();
        return this.recalcing = false;
      }
    };
    Client.prototype.init = function() {
      var k, tl;
      for (k in _date.relativeTime) {
        if ((tl = smio.resources.client["natlangtime_" + k])) {
          _date.relativeTime[k] = tl;
        }
      }
      $.ajaxSetup({
        timeout: 3000
      });
      $('#smio_offline_msg').text(smio.resources.client.connecting);
      this.disp.connect();
      return setInterval(this.doPageFixups, 750);
    };
    Client.prototype.onWindowResize = function() {
      var ctl, h, id, w, _ref, _ref2, _results;
      _ref = [this.pageWindow.width(), this.pageWindow.height()], w = _ref[0], h = _ref[1];
      _ref2 = this.allControls;
      _results = [];
      for (id in _ref2) {
        ctl = _ref2[id];
        _results.push(ctl.onWindowResize(w, h));
      }
      return _results;
    };
    Client.prototype.syncControls = function(controlDescs) {
      var ctl, ctlDesc, id, _results;
      if ((ctlDesc = controlDescs[''])) {
        if ((ctl = this.allControls[''])) {
          ctl.syncUpdate(ctlDesc);
        } else {
          this.allControls[''] = ctl = new smio['Packs_' + ctlDesc._](this, null, smio.Util.Object.mergeDefaults(ctlDesc, {
            id: 'sm'
          }));
          ctl.init();
          ctl.renderHtml($('#smio_main'));
          ctl.onLoad();
        }
      }
      _results = [];
      for (id in controlDescs) {
        ctlDesc = controlDescs[id];
        _results.push(id && (ctl = this.allControls[id]) ? ctl.syncUpdate(ctlDesc) : void 0);
      }
      return _results;
    };
    return Client;
  })();
}).call(this);

/** server/pub/_scripts/Dispatcher.js **/
(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = global.smoothio;
  smio.Dispatcher = (function() {
    function Dispatcher(client, isSocketIO, host) {
      this.client = client;
      this.setTimer = __bind(this.setTimer, this);
      this.send = __bind(this.send, this);
      this.onSocketReconnecting = __bind(this.onSocketReconnecting, this);
      this.onSocketReconnectFailed = __bind(this.onSocketReconnectFailed, this);
      this.onSocketReconnect = __bind(this.onSocketReconnect, this);
      this.onSocketDisconnect = __bind(this.onSocketDisconnect, this);
      this.onSocketConnecting = __bind(this.onSocketConnecting, this);
      this.onSocketConnectFailed = __bind(this.onSocketConnectFailed, this);
      this.onSocketConnect = __bind(this.onSocketConnect, this);
      this.onSocketClose = __bind(this.onSocketClose, this);
      this.onSleepy = __bind(this.onSleepy, this);
      this.onMessage = __bind(this.onMessage, this);
      this.onOnline = __bind(this.onOnline, this);
      this.onOffline = __bind(this.onOffline, this);
      this.onError = __bind(this.onError, this);
      this.messageFetch = __bind(this.messageFetch, this);
      this.message = __bind(this.message, this);
      this.connect = __bind(this.connect, this);
      this.ready = false;
      this.offline = 1;
      this.initialFetchDone = false;
      this.lastFetchTime = 0;
      if (isSocketIO) {
        this.socket = host || true;
      } else {
        this.poll = {
          interval: {
            val: 0,
            handle: null,
            sleepyFactor: 4
          },
          send: __bind(function(freq) {
            return $.post("/_/poll/?t=" + (smio.Util.DateTime.ticks()), JSON.stringify(freq.msg), (__bind(function(m, t, x) {
              return this.onMessage(m, t, x);
            }, this)), 'text').error(__bind(function(x, t, e) {
              return this.onError(x, t, e, freq);
            }, this));
          }, this)
        };
      }
    }
    Dispatcher.prototype.connect = function() {
      this.ready = true;
      $('#smio_offline').attr('title', smio.resources.client.connecting_hint);
      if (this.socket) {
        this.socket = io.connect((_.isString(this.socket) ? this.socket : void 0), {
          transports: ['websocket'],
          'try multiple transports': false,
          reconnect: true,
          'connect timeout': 5000,
          'reconnection delay': 5000,
          'max reconnection attempts': smio.Util.Number.max(),
          rememberTransport: false,
          'remember transport': false
        });
        this.socket.on('connect', __bind(function() {
          return this.onSocketConnect();
        }, this));
        this.socket.on('connect_failed', __bind(function() {
          return this.onSocketConnectFailed();
        }, this));
        this.socket.on('connecting', __bind(function(type) {
          return this.onSocketConnecting(type);
        }, this));
        this.socket.on('close', __bind(function() {
          return this.onSocketClose();
        }, this));
        this.socket.on('disconnect', __bind(function() {
          return this.onSocketDisconnect();
        }, this));
        this.socket.on('message', __bind(function(msg) {
          return this.onMessage(msg);
        }, this));
        this.socket.on('reconnect', __bind(function(type, attempts) {
          return this.onSocketReconnect(type, attempts);
        }, this));
        this.socket.on('reconnect_failed', __bind(function() {
          return this.onSocketReconnectFailed();
        }, this));
        return this.socket.on('reconnecting', __bind(function(delay, attempts) {
          return this.onSocketReconnecting(delay, attempts);
        }, this));
      } else if (this.poll) {
        return this.poll.send(this.messageFetch());
      }
    };
    Dispatcher.prototype.message = function(msg, funcs) {
      return new smio.FetchRequestMessage(msg, smio.Util.Object.mergeDefaults(funcs, {
        url: ["/"]
      }));
    };
    Dispatcher.prototype.messageFetch = function() {
      return this.message({}, {
        cmd: 'f',
        ticks: this.lastFetchTime
      });
    };
    Dispatcher.prototype.onError = function(xhr, textStatus, error, freq) {
      var cid, ctl;
      if (!this.poll) {
        return alert(JSON.stringify(xhr));
      } else {
        if (freq && (cid = freq.ctlID()) && (ctl = this.client.allControls[cid])) {
          ctl.onInvokeResult([
            {
              xhr: xhr,
              textStatus: textStatus,
              error: error
            }
          ]);
        }
        if ((textStatus === 'timeout') || (error === 'timeout') || (xhr && (((xhr.status === 0) && (xhr.readyState === 0)) || ((xhr.readyState === 4) && (xhr.status >= 12001) && (xhr.status <= 12156))))) {
          return this.onOffline(true);
        } else {
          this.onOnline();
          if (!ctl) {
            if (xhr && xhr.responseText) {
              return alert(xhr.responseText);
            } else {
              return alert("" + textStatus + "\n\n" + (JSON.stringify(error)) + "\n\n" + (JSON.stringify(xhr)));
            }
          }
        }
      }
    };
    Dispatcher.prototype.onOffline = function() {
      this.offline++;
      if (this.offline === (this.poll ? 1 : 2)) {
        return $('#smio_offline').show();
      }
    };
    Dispatcher.prototype.onOnline = function() {
      if (this.offline) {
        this.offline = 0;
        $('#smio_offline').hide();
        if (this.socket) {
          return this.send(this.messageFetch());
        }
      }
    };
    Dispatcher.prototype.onMessage = function(msg, textStatus, xhr) {
      var cfg, cid, ctl, ctls, data, err, fresp;
      this.onOnline();
      data = null;
      if (msg === 'smoonocookie') {
        this.socket.disconnect();
        onSmoothioNoCookie();
        return;
      }
      if ((!msg) && textStatus && !_.isString(textStatus)) {
        data = textStatus;
      }
      if (msg && (!data) && _.isString(msg)) {
        if (_.startsWith(msg, '{')) {
          try {
            data = JSON.parse(msg);
          } catch (err) {
            if (_.isString(err)) {
              err = {
                message: err
              };
            }
            err.faultyJson = msg;
            this.onError(err);
          }
        } else {
          data = {};
        }
      }
      if (data) {
        fresp = new smio.FetchResponseMessage(data);
        if ((ctls = fresp.controls())) {
          this.lastFetchTime = fresp.ticks();
          this.client.syncControls(ctls);
        }
        if ((cfg = fresp.settings())) {
          if (this.poll && cfg.fi) {
            this.poll.interval.val = smio.Util.Number.tryParse(cfg.fi, 16000, function(iv) {
              return (iv > 100) && (iv < 12000000);
            });
            this.setTimer();
          }
          if (cfg.bg) {
            this.client.pageBody.css({
              'background-image': "url('" + cfg.bg + "')"
            });
          }
        }
        if ((cid = fresp.ctlID()) && (ctl = this.client.allControls[cid])) {
          return ctl.onInvokeResult(fresp.errors(), fresp.msg, fresp);
        }
      }
    };
    Dispatcher.prototype.onSleepy = function(sleepy) {
      if (this.ready && this.poll) {
        return this.setTimer();
      }
    };
    Dispatcher.prototype.onSocketClose = function() {
      return this.onOffline();
    };
    Dispatcher.prototype.onSocketConnect = function() {
      return this.onOnline();
    };
    Dispatcher.prototype.onSocketConnectFailed = function() {
      return this.onOffline();
    };
    Dispatcher.prototype.onSocketConnecting = function(type) {
      return this.onOffline();
    };
    Dispatcher.prototype.onSocketDisconnect = function() {
      return this.onOffline();
    };
    Dispatcher.prototype.onSocketReconnect = function() {
      return this.onOnline();
    };
    Dispatcher.prototype.onSocketReconnectFailed = function() {
      return this.onOffline();
    };
    Dispatcher.prototype.onSocketReconnecting = function() {
      return this.onOffline();
    };
    Dispatcher.prototype.send = function(freq) {
      if (this.socket) {
        return this.socket.send(JSON.stringify(freq.msg));
      } else if (this.poll) {
        return this.poll.send(freq);
      }
    };
    Dispatcher.prototype.setTimer = function(fn) {
      var pi, val;
      return;
      pi = this.poll.interval;
      if (!fn) {
        fn = __bind(function() {
          return this.poll.send(this.messageFetch());
        }, this);
      }
      if (!pi.val) {
        pi.val = 5000;
      }
      val = this.client.sleepy ? pi.val * pi.sleepyFactor : pi.val;
      if (pi['handle']) {
        clearInterval(pi.handle);
      }
      if (fn && val) {
        return pi.handle = setInterval(fn, val);
      }
    };
    return Dispatcher;
  })();
}).call(this);

/** server/pub/_scripts/gfx/Renderer.js **/
(function() {
  var smio;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  smio = global.smoothio;
  smio.gfx.Renderer = (function() {
    __extends(Renderer, CL3D.CopperLicht);
    function Renderer(cid) {
      Renderer.__super__.constructor.call(this, cid, true, 30, true);
      if (this.initRenderer()) {
        this.addScene(this.scene = new CL3D.Scene());
        this.scene.setBackgroundColor(CL3D.createColor(1, 0, 0, 64));
        this.scene.getRootSceneNode().addChild(this.node = new smio.gfx.SceneNode(this));
        this.node.addAnimator(new CL3D.AnimatorRotation(new CL3D.Vect3d(0, 0.6, 0.8)));
        this.billboard = new CL3D.BillboardSceneNode();
        this.billboard.setSize(20, 20);
        this.billboard.Pos.Y = 30;
        this.billboard.getMaterial(0).Tex1 = this.getTextureManager().getTexture('/_/file/images/bg1.jpg', true);
        this.billboard.getMaterial(0).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR;
        this.scene.getRootSceneNode().addChild(this.billboard);
        this.cam = new CL3D.CameraSceneNode();
        this.cam.Pos.X = 50;
        this.cam.Pos.Y = 20;
        this.cam.addAnimator(this.animator = new CL3D.AnimatorCameraFPS(this.cam, this));
        this.animator.lookAt(new CL3D.Vect3d(0, 20, 0));
        this.scene.getRootSceneNode().addChild(this.cam);
        this.scene.setActiveCamera(this.cam);
      }
    }
    return Renderer;
  })();
}).call(this);

/** server/pub/_scripts/gfx/SceneNode.js **/
(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  smio = global.smoothio;
  smio.gfx.SceneNode = (function() {
    __extends(SceneNode, CL3D.SceneNode);
    function SceneNode(engine) {
      var buf;
      this.engine = engine;
      this.render = __bind(this.render, this);
      this.OnRegisterSceneNode = __bind(this.OnRegisterSceneNode, this);
      SceneNode.__super__.constructor.call(this, this.engine);
      this.init();
      (this.mesh = new CL3D.Mesh()).AddMeshBuffer(buf = new CL3D.MeshBuffer());
      buf.Indices = [0, 2, 3, 2, 1, 3, 1, 0, 3, 2, 0, 1];
      buf.Vertices.push(this.createVertex(0, 0, 10, 0, 0));
      buf.Vertices.push(this.createVertex(10, 0, -10, 1, 0));
      buf.Vertices.push(this.createVertex(0, 20, 0, 0, 1));
      buf.Vertices.push(this.createVertex(-10, 20, -10, 1, 1));
      buf.Mat.Tex1 = this.engine.getTextureManager().getTexture('/_/file/images/bg0.jpg', true);
    }
    SceneNode.prototype.createVertex = function(x, y, z, s, t) {
      var v;
      v = new CL3D.Vertex3D(true);
      v.Pos.X = x;
      v.Pos.Y = y;
      v.Pos.Z = z;
      v.TCoords.X = s;
      v.TCoords.Y = t;
      return v;
    };
    SceneNode.prototype.OnRegisterSceneNode = function(scene) {
      scene.registerNodeForRendering(this, CL3D.Scene.RENDER_MODE_DEFAULT);
      return SceneNode.__super__.OnRegisterSceneNode.call(this, scene);
    };
    SceneNode.prototype.render = function(renderer) {
      renderer.setWorld(this.getAbsoluteTransformation());
      return renderer.drawMesh(this.mesh);
    };
    return SceneNode;
  })();
}).call(this);

/** server/pub/_scripts/shared/Control.js **/
(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  }, __slice = Array.prototype.slice;
  smio = global.smoothio;
  smio.Control = (function() {
    Control.load = function(className, parent, args) {
      return smio.Control.tagRenderers.ctl(parent, className, args, void 0, true);
    };
    Control.setClingerOpacity = function(clinger, clingee) {
      var go;
      go = clingee.showClinger(clinger, clingee) ? 1 : 0;
      if (clinger.el && clinger.el.css('opacity') !== go) {
        clinger.el.css({
          opacity: go
        });
        return clinger.disable(go === 0, true);
      }
    };
    Control.prototype.clingTo = function(ctl) {
      var cid;
      cid = this.id();
      if ((!ctl) && this.client.controlClings[cid]) {
        this.client.controlClings[cid] = void 0;
        delete this.client.controlClings[cid];
      } else {
        this.el.css({
          opacity: 0
        });
        this.client.controlClings[cid] = ctl;
      }
      return this.client.doPageFixups();
    };
    Control.prototype.coreDisable = function(disable) {};
    Control.prototype.ctl = function(ctlID) {
      var c, cid, cids, ctl, _i, _len, _ref;
      _ref = [this, ctlID.split('/')], ctl = _ref[0], cids = _ref[1];
      if ((c = this.client.allControls[ctlID])) {
        ctl = c;
      } else {
        for (_i = 0, _len = cids.length; _i < _len; _i++) {
          cid = cids[_i];
          if ((c = this.client.allControls[ctl.id(cid)])) {
            ctl = c;
          } else {
            break;
          }
        }
      }
      return ctl;
    };
    Control.prototype.disable = function(disable, isInherit) {
      var ctl, len, _i, _len, _ref;
      if (!arguments.length) {
        disable = isInherit = true;
      }
      if (!isInherit) {
        this.disabled = disable;
      } else if (!disable) {
        disable = this.disabled;
      }
      if (this.el) {
        if (disable) {
          this.el.removeClass('smio-enabled').addClass('smio-disabled');
        } else {
          this.el.removeClass('smio-disabled').addClass('smio-enabled');
        }
      }
      this.coreDisable(disable);
      len = 0;
      _ref = this.controls;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ctl = _ref[_i];
        len++;
        ctl.disable(disable, isInherit);
      }
      if (this.el && (len === 0)) {
        return this.el[disable ? 'addClass' : 'removeClass']('smio-disabledfaded');
      }
    };
    Control.prototype.enable = function() {
      return this.disable(false, true);
    };
    Control.prototype.invoke = function(cmd, args) {
      var ctl, lh, msg, root, sub;
      root = this.root();
      this.disable(true, true);
      delete this.invwarn;
      this.invtime = new Date();
      this.el.addClass('smio-invoking').removeClass('smio-hasinvwarn');
      if ((ctl = this.client.allControls[root.id(this.id('invdet'))])) {
        root.removeControl(ctl);
      }
      if ((sub = this.sub('inv'))) {
        if (!this.lh && (lh = sub.html())) {
          this.lh = lh;
        }
        sub.html(smio.Control.util.florette).addClass('smio-spin');
      }
      this.onInvoking(cmd, args);
      msg = this.client.disp.message(args, {
        cmd: [cmd],
        ctlID: [this.id()]
      });
      return setTimeout((__bind(function() {
        return this.client.disp.send(msg);
      }, this)), 500);
    };
    Control.prototype.jsSelf = function() {
      return "smio.client.allControls['" + this.id() + "']";
    };
    Control.prototype.labelHtml = function(html) {
      if (!this.el) {
        return '';
      } else {
        if (html) {
          this.el.html(html);
        }
        return this.el.html();
      }
    };
    Control.prototype.on = function(eventName, handler) {
      var eh, ehs, _i, _len, _ref, _results;
      if (eventName) {
        ehs = this['eventHandlers'];
        if (_.isFunction(handler)) {
          if (!ehs) {
            ehs = this['eventHandlers'] = {};
          }
          if (!ehs[eventName]) {
            ehs[eventName] = [];
          }
          if (!(__indexOf.call(ehs[eventName], handler) >= 0)) {
            return ehs[eventName].push(handler);
          }
        } else if (ehs && ehs[eventName]) {
          _ref = ehs[eventName];
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            eh = _ref[_i];
            _results.push(eh.apply(this, handler));
          }
          return _results;
        }
      }
    };
    Control.prototype.onInvoking = function(msg, args) {};
    Control.prototype.onInvokeResult = function(errs, res, fresp) {
      var cid, ctl, lh, mkCtl, root, sub, _ref, _ref2;
      root = this.root();
      this.el.removeClass('smio-invoking');
      this.disable(false, true);
      if (((lh = this['lh']) != null) && (sub = this.sub('inv'))) {
        sub.html(lh + '').removeClass('smio-spin');
        if (errs && errs.length) {
          sub.html('<span class="smio-picon">!</span>');
        }
      }
      if (errs && errs.length) {
        this.invwarn = errs;
        this.el.addClass('smio-hasinvwarn');
        cid = this.id('invdet');
        mkCtl = __bind(function() {
          return root.addControl('InvokeWarningPopup', {
            id: cid,
            invCtl: this,
            errs: _.map(errs, function(e) {
              if (_.isString(e)) {
                return e;
              } else if ((e.textStatus === 'timeout') || (e.error === 'timeout')) {
                return smio.resources.client.timeout;
              } else if (e.message) {
                return e.message;
              } else {
                return JSON.stringify(smio.Util.Object.exclude(e, 'xhr'));
              }
            })
          }).clingTo(this);
        }, this);
        if (!this.client.allControls[root.id(cid)]) {
          mkCtl();
          this.el.mouseenter(__bind(function() {
            if (this.invwarn && !this.client.allControls[root.id(cid)]) {
              return mkCtl();
            }
          }, this));
        }
      } else {
        delete this.invwarn;
        if ((ctl = this.client.allControls[root.id(this.id('invdet'))])) {
          root.removeControl(ctl);
        }
        this.el.removeClass('smio-hasinvwarn');
      }
      if (res && ((_ref = this.args) != null ? (_ref2 = _ref['invoke']) != null ? _ref2['onResult'] : void 0 : void 0)) {
        return this.args.invoke.onResult(errs, res, fresp);
      }
    };
    Control.prototype.onLoad = function() {
      var ctl, _i, _len, _ref, _results;
      this.el = $('#' + this.id());
      if (this.disabled) {
        this.el.removeClass('smio-enabled').addClass('smio-disabled');
        if (!this.controls.length) {
          this.el.addClass('smio-disabledfaded');
        }
      } else {
        this.el.removeClass('smio-disabled').addClass('smio-enabled');
      }
      _ref = this.controls;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ctl = _ref[_i];
        _results.push(ctl.onLoad());
      }
      return _results;
    };
    Control.prototype.onWindowResize = function(width, height) {};
    Control.prototype.resetInvoke = function(invWarnCtl) {
      var lh, root, sub;
      root = this.root();
      delete this.invwarn;
      this.el.removeClass('smio-hasinvwarn');
      if (invWarnCtl || (invWarnCtl = this.client.allControls[root.id(this.id('invdet'))])) {
        root.removeControl(invWarnCtl);
      }
      if (((lh = this['lh']) != null) && (sub = this.sub('inv'))) {
        return sub.html(lh + '').removeClass('smio-spin');
      }
    };
    Control.prototype.showClinger = function(clinger, clingee) {
      return (!this.parent) || this.parent.showClinger(clinger, clingee);
    };
    Control.prototype.sub = function(id) {
      var ctl, i, parts, _ref;
      ctl = this;
      if ((parts = id.split('/')).length > 1) {
        for (i = 0, _ref = parts.length - 1; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          ctl = ctl.ctl(parts[i]);
        }
      }
      return $("#" + (ctl.id(parts[parts.length - 1])));
    };
    Control.prototype.syncUpdate = function(ctlDesc) {};
    Control.prototype.un = function(eventName, handler) {
      var ehs;
      if (eventName && (ehs = this['eventHandlers']) && ehs[eventName] && _.isFunction(handler)) {
        return ehs[eventName] = _.without(ehs[eventName], handler);
      }
    };
    Control.util = {
      florette: '&#x273F;',
      jsVoid: 'javascript:void(0);'
    };
    Control.tagRenderers = {
      'arg': function(ctl, name) {
        return ctl.args[name];
      },
      'ctl': function(ctl, className, args, emptyIfMissing, retCtl) {
        var ctor, renderFunc, subCtl;
        subCtl = _.detect(ctl.controls, function(sc) {
          return sc.ctlID === args.id;
        });
        if ((!subCtl) && ((ctor = smio["Packs_" + (ctl.classNamespace()) + "_" + className]) || (ctor = smio["Packs_" + (ctl.classNamespace()) + "_Controls_" + className]) || (ctor = smio["Packs_Core_Controls_" + className]))) {
          ctl.controls.push(subCtl = new ctor(ctl.client, ctl, args));
          if (ctl.client) {
            ctl.client.allControls[subCtl.id()] = subCtl;
          }
        }
        if (retCtl) {
          return subCtl;
        } else if (subCtl) {
          return subCtl.renderHtml();
        } else if ((renderFunc = ctl["renderHtml_" + className])) {
          return renderFunc(className, args);
        } else {
          if (emptyIfMissing) {
            return '';
          } else {
            return "!!CONTROL_NOT_FOUND::" + className + "!!";
          }
        }
      },
      'inner': function(ctl, name, args) {
        var a, ao, o, _i, _len, _ref;
        o = [];
        a = args ? args : ctl.args;
        if (a['__o'] && a.__o['length']) {
          _ref = a.__o;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ao = _ref[_i];
            if (_.isString(ao)) {
              o.push(ao);
            } else {
              o.push(ctl.renderTag(ao.t, ao.s, ao.a));
            }
          }
        }
        return o.join('');
      },
      'r': function() {
        var args, ctl, name;
        ctl = arguments[0], name = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        return ctl.res.apply(ctl, [name].concat(__slice.call(args)));
      }
    };
    function Control(client, parent, args) {
      this.client = client;
      this.parent = parent;
      this.args = args;
      this.root = __bind(this.root, this);
      this.res = __bind(this.res, this);
      this.r = __bind(this.r, this);
      this.renderTag = __bind(this.renderTag, this);
      this.renderHtml = __bind(this.renderHtml, this);
      this.renderJsonTemplate = __bind(this.renderJsonTemplate, this);
      this.removeControl = __bind(this.removeControl, this);
      this.jsonTemplates_Label = __bind(this.jsonTemplates_Label, this);
      this.jsonTemplates_HasLabel = __bind(this.jsonTemplates_HasLabel, this);
      this.init = __bind(this.init, this);
      this.id = __bind(this.id, this);
      this.findAncestor = __bind(this.findAncestor, this);
      this.cssClass = __bind(this.cssClass, this);
      this.cssBaseClass = __bind(this.cssBaseClass, this);
      this.cls = __bind(this.cls, this);
      this.classPath = __bind(this.classPath, this);
      this.addControl = __bind(this.addControl, this);
      this.un = __bind(this.un, this);
      this.syncUpdate = __bind(this.syncUpdate, this);
      this.sub = __bind(this.sub, this);
      this.showClinger = __bind(this.showClinger, this);
      this.resetInvoke = __bind(this.resetInvoke, this);
      this.onWindowResize = __bind(this.onWindowResize, this);
      this.onLoad = __bind(this.onLoad, this);
      this.onInvokeResult = __bind(this.onInvokeResult, this);
      this.onInvoking = __bind(this.onInvoking, this);
      this.on = __bind(this.on, this);
      this.labelHtml = __bind(this.labelHtml, this);
      this.jsSelf = __bind(this.jsSelf, this);
      this.invoke = __bind(this.invoke, this);
      this.enable = __bind(this.enable, this);
      this.disable = __bind(this.disable, this);
      this.ctl = __bind(this.ctl, this);
      this.coreDisable = __bind(this.coreDisable, this);
      this.clingTo = __bind(this.clingTo, this);
      this.disabled = smio.iif(this.args.disabled);
      this.ctlID = this.args.id;
      this.controls = [];
      this.el = null;
    }
    Control.prototype.addControl = function(ctlSpec, args) {
      if (_.isString(ctlSpec)) {
        ctlSpec = smio.Control.load(ctlSpec, this, args);
      }
      this.el.append(ctlSpec.renderHtml());
      ctlSpec.onLoad();
      return ctlSpec;
    };
    Control.prototype.classPath = function() {
      return "Packs_" + (this.className());
    };
    Control.prototype.cls = function() {
      return smio[this.classPath()];
    };
    Control.prototype.cssBaseClass = function() {
      return '';
    };
    Control.prototype.cssClass = function() {
      var a, bc, sub, _i, _len;
      a = ['smio'];
      if ((bc = this.cssBaseClass())) {
        a.push(bc);
      }
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        sub = arguments[_i];
        if (sub) {
          a.push(sub);
        }
      }
      return a.join('-');
    };
    Control.prototype.findAncestor = function(fn) {
      var p;
      p = this.parent;
      while (p && !fn(p)) {
        p = p.parent;
      }
      return p;
    };
    Control.prototype.id = function(subID) {
      return (this.parent ? "" + (this.parent.id()) + "_" + this.ctlID : this.ctlID) + (subID ? '_' + subID : '');
    };
    Control.prototype.init = function() {};
    Control.prototype.jsonTemplates_HasLabel = function(target) {
      return this.args.labelText || this.args.labelHtml || this.args.labelRawText || this.args.labelRawHtml;
    };
    Control.prototype.jsonTemplates_Label = function(target) {
      var label, rawLabel;
      rawLabel = this.args.labelRawHtml ? this.args.labelRawHtml : this.args.labelRawText;
      label = this.args.labelHtml ? this.args.labelHtml : this.args.labelText;
      if (rawLabel) {
        return target[this.args.labelRawHtml ? 'html' : '_'] = [rawLabel];
      } else if (label) {
        return target[this.args.labelHtml ? 'html' : '_'] = [this.r(label)];
      }
    };
    Control.prototype.removeControl = function(ctl, auto) {
      var c, c1, c2, cid, delClings, delID, _i, _j, _len, _len2, _ref, _ref2, _results;
      if (this.parent && !(ctl != null)) {
        return this.parent.removeControl(this);
      } else if (ctl != null) {
        _ref = ctl.controls;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          ctl.removeControl(c, true);
        }
        if (!auto) {
          this.controls = _.reject(this.controls, function(c) {
            return c === ctl;
          });
          if (ctl.el) {
            ctl.el.remove();
          }
        }
        if (this.client) {
          if (this.client.allControls[cid = ctl.id()]) {
            this.client.allControls[cid] = void 0;
            delete this.client.allControls[cid];
          }
          delClings = [cid];
          _ref2 = this.client.controlClings;
          for (c1 in _ref2) {
            c2 = _ref2[c1];
            if (c2 === ctl) {
              delClings.push(c1);
            }
          }
          _results = [];
          for (_j = 0, _len2 = delClings.length; _j < _len2; _j++) {
            delID = delClings[_j];
            _results.push(this.client.controlClings[delID] ? (this.client.controlClings[delID] = void 0, delete this.client.controlClings[delID]) : void 0);
          }
          return _results;
        }
      }
    };
    Control.prototype.renderJsonTemplate = function(tagKey, objTree, level) {
      var an, atts, attstr, av, buf, hasc, haso, kc, kt, name, pos, result, toAtt, toHtml, val;
      buf = '';
      toHtml = smio.Util.String.htmlEncode;
      toAtt = __bind(function(an, av) {
        av = "" + av;
        return " " + an + "=\"" + (toHtml(an === 'id' ? this.id(av) : av)) + "\"";
      }, this);
      if (!level) {
        level = 0;
      }
      if ((kt = _.trim(tagKey))) {
        atts = {};
        attstr = '';
        kc = [];
        while ((pos = kt.lastIndexOf('.')) > 0) {
          kc.push(_.trim(kt.substr(pos + 1)));
          kt = _.trim(kt.substr(0, pos));
        }
        if (kc.length) {
          atts['class'] = kc.join(' ');
        }
        if ((pos = kt.lastIndexOf('#')) > 0) {
          atts.id = _.trim(kt.substr(pos + 1));
          kt = _.trim(kt.substr(0, pos));
        }
        for (an in atts) {
          av = atts[an];
          attstr += toAtt(an, av);
        }
        if (!objTree) {
          buf += "<" + kt + attstr + "/>";
        } else if (typeof objTree === 'object') {
          if ((result = smio.Control.tagRenderers.ctl(this, kt, smio.Util.Object.mergeDefaults(_.clone(objTree), atts), true))) {
            buf += result;
          } else {
            buf += "<" + kt + attstr;
            hasc = false;
            haso = false;
            for (name in objTree) {
              val = objTree[name];
              if (val != null) {
                if (_.isArray(val) || (typeof val === 'object')) {
                  haso = true;
                } else {
                  buf += toAtt(name, val);
                }
              }
            }
            if (haso) {
              for (name in objTree) {
                val = objTree[name];
                if (val) {
                  if (_.isArray(val)) {
                    if (!hasc) {
                      hasc = true;
                      buf += ">";
                    }
                    buf += (name === '_' ? toHtml(val.join('')) : name === 'html' ? val.join('') : this.renderJsonTemplate(name, toHtml(val.join('')), level + 1));
                  } else if (typeof val === 'object') {
                    if (!hasc) {
                      hasc = true;
                      buf += ">";
                    }
                    buf += this.renderJsonTemplate(name, val, level + 1);
                  }
                }
              }
            }
            buf += (hasc ? "</" + kt + ">" : "/>");
          }
        } else {
          buf += "<" + kt + attstr + ">" + (_.isArray(objTree) ? (kt === 'html' ? objTree.join('') : toHtml(objTree.join(''))) : objTree) + "</" + kt + ">";
        }
      }
      return buf;
    };
    Control.prototype.renderHtml = function($el) {
      var objTree, subTree, tagKey, _html;
      _html = '';
      if (this['renderTemplate'] && _.isFunction(this.renderTemplate) && (objTree = this.renderTemplate())) {
        for (tagKey in objTree) {
          subTree = objTree[tagKey];
          _html += this.renderJsonTemplate(tagKey, subTree);
        }
      }
      if ($el) {
        $el.html(_html);
      }
      return _html;
    };
    Control.prototype.renderTag = function(name, sarg, jarg) {
      var renderer;
      renderer = smio.Control.tagRenderers[name];
      if (renderer) {
        return renderer(this, sarg, jarg);
      } else {
        return "!!UNKNOWN_TAG::" + name + "!!";
      }
    };
    Control.prototype.r = function() {
      var args, name;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.res.apply(this, [name].concat(__slice.call(args)));
    };
    Control.prototype.res = function() {
      var args, i, lang, name, parts, resSet, resSets, ret, _ref, _ref2, _ref3;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      _ref = [this.root().args['lang'] || 'en', ''], lang = _ref[0], ret = _ref[1];
      if (((!args) || (!args.length)) && _.isArray(name) && (name.length > 1)) {
        args = name.slice(1);
        name = name[0];
      }
      if ((resSets = (this.client ? smio.resources : smio.inst.resourceSets))) {
        parts = this.classNamespace().split('_');
        for (i = _ref2 = parts.length - 1; _ref2 <= 0 ? i <= 0 : i >= 0; _ref2 <= 0 ? i++ : i--) {
          if ((resSet = resSets[parts.slice(0, (i + 1) || 9e9).join('_')]) && (ret = (this.client ? resSet[name] : resSet[lang][name]))) {
            break;
          }
        }
        if (!ret) {
          ret = this.client ? resSets.client[name] : resSets.client[lang][name] ? resSets.client[lang][name] : resSets.server[lang][name];
        }
      }
      if (ret) {
        if (args.length) {
          return _.sprintf.apply(_, [ret].concat(__slice.call(args)));
        } else {
          return ret;
        }
      } else {
        if (this.parent) {
          return (_ref3 = this.parent).res.apply(_ref3, [name].concat(__slice.call(args)));
        } else {
          return "!!RES::" + name + "!!";
        }
      }
    };
    Control.prototype.root = function() {
      if (this.parent) {
        return this.parent.root();
      } else {
        return this;
      }
    };
    return Control;
  })();
}).call(this);

/** server/pub/_scripts/shared/FetchMessageBase.js **/
(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  smio = global.smoothio;
  smio.FetchMessageBase = (function() {
    function FetchMessageBase(msg, funcs) {
      this.ticks = __bind(this.ticks, this);
      this.settings = __bind(this.settings, this);
      this.merge = __bind(this.merge, this);
      this.ctlID = __bind(this.ctlID, this);
      this.cmd = __bind(this.cmd, this);
      this.clear = __bind(this.clear, this);
      this._named = __bind(this._named, this);      var args, name;
      if (msg instanceof smio.FetchMessageBase) {
        this.msg = msg.msg;
      } else {
        this.msg = msg;
      }
      if (!this.msg) {
        this.msg = {};
      }
      for (name in funcs) {
        args = funcs[name];
        this[name].apply(this, (_.isArray(args) ? args : [args]));
      }
    }
    FetchMessageBase.prototype._named = function(name, arg) {
      var v, _i, _len, _ref;
      if (arg && !_.isString(arg)) {
        if (!this.msg[name]) {
          this.msg[name] = arg;
        } else if (!_.isArray(arg)) {
          this.msg[name] = smio.Util.Object.mergeDefaults(this.msg[name], arg);
        } else if (_.isArray(this.msg[name])) {
          for (_i = 0, _len = arg.length; _i < _len; _i++) {
            v = arg[_i];
            if (!(__indexOf.call(this.msg[name], v) >= 0)) {
              this.msg[name].push(v);
            }
          }
        } else {
          this.msg[named] = arg;
        }
      }
      if (_.isString(arg)) {
        return (_ref = this.msg[name]) != null ? _ref[arg] : void 0;
      } else {
        return this.msg[name];
      }
    };
    FetchMessageBase.prototype.clear = function() {
      var k, _results;
      _results = [];
      for (k in this.msg) {
        this.msg[k] = null;
        _results.push(delete this.msg[k]);
      }
      return _results;
    };
    FetchMessageBase.prototype.cmd = function(cmdName) {
      if (cmdName) {
        this.msg._c = cmdName;
      }
      return this.msg._c;
    };
    FetchMessageBase.prototype.ctlID = function(ctlID) {
      if (ctlID) {
        this.msg._i = ctlID;
      }
      return this.msg._i;
    };
    FetchMessageBase.prototype.merge = function(fm) {
      var k, v, _ref, _results;
      _ref = fm.msg;
      _results = [];
      for (k in _ref) {
        v = _ref[k];
        _results.push(this.msg[k] = v);
      }
      return _results;
    };
    FetchMessageBase.prototype.settings = function(cfg) {
      return this._named('_s', cfg);
    };
    FetchMessageBase.prototype.ticks = function(ticks) {
      if (ticks != null) {
        this.msg._t = ticks;
      }
      return this.msg._t;
    };
    return FetchMessageBase;
  })();
}).call(this);

/** server/pub/_scripts/shared/FetchRequestMessage.js **/
(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  smio = global.smoothio;
  smio.FetchRequestMessage = (function() {
    __extends(FetchRequestMessage, smio.FetchMessageBase);
    function FetchRequestMessage() {
      this.url = __bind(this.url, this);
      FetchRequestMessage.__super__.constructor.apply(this, arguments);
    }
    FetchRequestMessage.prototype.url = function(url) {
      if (url != null) {
        this.msg._u = url;
      }
      return this.msg._u;
    };
    return FetchRequestMessage;
  })();
}).call(this);

/** server/pub/_scripts/shared/FetchResponseMessage.js **/
(function() {
  var smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __slice = Array.prototype.slice;
  smio = global.smoothio;
  smio.FetchResponseMessage = (function() {
    __extends(FetchResponseMessage, smio.FetchMessageBase);
    function FetchResponseMessage() {
      this.errors = __bind(this.errors, this);
      this.controls = __bind(this.controls, this);
      FetchResponseMessage.__super__.constructor.apply(this, arguments);
    }
    FetchResponseMessage.prototype.controls = function(ctls) {
      if (ctls) {
        this.msg._f = ctls;
      }
      return this.msg._f;
    };
    FetchResponseMessage.prototype.errors = function() {
      var e, errs, _i, _len, _ref;
      errs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (errs) {
        if (!this.msg._e) {
          this.msg._e = [];
        }
        _ref = _.flatten(errs);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          this.msg._e.push(e);
        }
      }
      return this.msg._e;
    };
    return FetchResponseMessage;
  })();
}).call(this);

/** server/pub/_scripts/shared/Util.js **/
(function() {
  var smio;
  var __slice = Array.prototype.slice, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  smio = global.smoothio;
  smio.Util = (function() {
    function Util() {}
    Util.Array = {
      add: function() {
        var arr, copy, v, vals, _i, _len;
        arr = arguments[0], vals = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        copy = _.clone(arr);
        for (_i = 0, _len = vals.length; _i < _len; _i++) {
          v = vals[_i];
          copy.push(v);
        }
        return copy;
      },
      ensure: function() {
        var arr, v, vals, _i, _len, _ref;
        arr = arguments[0], vals = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        for (_i = 0, _len = vals.length; _i < _len; _i++) {
          v = vals[_i];
          if (_ref = !v, __indexOf.call(arr, _ref) >= 0) {
            arr.push(v);
          }
        }
        return arr;
      },
      ensurePos: function(arr, val, pos) {
        var i, index, v, _len, _ref;
        if ((pos <= arr.length) && ((index = arr.indexOf(val)) !== pos)) {
          if (index >= 0) {
            for (i = 0, _len = arr.length; i < _len; i++) {
              v = arr[i];
              arr[i] = arr[i + 1];
            }
            arr.length--;
          }
          arr.length++;
          for (i = _ref = arr.length - 1; _ref <= pos ? i < pos : i > pos; _ref <= pos ? i++ : i--) {
            arr[i] = arr[i - 1];
          }
          arr[pos] = val;
        }
        return arr;
      },
      "in": function(val, arr) {
        return __indexOf.call(arr, val) >= 0;
      },
      removeLast: function(arr) {
        return arr.slice(0, arr.length - 1);
      },
      toObject: function(arr, keyGen, valGen) {
        var i, obj, v, _len;
        obj = {};
        for (i = 0, _len = arr.length; i < _len; i++) {
          v = arr[i];
          obj[keyGen ? keyGen(v, i) : i] = valGen ? valGen(v, i) : v;
        }
        return obj;
      }
    };
    Util.DateTime = {
      addMinutes: function(minutes, dt) {
        if (!dt) {
          dt = new Date();
        }
        dt.setTime(dt.getTime() + (minutes * 60 * 1000));
        return dt;
      },
      stringify: function(dt) {
        var s;
        if (!dt) {
          dt = new Date();
        }
        s = JSON.stringify(dt);
        if (_.startsWith(s, '"') && _.endsWith(s, '"')) {
          return s.substr(1, s.length - 2);
        } else {
          return s;
        }
      },
      ticks: function(dt) {
        if (!dt) {
          dt = new Date();
        }
        return dt.getTime();
      },
      toString: function(dt) {
        var pad;
        if (!dt) {
          dt = new Date();
        }
        pad = function(fn, inc) {
          var v;
          v = typeof fn !== 'function' ? fn : fn.apply(dt);
          if ((inc != null) && inc > 0) {
            v = v + inc;
          }
          if (("" + v).length !== 1) {
            return v;
          } else {
            return '0' + v;
          }
        };
        return "" + (dt.getFullYear()) + "-" + (pad(dt.getMonth, 1)) + "-" + (pad(dt.getDate)) + "-" + (pad(dt.getHours)) + "-" + (dt.getMinutes()) + "-" + (dt.getSeconds());
      },
      utcTicks: function(dt) {
        if (!dt) {
          dt = new Date();
        }
        return Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds());
      }
    };
    Util.Runtime = {
      parallel: function(funs, finish) {
        var checkDone, done, fn, len, _i, _len, _results;
        len = funs.length;
        done = 0;
        checkDone = function() {
          if ((++done) === len) {
            return finish();
          }
        };
        _results = [];
        for (_i = 0, _len = funs.length; _i < _len; _i++) {
          fn = funs[_i];
          _results.push(fn(checkDone));
        }
        return _results;
      }
    };
    Util.Number = {
      max: function() {
        return Math.pow(2, 31) - 1;
      },
      min: function() {
        return Math.pow(-2, 31);
      },
      randomInt: function(max) {
        return Math.floor(Math.random() * (max + 1));
      },
      tryParse: function(val, def, validate) {
        var num;
        num = parseInt("" + val);
        if (validate && !validate(num)) {
          num = def;
        }
        if (_.isNumber(num)) {
          return num;
        } else {
          return def;
        }
      }
    };
    Util.Object = {
      cloneFiltered: function(obj, fn) {
        var k, noFunc, o, v, _ref;
        _ref = [!_.isFunction(fn), {}], noFunc = _ref[0], o = _ref[1];
        for (k in obj) {
          v = obj[k];
          if (noFunc || fn(k, v)) {
            o[k] = v;
          }
        }
        return o;
      },
      empty: function(obj) {
        var p;
        for (p in obj) {
          return false;
        }
        return true;
      },
      exclude: function() {
        var keys, obj;
        obj = arguments[0], keys = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return smio.Util.Object.cloneFiltered(obj, function(k, v) {
          return !(__indexOf.call(keys, k) >= 0);
        });
      },
      isObject: function(o, checkArr) {
        return (typeof o === 'object') && ((!checkArr) || !_.isArray(o));
      },
      mergeDefaults: function(cfg, defs) {
        var defKey, defVal;
        if (!cfg) {
          cfg = {};
        }
        for (defKey in defs) {
          defVal = defs[defKey];
          if ((!(cfg[defKey] != null)) || (typeof cfg[defKey] !== typeof defVal)) {
            cfg[defKey] = defVal;
          } else if ((typeof cfg[defKey] === 'object') && (typeof defVal === 'object')) {
            cfg[defKey] = smio.Util.Object.mergeDefaults(cfg[defKey], defVal);
          }
        }
        return cfg;
      },
      select: function(obj, path) {
        var last, p, parts, _i, _len;
        parts = path ? path.split('.') : null;
        last = path ? obj : null;
        if (parts && last) {
          for (_i = 0, _len = parts.length; _i < _len; _i++) {
            p = parts[_i];
            if (!(last = last[p])) {
              break;
            }
          }
        }
        return last;
      }
    };
    Util.String = {
      namedHtmlEntities: {
        'ß': 'szlig',
        'ä': 'auml',
        'Ä': 'Auml',
        'ö': 'ouml',
        'Ö': 'Ouml',
        'ü': 'uuml',
        'Ü': 'Uuml'
      },
      htmlEncode: function(str) {
        var c, cc, ent, i, len, ret, tmp, _len, _ref;
        _ref = ['', _.escapeHTML(str)], ret = _ref[0], tmp = _ref[1];
        len = tmp.length;
        for (i = 0, _len = tmp.length; i < _len; i++) {
          c = tmp[i];
          if ((ent = smio.Util.String.namedHtmlEntities[c])) {
            ret += "&" + ent + ";";
          } else if ((cc = tmp.charCodeAt(i)) > 127) {
            ret += "&#" + cc + ";";
          } else {
            ret += c;
          }
        }
        return ret;
      },
      idify: function(str) {
        return smio.Util.String.urlify(str, '', '', true);
      },
      "in": function(c, s) {
        return __indexOf.call(s, c) >= 0;
      },
      replace: function(str, replace) {
        var pos, repl, val;
        for (val in replace) {
          repl = replace[val];
          while ((pos = str.indexOf(val)) >= 0) {
            str = str.substr(0, pos) + repl + str.substr(pos + val.length);
          }
        }
        return str;
      },
      times: function(str, times) {
        var a, x;
        a = new Array(times);
        for (x = 0; 0 <= times ? x < times : x > times; 0 <= times ? x++ : x--) {
          a[x] = str;
        }
        return a.join('');
      },
      urlify: function(s, e, al, noLower) {
        var a, c, l, o, r, tc, tmp, _i, _len, _ref;
        if (e == null) {
          e = '-';
        }
        if (al == null) {
          al = '/';
        }
        _ref = [
          '', '', '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' + al, {
            'ä': 'ae',
            'ö': 'oe',
            'ü': 'ue',
            'Ä': 'Ae',
            'Ö': 'Oe',
            'Ü': 'Ue',
            'ß': 'ss'
          }
        ], l = _ref[0], o = _ref[1], a = _ref[2], r = _ref[3];
        for (_i = 0, _len = s.length; _i < _len; _i++) {
          c = s[_i];
          if (__indexOf.call(a, c) >= 0) {
            o += (l = c);
          } else if ((tc = r[c])) {
            o += (l = tc);
          } else if (e && (l !== e)) {
            o += (l = e);
          }
        }
        tmp = _.trim(o, "/" + e);
        if (noLower) {
          return tmp;
        } else {
          return tmp.toLowerCase();
        }
      }
    };
    return Util;
  })();
}).call(this);

/** server/pub/_packs/Core/Controls/_ctl_Console.js **/
(function() {
  /*
  Auto-generated from Core/Controls/Console.ctl
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
  smio.Packs_Core_Controls_Console = (function() {
    __extends(Packs_Core_Controls_Console, smio.Control);
    Packs_Core_Controls_Console.prototype.renderTemplate = function() {
      return {
        div: {
          id: '',
          "class": "smio-console smio-console-" + (this.args['topDown'] ? 'top' : 'bottom'),
          'div #ever .smio-console-ever': {
            _: ['Zeh Header']
          },
          'div #hover': {
            _: ['Zeh Hovva']
          },
          'div #detail': {
            _: ['Zeh Details']
          }
        }
      };
    };
    Packs_Core_Controls_Console.prototype.onLoad = function($el) {
      Packs_Core_Controls_Console.__super__.onLoad.call(this);
      if (!this.args['topDown']) {
        $("#" + (this.id('detail'))).insertBefore("#" + (this.id('ever')));
        return $("#" + (this.id('hover'))).insertBefore("#" + (this.id('ever')));
      }
    };
    function Packs_Core_Controls_Console(client, parent, args) {
      this.onLoad = __bind(this.onLoad, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_Console.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_Console.prototype.className = function() {
      return "Core_Controls_Console";
    };
    Packs_Core_Controls_Console.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_Console;
  })();
}).call(this);

/** server/pub/_packs/Core/Controls/_ctl_Controls.js **/
(function() {
  /*
  Auto-generated from Core/Controls/Controls.ctl
  */  var smio, smoothio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Controls_Controls = (function() {
    __extends(Packs_Core_Controls_Controls, smio.Control);
    Packs_Core_Controls_Controls.prototype.renderTemplate = function() {
      var an, av, it, item, itemID, items, nocopy, span, _i, _len, _ref, _ref2;
      nocopy = ['ctltype', 'items', 'id', 'class'];
      span = {
        id: ''
      };
      if (this.args.items) {
        if (_.isArray(this.args.items)) {
          items = {};
          _ref = this.args.items;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            it = _ref[_i];
            items[it] = {};
          }
        } else {
          items = this.args.items;
        }
        for (itemID in items) {
          item = items[itemID];
          while (_.startsWith(itemID, '#')) {
            itemID = itemID.substr(1);
          }
          _ref2 = this.args;
          for (an in _ref2) {
            av = _ref2[an];
            if ((!(__indexOf.call(nocopy, an) >= 0)) && (!(item[an] != null))) {
              item[an] = _.isFunction(av) ? av(itemID) : av;
            }
          }
          span["" + this.args.ctltype + " #" + itemID] = item;
        }
      }
      return {
        span: span
      };
    };
    function Packs_Core_Controls_Controls(client, parent, args) {
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_Controls.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_Controls.prototype.className = function() {
      return "Core_Controls_Controls";
    };
    Packs_Core_Controls_Controls.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_Controls;
  })();
}).call(this);

/** server/pub/_packs/Core/Controls/_ctl_InvokeWarningPopup.js **/
(function() {
  /*
  Auto-generated from Core/Controls/InvokeWarningPopup.ctl
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
  smio.Packs_Core_Controls_InvokeWarningPopup = (function() {
    __extends(Packs_Core_Controls_InvokeWarningPopup, smio.Control);
    Packs_Core_Controls_InvokeWarningPopup.prototype.renderTemplate = function() {
      var noQuote;
      noQuote = _.any(this.args.errs, function(e) {
        return e === smio.resources.client.timeout;
      });
      return {
        'div .smio-invwarn .smio-fade': {
          id: '',
          'div .smio-invwarn-edge': {
            'div .smio-invwarn-arr': {
              html: ['&nbsp;']
            }
          },
          'div .smio-invwarn-box': {
            'a #close .smio-invwarn-close': {
              href: smio.Control.util.jsVoid,
              title: this.r('close'),
              html: ['&times;']
            },
            'div .smio-invwarn-inner': {
              'div .smio-invwarn-intro': {
                'span .__1': {
                  html: [this.r('invwarn_lasttried1')]
                },
                'NatLangTime #dt': {
                  dt: this.args.invCtl.invtime
                },
                'span .__2': {
                  html: [this.r('invwarn_lasttried2')]
                }
              },
              'div .smio-invwarn-msg': smio.Util.Array.toObject(this.args.errs, (function(v, i) {
                return "div .smio-invwarn-msg-" + (noQuote ? 'noquote' : 'quote') + " .__" + i;
              }), (function(v) {
                return {
                  html: [v]
                };
              })),
              'LinkButtons #btns .smio-invwarn-btns .smio-bigbutton-strip': {
                btnClass: 'smio-bigbutton',
                items: {
                  'retry': {
                    labelRawHtml: "<span class=\"smio-invbtn-icon smio-invbtn-retry smio-picon\">1</span> " + (this.r('invwarn_retry')),
                    onClick: __bind(function() {
                      if (this.args.invCtl && this.args.invCtl.el && !this.isDisabled()) {
                        return this.args.invCtl.el.click();
                      }
                    }, this)
                  },
                  'cancel': {
                    labelRawHtml: "<span class=\"smio-invbtn-icon smio-invbtn-cancel smio-picon\">D</span> " + (this.r('invwarn_cancel')),
                    onClick: __bind(function() {
                      if (this.args.invCtl && !this.isDisabled()) {
                        return this.args.invCtl.resetInvoke();
                      }
                    }, this)
                  }
                }
              }
            }
          }
        }
      };
    };
    Packs_Core_Controls_InvokeWarningPopup.prototype.coreDisable = function(disable) {
      return this.sub('close').css({
        display: disable ? 'none' : 'inline-block'
      }).prop('disabled', disable);
    };
    Packs_Core_Controls_InvokeWarningPopup.prototype.isDisabled = function() {
      return this.disabled || this.sub('close').prop('disabled');
    };
    Packs_Core_Controls_InvokeWarningPopup.prototype.onLoad = function() {
      Packs_Core_Controls_InvokeWarningPopup.__super__.onLoad.call(this);
      return this.sub('close').click(__bind(function() {
        if (!this.isDisabled()) {
          return this.removeControl();
        }
      }, this));
    };
    function Packs_Core_Controls_InvokeWarningPopup(client, parent, args) {
      this.onLoad = __bind(this.onLoad, this);
      this.isDisabled = __bind(this.isDisabled, this);
      this.coreDisable = __bind(this.coreDisable, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_InvokeWarningPopup.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_InvokeWarningPopup.prototype.className = function() {
      return "Core_Controls_InvokeWarningPopup";
    };
    Packs_Core_Controls_InvokeWarningPopup.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_InvokeWarningPopup;
  })();
}).call(this);

/** server/pub/_packs/Core/Controls/_ctl_LinkButton.js **/
(function() {
  /*
  Auto-generated from Core/Controls/LinkButton.ctl
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
  smio.Packs_Core_Controls_LinkButton = (function() {
    __extends(Packs_Core_Controls_LinkButton, smio.Control);
    Packs_Core_Controls_LinkButton.prototype.renderTemplate = function() {
      var ret;
      ret = {
        a: {
          id: '',
          "class": this.args["class"] || '',
          href: this.args.href || smio.Control.util.jsVoid
        }
      };
      if (this.args.invoke) {
        ret.a['span #inv .smio-inv'] = {
          html: [this.args.invoke.html + '']
        };
        ret.a['span .smio'] = {
          html: ['&nbsp;']
        };
      }
      ret.a.span = {};
      this.jsonTemplates_Label(ret.a.span);
      if (this.disabled) {
        ret.a.disabled = 'disabled';
      }
      return ret;
    };
    Packs_Core_Controls_LinkButton.prototype.coreDisable = function(disable) {
      return this.el.prop('disabled', disable);
    };
    Packs_Core_Controls_LinkButton.prototype.onLoad = function() {
      Packs_Core_Controls_LinkButton.__super__.onLoad.call(this);
      return this.el.click(__bind(function() {
        var n, v, _ref, _results;
        if (!(this.disabled || this.el.prop('disabled'))) {
          if (this.args.onClick) {
            this.args.onClick();
          }
          if (this.args.invoke) {
            _ref = this.args.invoke;
            _results = [];
            for (n in _ref) {
              v = _ref[n];
              _results.push((n !== 'html') && (n !== 'onResult') ? this.invoke(n, _.isFunction(v) ? v() : v) : void 0);
            }
            return _results;
          }
        }
      }, this));
    };
    function Packs_Core_Controls_LinkButton(client, parent, args) {
      this.onLoad = __bind(this.onLoad, this);
      this.coreDisable = __bind(this.coreDisable, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_LinkButton.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_LinkButton.prototype.className = function() {
      return "Core_Controls_LinkButton";
    };
    Packs_Core_Controls_LinkButton.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_LinkButton;
  })();
}).call(this);

/** server/pub/_packs/Core/Controls/_ctl_LinkButtons.js **/
(function() {
  /*
  Auto-generated from Core/Controls/LinkButtons.ctl
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
  smio.Packs_Core_Controls_LinkButtons = (function() {
    __extends(Packs_Core_Controls_LinkButtons, smio.Control);
    Packs_Core_Controls_LinkButtons.prototype.renderTemplate = function() {
      var div, item, itemID, _ref;
      div = {
        'div': {
          id: '',
          "class": "" + this.args["class"]
        }
      };
      _ref = this.args.items;
      for (itemID in _ref) {
        item = _ref[itemID];
        div.div["LinkButton #" + itemID + " ." + this.args.btnClass] = item;
      }
      return div;
    };
    function Packs_Core_Controls_LinkButtons(client, parent, args) {
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_LinkButtons.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_LinkButtons.prototype.className = function() {
      return "Core_Controls_LinkButtons";
    };
    Packs_Core_Controls_LinkButtons.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_LinkButtons;
  })();
}).call(this);

/** server/pub/_packs/Core/Controls/_ctl_MainFrame.js **/
(function() {
  /*
  Auto-generated from Core/Controls/MainFrame.ctl
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
  smio.Packs_Core_Controls_MainFrame = (function() {
    __extends(Packs_Core_Controls_MainFrame, smio.Control);
    Packs_Core_Controls_MainFrame.prototype.renderTemplate = function() {
      return {
        'div .smio-main': {
          id: '',
          'Console #ctop': {
            topDown: true
          },
          'div .smio-console .smio-console-main': {
            _: ['']
          },
          'Console #cbottom': {
            topDown: false
          }
        }
      };
    };
    function Packs_Core_Controls_MainFrame(client, parent, args) {
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_MainFrame.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_MainFrame.prototype.className = function() {
      return "Core_Controls_MainFrame";
    };
    Packs_Core_Controls_MainFrame.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_MainFrame;
  })();
}).call(this);

/** server/pub/_packs/Core/Controls/_ctl_NatLangTime.js **/
(function() {
  /*
  Auto-generated from Core/Controls/NatLangTime.ctl
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
  smio.Packs_Core_Controls_NatLangTime = (function() {
    __extends(Packs_Core_Controls_NatLangTime, smio.Control);
    Packs_Core_Controls_NatLangTime.prototype.renderTemplate = function() {
      return {
        "span .smio-dt": {
          id: '',
          title: "" + this.args.dt,
          'data-dt': this.args.dt.getTime(),
          _: [smio.Util.DateTime.stringify(this.args.dt)]
        }
      };
    };
    function Packs_Core_Controls_NatLangTime(client, parent, args) {
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_NatLangTime.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_NatLangTime.prototype.className = function() {
      return "Core_Controls_NatLangTime";
    };
    Packs_Core_Controls_NatLangTime.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_NatLangTime;
  })();
}).call(this);

/** server/pub/_packs/Core/Controls/_ctl_SlidePanel.js **/
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
        "class": "smio-slidepanel " + (this.args["class"] || ''),
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
          "class": "smio-slidepanel " + this.args["class"],
          'div #scrollbox .smio-slidepanel-scrollbox': {
            'ul #items': ul
          },
          'div #edgeprev .smio-slidepanel-edge .smio-slidepanel-edge-left': {
            'div .smio-slidepanel-edge-arr .x9668': {
              _: [this.r('slidepanel_prev')]
            }
          },
          'div #edgenext .smio-slidepanel-edge .smio-slidepanel-edge-right': {
            'div .smio-slidepanel-edge-arr .x9658': {
              _: [this.r('slidepanel_next')]
            }
          }
        }
      };
    };
    Packs_Core_Controls_SlidePanel.prototype.getParentItemID = function($el) {
      var itemID, li, rid, _i, _len, _ref, _ref2;
      _ref = [void 0, $el.closest("div#" + (this.id()) + " li." + (this.args.itemClass || ''))], rid = _ref[0], li = _ref[1];
      _ref2 = this.items;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        itemID = _ref2[_i];
        if (li.prop('id') === this.id("items_" + itemID)) {
          rid = itemID;
          break;
        }
      }
      return rid;
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
      var bounce, curPos, distances, edgeNext, edgePrev, goalPos, it, onDone, rnd, scrollBox, scrollLefts, tmp, _i, _len, _ref, _ref2;
      _ref = [this.sub('edgeprev'), this.sub('edgenext'), this.sub('scrollbox'), true], edgePrev = _ref[0], edgeNext = _ref[1], scrollBox = _ref[2], bounce = _ref[3];
      curPos = scrollBox.scrollLeft();
      if (item === null) {
        bounce = false;
        scrollLefts = [];
        distances = [];
        _ref2 = this.items;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          it = _ref2[_i];
          scrollLefts.push(tmp = curPos + this.sub('items_' + it).position().left - edgePrev.width());
          distances.push(Math.abs(tmp - curPos));
        }
        item = distances.indexOf(Math.min.apply(Math, distances));
      }
      if (_.isString(item)) {
        item = this.items.indexOf(item);
      }
      if (((item < 0) || (item >= this.items.length)) && force) {
        item = 0;
      }
      onDone = __bind(function() {
        this.scrolling = false;
        if (bounce) {
          return this.scrollTo(null, true);
        }
      }, this);
      if ((force || item !== this.curItem) && (item >= 0) && (item < this.items.length)) {
        this.scrolling = true;
        edgePrev.css({
          display: item === 0 ? 'none' : 'block'
        });
        edgeNext.css({
          display: item === (this.items.length - 1) ? 'none' : 'block'
        });
        this.on('itemSelect', [this.curItem = item, this.items[item]]);
        goalPos = curPos + this.sub('items_' + this.items[item]).position().left - edgePrev.width();
        rnd = smio.Util.Number.randomInt(48) + 48;
        return morpheus.tween(200, (__bind(function(pos) {
          return scrollBox.scrollLeft(pos);
        }, this)), onDone, null, curPos, (bounce ? (goalPos < curPos ? -rnd : rnd) : 0) + goalPos);
      }
    };
    Packs_Core_Controls_SlidePanel.prototype.showClinger = function(clinger, clingee) {
      return this.curItem === this.items.indexOf(this.getParentItemID(clingee.el));
    };
    function Packs_Core_Controls_SlidePanel(client, parent, args) {
      this.showClinger = __bind(this.showClinger, this);
      this.scrollTo = __bind(this.scrollTo, this);
      this.onWindowResize = __bind(this.onWindowResize, this);
      this.onLoad = __bind(this.onLoad, this);
      this.init = __bind(this.init, this);
      this.getParentItemID = __bind(this.getParentItemID, this);
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

/** server/pub/_packs/Core/Controls/_ctl_TabStrip.js **/
(function() {
  /*
  Auto-generated from Core/Controls/TabStrip.ctl
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
  smio.Packs_Core_Controls_TabStrip = (function() {
    __extends(Packs_Core_Controls_TabStrip, smio.Control);
    Packs_Core_Controls_TabStrip.prototype.renderTemplate = function() {
      var is1st, makeOnClick, ret, tab, _i, _len, _ref;
      ret = {
        div: {
          id: '',
          "class": this.args["class"] || ''
        }
      };
      makeOnClick = __bind(function(tabID) {
        return __bind(function() {
          return this.selectTab(tabID);
        }, this);
      }, this);
      is1st = true;
      _ref = this.args.tabs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tab = _ref[_i];
        ret.div["LinkButton #" + tab + " ." + this.args.tabClass + " ." + (this.args.tabClass + (is1st ? '-active' : '-inactive'))] = {
          labelText: this.args.resPrefix + tab,
          onClick: makeOnClick(tab)
        };
        is1st = false;
      }
      return ret;
    };
    Packs_Core_Controls_TabStrip.prototype.selectTab = function(tabID) {
      var a, cls, t, uncls, _i, _len, _ref;
      a = this.sub(tabID);
      cls = "" + this.args.tabClass + "-active";
      uncls = "" + this.args.tabClass + "-inactive";
      if (!a.hasClass(cls)) {
        _ref = this.args.tabs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          this.sub(t).removeClass(cls).addClass(uncls);
        }
        a.removeClass(uncls).addClass(cls);
        if (this.args.onTabSelect) {
          return this.args.onTabSelect(tabID);
        }
      }
    };
    function Packs_Core_Controls_TabStrip(client, parent, args) {
      this.selectTab = __bind(this.selectTab, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_TabStrip.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_TabStrip.prototype.className = function() {
      return "Core_Controls_TabStrip";
    };
    Packs_Core_Controls_TabStrip.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_TabStrip;
  })();
}).call(this);

/** server/pub/_packs/Core/Controls/_ctl_TextInput.js **/
(function() {
  /*
  Auto-generated from Core/Controls/TextInput.ctl
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
  smio.Packs_Core_Controls_TextInput = (function() {
    __extends(Packs_Core_Controls_TextInput, smio.Control);
    Packs_Core_Controls_TextInput.prototype.renderTemplate = function() {
      var ret;
      ret = {
        span: {
          "class": 'smio-textinput',
          id: ''
        }
      };
      if (this.args.labelText || this.args.labelHtml) {
        ret.span.label = {
          id: 'label',
          "for": this.id('input')
        };
        this.jsonTemplates_Label(ret.span.label);
      }
      ret.span.input = {
        id: 'input',
        "class": 'smio-textinput',
        type: this.args.type === 'password' ? 'password' : 'text'
      };
      if (this.disabled) {
        ret.span.input.readonly = 'readonly';
      }
      if (this.args.autoFocus) {
        ret.span.input.autofocus = 'autofocus';
      }
      if (this.args.required) {
        ret.span.input.required = 'required';
      }
      if (this.args.placeholder) {
        ret.span.input.placeholder = this.r(this.args.placeholder);
      }
      if (this.args.value) {
        ret.span.input.value = this.args.value;
      }
      if (this.args.nospellcheck) {
        ret.span.input.spellcheck = false;
      }
      return ret;
    };
    Packs_Core_Controls_TextInput.prototype.coreDisable = function(disable) {
      return this.sub('input').prop('readonly', disable);
    };
    Packs_Core_Controls_TextInput.prototype.onLoad = function() {
      if (this.args.onChange) {
        return this.sub('input').change(__bind(function() {
          return this.args.onChange(this.sub('input'));
        }, this));
      }
    };
    function Packs_Core_Controls_TextInput(client, parent, args) {
      this.onLoad = __bind(this.onLoad, this);
      this.coreDisable = __bind(this.coreDisable, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_TextInput.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_TextInput.prototype.className = function() {
      return "Core_Controls_TextInput";
    };
    Packs_Core_Controls_TextInput.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_TextInput;
  })();
}).call(this);

/** server/pub/_packs/Core/Controls/_ctl_Toggle.js **/
(function() {
  /*
  Auto-generated from Core/Controls/Toggle.ctl
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
  smio.Packs_Core_Controls_Toggle = (function() {
    __extends(Packs_Core_Controls_Toggle, smio.Control);
    Packs_Core_Controls_Toggle.checkmark = '&#x2714;';
    Packs_Core_Controls_Toggle.radiomark = '';
    Packs_Core_Controls_Toggle.prototype.renderTemplate = function() {
      var getGSpan, ischk, n, ret, v;
      ischk = this.isCheckBox();
      ret = {
        span: {
          "class": "smio-toggleinput smio-toggleinput-" + (ischk ? 'checkbox' : 'radio') + " smio-toggleinput-" + (this.args.checked ? '' : 'un') + "checked smio-toggleinput-" + (this.commonCssClass()),
          id: '',
          span: {
            id: 'btnlabel',
            "class": "smio-toggleinput-btnlabel",
            span: {
              id: 'btn',
              "class": 'smio-toggleinput-btn',
              span: {
                id: 'btnglyph',
                "class": 'smio-toggleinput-btnbtn'
              }
            }
          }
        }
      };
      getGSpan = function() {
        if (ischk) {
          return ret.span.span.span;
        } else {
          return ret.span.span.span.span;
        }
      };
      getGSpan()['span #glyph'] = {
        "class": 'smio-toggleinput-btnglyph'
      };
      ret.span.span.span.input = {
        id: 'input',
        name: this.args.name,
        "class": 'smio-toggleinput',
        type: ischk ? 'checkbox' : 'radio'
      };
      if (this.disabled) {
        ret.span.span.span.input.disabled = 'disabled';
      }
      if (this.args.style) {
        ret.span.style = ((function() {
          var _ref, _results;
          _ref = this.args.style;
          _results = [];
          for (n in _ref) {
            v = _ref[n];
            _results.push("" + n + ": " + v);
          }
          return _results;
        }).call(this)).join(';');
      }
      if (this.args.checked) {
        ret.span.span.span.input.checked = 'checked';
        getGSpan()['span #glyph'].html = [smio[this.classPath()][ischk ? 'checkmark' : 'radiomark']];
      }
      if (this.jsonTemplates_HasLabel()) {
        ret.span.span.label = {
          id: 'label',
          "class": 'smio-toggleinput',
          "for": this.id('input')
        };
        this.jsonTemplates_Label(ret.span.span.label);
      }
      return ret;
    };
    Packs_Core_Controls_Toggle.prototype.commonCssClass = function() {
      return this.args.name || this.id();
    };
    Packs_Core_Controls_Toggle.prototype.coreDisable = function(disable) {
      return this.sub('input').prop('disabled', disable);
    };
    Packs_Core_Controls_Toggle.prototype.isCheckBox = function() {
      return this.args.type === 'checkbox';
    };
    Packs_Core_Controls_Toggle.prototype.isRadioBox = function() {
      return this.args.type !== 'checkbox';
    };
    Packs_Core_Controls_Toggle.prototype.onCheck = function(passive) {
      var cc, el, nuCls, unCls, _ref;
      _ref = ['smio-toggleinput', this.sub('input')], cc = _ref[0], el = _ref[1];
      if (this.chk !== el.prop('checked')) {
        this.chk = el.prop('checked');
        nuCls = cc + (this.chk ? '-checked' : '-unchecked');
        unCls = cc + (this.chk ? '-unchecked' : '-checked');
        this.el.removeClass(unCls).addClass(nuCls);
        this.sub('glyph').html(!this.chk ? '' : smio[this.classPath()][this.isCheckBox() ? 'checkmark' : 'radiomark']);
        if (this.isRadioBox() && !passive) {
          $(".smio-toggleinput-" + (this.commonCssClass()) + " input.smio-toggleinput").each(__bind(function(i, e) {
            var ctl;
            if (e.id !== this.id('input')) {
              $(e).prop('checked', false);
              if ((ctl = this.ctl(e.id.substr(0, e.id.lastIndexOf('_'))))) {
                return ctl.onCheck(true);
              }
            }
          }, this));
        }
        if (this.args.onCheck) {
          this.args.onCheck(this.chk);
        }
        return this.on('check', [this.chk]);
      }
    };
    Packs_Core_Controls_Toggle.prototype.onLoad = function() {
      var inp;
      Packs_Core_Controls_Toggle.__super__.onLoad.call(this);
      (inp = this.sub('input')).click(__bind(function(evt) {
        this.onCheck();
        if (this.isCheckBox()) {
          return evt.stopPropagation();
        }
      }, this));
      inp.blur(__bind(function() {
        this.sub('btnlabel').removeClass('smio-toggleinput-focused');
        return this.el.removeClass('smio-toggleinput-hasfocused');
      }, this));
      inp.focus(__bind(function() {
        this.sub('btnlabel').addClass('smio-toggleinput-focused');
        return this.el.addClass('smio-toggleinput-hasfocused');
      }, this));
      this.sub('btnlabel').click(__bind(function() {
        var el;
        el = this.sub('input');
        if (!el.prop('disabled')) {
          el.prop('checked', this.isRadioBox() || !el.prop('checked'));
          return this.onCheck();
        }
      }, this));
      return this.chk = inp.prop('checked');
    };
    function Packs_Core_Controls_Toggle(client, parent, args) {
      this.onLoad = __bind(this.onLoad, this);
      this.onCheck = __bind(this.onCheck, this);
      this.isRadioBox = __bind(this.isRadioBox, this);
      this.isCheckBox = __bind(this.isCheckBox, this);
      this.coreDisable = __bind(this.coreDisable, this);
      this.commonCssClass = __bind(this.commonCssClass, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_Toggle.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_Toggle.prototype.className = function() {
      return "Core_Controls_Toggle";
    };
    Packs_Core_Controls_Toggle.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_Toggle;
  })();
}).call(this);

/** server/pub/_packs/Core/Earth/_ctl_MainFrame.js **/
(function() {
  /*
  Auto-generated from Core/Earth/MainFrame.ctl
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
  smio.Packs_Core_Earth_MainFrame = (function() {
    __extends(Packs_Core_Earth_MainFrame, smio.Control);
    Packs_Core_Earth_MainFrame.prototype.renderTemplate = function() {
      return {
        'div .smio-main': {
          id: '',
          'canvas #c3d .smio-canvas3d': {
            html: ['']
          }
        }
      };
    };
    Packs_Core_Earth_MainFrame.prototype.onLoad = function() {
      Packs_Core_Earth_MainFrame.__super__.onLoad.call(this);
      return new smio.gfx.Renderer(this.id('c3d'));
    };
    function Packs_Core_Earth_MainFrame(client, parent, args) {
      this.onLoad = __bind(this.onLoad, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Earth_MainFrame.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Earth_MainFrame.prototype.className = function() {
      return "Core_Earth_MainFrame";
    };
    Packs_Core_Earth_MainFrame.prototype.classNamespace = function() {
      return "Core_Earth";
    };
    return Packs_Core_Earth_MainFrame;
  })();
}).call(this);

/** server/pub/_packs/Core/ServerSetup/_ctl_InitialHubSetup.js **/
(function() {
  /*
  Auto-generated from Core/ServerSetup/InitialHubSetup.ctl
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
  smio.Packs_Core_ServerSetup_InitialHubSetup = (function() {
    __extends(Packs_Core_ServerSetup_InitialHubSetup, smio.Control);
    Packs_Core_ServerSetup_InitialHubSetup.prototype.renderTemplate = function() {
      return {
        "div .smio-box": {
          "id": '',
          "div .smio-setup": {
            "div .smio-setup-outer .smio-setup-outer-top": {
              "div .smio-setup-header": {
                html: [this.r('title')]
              },
              "div .smio-setup-header-desc": [this.r('desc')]
            },
            "div .smio-setup-inner": {
              "SlidePanel #stepslide .smio-setup-stepslide": {
                itemClass: 'smio-setup-stepbox',
                onItemSelect: this.onSlide,
                items: {
                  "#owner": {
                    'div .smio-setup-stepbox-title': [this.r('steptitle_owner')],
                    'div .smio-setup-stepbox-form': {
                      "Controls #user": {
                        ctltype: 'TextInput',
                        onChange: __bind(function() {
                          return this.verifyInputs;
                        }, this),
                        required: true,
                        nospellcheck: true,
                        labelText: __bind(function(id) {
                          return "owner_" + id;
                        }, this),
                        placeholder: __bind(function(id) {
                          return "owner_" + id + "hint";
                        }, this),
                        type: __bind(function(id) {
                          if (id !== 'name') {
                            return 'password';
                          } else {
                            return '';
                          }
                        }, this),
                        items: ['#name', '#pass', '#pass2']
                      },
                      "div .smio-setup-stepbox-form-label": {
                        html: [this.r('owner_choice')]
                      },
                      "Controls #owner": {
                        ctltype: 'Toggle',
                        disabled: true,
                        name: this.id('owner_toggle'),
                        items: {
                          "#create": {
                            checked: true,
                            labelHtml: ['owner_create', 'localhost']
                          },
                          "#login": {
                            labelHtml: ['owner_login', 'localhost']
                          }
                        }
                      }
                    }
                  },
                  "#template": {
                    "div .smio-setup-stepbox-title": [this.r('steptitle_template')],
                    "div .smio-setup-stepbox-form": {
                      text: ['Hub templates are not yet available.']
                    }
                  },
                  "#finish": {
                    "div .smio-setup-stepbox-title": [this.r('steptitle_finish')],
                    "div .smio-setup-stepbox-form": {
                      "TextInput #hubtitle": {
                        required: true,
                        placeholder: 'hub_titlehint',
                        labelText: 'hub_title',
                        onChange: this.verifyInputs
                      },
                      "div .smio-setup-stepbox-form-label": {
                        html: [this.r('hub_hint')]
                      },
                      "Controls #bg": {
                        ctltype: 'Toggle',
                        name: this.id('hub_bg'),
                        checked: __bind(function(id) {
                          return id === 'bg0';
                        }, this),
                        labelHtml: __bind(function(id) {
                          return 'nbsp';
                        }, this),
                        style: __bind(function(id) {
                          return {
                            'background-image': "url('/_/file/images/" + id + ".jpg')"
                          };
                        }, this),
                        onCheck: __bind(function(id) {
                          return __bind(function(chk) {
                            if (chk) {
                              return this.client.pageBody.css({
                                "background-image": "url('/_/file/images/" + id + ".jpg')"
                              });
                            }
                          }, this);
                        }, this),
                        items: ['#bg0', '#bg1', '#bg2', '#bg3', '#bg4']
                      },
                      "div .smio-setup-createbtn": {
                        "LinkButton #hub_create .smio-bigbutton": {
                          disabled: true,
                          labelText: 'hub_create',
                          invoke: {
                            html: '&#x279C;',
                            'Hub.create': __bind(function() {
                              return {
                                u: this.input('user/name').val(),
                                p: this.input('user/pass').val(),
                                t: this.input('hubtitle').val()
                              };
                            }, this),
                            onResult: this.onCreateHubResult
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "TabStrip #steptabs .smio-setup-outer .smio-setup-steptabs": {
              "tabClass": 'smio-setup-steptab',
              "tabs": ['owner', 'template', 'finish'],
              "resPrefix": 'steps_',
              "onTabSelect": __bind(function(tabID) {
                return this.onTabSelect(tabID);
              }, this)
            }
          }
        }
      };
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.input = function(sp) {
      return this.sub("stepslide/" + sp + "/input");
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.onCreateHubResult = function(errs, result, fresp) {
      return;
      if (errs) {
        return alert(JSON.stringify(errs));
      } else if (result) {
        return alert('no prob');
      } else {
        return alert('noooo');
      }
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.onLoad = function() {
      var $p1, $p2, $t, $u, _ref;
      Packs_Core_ServerSetup_InitialHubSetup.__super__.onLoad.call(this);
      if (this.urlSeg() !== '/') {
        location.replace('/');
      }
      _ref = [this.input('user/name'), this.input('user/pass'), this.input('user/pass2'), this.input('hubtitle')], $u = _ref[0], $p1 = _ref[1], $p2 = _ref[2], $t = _ref[3];
      $u.val('test');
      $p1.val('test');
      $p2.val('test');
      $t.val('test');
      this.verifyInputs();
      return setTimeout((__bind(function() {
        return this.onTabSelect('finish');
      }, this)), 250);
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.onSlide = function(index, itemID) {
      return this.ctl('steptabs').selectTab(itemID);
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.onTabSelect = function(tabID) {
      return this.ctl('stepslide').scrollTo(tabID);
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.urlSeg = function() {
      var urlseg;
      if ((urlseg = _.trim(this.client.pageUrl.attr('path'), '/'))) {
        return "/" + urlseg + "/";
      } else {
        return '/';
      }
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.verifyInputs = function() {
      var $p1, $p2, $t, $u, tmp, _ref;
      _ref = [this.input('user/name'), this.input('user/pass'), this.input('user/pass2'), this.input('hubtitle')], $u = _ref[0], $p1 = _ref[1], $p2 = _ref[2], $t = _ref[3];
      if ($u.val() !== (tmp = smio.Util.String.idify(_.trim($u.val())))) {
        $u.val(tmp);
      }
      if ($t.val() !== (tmp = _.trim($t.val()))) {
        $t.val(tmp);
      }
      return this.ctl('stepslide/hub_create').disable(!($u.val() && $p1.val() && $p2.val() && ($p1.val() === $p2.val()) && $t.val()));
    };
    function Packs_Core_ServerSetup_InitialHubSetup(client, parent, args) {
      this.verifyInputs = __bind(this.verifyInputs, this);
      this.urlSeg = __bind(this.urlSeg, this);
      this.onTabSelect = __bind(this.onTabSelect, this);
      this.onSlide = __bind(this.onSlide, this);
      this.onLoad = __bind(this.onLoad, this);
      this.onCreateHubResult = __bind(this.onCreateHubResult, this);
      this.input = __bind(this.input, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_ServerSetup_InitialHubSetup.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_ServerSetup_InitialHubSetup.prototype.className = function() {
      return "Core_ServerSetup_InitialHubSetup";
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.classNamespace = function() {
      return "Core_ServerSetup";
    };
    return Packs_Core_ServerSetup_InitialHubSetup;
  })();
}).call(this);

