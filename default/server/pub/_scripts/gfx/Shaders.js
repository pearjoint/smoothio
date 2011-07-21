(function() {
  var smio;
  smio = global.smoothio;
  smio.gfx.Shaders = (function() {
    function Shaders() {}
    Shaders.coloredFragmentShader = "#ifdef GL_ES\nprecision highp float;\n#endif\nvarying vec4 vColor;\nvoid main(void) {\n	gl_FragColor = vColor;\n}";
    Shaders.defaultFragmentShader = "#ifdef GL_ES\nprecision highp float;\n#endif\nvoid main(void) {\n	gl_FragColor = vec4(1.0, 0.8, 0.0, 1.0);\n}";
    Shaders.coloredVertexShader = "attribute vec3 aVertexPosition;\nattribute vec4 aVertexColor;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nvarying vec4 vColor;\nvoid main(void) {\n	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n	vColor = aVertexColor;\n}";
    Shaders.defaultVertexShader = "attribute vec3 aVertexPosition;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nvoid main(void) {\n	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}";
    return Shaders;
  })();
}).call(this);
