#pragma strict

var arrow : GameObject;
var arrowSpawn : Transform;
var fireArrow = true;


function Update ()
{
		if (Input.GetButton("Fire1") && fireArrow == true)
		{
			Fire();			
		}		
}


function Fire ()
{

	var spawnPoint:Transform;
	var shootArrow = Instantiate (arrow, spawnPoint.position, Quaternion.identity);
	shootArrow.GetComponent.<Rigidbody>().AddForce(transform.forward * 500);
	Instantiate(arrow, transform.position, transform.rotation);
	fireArrow = false;
	Timer();

}

function Timer()
{
		if (fireArrow ==false)
		{
			yield WaitForSeconds (.1);
			fireArrow = true;
		}

}