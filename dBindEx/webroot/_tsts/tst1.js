
QUnit.test( 'test: fetch()', function( assert ) {

	loadjs([
		'/_js/DSrv.js'
		], { success: function(){

			var done = assert.async()
			doTest(done)

		}
	})

})//tst

function doTest(done) {
	fetch('https://middle4top-wngjgwtdbn.now.sh/membersPg/mem/', { //1 call
			method: 'post'
		}).then(function(response) { //2 return a promise
			return (response.json())
			}).then(function(value) { // 3 done:
				// your code here:
				console.log('back')
				console.log(JSON.stringify(value))
				assert.ok( JSON.stringify(value), 'we got something, check console' )
				done()

	})//fetch()

}

