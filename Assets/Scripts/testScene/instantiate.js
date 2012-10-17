#pragma strict
var ball : Rigidbody;
var ballPoint : Transform;

function Start () {

}

function Update () {
	if(Input.GetMouseButtonUp(0)){
	// Instantiate the projectile at the position and rotation of this transform        
	var clone : Rigidbody;  
	clone = Instantiate(ball, ballPoint.transform.position, ballPoint.transform.rotation);                
	// Give the cloned object an initial velocity along the current         
	// object's Z axis     
	clone.velocity = Vector3(25,0,25);
	}	
}