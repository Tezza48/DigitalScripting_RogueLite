#pragma strict

public var speed : float;

static var score : int = 0;

 

function Start () 
{ 	

GetComponent.<Rigidbody2D>().AddForce(transform.forward * speed);

}

function OnBecameInvisible () 

{
	
	Destroy(gameObject);

}



