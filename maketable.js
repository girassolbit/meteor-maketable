MakeTable = {
	create: function( object, options ){

		if( this.constructor != MakeTable.create )
			return new MakeTable.create( object, options);
		
		// Default modifiers
		options = _.extend({
			id: "",
			tableClass: "",
			theadClass: "",
			tbodyClass: "",
			thClass: "",
			tdClass: "",
			trClass: ""
		}, options);

		var self = this;
		_.each( options, function( value, key ){
			self[key] = value;
		});

		return typeof object == 'object' ? this.init( object ) : new Error("First parameter in MakeTable.create is not a object");
	},
	createdTables:[]
};

MakeTable.create.prototype.init = function( object ){

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

MakeTable.create.prototype.mount = function( object ){
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

	return this.seed(object);
};

MakeTable.create.prototype.seed = function( object ){
	// Makes row in thead
	var	self = this,
		tableHeadRow = self.tableHead.insertRow(0),
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
	// Save to memoize
	// MakeTable.createdTables.push([ object, this.table]);

	return this.table;
}

UI.registerHelper('makeTable', function( object, options){
	return Spacebars.SafeString( MakeTable.create( object, options.hash ).outerHTML );
});