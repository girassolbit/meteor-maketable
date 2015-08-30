Tinytest.add('Table Generation', function(test){	
	var	tableId = '1234',
		table = MakeTable.create({
			'Names': ['John Doe', 'Bob Marley'],
			'Emails': ['john@example.com', 'bob@example.com']
		},{
			id: tableId,
			tableClass: 'my-klass'
		});

	test.isTrue( table.nodeName == 'TABLE' && table.classList.contains('my-klass') && table.id == tableId );
});