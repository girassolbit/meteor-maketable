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

Tinytest.add('First parameter type: object', function(test){	
	var	table = MakeTable.create("bug");
	test.isTrue( table.constructor == Error );
});

Tinytest.add('Teste colspan and rowspan', function(test){	
	var	table = MakeTable.create({
		'Períodos': [{ rowspan: 2, text: '1ª' }],
		'Notas': [10, 9]	
	});

	test.isTrue( $(table).find('tbody td').get(0).rowSpan == 2 );
});

Tinytest.add('Testing HTML generated', function(test){
	var htmlTable = Blaze.toHTML( Template.test_00 );
	console.log(htmlTable);
	test.isTrue( !!htmlTable );
});
