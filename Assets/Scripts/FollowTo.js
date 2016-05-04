#pragma strict
var Health : int;
var FollowCharacter : GameObject;
var distanceFromFollowCharacter : float;
 
function Start () 
{
GetComponent.<Renderer>().material.color = Color.magenta;
Health = 10;
}

function Update () {
transform.LookAt (FollowCharacter.transform);

	 var difference:Vector3 = transform.position - FollowCharacter.transform.position;
	 var distance:float = difference.magnitude;
	 
	 if ( distance <= distanceFromFollowCharacter )
	 	transform.position = Vector3.MoveTowards(transform.position, FollowCharacter.transform.position, .1);
	}
