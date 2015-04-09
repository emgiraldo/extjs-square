Ext.application({
    name: 'DND',

    launch: function() {

        /*step 3*/
        var overrides = {
            /*step 5*/ 
            startDrag: function(e) {
                //shortcut to access our element later
                if (!this.el) {
                    this.el = Ext.get(this.getEl());
                }
                //add a css class to add some transparency to our div
                this.el.addCls('selected');
                //when we drop our item on an invalid place  we need to return it to its initial position
                this.initialPosition = this.el.getXY();
            },
            /*step 5*/
            onDrag: function(e) {
	 	console.log('onDragStart');
                this.el.moveTo(e.getPageX() - 32, e.getPageY() - 32);
            },
            /*step 7*/
            onDragEnter: function(e, id) {
            	console.log('Id:'+id);
                Ext.fly(id).addCls('valid-zone');
            },
            onDragOver: function(e, id) {
                console.log('onDragOver');
            },
            /*step 8*/
            onDragOut: function(e, id) {
                Ext.fly(id).removeCls('valid-zone');
            },
            /*step 9*/
            onDragDrop: function(e, id) {
            	// change the item position to absolute
               	this.el.dom.style.position = 'absolute';
                //move the item to the mouse position
                this.el.moveTo(e.getPageX() - 32, e.getPageY() - 32);
                Ext.fly(id).removeCls('valid-zone');
            },
            /*step 6*/
            onInvalidDrop: function() {
		console.log('On invalid zone');
                this.el.removeCls('valid-zone');               
                this.el.moveTo(this.initialPosition[0], this.initialPosition[1]);
            },
            /*step 9*/
            endDrag: function(e, id) {
                this.el.removeCls('selected');
                //Ext.fly(id).removeCls('drop-target');
                this.el.highlight();
            }
        };
        
        /*Sets the divs in table as draggable items*/
        var tables = Ext.get('tables').select('div');
        Ext.each(tables.elements, function(el) {
        	var dd = new Ext.dd.DD(el, 'tablesDDGroup', {
        		isTarget:false		
        	});
        	Ext.apply(dd, overrides);
        });
        
        var mainTarget = Ext.create('Ext.dd.DDTarget', 'mainRoom', 'tablesDDGroup', {
            ignoreSelf: false
        });
        
    }
});