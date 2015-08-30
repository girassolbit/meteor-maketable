function MakeTable( object, modifiers ){
	
	var self = this;

	// Default modifiers
	modifiers = _.extend({
		id: "",
		tableClass: "",
		theadClass: "",
		tbodyClass: "",
		thClass: "",
		tdClass: "",
		trClass: ""
	}, modifiers);

	_.each(modifiers, function( value, key ){
		self[key] = value;
	});

	return typeof object == 'object' ? this.init( object ) : new Error("First parameter is not a object");
};

MakeTable.prototype.init = function( object ){

	var table = document.createElement('table'),
		tableHead = document.createElement('thead'),
		tableBody = document.createElement('tbody');

	// Apply modifiers
	table.id = this.id;
	table.className = this.tableClass;
	tableHead.className = this.theadClass;
	tableBody.className = this.tbodyClass;
	
	// Insert parts in table
	table.appendChild( tableHead );
	table.appendChild( tableBody );

	this.table = table;
	this.tableHead = tableHead;
	this.tableBody = tableBody;

	return this.mount( object );
}

MakeTable.prototype.mount = function( object ){

	// Count size table
	var self = this,
		cells = _.size(object),
		lines = _.max(object, function( list ){ return list.length }).length;

	// Create void spaces in table
	for( var i = 0; i < lines; i++ ){
		var tableRow = self.tableBody.insertRow(i);
		for( var j = 0; j < cells; j++ ){
			var voidCell = tableRow.insertCell(j);
			voidCell.innerHTML = " ";
		}
	}

	// Makes row in thead
	var	tableHeadRow = self.tableHead.insertRow(0),
		indexCell = 0;

	_.each(	object, function( list, column ){
		// Make title head of table
		var th = document.createElement('th');
		th.innerHTML = column;
		th.className = self.thClass;
		// Insert th element
		tableHeadRow.appendChild(th);
	
		_.each(list, function( element, indexRow ){
			var tableRow = self.tableBody.childNodes[indexRow],
				cell = tableRow.childNodes[ indexCell ];

			cell.innerHTML = element;
			cell.className = self.tdClass;
		});

		indexCell++;
	});

	return this.table;
};

UI.registerHelper('makeTable', function( object, options){
	return Spacebars.SafeString( new MakeTable( object, options.hash ).outerHTML );
});