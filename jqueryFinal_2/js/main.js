(function ()
{
		//view all data
		$("#searchData")
		var $id;
		var $saveButton=$("#saveButton");
		$saveButton.hide();
		var $submitButton=$("#submitButton");
		$submitButton.show();
		var $search=$("#search");
		$('#viewAll').on('click',searchData);

		var $table=$("#results");
		var $btable=$('#myTable');

		var $name=$("#inputName");
		var $age=$('#inputAge');
		//var $gender=('#inputGender');
		var $school="HOGWARTS SCHOOL OF WITCHCRAFT AND WIZARDRY";
		//var $house=$("#inputHouse");
		var $phone=$("#inputPhone");
		var $address=$("#inputAddress");
		function searchData()
		{
			counter=0;

			$.ajax({
				type:'GET',
				/*url:"http://localhost:3000/students?_start=0&_end=20",*/

				url:"http://localhost:3000/students?_start=0&_limit=20",
				dataType:"jsonp",
				success: renderData,
				error: function()
				{
    			alert("Cant Load The Data");
  				}
			});
		};

		searchData();
		function renderData(data)
		{ 
			var tableN=$('#tableBody').empty();
			for(var m in data)
			{
				// console.log(data);
				var id=data[m].id;
				var name=data[m].name;
				var age=data[m].age;
				var gender=data[m].gender;
				var school=data[m].school;
				var house=data[m].house;
				var phone=data[m].phone;
				var address=data[m].address;
				tableN.append('<tr><td data-title="Id">'+id+'</td><td data-title="Name">'+name+'</td><td data-title="Age">'+age+'</td><td data-title="Gender">'+gender+'</td><td data-title="School">'+school+'</td><td data-title="House">'+house+'</td><td data-title="Phone">'+phone+'</td><td data-title="Address">'+address+'</td><td data-title="Edit">'+'<button data-id='+id+' data-target="#iModal" data-toggle="modal" class="update" ><span class="glyphicon glyphicon-edit"></span></button>'+'<button data-id='+id+' class="remove"><span class="glyphicon glyphicon-trash"></span></button>'+'</td></tr>')
			}
		}

		//view by search
		$("#searchName").click(searchName);
		function searchName()
		{
			var name=$("#search").val();
			$.ajax({
				url:"http://localhost:3000/students?name="+name,
				dataType:"jsonp",
				success:allData,
				error: function()
				{
    			alert("Cant Load The Data");
  				}
			});
			function allData(data)
			{ 
				console.log(data);
				if (data.length==0) 
				{
					$search.empty();
					var tableN=$('#tableBody').empty();
					alert("No Student Found");			
				}
				else{
					var tableN=$('#tableBody').empty();
					for(var m in data)
					{
						var id=data[m].id;
						var name=data[m].name;
						var age=data[m].age;
						var gender=data[m].gender;
						var school=data[m].school;
						var house=data[m].house;
						var phone=data[m].phone;
						var address=data[m].address;
						tableN.append('<tr><td data-title="Id">'+id+'</td><td data-title="Name">'+name+'</td><td data-title="Age">'+age+'</td><td data-title="Gender">'+gender+'</td><td data-title="School">'+school+'</td><td data-title="House">'+house+'</td><td data-title="Phone">'+phone+'</td><td data-title="Address">'+address+'</td><td data-title="Edit">'+'<button data-id='+id+' data-target="#iModal" data-toggle="modal" class="update" ><span class="glyphicon glyphicon-edit"></span></button>'+'<button data-id='+id+' class="remove"><span class="glyphicon glyphicon-trash"></span></button>'+'</td></tr>')
					}
				}

			}
		}


		// add element to table
		$('#submitButton').on('click',function(){
			var gen=$('#inputGender');
			var hou=$('#inputHouse');

						// var $gender=("#inputGender :selected").val();

						var student={
							name: $name.val(),
							age: $age.val(),
							house:(hou[0].value),
							gender:(gen[0].value),
							school: "HOGWARTS SCHOOL OF WITCHCRAFT AND WIZARDRY",
							phone: $phone.val(),
							address: $address.val(),
						};


						var id=student.id;
						var name=student.name.trim();
						var age = student.age;
						var gender=student.gender;
						var school=student.school;
						var house=student.house;
						var phone=student.phone;
						var address=student.address.trim();
						if (student.length==0) 
						{	
							alert("Populate All Fields");		
						}
						else{
							if ($.name=="") 
							{
								alert("Enter Valid Name");
							}
							else{
								if (!(name.match(/^[ a-zA-Z]+$/)))
								{
									alert("Enter Valid Name");
								}
								else
								{
									if (age=="" || age<10 || age>99)
									{
										alert("Enter Valid Age");
									}
									else{
										if (phone=="")
										{
											alert("Enter Valid Number");
										}
										else
										{
											if(address=="")
											{
												alert("Enter Valid Address");
											}
											else
											{
												$.ajax({
													type:'POST',
													url: 'http://localhost:3000/students',
													data: student,
													success:function(student)
													{
														var tableN=$('#tableBody').empty();
														
														tableN.append('<tr><td data-title="Id">'+student.id+'</td><td data-title="Name">'+student.name+'</td><td data-title="Age">'+student.age+'</td><td data-title="Gender">'+student.gender+'</td><td data-title="School">'+student.school+'</td><td data-title="House">'+student.house+'</td><td data-title="Phone">'+student.phone+'</td><td data-title="Address">'+student.address+'</td><td data-title="Edit">'+'<button data-id='+student.id+' data-target="#iModal" data-toggle="modal" class="update" ><span class="glyphicon glyphicon-edit"></span></button>'+'<button data-id='+student.id+' class="remove"><span class="glyphicon glyphicon-trash"></span></button>'+'</td></tr>')
													},
													error: function()
													{
									    			alert("Cant Load The Data");
									  				}
												});
											}

										}

									}
								}
							}
						}
				});
		// Delete Element 
		$btable.delegate('.remove', 'click',function(){

			var $tr = $(this).closest('tr');
			$.ajax({
				type: 'DELETE',
				url: 'http://localhost:3000/students/'+ $(this).attr('data-id'),
				success:function(){
					$tr.remove();
				},
				error: function()
				{
    			alert("Cant Load The Data");
  				}
			});
		});
		//editable table
		$btable.delegate('.update', 'click',function(){

			$id=$(this).attr('data-id');
			$submitButton.hide();
			$saveButton.show();
			$.ajax({

				type:'GET',
				url: 'http://localhost:3000/students/'+ $(this).attr('data-id'),
				dataType:"jsonp",
				success: bringDataForUpdate,
			});
			function bringDataForUpdate(bringDataForUpdate)
			{ 
				$(".modal-dialog #inputName").val(bringDataForUpdate.name),
				$(".modal-dialog #inputAge").val(bringDataForUpdate.age),
				$(".modal-dialog #inputGender").val(bringDataForUpdate.gender),
				$(".modal-dialog #inputHouse").val(bringDataForUpdate.house),
				$(".modal-dialog #inputPhone").val(bringDataForUpdate.phone),
				$(".modal-dialog #inputAddress").val(bringDataForUpdate.address),


				$("#saveButton").on('click',function()
				{
					var gen=$('#inputGender');
					var hou=$('#inputHouse');

					var student1=
					{
						name: $name.val(),
						age: $age.val(),
						house:(hou[0].value),
						gender:(gen[0].value),
						school: "HOGWARTS SCHOOL OF WITCHCRAFT AND WIZARDRY",
						phone: $phone.val(),
						address: $address.val(),
					}
					var id=student1.id;
					var name=student1.name.trim();
					var age = student1.age;
					var gender=student1.gender;
					var school=student1.school;
					var house=student1.house;
					var phone=student1.phone;
					var address=student1.address.trim();
					if (student1.length==0) 
					{	
						alert("Populate All Fields");		
					}
					else{
						if (name=="") 
						{
							alert("Enter Valid Name");
						}
						else{
							if (!(name.match(/^[ a-zA-Z]+$/)))
							{
								alert("Enter Valid Name");
							}
							else
							{
								if (age=="" || age<10 || age>99) 
								{
									alert("Enter Valid Age");
								}
								else{
									if (phone=="")
									{
										alert("Enter Valid Number");
									}
									else
									{
										if(address=="")
										{
											alert("Enter Valid Address");
										}
										else
										{

											$.ajax({
												type:'PATCH',
												url: 'http://localhost:3000/students/'+$id,
												data: student1,
												success:function(student1)
												{
													var tableN=$('#tableBody').empty();
													tableN.append('<tr><td data-title="Id">'+student1.id+'</td><td data-title="Name">'+student1.name+'</td><td data-title="Age">'+student1.age+'</td><td data-title="Gender">'+student1.gender+'</td><td data-title="School">'+student1.school+'</td><td data-title="House">'+student1.house+'</td><td data-title="Phone">'+student1.phone+'</td><td data-title="Address">'+student1.address+'</td><td data-title="Edit">'+'<button data-id='+student1.id+' data-target="#iModal" data-toggle="modal" class="update" ><span class="glyphicon glyphicon-edit"></span></button>'+'<button data-id='+student1.id+' class="remove"><span class="glyphicon glyphicon-trash"></span></button>'+'</td></tr>')
												},
												error: function()
												{
								    			alert("Cant Load The Data");
								  				}
											});

										}

									}

								}
							}
						}
					}

				});

			}

		});
		
	})();

// pagination 
var counter=0;
var limit=0;
var tableN=$('#tableBody').empty();
$(window).scroll(function(){
	if ($(window).scrollTop() == $(document).height()-$(window).height()){
		limit=20;
		counter+=20;
		$.ajax({
			type:'GET',
			url:'http://localhost:3000/students/?_start='+counter+'&_limit='+limit,
			success:function(data)
			{
		            //    $countrytable.empty();
		            for(var m in data)
		            {
		            	var id=data[m].id;
		            	var name=data[m].name;
		            	var age=data[m].age;
		            	var gender=data[m].gender;
		            	var school=data[m].school;
		            	var house=data[m].house;
		            	var phone=data[m].phone;
		            	var address=data[m].address;
		            	tableN.append('<tr><td data-title="Id">'+id+'</td><td data-title="Name">'+name+'</td><td data-title="Age">'+age+'</td><td data-title="Gender">'+gender+'</td><td data-title="School">'+school+'</td><td data-title="House">'+house+'</td><td data-title="Phone">'+phone+'</td><td data-title="Address">'+address+'</td><td data-title="Edit">'+'<button data-id='+id+' data-target="#iModal" data-toggle="modal" class="update" ><span class="glyphicon glyphicon-edit"></span></button>'+'<button data-id='+id+' class="remove"><span class="glyphicon glyphicon-trash"></span></button>'+'</td></tr>')
		            }
		        }
		    });
	}
});





