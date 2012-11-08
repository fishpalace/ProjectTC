using UnityEngine;
using System.Collections;

public class CircleSpin : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		//this.transform.RotateAround(Vector3.zero, Vector3.left, 40 * Time.deltaTime);
		this.transform.Rotate(Vector3.up * Time.deltaTime * 80);
	}
}
