#pragma strict
import System.Collections.Generic;

@Header("Settings")
@Range(10, 100)
public var width : int = 30;
@Range(10, 100)
public var height : int = 30;
@Range(10, 900)
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
private var spawnedPlayer : GameObject;

function Start ()
{
	//initialise arrays and lists and stuff
	cells = new int[width,height];
	
	dungeonParent = new GameObject("Dungeon");
	
	enemySpawns = new List.<Vector3>();
	
	spawnedWalls = new List.<GameObject>();
	spawnedFloors = new List.<GameObject>();
	spawnedEnemies = new List.<GameObject>();
	spawnedTorches = new List.<GameObject>();

	SpawnNextDungeon(false);
}

function Update () 
{
	if(Input.GetKeyUp(KeyCode.Space))
		SpawnNextDungeon(true);
}

function SpawnNextDungeon(clear)
{
	if (clear)
		ClearDungeon();
	DrunkenWalk();
	AddTorches();
	AddEnemies();	
	AddPlayer();
}

function DrunkenWalk()
{
	var x = 0;
	var y = 0;
	//init cells
	for(y = 0; y < height; y++)
	{
		for(x = 0; x < width; x++)
		{
			//1 is a wall
			cells[x,y] = 1;
		}
	}
	
	//count the number of cells we've cleared
	var clearedCells = 1;
	var startPosition : Vector2 = new Vector2(Mathf.Max(width / 2), Mathf.Max(height / 2));
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
	//counters for using the object pools
	var floorCounter = 0;
	var wallCounter = 0;
	for(y = 0; y < height; y++)
	{
		for(x = 0; x < width; x++)
		{
			var newTile : GameObject;
			var currentCell = cells[x, y];
			switch (currentCell) {
				case 0:
					if (floorCounter < spawnedFloors.Count) 
					{
						//move the floor
						//newTile = spawnedFloors[floorCounter];
						spawnedFloors[floorCounter].SetActive(true);
						spawnedFloors[floorCounter].transform.position = new Vector3(x, 0, y);
					}
					else
					{
						//isntantiate the floor prefab
						newTile = Instantiate(FloorPrefab, new Vector3(x, 0, y), Quaternion.identity);
						//add that tile to a list to help with respawning the dungeon, could use this as an object pool for optimisation.
						spawnedFloors.Add(newTile);
						//make the tile a child of a parent object to make the hierarchy more tidy
						newTile.transform.SetParent(dungeonParent.transform);
					}
					floorCounter++;
					break;
				case 1:
					if (wallCounter < spawnedWalls.Count)
					{
						//newTile = spawnedWalls[wallCounter];
						spawnedWalls[wallCounter].SetActive(true);
						spawnedWalls[wallCounter].transform.position = new Vector3(x, 0, y);
					}
					else
					{
						//instantiate the wall prefab
						newTile = Instantiate(WallPrefab, new Vector3(x, 0, y), Quaternion.identity);
						spawnedWalls.Add(newTile);
						//make the tile a child of a parent object to make the hierarchy more tidy
						newTile.transform.SetParent(dungeonParent.transform);
					}
					wallCounter++;
					break;
			}
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
	//spawn torches at those positions
	var torchCounter = 0;
	var newTorch : GameObject;
	for (i = 0; i < openSpaces.Count; i++)
	{
		if (torchCounter < spawnedTorches.Count)
		{
			spawnedTorches[torchCounter].SetActive(true);
			spawnedTorches[torchCounter].transform.position = openSpaces[i];
		}
		else
		{
			newTorch = Instantiate(TorchPrefab, openSpaces[i], Quaternion.identity);
			newTorch.transform.SetParent(dungeonParent.transform);
			spawnedTorches.Add(newTorch);
		}
		torchCounter++;
	}
}

function AddEnemies ()
{
	//make a list of positions from the list of spawned floors
	var openSpaces = new List.<Vector3>();
	var i : int;
	for (i = 0; i < spawnedFloors.Count; i++)
	{
		openSpaces.Add(spawnedFloors[i].transform.position);
	}
	//randomly remove open spaces until we have the desired number of spawns
	while (openSpaces.Count > enemiesToSpawn)
	{
		i = Random.Range(0, openSpaces.Count);
		openSpaces.RemoveAt(i);
	}
	//spawn torches at those positions
	var enemyCounter = 0;
	var newEnemy : GameObject;
	for (i = 0; i < openSpaces.Count; i++)
	{
		if (enemyCounter < spawnedEnemies.Count)
		{
			spawnedEnemies[enemyCounter].SetActive(true);
			spawnedEnemies[enemyCounter].transform.position = openSpaces[i];
		}
		else
		{
			newEnemy = Instantiate(EnemyPrefab, openSpaces[i], Quaternion.identity);
			newEnemy.transform.SetParent(dungeonParent.transform);
			spawnedEnemies.Add(newEnemy);
		}
		enemyCounter++;
	}
}

function AddPlayer () 
{
	//get the index for a random floor tile;
	var randTileIndex = Random.Range(0, spawnedFloors.Count);
	var spawnPos = spawnedFloors[randTileIndex].transform.position + Vector3.up/2;
	if (spawnedPlayer == null)
		spawnedPlayer = Instantiate(PlayerPrefab, spawnPos, Quaternion.identity);
	else
		spawnedPlayer.transform.position = spawnPos;
}

function ClearDungeon()
{
	var i : int;
	cells = new int[width, height];
	//clear Walls
	for (i = 0; i < spawnedFloors.Count; i++)
	{
		spawnedFloors[i].SetActive(false);
	}
	//clear Floors
	for (i = 0; i < spawnedWalls.Count; i++)
	{
		spawnedWalls[i].SetActive(false);
	}
	/*
	//clear Enemies
	for (i = 0; i < spawnedEnemies.Count; i++)
	{
		Destroy(spawnedEnemies[i]);
	}
	*/
	//clear Torches
	for (i = 0; i < spawnedTorches.Count; i++)
	{
		spawnedTorches[i].SetActive(false);
	}
}
