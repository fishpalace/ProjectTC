#pragma strict
var ballPrefab:GameObject;
private var ball:GameObject;

function Start () {
	ball = Instantiate(ballPrefab,ballPrefab.transform.position,ballPrefab.transform.rotation);
}

function Update () {

}