(function() {
  var smio;
  smio = global.smoothio;
  smio.gfx.Shaders = (function() {
    function Shaders() {}
    Shaders.Dummy = {
      disabled: true,
      vertex: "attribute vec3 aVertexPosition;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nvoid main(void) {\n	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}",
      fragment: "#ifdef GL_ES\nprecision highp float;\n#endif\nvoid main(void) {\n	gl_FragColor = vec4(1.0, 0.8, 0.0, 1.0);\n}"
    };
    Shaders.PlainColor = {
      disabled: true,
      atts: ['aVertexColor'],
      vertex: "attribute vec3 aVertexPosition;\nattribute vec4 aVertexColor;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nvarying vec4 vColor;\nvoid main(void) {\n	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n	vColor = aVertexColor;\n}",
      fragment: "#ifdef GL_ES\nprecision highp float;\n#endif\nvarying vec4 vColor;\nvoid main(void) {\n	gl_FragColor = vColor;\n}"
    };
    Shaders.Texured = {
      atts: ['aTexCoord', 'aVertexPosition', 'aVertexNormal'],
      uniforms: ['uAmbient', 'uDirect', 'uLightDirection', 'uNormalMatrix', 'uSampler'],
      vertex: "attribute vec3 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute vec2 aTexCoord;\nuniform vec3 uAmbient;\nuniform vec3 uLightDirection;\nuniform vec3 uDirect;\nuniform mat3 uNormalMatrix;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nvarying vec2 vTexCoord;\nvarying vec3 vLightWeighting;\nvoid main(void) {\n	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n	vTexCoord = aTexCoord;\n	vec3 transformedNormal = uNormalMatrix * aVertexNormal;\n	float directionalLightWeighting = max(dot(transformedNormal, uLightDirection), 0.0);\n	vLightWeighting = uAmbient + uDirect * directionalLightWeighting;\n}",
      fragment: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D uSampler;\nvarying vec2 vTexCoord;\nvarying vec3 vLightWeighting;\nvoid main(void) {\n	vec4 unlightedColor = texture2D(uSampler, vTexCoord);\n	gl_FragColor = vec4(unlightedColor.rgb * vLightWeighting, unlightedColor.a);\n}"
    };
    return Shaders;
  })();
}).call(this);
