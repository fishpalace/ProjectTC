#pragma strict
var animationObject:Animation;
var i:float;

function Start () {
	animationObject.Stop();
	animationObject.wrapMode = WrapMode.Once;
}

function Update () {	
		gameObject.transform.localScale = Vector3(2.149338,2.149338,2.149338);	
		i = Random.Range(0.0,100.0);
		//Debug.Log(gameObject.transform.localScale);
		//Debug.Log(i);
		if(i <= 0.8)
		{	
			if(!animationObject.isPlaying)
			{
				
				animationObject.Play();
			}
		}
}
