	var timeOut = 1.0f;
	var detachChildren = false;

	
	function Awake ()
	{
		Invoke ("DestroyNow", timeOut);
	}
	

	function DestroyNow ()
	{
		if (detachChildren) {
			transform.DetachChildren ();
		}
		DestroyObject (gameObject);
	}