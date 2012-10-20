#pragma strict
var mousePointDown : Vector2;
var mousePointUp : Vector2;
var mouseVelocity : Vector2;
var isAllMouseEventHappened : boolean;
var timeStart : float;
var timeEnd : float;
private var MAX_SPEED : float;

function Start () {
	MAX_SPEED = 30.0;
	isAllMouseEventHappened = false;
	timeStart = 0;
	timeEnd = 0;
}

function Update () {
	if(Input.GetMouseButtonDown(0))
	{
		mousePointDown.x = Input.mousePosition.x;
		mousePointDown.y = Input.mousePosition.y;
		timeStart = Time.time;
	}
	//Debug.Log(mousePointDown);
	if(Input.GetMouseButtonUp(0))
	{
		mousePointUp.x = Input.mousePosition.x;
		mousePointUp.y = Input.mousePosition.y;
		isAllMouseEventHappened = true;
		timeEnd = Time.time;
	}
	var deltaTime = timeEnd - timeStart;
	if(IsInBallRange() && isAllMouseEventHappened && deltaTime > 0)
	{
		//Debug.Log("HEY!");
		var deltaDistanceX = mousePointUp.x - mousePointDown.x;
		var deltaDistanceY = mousePointUp.y - mousePointDown.y;
		mouseVelocity.x = deltaDistanceX / (deltaTime * 100);
		mouseVelocity.y = deltaDistanceY / (deltaTime * 100);
		
		var totalVelocity = mouseVelocity.x * mouseVelocity.x + mouseVelocity.y * mouseVelocity.y;
		var sqrTotalVelocity = Mathf.Sqrt(totalVelocity);
		if(totalVelocity > (MAX_SPEED * MAX_SPEED)){
			gameObject.rigidbody.velocity = Vector3(mouseVelocity.y * MAX_SPEED / sqrTotalVelocity,0,-mouseVelocity.x * MAX_SPEED / sqrTotalVelocity);
			//Debug.Log(gameObject.rigidbody.velocity);
		}
		else
		{
			gameObject.rigidbody.velocity = Vector3(mouseVelocity.y,0,-mouseVelocity.x);
			//Debug.Log(gameObject.rigidbody.velocity);
		}
	}
}
	
	function IsInBallRange()
	{
		//Debug.Log(gameObject.rigidbody.position.x);
		var distanceX = (mousePointUp.x - 31) - gameObject.rigidbody.position.x;
		var distanceY = (mousePointUp.y - 224) - gameObject.rigidbody.position.z;
		var radiusToCircle = distanceX * distanceX + distanceY * distanceY;
		if(radiusToCircle < 167785)return 1;
		return 0;
	}