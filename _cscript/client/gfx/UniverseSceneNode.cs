smio = global.smoothio

class smio.gfx.UniverseSceneNode extends CL3D.SceneNode

	@consts:
		astroDist: 149597870700
		earthDist: 49500000
		earthRadius: 6378100
		moonDist: 356400000
		moonRadius: 1738140
		sunRadius: 697000000

	constructor: (@engine) ->
		super(@engine)
		@init()
		@addChild(@debugOutput = new CL3D.Overlay2DSceneNode(@))
		@debugOutput.set2DPosition(0, 0, 840, 12)
		@debugOutput.setShowBackgroundColor(true, CL3D.createColor(255, 255, 255, 255))
		@debugOutput.FontName = '8;default;arial;normal;normal;false'
		@addChild(@ground = new smio.gfx.GroundSceneNode(@engine))
		@addChild(@fig1 = new smio.gfx.DummyAvatarSceneNode(@engine, 1, 3, 0, 49500000, 1.6))
		@addChild(@curFig = @fig2 = new smio.gfx.DummyAvatarSceneNode(@engine, 2, -3, 0, 49500000, 1.9))
		@fig2.addChild(@cam = new CL3D.CameraSceneNode())
		@cam.Pos.X = 0
		@cam.Pos.Y = @curFig.head.Pos.Y
		@cam.Pos.Z = -3.5
		@cam.setTarget(@curFig.head.getAbsolutePosition())
		@cam.updateAbsolutePosition()
		@camFar = true

	camSettings: (aspectRatio, fieldOfView, farValue, nearValue) =>
		obj = @
		if fieldOfView?
			obj.cam.setFov(fieldOfView)
		if aspectRatio?
			obj.cam.setAspectRatio(aspectRatio)
		if farValue?
			obj.cam.setFarValue(farValue)
		if nearValue?
			obj.cam.setNearValue(nearValue)

	OnRegisterSceneNode: (scene) =>
		scene.registerNodeForRendering(@, CL3D.Scene.RENDER_MODE_DEFAULT)
		super(scene)

	render: (r) =>
		[updatePos, pi, cam] = [false, Math.PI, @cam]
		pressed = (keyCode) =>
			#document.title = JSON.stringify @engine.pressedKeys
			_.contains(@engine.pressedKeys, keyCode)
		moveDiff = (step = 0.3) ->
			step * (if pressed(16) then 10 else 1)
		moveDiffXZ = (step = 0.05) =>
			rad = CL3D.degToRad(@curFig.Rot.Y)
			mult = if pressed(16) then 44 else 1
			[Math.sin(rad) * step * mult, Math.cos(rad) * step * mult]
		rotate = (deg) =>
			cy = @curFig.Rot.Y
			y = cy + deg
			if (y < 0)
				y = 360 + cy
			if (y > 360)
				y = cy - 360
			@curFig.Rot.Y = y
		if pressed(37) and not pressed(39)
			rotate(-3)
			updatePos = true
		if pressed(39) and not pressed(37)
			rotate(3)
			updatePos = true
		if pressed(38) and not pressed(40)
			if pressed(17)
				@curFig.Pos.Y += moveDiff()
			else
				xz = moveDiffXZ()
				@curFig.Pos.X += xz[0]
				@curFig.Pos.Z += xz[1]
			updatePos = true
		if pressed(40) and not pressed(38)
			if pressed(17)
				@curFig.Pos.Y -= moveDiff()
				if (@curFig.Pos.Y < 0)
					@curFig.Pos.Y = 0
			else
				xz = moveDiffXZ()
				@curFig.Pos.X -= xz[0]
				@curFig.Pos.Z -= xz[1]
			updatePos = true
		if updatePos
			@curFig.updateAbsolutePosition()
		near = [2.25, 0.5]
		far = [3.5, 0.5]
		self = [0, 0]
		cur = if @camFar then far else near
		cam.setTarget(@curFig.head.getAbsolutePosition())
		cam.Pos.Z = -cur[0]
		cam.updateAbsolutePosition()
		@debugOutput.setText("X=#{parseInt(@curFig.Pos.X)} Y=#{parseInt(@curFig.Pos.Y)} Z=#{parseInt(@curFig.Pos.Z)} R=#{@curFig.Rot.Y}")
		r.setWorld(@getAbsoluteTransformation())
		super(r)

