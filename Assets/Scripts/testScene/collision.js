#pragma strict
	var detachChildren = false;
	var ballDestroy : GameObject;
	var circleOne : GameObject;
	var explosionEmitter : ParticleEmitter;
	
	function Start()
	{

	}
	
	function Update()
	{
		var distanceX = ballDestroy.transform.position.x - circleOne.transform.position.x;
		var distanceZ = ballDestroy.transform.position.z - circleOne.transform.position.z;
		var distance = distanceX * distanceX + distanceZ * distanceZ;
		//Debug.Log(distance);
		if(distance < 1.564)
		{
			//Debug.Log(particleControl.enabled);
			DoSomething();
		}
	}
	
	function DoSomething ()
	{
		if (detachChildren) {
			transform.DetachChildren ();
		}
		//Debug.Log("Hey!");
		ballDestroy.rigidbody.velocity = Vector3(0,0,0);
		//ballDestroy.transform.RotateAround (Vector3(-8.675226,3.850926,-13.72104), Vector3.up, 80 * Time.deltaTime);
		//Instantiate(explosionEmitter,gameObject.transform.position,gameObject.transform.rotation);
		DestroyObject (ballDestroy,1.0f);
	}