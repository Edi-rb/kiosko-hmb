// js code
// document.getElementById("js-btn").addEventListener("click", () => {
//   alert("JS compiles!!");
// });

// jquery code
$(document).ready(function() {
	// Paginas que se redireccionan
	var pageNuestroMenu = 'nuestro-menu.html',

	// Pagina por categorias
		pageProducto = 'producto2.html',
		pageProdBeb = 'producto-beb.html',
		pageProdHmb = 'producto-hmb.html',
		pageProdOtro= 'producto-otros.html';

	// Menu sidebar
	$('body').on('click', '#navbarCaliMenu .navurl', function (ev) {
		ev.preventDefault();
		let bodycontent = $('body'),
			file        = $(this).attr('href');
		console.log(file);

		$.get(file, function(respuesta){
			bodycontent.html(respuesta);
			// bodycontent.addClass('bg-light');
		});
	});

	// Menu Home
	$('body').on('click', '.ki-homelink', function (ev) {
		ev.preventDefault();
		let kicontent = $('body');

		$.get(file, function(respuesta){
			bodycontent.html(respuesta);
			bodycontent.addClass('bg-light');
		});
	});

	// Abrir y cerrar la lista (carrito)
	$('body').on('click', '.ki-carmenu', function () {
		$(this).addClass('salir-izq');

		$('.lista-carrito').show();
	});

	$('body').on('click', '.car-item__title .close', function () {
		$('.lista-carrito').hide();
		$('.ki-carmenu').removeClass('salir-izq');
		$('.ki-carmenu').show();
	});

	$('.load-ki').on('click', function () {
		let file = $(this).val(), bodycontent = $('body');

		console.log(`El valor de ${file}`);

		$.get(file, function(respuesta) {
			bodycontent.html(respuesta);
			bodycontent.addClass('bg-light');
		});

	});

	$('.orden-anterior').on('click', function (ev) {
		ev.preventDefault();
		let $this = $(this);

		if( $this.hasClass('order-active') ) {
			$this.removeClass('order-active');
		}else {
			$this.addClass('order-active');

			Swal.fire({
				position: 'center',
				icon: 'success',
				title: '¡ Tu pedido ha sido enviado !',
				showConfirmButton: false,
				timer: 1500
			})
		}
		
	});

	//Activa una categoria de nuestro menu
	$('body').on('click', '#cat-seleccion .ki-preitem',function (ev) {

		let $categoria  = $(this).data('categoriap'),
			bodycontent = $('body'),
			// catproducto = 'combos',
			$pageMenu   = pageNuestroMenu;

			console.log('llega la respuesta fuera: '+ $categoria);

		$.get($pageMenu, function(respuesta){
			bodycontent.html(respuesta);
			bodycontent.addClass('bg-light');
			
			console.log('llega la respuesta '+ $categoria);
			switch($categoria) {
				case 'combos':
					$('#v-pills-combos-tab').tab('show')
				break;
				case 'hbgs':
					$('#v-pills-habmburguesas-tab').tab('show')
				break;
				case 'shakes':
					$('#v-pills-bebidas-tab').tab('show')
				break;
				default:
				// code block
			}
			
		});
	});

	//***** Funciones en producto****//

	// Ver cada producto individualmente
	$('body').on('click', '#v-pills-tabContent .pitem',function () {
		let bodycontent    = $('body'),
			paginaTipo     = pageProducto,
			categoriaSelect = $('#v-pills-tab .nav-link.active').attr('id');

		switch(categoriaSelect) {
			case 'v-pills-combos-tab':
				paginaTipo = pageProducto;
			break;
			case 'v-pills-bebidas-tab':
				paginaTipo = pageProdBeb;
			break;
			case 'v-pills-habmburguesas-tab':
				paginaTipo = pageProdHmb;
			break;
			case 'v-pills-otroscali-tab':
				paginaTipo = pageProdOtro;
			break;
			default:
			// code block
		}

		$.get(paginaTipo, function(respuesta){
			bodycontent.html(respuesta);
			bodycontent.addClass('bg-light');
			console.log('aqui la categoria sle: ' + categoriaSelect);
			$('#catOpcionesMenu .ki-catsmenu__opcion').removeClass('active');

			switch(categoriaSelect) {
				case 'v-pills-combos-tab':
					$('#catOpcionesMenu .kicombo').addClass('active');
				break;
				case 'v-pills-bebidas-tab':
					$('#catOpcionesMenu .kibebidas').addClass('active');
				break;
				case 'v-pills-habmburguesas-tab':
					$('#catOpcionesMenu .kicalibur').addClass('active');
				break;
				case 'v-pills-otroscali-tab':
					$('#catOpcionesMenu .kiotros').addClass('active');
				break;
				default:
				// code block
			}
		});
	});

	// Seleccionar un producto a Cambiar
	$('body').on('click', '.ki-selProducto .ki-boxProducto', function () {
		let prodSelCambio = $(this);


		if ( prodSelCambio.hasClass('active') ) {
			$('.ki-selProducto .ki-boxProducto').removeClass('active');
		} else {
			$('.ki-selProducto .ki-boxProducto').removeClass('active');
			prodSelCambio.addClass('active');
		}
		
	});

	// De profucto a seleccion de categoria en nuestro-menu.html
	$('body').on('click', '#catOpcionesMenu .ki-catsmenu__opcion', function (ev) {
		ev.preventDefault();
		let bodycontent = $('body'),
			catSelec    = $(this).data('catki');

		$.get(pageNuestroMenu, function(respuesta){
			bodycontent.html(respuesta);
		
			console.log('aqui la categoria sle: ' + catSelec);

			switch(catSelec) {
				case 'kicombo':
					$('#v-pills-combos-tab').tab('show');
				break;
				case 'kibebidas':
					$('#v-pills-bebidas-tab').tab('show');
				break;
				case 'kicalibur':
					$('#v-pills-habmburguesas-tab').tab('show');
				break;
				case 'kiotros':
					$('#v-pills-otroscali-tab').tab('show');
				break;
				default:
				// code block
			}
		});
	});

	// Cambio de bebidas en combos
	$('body').on('click', '.cambiar-tipoBebida__radio .bebidacambio', function (ev) {
		// ev.preventDefault();	 
		let radOpcion     = $(this),
			tipoBedidaVal = $(this).val(),
			bebida        = $('#carousel-ref'),
			shakes        = $('#carousel-malt'),
			shakesEspes   = $('#carousel-maltesp');

		console.log('Estatus del check: ' + $(this).prop('checked'));
		
		if ( $(this).prop('checked') ) {
			console.log('si esta chequeado');			
			
			if (tipoBedidaVal === 'bebida2') {


				bebida.hide();
				shakesEspes.hide();
				shakes.show();

				$('#cambio2').prop('checked', false);
			}else if (tipoBedidaVal === 'bebida3') {
				bebida.hide();
				shakes.hide();
				shakesEspes.show();	
				$('#cambio1').prop('checked', false);		
			}
				
		} else {
			console.log('NO esta chequeado');

			bebida.show();
			shakesEspes.hide();
			shakes.hide();
		}	
	});

	// Cambiar estatus de checkbox cuando se cierra el modal de cambio de bebida
	$('body').on('click', '.cerrarCambiarSabor',function (e) {
		console.log('se cerro el modal de cambios de bebidas');
		$('.cambiar-tipoBebida__radio .bebidacambio').prop('checked', false);
	});

	// Cambio de Papas en combos
	$('body').on('click', '.cambiar-tipoBebida__radio .papascambio', function (ev) {
		// ev.preventDefault();	 
		let radOpcion     = $(this),
			tipoPapasVal = $(this).val(),
			papas1        = $('#papas1'),
			papas2        = $('#papas2'),
			papas3   = $('#papas3');

		console.log('Estatus del check papas: ' + $(this).prop('checked'));
		
		if ( $(this).prop('checked') ) {
			console.log('si esta chequeado');			
			
			if (tipoPapasVal === 'papas2') {


				papas1.hide();
				papas3.hide();
				papas2.show();

				$('#cambpapas2').prop('checked', false);
			}else if (tipoPapasVal === 'papas3') {
				papas1.hide();
				papas2.hide();
				papas3.show();	
				$('#cambpapas1').prop('checked', false);		
			}
				
		} else {
			console.log('NO esta chequeado');

			papas1.show();
			papas2.hide();
			papas3.hide();
		}	
	});

	// Regresar a nuestro menu Caliburguer
	$(document).on('click', '#ir-numenu', function (ev) {
		ev.preventDefault();
		let bodycontent    = $('body');

		$.get(pageNuestroMenu, function(respuesta){
			bodycontent.html(respuesta);

		});
	});

	// Funcionalidad contador productos agregados al carrito
	window.inputNumber = function(el) {

	    var min = el.attr('min') || false;
	    var max = el.attr('max') || false;

	    var els = {};

	    els.dec = el.prev();
	    els.inc = el.next();

	    el.each(function() {
	      init($(this));
	    });

	    function init(el) {

	      els.dec.on('click', decrement);
	      els.inc.on('click', increment);

	      function decrement() {
	        var value = el[0].value;
	        value--;
	        if(!min || value >= min) {
	          el[0].value = value;
	        }
	      }

	      function increment() {
	        var value = el[0].value;
	        value++;
	        if(!max || value <= max) {
	          el[0].value = value++;
	        }
	      }
	    }
	 }

  inputNumber($('.input-number'));

});