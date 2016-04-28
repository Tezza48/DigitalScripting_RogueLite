#pragma strict
import System.Collections.Generic;

@Header("Settings")
@Range(10, 50)
public var width : int = 30;
@Range(10, 50)
public var height : int = 30;
@Range(10, 3000)
public var cellsToClear : int = 500;
@Range (0, 100)
public var torchesToPlace : int = 30;

public var enemiesToSpawn : int;

@Header("Prefabs")
public var WallPrefab : GameObject;
public var FloorPrefab : GameObject;
public var EnemyPrefab : GameObject;
public var TorchPrefab : GameObject;
public var PlayerPrefab : GameObject;

private var cells : int[,];
private var dungeonParent : GameObject;
private var enemySpawns : List.<Vector3>;

private var spawnedWalls : List.<GameObject>;
private var spawnedFloors : List.<GameObject>;
private var spawnedEnemies : List.<GameObject>;
private var spawnedTorches : List.<GameObject>;

function Start ()
{
	//initialise arrays and lists and stuff
	cells = new int[width,height];
	
	dungeonParent = new GameObject("Dungeon");
	
	enemySpawns = new List.<Vector3>();
	
	spawnedWalls = new List.<GameObject>();
	spawnedFloors = new List.<GameObject>();
	spawnedTorches = new List.<GameObject>();
	
	//init cells
	for(var y = 0; y < height; y++)
	{
		for(var x = 0; x < width; x++)
		{
			//1 is a wall
			cells[x,y] = 1;
		}
	}

	SpawnNextDungeon();
}

function SpawnNextDungeon()
{
	//ClearDungeon();
	DrunkenWalk();
	AddTorches();
}

function DrunkenWalk()
{
	//count the number of cells we've cleared
	var clearedCells = 0;
	var startPosition : Vector2 = new Vector2(Random.Range(1, width-1), Random.Range(1, height-1));
	var lastPosition : Vector2 = startPosition;
	
	cells[startPosition.x, startPosition.y] = 0;

	//generation
	var tries = 100;
	while(clearedCells < cellsToClear && tries < 10000)
	{
		//pick the position to walk in
		var direction;
		var currentPosition : Vector2;
		var isValid = false;
		//do this until the new direction dosn't collide with the bounds
		while(!isValid)
		{
			//pick a random direction
			direction = Random.Range(0, 4);
			switch (direction)
			{
				case 0:
					//make a vector to use later
					currentPosition = new Vector2(lastPosition.x, lastPosition.y + 1);
					//is this position in the bounds ot the graph
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
		//make the selected cell a floor and incriment the number of cells cleared
		if(cells[currentPosition.x, currentPosition.y] == 1)
		{
			cells[currentPosition.x, currentPosition.y] = 0;
			clearedCells++;
		}
		lastPosition = currentPosition;
		//the tries counter makes sure that the loop does not continue forever
		tries++;
	}

	//instantiation
	for(var y = 0; y < height; y++)
	{
		for(var x = 0; x < width; x++)
		{
			var newTile : GameObject;
			var currentCell = cells[x, y];
			switch (currentCell) {
				case 0:
					//isntantiate the floor prefab
					newTile = Instantiate(FloorPrefab, new Vector3(x, 0, y), Quaternion.identity);
					//add that tile to a list to help with respawning the dungeon, could use this as an object pool for optimisation.
					spawnedFloors.Add(newTile);
					break;
				case 1:
					//instantiate the wall prefab
					newTile = Instantiate(WallPrefab, new Vector3(x, 0, y), Quaternion.identity);
					spawnedWalls.Add(newTile);
					break;
			}
			//make the tile a child of a parent object to make the hierarchy more tidy
			newTile.transform.SetParent(dungeonParent.transform);
		}
	}
}

function AddTorches()
{
	//make a list of positions from the list of spawned floors
	var openSpaces = new List.<Vector3>();
	var i : int;
	for (i = 0; i < spawnedFloors.Count; i++)
	{
		openSpaces.Add(spawnedFloors[i].transform.position);
	}
	//randomly remove open spaces until we have the desired number of spawns
	while (openSpaces.Count > torchesToPlace)
	{
		i = Random.Range(0, openSpaces.Count);
		openSpaces.RemoveAt(i);
	}
	//spawn torches at topse positions
	for (i = 0; i < openSpaces.Count; i++)
	{
		Instantiate(TorchPrefab, openSpaces[i], Quaternion.identity);
	}
}

function ClearDungeon()
{
	var i : int;
	//clear Walls
	for (i = 0; i < spawnedFloors.Count; i++)
	{
		Destroy(spawnedFloors[i]);
	}
	//clear Floors
	for (i = 0; i < spawnedWalls.Count; i++)
	{
		Destroy(spawnedWalls[i]);
	}
	//clear Enemies
	for (i = 0; i < spawnedEnemies.Count; i++)
	{
		Destroy(spawnedEnemies[i]);
	}
	//clear Torches
	for (i = 0; i < spawnedTorches.Count; i++)
	{
		Destroy(spawnedTorches[i]);
	}
}
