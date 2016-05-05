#pragma strict

var arrow : Transform;
var arrowSpawn : Transform;
var fireArrow = true;


function Update ()
{
		if fireArrow == true
		{
			Fire();			
		}		
}


function Fire ()
{

	var shootArrow = Instantiate (arrow, spawnPoint.position, Quaternion.identity);
	shootArrow.rigidbody.AddForce(transform.forward * 500);
	fireArrow = false;
	Timer();

}

function Timer()
{
		if (fireArrow ==false)
		{
			yield WaitForSeconds (5);
			fireArrow = true;
		}

}