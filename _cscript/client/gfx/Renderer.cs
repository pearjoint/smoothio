smio = global.smoothio

class smio.gfx.Renderer extends CL3D.CopperLicht

	constructor: (cid) ->
		super(cid, true, 30, true)
		if (@initRenderer())
			@addScene(@scene = new CL3D.Scene())
			@scene.setBackgroundColor(CL3D.createColor(1, 0, 0, 64))
			@scene.getRootSceneNode().addChild(@node = new smio.gfx.SceneNode(@))
			@node.addAnimator(new CL3D.AnimatorRotation(new CL3D.Vect3d(0, 0.6, 0.8)))
			@billboard = new CL3D.BillboardSceneNode()
			@billboard.setSize(20,20)
			@billboard.Pos.Y = 30
			@billboard.getMaterial(0).Tex1 = @getTextureManager().getTexture('/_/file/images/bg1.jpg', true)
			@billboard.getMaterial(0).Type = CL3D.Material.EMT_TRANSPARENT_ADD_COLOR
			@scene.getRootSceneNode().addChild(@billboard)
			@cam = new CL3D.CameraSceneNode()
			@cam.Pos.X = 50
			@cam.Pos.Y = 20
			@cam.addAnimator(@animator = new CL3D.AnimatorCameraFPS(@cam, @))
			@animator.lookAt(new CL3D.Vect3d(0, 20, 0))
			@scene.getRootSceneNode().addChild(@cam)
			@scene.setActiveCamera(@cam)

