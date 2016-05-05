#pragma strict

var arrow : Transform;
var arrowSpawn : Transform;
var fireArrow = true;


function Update ()
{
		if (fireArrow == true)
		{
			Fire();			
		}		
}


function Fire ()
{

	var spawnPoint:Transform;
	var shootArrow = Instantiate (arrow, spawnPoint.position, Quaternion.identity);
	shootArrow.GetComponent.<Rigidbody>().AddForce(transform.forward * 500);
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