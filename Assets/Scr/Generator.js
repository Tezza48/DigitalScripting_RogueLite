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

	DrunkenWalk();
}

function DrunkenWalk()
{
	var clearedCells = 0;
	var startPosition : Vector2 = new Vector2(Random.Range(1, width-1), Random.Range(1, height-1));
	var lastPosition : Vector2 = startPosition;
	
	cells[startPosition.x, startPosition.y] = 0;

	var tries = 100;
	while(clearedCells < cellsToClear && tries < 10000)
	{
		//pick the position to walk in
		var direction;
		var currentPosition : Vector2;
		var isValid = false;
		while(!isValid)
		{
			direction = Random.Range(0, 4);
			switch (direction)
			{
				case 0:
					currentPosition = new Vector2(lastPosition.x, lastPosition.y + 1);
					isValid = (currentPosition.y < height - 1);
					break;
				case 1:
					currentPosition = new Vector2(lastPosition.x + 1, lastPosition.y);
					isValid = (currentPosition.x < width - 1);
					break;
				case 2:
					currentPosition = new Vector2(lastPosition.x, lastPosition.y - 1);
					isValid = (currentPosition.y > 0);
					break;
				case 3:
					currentPosition = new Vector2(lastPosition.x - 1, lastPosition.y);
					isValid = (currentPosition.x > 0);
					break;
			}
		}
		
		if(cells[currentPosition.x, currentPosition.y] == 1)
		{
			cells[currentPosition.x, currentPosition.y] = 0;
			clearedCells++;
		}
		lastPosition = currentPosition;
		tries++;
	}

	for(var y = 0; y < height; y++)
	{
		for(var x = 0; x < width; x++)
		{
			var currentCell = cells[x, y];
			switch (currentCell) {
				case 0:
					Instantiate(FloorPrefab, new Vector3(x, 0, y), Quaternion.identity);
					break;
				case 1:
					Instantiate(WallPrefab, new Vector3(x, 0, y), Quaternion.identity);
					break;
			}
		}
	}
}
