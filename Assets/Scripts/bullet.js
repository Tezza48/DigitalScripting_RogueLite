#pragma strict
public static var enemyHealth : enemy_follow;
public var speed : float;

function Awake () 
{
	if(enemyHealth == null)
	{
	enemyHealth = GetComponent(enemy_follow);
	}
}

function OnCollisionEnter (col : Collision)
{
    if(col.gameObject.tag == "hitBox")
	{
		enemyHealth.Damage();
	}
	else if(col.gameObject.name == "DebugEnemy(Clone)")
    {
		Destroy(this.gameObject);
	}
	
    else if(col.gameObject.name == "wall_tile(Clone)")
    {
        Destroy(this.gameObject);
    }
}
/*
function OnTriggerEnter (other : Collider)
{
	if(other.gameObject.name == "hitBox")
	{
		enemyHealth.Health --;
	}
}
*/

