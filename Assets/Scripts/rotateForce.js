#pragma strict
private var circlePoint : Vector2;
private var currentPoint : Vector2;
private var directionPoint : Vector2;
private var rotateForce : Vector2;
private var speedRotate : Vector3;
private var currentVelocity:Vector3;
private var hasReachedCircle:boolean;
private var hasReachedOutCircle:boolean;
private var hasReachedGround:boolean;
private var startPosition:Vector3;
//var explosionEmitter:ParticleEmitter;
//var groundCollider:Collider;
var explosionPrefab : Transform;
var circle:GameObject;
var ballPrefab:GameObject;
var newGameObject:GameObject;
var ballString : String;
private var ballStringLength : int;

function Start () {
	circlePoint.x = circle.transform.position.x;
	circlePoint.y = circle.transform.position.z;
	ballString = gameObject.name;
	ballStringLength = ballString.Length;
	hasReachedCircle = false;
	hasReachedOutCircle = false;
	hasReachedGround = false;
	startPosition = gameObject.transform.position;
	ballPrefab = Resources.Load(ballString);
	gameObject.name = ballString;
	//gameObject.rigidbody.velocity = Vector3(-3.3,0,-4);
	
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
		if(groundCollider.gameObject.name == "groud02"){
			//Debug.Log("Collision event happened!");
	    	// Rotate the object so that the y-axis faces along the normal of the surface    
	    	var contact : ContactPoint = groundCollider.contacts[0];    
	    	var rot : Quaternion = Quaternion.FromToRotation(Vector3.up, contact.normal);   
	    	var pos : Vector3 = contact.point;    
	    	Instantiate(explosionPrefab, pos, rot);    
	    	// Destroy the projectile    
	    	Destroy (gameObject);
	    	hasReachedGround = false;  
	    	hasReachedCircle = false;    
			newGameObject = Instantiate(ballPrefab, startPosition, gameObject.transform.rotation);  
			newGameObject.name = ballPrefab.name.Substring(0,ballStringLength);
			//Debug.Log(newGameObject.name);
		}		
	}
	if(groundCollider.gameObject.name == "testCollisionBall"){
		var contact1 : ContactPoint = groundCollider.contacts[0];    
	    var rot1 : Quaternion = Quaternion.FromToRotation(Vector3.up, contact1.normal);   
	    var pos1 : Vector3 = contact1.point;    
	    Instantiate(explosionPrefab, pos1, rot1);    
	    // Destroy the projectile    
	    Destroy (gameObject);
	    hasReachedGround = false;  
	    hasReachedCircle = false; 
	    newGameObject = Instantiate(ballPrefab, startPosition, gameObject.transform.rotation);  
		newGameObject.name = ballPrefab.name.Substring(0,ballStringLength);  
		//Debug.Log(newGameObject.name);
	}
}

function IsInCircleRange()
{
	var deltaX = currentPoint.x - circlePoint.x;
	var deltaY = currentPoint.y - circlePoint.y;
	var delta = deltaX * deltaX + deltaY * deltaY;
	//Debug.Log(delta);
	if(delta < 90)
	{
		return true;
	}
	return false;
}