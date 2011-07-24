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
		atts: ['aTexCoord', 'aVertexPosition', 'aVertexNormal']
		uniforms: ['uAmbient', 'uDirect', 'uLightDirection', 'uNormalMatrix', 'uSampler']
		vertex: """
			attribute vec3 aVertexPosition;
			attribute vec3 aVertexNormal;
			attribute vec2 aTexCoord;
			uniform vec3 uAmbient;
			uniform vec3 uLightDirection;
			uniform vec3 uDirect;
			uniform mat3 uNormalMatrix;
			uniform mat4 uMVMatrix;
			uniform mat4 uPMatrix;
			varying vec2 vTexCoord;
			varying vec3 vLightWeighting;
			void main(void) {
				gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
				vTexCoord = aTexCoord;
				vec3 transformedNormal = uNormalMatrix * aVertexNormal;
				float directionalLightWeighting = max(dot(transformedNormal, uLightDirection), 0.0);
				vLightWeighting = uAmbient + uDirect * directionalLightWeighting;
			}
		"""
		fragment: """
			#ifdef GL_ES
			precision highp float;
			#endif
			uniform sampler2D uSampler;
			varying vec2 vTexCoord;
			varying vec3 vLightWeighting;
			void main(void) {
				vec4 unlightedColor = texture2D(uSampler, vTexCoord);
				gl_FragColor = vec4(unlightedColor.rgb * vLightWeighting, unlightedColor.a);
			}
		"""

