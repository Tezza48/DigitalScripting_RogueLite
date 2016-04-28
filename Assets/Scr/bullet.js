#pragma strict

public var Bullet: GameObject;
public var speed = 20;

function Start ()
{
if (Bullet == null)
	Bullet = GameObject.FindWithTag ("Bullet");
}

function Update ()
{
	if (Input.GetButtonDown("Fire1"))
	{
		var clone : GameObject;
		clone = Instantiate (Bullet, transform.position, transform.rotation);
		
		clone.GetComponent.<Rigidbody>().velocity = transform.TransformDirection (Vector3.forward * speed);
	}
}