smio = global.smoothio

class smio.gfx.Shaders

	@coloredFragmentShader: """
		#ifdef GL_ES
		precision highp float;
		#endif
		varying vec4 vColor;
		void main(void) {
			gl_FragColor = vColor;
		}
	"""

	@defaultFragmentShader: """
		#ifdef GL_ES
		precision highp float;
		#endif
		void main(void) {
			gl_FragColor = vec4(1.0, 0.8, 0.0, 1.0);
		}
	"""

	@coloredVertexShader: """
		attribute vec3 aVertexPosition;
		attribute vec4 aVertexColor;
		uniform mat4 uMVMatrix;
		uniform mat4 uPMatrix;
		varying vec4 vColor;
		void main(void) {
			gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
			vColor = aVertexColor;
		}
	"""

	@defaultVertexShader: """
		attribute vec3 aVertexPosition;
		uniform mat4 uMVMatrix;
		uniform mat4 uPMatrix;
		void main(void) {
			gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
		}
	"""

