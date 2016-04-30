#pragma strict
public var tag : GameObject;
public var speed : float = 10;
public var rotationSpeed : float = 10;
public var Shot : GameObject;



function Update()
{
	var newPos = new Vector3(Input.GetAxix("Horizontal"), 0f, Input.GetAxix("Vertical"));
	transform.position += newPos * Time.deltaTime * speed;
/*
	var pos = Camera.main.WorldToScreenPoint(transform.position); 
	var dir = Input.mousePosition - pos; 								// Follows the mouse and positions it towards it.
	var angle = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg;  
	transform.rotation = Quaternion.AngleAxis(angle, Vector3.forward); 
	
	var translation : float = Input.GetAxis ("Horizontal") * speed;
	var rotation : float = Input.GetAxis ("Vertical") * rotationSpeed;

	translation *= Time.deltaTime;
	rotation *= Time.deltaTime;

	transform.Translate (0,0, translation);
	transform.Translate (0, rotation, 0);

*/
}

if (Input.GetMouseButtonDown(0)){
		var newShot:GameObject = Instantiate(Shot, transform.position, transform.rotation) as GameObject;
	}
														

	


 
  
