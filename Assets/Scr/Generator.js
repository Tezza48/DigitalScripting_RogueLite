#pragma strict

@Header("Settings")
public var width : int = 30;
public var height : int = 30;
public var cellsToClear : int = 500;

@Header("Prefabs")
public var WallPrefab : GameObject;
public var FloorPrefab : GameObject;

private var cells : int[,];

function Start ()
{
	//initialise the cells
	cells = new int[width,height];
	for(var y = 0; y < height; y++)
	{
		for(var x = 0; x < width; x++)
		{
			//1 is a wall
			cells[x,y] = 1;
		}
	}
}

function DrunkenWalk()
{
	var clearedCells = 0;
	var startPosition : Vector2 = new Vector2(Random.Range(1, width), Random.Range(1, height));
	var lastposition : Vector2 = startPosition;

	cells[startPosition.x, startPosition.y] = 0;

	while(clearedCells < cellsToClear)
	{
		var currentCell = cells[lastposition.x, lastposition.y];
		if(currentCell == 1)
		{
			currentCell = 0;
			clearedCells++;
		}
	}

	for(var y = 0; y < height; y++)
	{
		for(var x = 0; x < width; x++)
		{

		}
	}
}
