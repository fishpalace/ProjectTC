#pragma strict
var obj_eye : GameObject;
var startTouchPosition:Vector2;
var endTouchPosition:Vector2;
var canSetSpeed:boolean;
var isInBallRange:boolean;
var timeStart:float;
var timeEnd:float;
var mouseVelocity:Vector2;
var cam:Camera;
private var MAX_SPEED : float;


function Start () {
	canSetSpeed = false;
	isInBallRange = false;
	timeStart = 0.0;
	timeEnd = 0.0;
	MAX_SPEED = 20.0;
}

function Update () {
	obj_eye = GameObject.Find("obj_eye_ball");
	var touchCount = Input.touchCount;
	for(var i = 0; i < touchCount;i++)
	{	
		if(Input.GetTouch(i).phase == TouchPhase.Began)
		{
			startTouchPosition = Input.GetTouch(i).position;
			var hit:RaycastHit;
            // Construct a ray from the current touch coordinates
    		 var ray : Ray = cam.ScreenPointToRay (startTouchPosition);
   			 if (Physics.Raycast (ray, hit) && hit.transform.name.Substring(0,12) == obj_eye.name)isInBallRange = true;
			else continue;
			timeStart = Time.time;
		}
		if(Input.GetTouch(i).phase == TouchPhase.Ended)
		{
			endTouchPosition = Input.GetTouch(i).position;
			timeEnd = Time.time;
			if(isInBallRange){canSetSpeed = true;break;}
			
		}
	}
	var deltaTime = timeEnd - timeStart;
	if(canSetSpeed)
	{
		
		if(deltaTime > 0)
		{
			var deltaDistanceX = endTouchPosition.x - startTouchPosition.x;
			var deltaDistanceY = endTouchPosition.y - startTouchPosition.y;
			mouseVelocity.x = deltaDistanceX / (deltaTime * 100);
			mouseVelocity.y = deltaDistanceY / (deltaTime * 100);
		}
		var totalVelocity = mouseVelocity.x * mouseVelocity.x + mouseVelocity.y * mouseVelocity.y;
		var sqrTotalVelocity = Mathf.Sqrt(totalVelocity);
		if(totalVelocity > (MAX_SPEED * MAX_SPEED)){
			obj_eye.rigidbody.velocity = Vector3(mouseVelocity.x * MAX_SPEED / sqrTotalVelocity,0,mouseVelocity.y * MAX_SPEED / sqrTotalVelocity);
			//Debug.Log(gameObject.rigidbody.velocity);
			canSetSpeed = false;
		}
		else
		{
			obj_eye.rigidbody.velocity = Vector3(mouseVelocity.x,0,mouseVelocity.y);
			//Debug.Log(gameObject.rigidbody.velocity);
			canSetSpeed = false;
		}
	}
}