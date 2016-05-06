#pragma strict
public var Enemy : GameObject;
public var speed : float;
public var enemystats: enemy_follow;

function Awake () 
{
	//if(Enemy == null)
	//{
	//Enemy = GameObject.FindWithTag();
	//}
}

function OnCollisionEnter (col : Collision)
{
	if(col.gameObject.name == "DebugEnemy(Clone)")
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
		Enemy = transform.getchild(0);
	}
	if(Enemy != null)
	{
		enemystats = Enemy.GetComponent(enemy_follow);
	}
		enemystats.Health--;
		Destroy(this.gameObject);
	}
*/

