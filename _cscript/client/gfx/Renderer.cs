smio = global.smoothio

class smio.gfx.Renderer extends CL3D.CopperLicht

	constructor: (cid) ->
		super(cid, true, 30, true)
		if (@canvas = $("##{cid}")) and (@initRenderer())
			@addScene(@scene = new CL3D.Scene())
			@scene.setBackgroundColor(CL3D.createColor(255, 0, 0, 0))
			@scene.getRootSceneNode().addChild(@universe = new smio.gfx.UniverseSceneNode(@))
			@skybox = new CL3D.SkyBoxSceneNode()
			@skybox.getMaterial(0).Tex1 = @getTextureManager().getTexture('/_/file/images/univ2.png', true)
			@skybox.getMaterial(0).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR
			@skybox.getMaterial(1).Tex1 = @getTextureManager().getTexture('/_/file/images/univ1.png', true)
			@skybox.getMaterial(1).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR
			@skybox.getMaterial(2).Tex1 = @getTextureManager().getTexture('/_/file/images/univ1.png', true)
			@skybox.getMaterial(2).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR
			@skybox.getMaterial(3).Tex1 = @getTextureManager().getTexture('/_/file/images/univ2.png', true)
			@skybox.getMaterial(3).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR
			@skybox.getMaterial(4).Tex1 = @getTextureManager().getTexture('/_/file/images/univ1.png', true)
			@skybox.getMaterial(4).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR
			@skybox.getMaterial(5).Tex1 = @getTextureManager().getTexture('/_/file/images/univ2.png', true)
			@skybox.getMaterial(5).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR
			@scene.getRootSceneNode().addChild(@skybox)
			@cam = new CL3D.CameraSceneNode()
			@cam.setAspectRatio(@canvas.prop('width') / @canvas.prop('height'))
			@cam.setFov(45)
			@cam.Pos.X = 50
			@cam.Pos.Y = 20
			@animator = new CL3D.AnimatorCameraFPS(@cam, @)
			@cam.addAnimator(@animator)
			@animator.lookAt(new CL3D.Vect3d(0, 20, 0))
			@scene.getRootSceneNode().addChild(@cam)
			@scene.setActiveCamera(@cam)

