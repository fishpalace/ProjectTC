#pragma strict
var circlePoint : Vector2;
var currentPoint : Vector2;
var directionPoint : Vector2;
var rotateForce : Vector2;
var speedRotate : Vector3;
var currentVelocity:Vector3;
var hasReachedCircle:boolean;
var hasReachedOutCircle:boolean;
var hasReachedGround:boolean;
//var explosionEmitter:ParticleEmitter;
//var groundCollider:Collider;
var explosionPrefab : Transform;
var circle:GameObject;

function Start () {
	circlePoint.x = circle.transform.position.x;
	circlePoint.y = circle.transform.position.z;
	hasReachedCircle = false;
	hasReachedOutCircle = false;
	hasReachedGround = false;
}

function Update () 
{
	currentPoint.x = gameObject.rigidbody.position.x;
	currentPoint.y = gameObject.rigidbody.position.z;
	var deltaX = circlePoint.x - currentPoint.x;
	var deltaY = circlePoint.y - currentPoint.y;
	var direcY = 1.0;
	var direcX = currentPoint.x + (deltaY / deltaX) * currentPoint.y - deltaY / deltaX;
	directionPoint.x = direcX - currentPoint.x;
	directionPoint.y = 1.0 - currentPoint.y;
	rotateForce.x = directionPoint.x;
	rotateForce.y = directionPoint.y;
	currentVelocity = gameObject.rigidbody.velocity;
	//Debug.Log(currentVelocity);
	if(IsInCircleRange())
	{
		var vX = gameObject.rigidbody.velocity.x;
		var vZ = gameObject.rigidbody.velocity.z;
		var V = vX * vX + vZ * vZ;
		transform.RotateAround (circle.transform.position, Vector3.up, 60 * Time.deltaTime);
	}
}


function OnCollisionEnter(groundCollider : Collision){
	if(groundCollider.gameObject.name == "circle")
	{
		
		hasReachedCircle = true;
		hasReachedGround = true;
	}
	if(hasReachedGround){
		if(groundCollider.gameObject.name == "groud"){
			//Debug.Log("Collision event happened!");
	    	// Rotate the object so that the y-axis faces along the normal of the surface    
	    	var contact : ContactPoint = groundCollider.contacts[0];    
	    	var rot : Quaternion = Quaternion.FromToRotation(Vector3.up, contact.normal);   
	    	var pos : Vector3 = contact.point;    
	    	Instantiate(explosionPrefab, pos, rot);    
	    	// Destroy the projectile    
	    	Destroy (gameObject);
		}		
	}
	if(groundCollider.gameObject.name == "obj_eye_ball"){
		var contact1 : ContactPoint = groundCollider.contacts[0];    
	    var rot1 : Quaternion = Quaternion.FromToRotation(Vector3.up, contact1.normal);   
	    var pos1 : Vector3 = contact1.point;    
	    Instantiate(explosionPrefab, pos1, rot1);    
	    // Destroy the projectile    
	    Destroy (gameObject);
	}
}

function IsInCircleRange()
{
	var deltaX = currentPoint.x - circlePoint.x;
	var deltaY = currentPoint.y - circlePoint.y;
	var delta = deltaX * deltaX + deltaY * deltaY ;
	//Debug.Log(delta);
	if(delta < 90)
	{
		return true;
	}
	return false;
}