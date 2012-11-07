#pragma strict
var ballArray = new Array("obj_eye_ball","obj_onion","obj_carrot","obj_steam_bread");
var startTouchPosition:Vector2;
var endTouchPosition:Vector2;
var canSetSpeed:boolean = false;
var isInBallRange:boolean = false;
var hasRan:boolean = false;
var timeStart:float;
var timeEnd:float;
var mouseVelocity:Vector2;
var cam:Camera;

private var MAX_SPEED : float;
private var currentPhase : TouchPhase;
private var beginTouch : Touch;
private var objBall : GameObject;

function Start () {
	MAX_SPEED = 20.0;
	currentPhase = TouchPhase.Canceled;
}

function Update() {
	if(Input.touchCount != 0)
	{
		var touch:Touch;
		for(var j:int = 0;j < Input.touchCount;j++)
		{
			touch = Input.GetTouch(j);
			this.handleTouch(touch);
		}
	}
}

function handleTouch(touch:Touch)
{
	switch(currentPhase)
	{
		case TouchPhase.Canceled:
			if(touch.phase == TouchPhase.Began)
			{
				startTouchPosition = touch.position;
				var hit:RaycastHit;
            	// Construct a ray from the current touch coordinates
    		 	var ray : Ray = cam.ScreenPointToRay (startTouchPosition);
   			 	if (Physics.Raycast (ray, hit) && IsCountInArray(hit.transform.name))isInBallRange = true;
				else return;
				timeStart = Time.time;
				beginTouch = touch;
				currentPhase = TouchPhase.Began;
			}
			break;
		case TouchPhase.Began:
			if(touch.phase == TouchPhase.Ended && touch.fingerId == beginTouch.fingerId)
			{
				endTouchPosition = touch.position;
				timeEnd = Time.time;
				var deltaTime = timeEnd - timeStart;
				if(isInBallRange && deltaTime > 0)
				{
					//var m = Random.Range(0,100);
					//Debug.Log(m);
					var deltaDistanceX = endTouchPosition.x - startTouchPosition.x;
					var deltaDistanceY = endTouchPosition.y - startTouchPosition.y;
					mouseVelocity.x = deltaDistanceX / (deltaTime * 100);
					mouseVelocity.y = deltaDistanceY / (deltaTime * 100);
					var totalVelocity = mouseVelocity.x * mouseVelocity.x + mouseVelocity.y * mouseVelocity.y;
					var sqrTotalVelocity = Mathf.Sqrt(totalVelocity);
					if(totalVelocity > (MAX_SPEED * MAX_SPEED)){
						Debug.Log(objBall.name);
						objBall.rigidbody.velocity = Vector3(mouseVelocity.x * MAX_SPEED / sqrTotalVelocity,0,mouseVelocity.y * MAX_SPEED / sqrTotalVelocity);
						hasRan = true;
						isInBallRange = false;
						canSetSpeed = false;
						//Debug.Log(gameObject.rigidbody.velocity);
					}
					else
					{
						hasRan = true;
						isInBallRange = false;
						canSetSpeed = false;
						objBall.rigidbody.velocity = Vector3(mouseVelocity.x,0,mouseVelocity.y);
						//Debug.Log(gameObject.rigidbody.velocity);
					}
					currentPhase = TouchPhase.Canceled;
				}
			}
			break;
		default:
			break;
	}
}

function IsCountInArray(obj:String)
{
	for(var i = 0;i < 4;i++)
	{
		if(obj == ballArray[i]){
		objBall = GameObject.Find(ballArray[i]);
		return true;
		}
	}
	return false;
}