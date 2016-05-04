 #pragma strict
var Health : int;
var Target : GameObject;
var distanceFromTarget : float;
 
function Start () 
	{
Health = 10;
	
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
	var rotation = transform.rotation;
	//var rotation = Quaternion.LookRotation(Target.transform.position, Vector3.up);
	//transform.rotation = rotation;
	 var difference:Vector3 = transform.position - Target.transform.position;
	 var distance:float = difference.magnitude;
	 
	 if ( distance <= distanceFromTarget )
	 	transform.position = Vector3.MoveTowards(transform.position, Target.transform.position, .1);
	if (Health <= 0)
	{
		Destroy(this.gameObject);

	}
}

function OnCollisionEnter (col : Collision)
{
    if(col.gameObject.name == "bullet(Clone)")
    {
		Health--;
    }
}