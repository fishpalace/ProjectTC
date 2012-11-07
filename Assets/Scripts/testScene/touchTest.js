#pragma strict
private var ballArray = new Array("obj_eye_ball","obj_onion","obj_carrot","obj_steam_bread");
private var startTouchPosition = new Array(4);
private var endTouchPosition = new Array(4);
private var mouseVelocity = new Array(4);
private var canSetSpeed = new Array(false,false,false,false);
private var isInBallRange = new Array(false,false,false,false);
private var hasRan = new Array(false,false,false,false);
private var timeStart = new Array(0.0,0.0,0.0,0.0);
private var timeEnd = new Array(0.0,0.0,0.0,0.0);
private var fourArea = new Array();
var cam:Camera;


private var MAX_SPEED : float;
private var currentPhase = new Array(TouchPhase.Canceled,TouchPhase.Canceled,TouchPhase.Canceled,TouchPhase.Canceled);
private var beginTouch = new Array(new Touch(),new Touch(),new Touch(),new Touch());
private var objBall = new Array(4);

function Start () {
	MAX_SPEED = 20.0;
	InitFourArea();
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
	var areaId = InHisArea(touch); 
	var currPhase : TouchPhase = currentPhase[areaId];
	var fingerId : Touch = beginTouch[areaId];
	var ball : GameObject = objBall[areaId];
	switch(currPhase)
	{
		case TouchPhase.Canceled:
			if(touch.phase == TouchPhase.Began)
			{
				startTouchPosition[areaId] = touch.position;
				var hit:RaycastHit;
            	// Construct a ray from the current touch coordinates
    		 	var ray : Ray = cam.ScreenPointToRay (touch.position);
   			 	if (Physics.Raycast (ray, hit) && IsCountInArray(hit.transform.name,areaId))isInBallRange[areaId] = true;
				else return;
				timeStart[areaId] = Time.time;
				beginTouch[areaId] = touch;
				currentPhase[areaId] = TouchPhase.Began;
			}
			break;
		case TouchPhase.Began:
			if(touch.phase == TouchPhase.Ended  && touch.fingerId == fingerId.fingerId)
			{				
				endTouchPosition[areaId] = touch.position;
				timeEnd[areaId] = Time.time;
				var pTime : float = timeStart[areaId];
				var qTime : float = timeEnd[areaId];
				var deltaTime = qTime - pTime;
				if(isInBallRange[areaId] && deltaTime > 0)
				{
					var startP : Vector2 = startTouchPosition[areaId];
					var endP : Vector2 = endTouchPosition[areaId];
					Debug.Log("" + areaId + isInBallRange[areaId] + ball.name);
					var deltaDistanceX = endP.x - startP.x;
					var deltaDistanceY = endP.y - startP.y;
					var mouseVelocity : Vector2;
					mouseVelocity.x = deltaDistanceX / (deltaTime * 100);
					mouseVelocity.y = deltaDistanceY / (deltaTime * 100);
					var totalVelocity = mouseVelocity.x * mouseVelocity.x + mouseVelocity.y * mouseVelocity.y;
					var sqrTotalVelocity = Mathf.Sqrt(totalVelocity);
					if(totalVelocity > (MAX_SPEED * MAX_SPEED)){
						ball.rigidbody.velocity = Vector3(mouseVelocity.x * MAX_SPEED / sqrTotalVelocity,0,mouseVelocity.y * MAX_SPEED / sqrTotalVelocity);
						hasRan[areaId] = true;
						isInBallRange[areaId] = false;
						canSetSpeed[areaId] = false;
					}
					else
					{
						hasRan[areaId] = true;
						isInBallRange[areaId] = false;
						canSetSpeed[areaId] = false;
						ball.rigidbody.velocity = Vector3(mouseVelocity.x,0,mouseVelocity.y);
						//Debug.Log(gameObject.rigidbody.velocity);
					}
				}	
				currentPhase[areaId] = TouchPhase.Canceled;		
			}
			break;
		default:
			break;
	}
}

function InitFourArea()
{
	fourArea[0] = Vector4(Screen.width / 2,Screen.height / 2,Screen.width,Screen.height);
	fourArea[1] = Vector4(0,Screen.height / 2,Screen.width / 2,Screen.height);
	fourArea[2] = Vector4(0,0,Screen.width / 2,Screen.height / 2);
	fourArea[3] = Vector4(Screen.width / 2,0,Screen.width,Screen.height / 2);
}

function IsCountInArray(obj:String,areaId:int)
{
	for(var i = 0;i < 4;i++)
	{
		if(obj == ballArray[i]){
		objBall[areaId] = GameObject.Find(ballArray[i]);
		return true;
		}
	}
	return false;
}

function InHisArea(touch:Touch)
{
	for(var i = 0;i < 4;i++)
	{
		var area : Vector4 = fourArea[i];
		if(touch.position.x >= area.x &&
			touch.position.x < area.z &&
			touch.position.y >= area.y &&
			touch.position.y < area.w)return i;
	}
	return -1;
}