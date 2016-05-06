#pragma strict
public var _anim : Animator;

function Start () 
{
_anim = GetComponent.<Animator>();
}

public function SlideIn ()
{
	_anim.SetTrigger("slide in");
}

public function SlideOut ()
{
	_anim.SetTrigger("slide out");
}