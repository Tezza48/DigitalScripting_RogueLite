#pragma strict
var minDistance = 10;
var maxDistance = 50;
var moveSpeed = 5;
var Player : Transform;

function Start(){
	//if (Player == null)
	//	Player = Transform.FindWithTag ("Player");
}


function Update()
{

		if (Vector3.Distance(transform.position, Player.position) >= minDistance);
		{
			transform.position += transform.forward * moveSpeed * Time.deltaTime;
		}	
			
			if(Vector3.Distance(transform.position, Player.position) <= maxDistance)
				{
		
		}
	}


