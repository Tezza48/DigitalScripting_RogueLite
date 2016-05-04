#pragma strict
public var ref : enemy_follow;
public var speed : float;

function Awake () 
{
	
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


