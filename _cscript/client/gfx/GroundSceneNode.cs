smio = global.smoothio

class smio.gfx.GroundSceneNode extends CL3D.SceneNode

	constructor: (@engine) ->
		super(@engine)
		@init()
		@mppsEq =
			0:
				18: 0.597164
				17: 1.194329
				16: 2.388657
				15: 4.777314
				14: 9.554629
				13: 19.109257
				12: 38.218514
				11: 76.437028
				10: 152.874057
				9: 305.748113
				8: 611.496226
				7: 1222.992453
				6: 2445.984905
				5: 4891.969810
				4: 9783.939621
				3: 19567.879241
				2: 39135.758482
		@sectors = [[null, null, null], [null, null, null], [null, null, null]]
		@init()

	OnRegisterSceneNode: (scene) =>
		scene.registerNodeForRendering(@, CL3D.Scene.RENDER_MODE_DEFAULT)
		super(scene)

	mapPositionFromLatLong: (lat, lon) =>
		pos = smio.Util.Geo.mercator(lat, lon, @mapWidth, @mapHeight)
		document.title = JSON.stringify pos
		pos.x = @mapWidthHalf - pos.x
		pos.y = pos.y - @mapHeightHalf
		pos

	mapPositionToLatLong: (x, z) =>
		lat: 0, lon: 0

	render: (renderer) =>
		@updateSectors()
		renderer.setWorld(@getAbsoluteTransformation())
		#renderer.drawMesh(@mesh)

	toTileLon: (x, y, zoom2, pi) ->
		x / zoom2 * 360 - 180

	toTileLat: (x, y, zoom2, pi) ->
		(Math.atan(smio.Util.Number.sinh(pi * (1 - 2 * y / zoom2)))) * 180 / pi

	toTileNumX: (lon, zoom2, noInt) ->
		r = ((lon + 180) / 360) * zoom2
		if noInt then r else parseInt(r)

	toTileNumY: (lon, lat, latRad, zoom2, pi, noInt) ->
		r = (1 - (Math.log(Math.tan(latRad) + smio.Util.Number.secant(latRad)) / pi)) / 2 * zoom2
		if noInt then r else parseInt(r)

	updateSectors: () =>
		[fig, goalSect, goalSectRow, goalSectCell] = [@engine.universe.curFig, null, -1, -1]
		[zoom, zoom2, pi, x, y, z, lon, lat, latRad] = [18, Math.pow(2, 18), Math.PI, fig.Pos.X, fig.Pos.Z, fig.Pos.Z, fig.posLon, fig.posLat, fig.posLatRad]
		if not @mppsEq[lat]
			@mppsEq[lat] = {}
			for zl, mp of @mppsEq[0]
				@mppsEq[lat][zl] = mp / Math.cos(lat * pi / 180)
		mpp = @mppsEq[lat][zoom]
		[sectorSize, tileNumX, tileNumY] = [mpp * 256, @toTileNumX(lon, zoom2), @toTileNumY(lon, lat, latRad, zoom2, pi)]
		for row in [0..2]
			for cell in [0..2]
				if (sect = @sectors[row][cell]) and sect.tileNumX is tileNumX and sect.tileNumY is tileNumY
					[goalSect, goalSectRow, goalSectCell] = [sect, row, cell]
					break
		if not goalSect
			for row in [0..2]
				for cell in [0..2]
					@unloadSector(row, cell)
		else if goalSectRow isnt 1 or goalSectCell isnt 1
			if goalSectRow isnt 1 and goalSectCell isnt 1
				if goalSectRow is goalSectCell
					other = if (goalSectRow is 0) then 2 else 0
					@sectors[other][other] = @sectors[1][1]
					@sectors[other][1] = @sectors[1][goalSectRow]
					@sectors[1][other] = @sectors[goalSectRow][1]
				else if goalSectRow is 0 and goalSectCell is 2
					@sectors[1][0] = @sectors[0][1]
					@sectors[2][0] = @sectors[1][1]
					@sectors[2][1] = @sectors[1][2]
				else if goalSectRow is 2 and goalSectCell is 0
					@sectors[0][1] = @sectors[1][0]
					@sectors[0][2] = @sectors[1][1]
					@sectors[1][2] = @sectors[2][1]
				@sectors[1][1] = @sectors[goalSectRow][goalSectCell]
				if goalSectRow is goalSectCell
					@unloadSector(0, 2)
					@unloadSector(2, 0)
				else
					@unloadSector(0, 0)
					@unloadSector(2, 2)
				@sectors[1][goalSectCell] = null
				@sectors[goalSectRow][goalSectCell] = null
				@sectors[goalSectRow][1] = null
			else if goalSectRow isnt 1
				other = if (goalSectRow is 0) then 2 else 0
				for i in [0..2]
					@unloadSector(other, i)
				for i in [0..2]
					@sectors[other][i] = @sectors[1][i]
				for i in [0..2]
					@sectors[1][i] = @sectors[goalSectRow][i]
				for i in [0..2]
					@sectors[goalSectRow][i] = null
			else if goalSectCell isnt 1
				other = if (goalSectCell is 0) then 2 else 0
				for i in [0..2]
					@unloadSector(i, other)
				for i in [0..2]
					@sectors[i][other] = @sectors[i][1]
				for i in [0..2]
					@sectors[i][1] = @sectors[i][goalSectCell]
				for i in [0..2]
					@sectors[i][goalSectCell] = null
		for row in [1, 0, 2]
			for cell in [1, 0, 2]
				isGoalSect = row is 1 and cell is 1
				[tx, ty] = [(if isGoalSect then tileNumX else (tileNumX + (-1 + cell))), (if isGoalSect then tileNumY else (tileNumY + (-1 + row)))]
				if not (sect = @sectors[row][cell])
					@sectors[row][cell] = sect = new smio.gfx.SectorTileSceneNode(@engine, tx, ty, sectorSize)
				if ((sub = @engine.ctl.sub("map#{cell}#{row}")).attr('url') isnt (url = "http://c.tile.openstreetmap.org/18/#{sect.tileNumX}/#{sect.tileNumY}.png"))
					sub.attr('src', url)
				if isGoalSect and ((sub = @engine.ctl.sub('mapimg')).attr('url') isnt (url = "http://b.tile.openstreetmap.org/18/#{sect.tileNumX}/#{sect.tileNumY}.png"))
					sub.attr('src', url)
		document.title = "#{@sectors}"

	unloadSector: (row, cell) =>
		if (sect = @sectors[row][cell])
			@removeChild(sect)
			@sectors[row][cell] = null

