$ (function ()
	{
		$("#searchMovie").click(searchMovie);
		var table=$("results");
		function searchMovie()
			{
				var title=$("#movieTitle").val();
				$.ajax({
					url:"http://www.omdbapi.com/?s="+title,
					success: renderMovies,

				});
			}

		function renderMovies(movies)
		{ 
			var tableN=$('#tableBody').empty();
			console.log(movies);
			if(movies.Error==="Movie not found!")
			{
				alert("Movie not found!");
				var posterUrl="NA";
				var title="NA";
				var year="NA";
				var type="NA";

				tableN.append('<tr><td><img src ='+posterUrl+' alt="Image not Available" class="img-responsive"></td><td>'+title+'</td><td>'+year+'</td><td>'+type+'</td></tr>');
			}
			for(var m in movies.Search)
			{
				console.log(m);
				var posterUrl=movies.Search[m].Poster;
				var title=movies.Search[m].Title;
				var year=movies.Search[m].Year;
				var type=movies.Search[m].Type;

				tableN.append('<tr><td><img src ='+posterUrl+' alt="Image not Available" class="img-responsive"></td><td>'+title+'</td><td>'+year+'</td><td>'+type+'</td></tr>')
			}
		}
	});
