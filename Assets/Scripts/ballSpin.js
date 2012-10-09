#pragma strict

function Start () {

}

function Update () {
	
	transform.RotateAround (Vector3(-8.675226,3.850926,-13.72104), Vector3.up, 80 * Time.deltaTime);
}