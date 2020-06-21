const template = async() =>{

	const submisson = document.getElementById('submisson');
	submisson.innerHTML = `
		<h1 id="location"></h1>
		<div class="row">
			<section id="content"></section>
			<section class="col-sm-12 col-md-12 col-lg-6">
					<div class="row" id="images-holder">
						<img class="col-12" id="main-img"></img>
						<img class="col-sm-12 col-md-6" id="img-2"></img>
						<img class="col-sm-12 col-md-6" id="img-3"></img>
					</div>
			</section>
			<section class="col-sm-12 col-md-12 col-lg-6">
				<div id="results">
					<div>
						<h3>Random Things</h3>
						<ul>
							<li>Population: <span id="pop"></span></li>
							<li>Latitude: <span id="lat"></span></li>
							<li>Longitude: <span id="lng"></span></li>
						</ul>
					</div>
					<div id="weather">
						<h3>Weather Stats</h3>
						<p>Six day Weather</p>
						
						<ul class="weather">
							<li id="wd-1" class="weather-card">
								<div id="wd-1-date" class="weather-date"></div>
								<img id="wd-1-icon" class="weather-icon"></img>
								<div id="wd-1-temp" class="weather-temp"></div>
								<div class="weather-des">
									<div id="wd-1-des" class="des"></div>
								</div>
							</li>
							<li id="wd-2" class="weather-card">
								<div id="wd-2-date" class="weather-date"></div>
								<img id="wd-2-icon" class="weather-icon"></img>
								<div id="wd-2-temp" class="weather-temp"></div>
								<div class="weather-des">
									<div id="wd-2-des" class="des"></div>
								</div>
							</li>
							<li id="wd-3" class="weather-card">
								<div id="wd-3-date" class="weather-date"></div>
								<img id="wd-3-icon" class="weather-icon"></img>
								<div id="wd-3-temp" class="weather-temp"></div>
								<div class="weather-des">
									<div id="wd-3-des" class="des"></div>
								</div>
							</li>
							<li id="wd-4" class="weather-card">
								<div id="wd-4-date" class="weather-date"></div>
								<img id="wd-4-icon" class="weather-icon"></img>
								<div id="wd-4-temp" class="weather-temp"></div>
								<div class="weather-des">
									<div id="wd-4-des" class="des"></div>
								</div>
							</li>
							<li id="wd-5" class="weather-card">
								<div id="wd-5-date" class="weather-date"></div>
								<img id="wd-5-icon" class="weather-icon"></img>
								<div id="wd-5-temp" class="weather-temp"></div>
								<div class="weather-des">
									<div id="wd-5-des" class="des"></div>
								</div>
							</li>
							<li id="wd-6" class="weather-card">
								<div id="wd-6-date" class="weather-date"></div>
								<img id="wd-6-icon" class="weather-icon"></img>
								<div id="wd-6-temp" class="weather-temp"></div>
								<div class="weather-des">
									<div id="wd-6-des" class="des"></div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
	`

}

export { template }