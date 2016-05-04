#pragma strict

public var speed : float;

static var score : int = 0;

 

function Awake () 
{ 	

GetComponent.<Rigidbody>().AddForce(transform.forward * speed);

}

function OnBecameInvisible () 

{
	
	Destroy(gameObject);

}



