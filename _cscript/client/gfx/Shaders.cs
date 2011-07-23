smio = global.smoothio

class smio.gfx.Shaders

	@Dummy:
		disabled: true
		vertex: """
			attribute vec3 aVertexPosition;
			uniform mat4 uMVMatrix;
			uniform mat4 uPMatrix;
			void main(void) {
				gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
			}
		"""
		fragment: """
			#ifdef GL_ES
			precision highp float;
			#endif
			void main(void) {
				gl_FragColor = vec4(1.0, 0.8, 0.0, 1.0);
			}
		"""

	@PlainColor:
		disabled: true
		atts: ['aVertexColor']
		vertex: """
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
		fragment: """
			#ifdef GL_ES
			precision highp float;
			#endif
			varying vec4 vColor;
			void main(void) {
				gl_FragColor = vColor;
			}
		"""

	@Texured:
		atts: ['aTexCoord']
		uniforms: ['uSampler']
		vertex: """
			attribute vec3 aVertexPosition;
			attribute vec2 aTexCoord;
			uniform mat4 uMVMatrix;
			uniform mat4 uPMatrix;
			varying vec2 vTexCoord;
			void main(void) {
				gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
				vTexCoord = aTexCoord;
			}
		"""
		fragment: """
			#ifdef GL_ES
			precision highp float;
			#endif
			uniform sampler2D uSampler;
			varying vec2 vTexCoord;
			void main(void) {
				gl_FragColor = texture2D(uSampler, vTexCoord) * vec4(vTexCoord.t * 10.0, vTexCoord.s * 10.0, vTexCoord.s * 10.0, 1.0);
			}
		"""

