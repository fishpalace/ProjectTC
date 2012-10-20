#pragma strict
var startTouchPosition:Vector2;
var endTouchPosition:Vector2;
var canSetSpeed:boolean = false;
var isInBallRange:boolean = false;
var hasRan:boolean = false;
var timeStart:float;
var timeEnd:float;
var mouseVelocity:Vector2;

private var MAX_SPEED : float;

function Start () {
	MAX_SPEED = 20.0;
}

function Update() {
	var touchCount = Input.touchCount;
	for(var i = 0; i < touchCount;i++)
	{
		if(Input.GetTouch(i).phase == TouchPhase.Began)
		{
			startTouchPosition = Input.GetTouch(i).position;
			isInBallRange = true;
			timeStart = Time.time;
		}
		if(Input.GetTouch(i).phase == TouchPhase.Ended)
		{
			endTouchPosition = Input.GetTouch(i).position;
			timeEnd = Time.time;
			if(isInBallRange)canSetSpeed = true;
		}
	}
	var deltaTime = timeEnd - timeStart;
	if(IsInBallRange() && !hasRan && deltaTime > 0)
	{
		var deltaDistanceX = endTouchPosition.x - startTouchPosition.x;
		var deltaDistanceY = endTouchPosition.y - startTouchPosition.y;
		mouseVelocity.x = deltaDistanceX / (deltaTime * 100);
		mouseVelocity.y = deltaDistanceY / (deltaTime * 100);
	}
	var totalVelocity = mouseVelocity.x * mouseVelocity.x + mouseVelocity.y * mouseVelocity.y;
	var sqrTotalVelocity = Mathf.Sqrt(totalVelocity);
	if(totalVelocity > (MAX_SPEED * MAX_SPEED)){
		gameObject.rigidbody.velocity = Vector3(mouseVelocity.x * MAX_SPEED / sqrTotalVelocity,0,mouseVelocity.y * MAX_SPEED / sqrTotalVelocity);
		//hasRan = true;
		//Debug.Log(gameObject.rigidbody.velocity);
	}
	else
	{
		//hasRan = true;
		gameObject.rigidbody.velocity = Vector3(mouseVelocity.x,0,mouseVelocity.y);
		//Debug.Log(gameObject.rigidbody.velocity);
	}
}

function IsInBallRange()
{
	var ballPosition = gameObject.transform.position;
	var ballPositionInScreen = Camera.mainCamera.WorldToScreenPoint(ballPosition);
	var size:float = 150.0;
	if(startTouchPosition.x > (ballPositionInScreen.x - size) &&
		startTouchPosition.x < (ballPositionInScreen.x + size) &&
		startTouchPosition.y > (ballPositionInScreen.y - size) &&
		startTouchPosition.y < (ballPositionInScreen.y + size))
	{
		return true;	
	}
	return false;
}