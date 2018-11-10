var steps = 0;

function newStep(){
	if (steps > 8) return;
	steps++;

	let div = document.createElement("div");
	div.innerHTML = `<div id="div_step` + steps + `" style="display: flex;">
	<div class="square" style="background-color: #F04747;"></div>
	<textarea id="step` + steps + `" oninput="results()" placeholder="Step ` + (steps + 1) + `" style="border-radius: 0px;"></textarea>
</div>`;
	document.getElementById("steps").appendChild(div);
}

function remStep(){
	if (steps == 0) return;

	var div = document.getElementById("div_step" + steps);
	div.parentNode.removeChild(div);
	steps--;
}

function results(){
	var description = document.getElementById("description");
	var expected = document.getElementById("expected");
	var bug = document.getElementById("bug");
	var result = document.getElementById("result");

	document.getElementById("copy").innerHTML = "Copy to clipboard";

	var v_description = description.value.trim();
	var v_expected = expected.value.trim();
	var v_bug = bug.value.trim();
	if (v_description !== "" && v_expected !== "" && v_bug !== "")
	{
		let values = [];

		for (let e = 0; e <= steps; e++)
		{
			let val = document.getElementById("step" + e).value.trim();
			if (val === "")
				if (e == steps && e > 0){
					remStep();
					break;
				}
				else
				{
					result.value = "";
					return;
				}
			values.push(val);
		}

		result.value = "!bug " + v_description + "|" + values.join("-") + "|" + v_expected + "|" + v_bug;
	}
	else
		result.value = "";
}

function copy(){
	let result = document.getElementById("result");
	if (result.value == "") return;

	result.select();
	document.execCommand("copy");
	document.getElementById("copy").innerHTML = "Copied";
}