using UnityEngine;
using System.Collections;

public class CircleSpin : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		this.transform.RotateAround(Vector3.zero, Vector3.up, 40 * Time.deltaTime);
	}
}
