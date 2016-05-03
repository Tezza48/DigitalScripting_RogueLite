 #pragma strict

var Target : GameObject;
var distanceFromTarget : float;
 
function Start () {
if (Target == null)
	{
		Target = GameObject.FindWithTag ("Player");
	}
}

function Update () 
{
	if (Target == null)
	{
		Target = GameObject.FindWithTag ("Player");
	}
transform.LookAt (Target.transform);

	 var difference:Vector3 = transform.position - Target.transform.position;
	 var distance:float = difference.magnitude;
	 
	 if ( distance <= distanceFromTarget )
	 	transform.position = Vector3.MoveTowards(transform.position, Target.transform.position, .1);
}