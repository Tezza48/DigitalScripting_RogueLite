#pragma strict

public var ref : enemy_follow;

function Start () 
{
	if (ref == null)
	{
		ref = transform.parent.gameObject.GetComponent(enemy_follow); 
	}
}

function Update () 
{

}
function OnTriggerEnter (other : Collider)
{
	if(other.gameObject.name == "hitBox")
	{
		Damage();
	}
}
function Damage ()
{
	ref.Health--;
}