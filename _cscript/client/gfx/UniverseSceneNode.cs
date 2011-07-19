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
		@addChild(@fig1 = new smio.gfx.DummyAvatarSceneNode(@engine, 'wood', 0, 0, 0, 1.6))
		@addChild(@curFig = @fig2 = new smio.gfx.DummyAvatarSceneNode(@engine, 'roster', 92, 0, -123, 1.9))
		@fig2.addChild(@cam = new CL3D.CameraSceneNode())
		@cam.Pos.X = 0
		@cam.Pos.Y = @curFig.head.Pos.Y
		@cam.Pos.Z = -3.5
		@cam.setTarget(@curFig.head.getAbsolutePosition())
		@cam.updateAbsolutePosition()
		@camFar = true
		@busy = false
		@mouseLook = false

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

	render: (renderer) =>
		if not @busy
			@busy = true
			[updatePos, pi, cam, ydif] = [false, Math.PI, @cam, 0]
			prLeft = @engine.isKeyPressed(37)
			prTop = @engine.isKeyPressed(38)
			prRight = @engine.isKeyPressed(39)
			prDown = @engine.isKeyPressed(40)
			prShift = @engine.isKeyPressed(16)
			prCtrl = @engine.isKeyPressed(17)
			if @engine.isKeyPressed()
				@mouseLook = false
			moveDiff = -> 0.3 * (if prShift then 10 else 1)
			moveDiffXZ = (step = 0.05, noFast) =>
				rad = CL3D.degToRad(@curFig.Rot.Y)
				mult = if (prShift and not noFast) then 44 else 1
				[Math.sin(rad) * step * mult, Math.cos(rad) * step * mult]
			if prLeft and not prRight
				@curFig.rotate(-3)
				updatePos = true
			if prRight and not prLeft
				@curFig.rotate(3)
				updatePos = true
			if prTop and not prDown
				if prCtrl
					@curFig.Pos.Y += (ydif = moveDiff())
				else
					xz = moveDiffXZ()
					@curFig.Pos.X += xz[0]
					@curFig.Pos.Z += xz[1]
				updatePos = true
			if prDown and not prTop
				if prCtrl
					@curFig.Pos.Y += (ydif = -moveDiff())
				else
					xz = moveDiffXZ()
					@curFig.Pos.X -= xz[0]
					@curFig.Pos.Z -= xz[1]
				updatePos = true
			if updatePos
				@curFig.updateAbsolutePosition()
			headPos = @curFig.head.Pos
			mouseX = if @mouseLook then -(@engine.getMouseX() - (@engine.canvasSize.w2)) else 0
			mouseY = if @mouseLook then (@engine.getMouseY() - (@engine.canvasSize.h22)) else 0
			near = 2
			far = 4
			self = 0
			cur = if @camFar then far else near
			cam.Pos.Y = headPos.Y + 0.5 + (if mouseY is 0 then 0 else ((headPos.Y * 2) / (@engine.canvasSize.h / mouseY)))
			yval = (if mouseY is 0 then 0 else (cur / ((@engine.canvasSize.h15) / Math.abs(mouseY))))
			odiff = @engine.canvasSize.w4 - Math.abs(mouseX)
			diff = Math.abs(odiff)
			if mouseX < 0
				cam.Pos.X = -cur + (if diff is 0 then 0 else (cur / (@engine.canvasSize.w4 / diff)))
				if odiff < 0
					zfromx = cur + cam.Pos.X
				else
					zfromx = -cur - cam.Pos.X
			else
				cam.Pos.X = cur - (if diff is 0 then 0 else (cur / (@engine.canvasSize.w4 / diff)))
				if odiff < 0
					zfromx = cur - cam.Pos.X
				else
					zfromx =  -cur + cam.Pos.X
			if (zfromx < 0)
				if (finalz = zfromx + yval) > 0
					finalz = 0
			else
				if (finalz = zfromx - yval) < 0
					finalz = 0
			cam.Pos.Z = finalz
			tpos = @curFig.head.getAbsolutePosition()
			cam.setTarget(new CL3D.Vect3d(tpos.X, tpos.Y - (if cur is near then 0.1 else 0.5), tpos.Z))
			cam.updateAbsolutePosition()
			@debugOutput.setText("X=#{parseInt(@curFig.Pos.X)} Y=#{parseInt(@curFig.Pos.Y)} Z=#{parseInt(@curFig.Pos.Z)} R=#{@curFig.Rot.Y}")
			renderer.setWorld(@getAbsoluteTransformation())
			super(renderer)
			@busy = false

