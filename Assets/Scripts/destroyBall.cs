using UnityEngine;
using System.Collections;

public class destroyBall : MonoBehaviour {
	
	public GameObject circleOne;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		float distanceX = gameObject.transform.position.x - circleOne.transform.position.x;
		float distanceZ = gameObject.transform.position.z - circleOne.transform.position.z;
		float distance = distanceX * distanceX + distanceZ * distanceZ;
		//Debug.Log(distance);
		if(distance < 1.564)
		{
			Destroy(gameObject);
		}
	}
}
