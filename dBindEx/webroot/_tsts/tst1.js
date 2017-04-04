
QUnit.test( 'test: fetch()', function( assert ) {
	
	assert.expect(0)

	loadjs([
		'/_js/DSrv.js'
		], { success: function(){

			doTest(assert)
		}
	})

})//tst

function doTest(assert) {
	var done = assert.async()

	fetch('http://jsonplaceholder.typicode.com/comments', { //1 call
			//method: 'post'
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

