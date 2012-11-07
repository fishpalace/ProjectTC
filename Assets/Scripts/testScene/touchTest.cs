
using UnityEngine;
using System.Collections;

public class touchTest : MonoBehaviour {
	
	public Camera cam;
	private GameObject objBall;
	private Touch beginTouch;
	private TouchPhase currentPhase = TouchPhase.Canceled;
	private float maxForce;
	private float minForce;
	private Vector3 originalPosition;
	private int shootGestureTime;
	private string[] ballArray = new string[4]{"obj_eye_ball","obj_onion","obj_carrot","obj_steam_bread"};
	private const int maxShootGestureTime = 5;
	
	// Use this for initialization
	void Start () {
		maxForce = 400;
		minForce = 200;
		shootGestureTime = 0;
		originalPosition = this.transform.position;
		originalPosition.x = (originalPosition.x + 3.84f) * 100;
		originalPosition.z = (originalPosition.z + 5.12f) * 100;
		StartCoroutine(calcShootGestureTime());
	}
	
	void handleTouch(Touch touch) {
		//Debug.Log(touch.position);
			switch(currentPhase) {
			case TouchPhase.Canceled:
				if(touch.phase == TouchPhase.Began) {
					//Debug.Log(this.transform.position);
					RaycastHit hit = new RaycastHit();
            		// Construct a ray from the current touch coordinates
    		 		Ray ray = new Ray();
					ray = cam.ScreenPointToRay (touch.position);
   			 		if (!(Physics.Raycast (ray, out hit) && IsCountInArray(hit.transform.name)))
					{
						//Debug.Log(hit.transform.name);
						return;
					}
					//Debug.Log("touch begin");
					shootGestureTime = 0;
					beginTouch = touch;
					currentPhase = TouchPhase.Began;
				}
				break;
			case TouchPhase.Began: {
				if(touch.phase == TouchPhase.Ended && touch.fingerId == beginTouch.fingerId) {
					//Debug.Log("touch end");
					float deltaX = touch.position.x - beginTouch.position.x;
					float deltaY = touch.position.y - beginTouch.position.y;
					float distance = Mathf.Sqrt(deltaX * deltaX + deltaY * deltaY);
					if(distance > 0) {	
						//rotate
						float rotationY = Mathf.Acos((beginTouch.position.y - touch.position.y) / distance) / Mathf.PI * 180;
						if(touch.position.x <= beginTouch.position.x)
							rotationY = 180 + rotationY;
						else
							rotationY = 180 - rotationY;
						
						//Debug.Log("deltaX:"+deltaX+"deltaY:"+deltaY+"Y:"+rotationY);
						objBall.transform.rotation = Quaternion.AngleAxis(rotationY, Vector3.up);
						
						//Debug.Log("shoot gesture time:"+shootGestureTime);
						float ratio = 0;
						if(shootGestureTime < maxShootGestureTime) {
							ratio = (float)(maxShootGestureTime - shootGestureTime) / (float)maxShootGestureTime;
						}
						float forceCoefficient = (maxForce - minForce) * ratio + minForce;
						//forceCoefficient = 400;
						//Debug.Log("forceCoefficient:"+forceCoefficient);
						Vector3 force = new Vector3(deltaX / distance * forceCoefficient, 1, deltaY / distance * forceCoefficient);
						objBall.rigidbody.AddForce(force);	
						
						currentPhase = TouchPhase.Canceled;	
					}
					else {
						currentPhase = TouchPhase.Canceled;
					}
				}
				break;
			}
			default:
				break;
			}
	}

	private IEnumerator calcShootGestureTime() {
		while(true) {
			shootGestureTime += 1;
			yield return new WaitForSeconds(0.1f);
		}
	}
	
	// Update is called once per frame
	void FixedUpdate () {
		if (Input.touchCount != 0) {
			Touch touch;
			for(int i = 0; i < Input.touchCount; i++) {
				touch = Input.touches[i];
				this.handleTouch(touch);
			}
		}
	}
	
	bool IsCountInArray(string obj)
	{
		for(int i = 0;i < 4;i++)
		{
			if(obj == ballArray[i]){
			objBall = GameObject.Find(ballArray[i]);
			return true;
			}
		}
		return false;
	}
}
