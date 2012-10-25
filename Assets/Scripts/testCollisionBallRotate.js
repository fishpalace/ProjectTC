#pragma strict
var centerPosition = Vector3(0,0,0);
function Start () {
	
}

function Update () {
	gameObject.transform.RotateAround(centerPosition, Vector3.up, 40 * Time.deltaTime);
}