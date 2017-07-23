
* Chip -> CHIP _word_ { _inputs_ _outputs_ (_parts_ | _builtin_)  }
* inputs -> IN _iodefs_;
* outputs -> OUT _iodefs_;
* iodefs -> _pindef_ (, _pindef_)*
* builtin -> BUILTIN _word_;
* parts -> PARTS: (_word_ \( _impdefs_ \))+;
* impdefs -> _pindef_=_pindef_ (, _pindef_=_pindef_)*

* pindef -> _word_(_pins_)?
* pins -> [_pin_ (.._pin_)?]
* pin -> NUMBER
* word -> STRING_IDENTIFIER