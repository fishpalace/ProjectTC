#pragma strict
private var circlePoint : Vector2;
private var currentPoint : Vector2;
private var directionPoint : Vector2;
private var rotateForce : Vector2;
private var speedRotate : Vector3;
private var currentVelocity:Vector3;
private var hasReachedCircle:boolean;
private var hasRan:boolean;
private var hasReachedGround:boolean;
private var startPosition:Vector3;
private var lifeTime:float;
private var lastFrameSpeed:Vector3;
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
	hasRan = false;
	hasReachedGround = false;
	startPosition = gameObject.transform.position;
	ballPrefab = Resources.Load(ballString);
	gameObject.name = ballString;
	//gameObject.rigidbody.velocity = Vector3(-13,0,-2);
	
}
function FixedUpdate () 
{
	if(hasReachCircleArea())
	{
		hasReachedCircle = true;
		hasReachedGround = true;
	}
	JudgeLifeTime();
	CountLastFrameSpeed();
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
	if(IsInCircleRange())
	{
		var vX = gameObject.rigidbody.velocity.x;
		var vZ = gameObject.rigidbody.velocity.z;
		var V = vX * vX + vZ * vZ;
		transform.RotateAround (circle.transform.position, Vector3.up, 60 * Time.deltaTime);
	}
	else
	{
		if(hasReachedCircle)
		{
			gameObject.rigidbody.velocity = lastFrameSpeed;
		}
	}
	
}


function OnCollisionEnter(groundCollider : Collision){
	if(hasReachedGround){
		if(!hasReachCircleArea()){
			newBall();
		}		
	}
	if(groundCollider.gameObject.name == "testCollisionBall"){
		newBall();
	}
}

function IsInCircleRange()
{
	var deltaX = currentPoint.x - circlePoint.x;
	var deltaY = currentPoint.y - circlePoint.y;
	var delta = deltaX * deltaX + deltaY * deltaY;
	if(delta < 90)
	{
		return true;
	}
	return false;
}

function newBall()
{
	//Debug.Log("Collision event happened!");
	// Rotate the object so that the y-axis faces along the normal of the surface    
	/*var contact : ContactPoint = groundCollider.contacts[0];    
	var rot : Quaternion = Quaternion.FromToRotation(Vector3.up, contact.normal);   
	var pos : Vector3 = contact.point;    */
	Instantiate(explosionPrefab, gameObject.transform.position, gameObject.transform.rotation);    
	// Destroy the projectile    
    Destroy (gameObject);
	hasReachedGround = false;  
	hasReachedCircle = false;    
	newGameObject = Instantiate(ballPrefab, startPosition, gameObject.transform.rotation);  
	newGameObject.name = ballPrefab.name.Substring(0,ballStringLength);
}

function hasReachCircleArea()
{
	var size : float = 9.0;
	if(gameObject.transform.position.x > circle.transform.position.x - size &&
		gameObject.transform.position.x < circle.transform.position.x + size &&
		gameObject.transform.position.y > circle.transform.position.y - size &&
		gameObject.transform.position.y < circle.transform.position.y + size)
	{
		Debug.Log("fadsd");
		return true;
	}
	return false;
}

function JudgeLifeTime()
{
	var nullVector:Vector3 = new Vector3(0,0,0);
	if(gameObject.rigidbody.velocity != nullVector && !hasRan)
	{
		hasRan = true;
		lifeTime = Time.time;	
	}
	if(Time.time - lifeTime >= 5 && hasRan)newBall();
}

function CountLastFrameSpeed()
{
	var deltaX:float = gameObject.transform.position.x - currentPoint.x;
	var deltaY:float = gameObject.transform.position.z - currentPoint.y;
	lastFrameSpeed = Vector3(deltaX / Time.deltaTime,0,deltaY / Time.deltaTime);
}