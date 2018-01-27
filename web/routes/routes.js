var express = require('express');
var router = express.Router();

// Angular Manejará el Frontend
router.get('*', function(req, res) {						
	res.sendfile('../public/index.html');				
});


module.exports = router;
