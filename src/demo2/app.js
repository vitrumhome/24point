
var total_click = 0; // number of clicks so far, will be reset when it reaches 4, it never goes below 0
var input_data =[]; 
function sortNumber(a,b)
{
	return a - b;
}

function find_solution(fnum)
{
	fnumsted = fnum.slice();
	fnumsted.sort(sortNumber);
	begin  = the_string.indexOf("["+fnumsted + "]");
	begin1 = the_string.indexOf("]", begin);
	end1 = the_string.indexOf("[", begin1);
        solution_F = 0;

 	if (end1 - begin1 < 4){ // no solutions
		output_str ="  [ <font color =blue>" + fnum.toString().replace(/,/g, " ") + "</font> ] 无解."  ;
	}
	else{
		sol_str = the_string.substr(begin1 + 2, end1 - begin1 -3);
		sol_str = sol_str.replace(/x/g, "&times;");
		sol_vec = sol_str.split(" ");
		f_str = "";
		for (ii = 0; ii < sol_vec.length; ii ++)
 		{
 			f_str +="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[" + (ii+1) +"] " + sol_vec[ii] + "<br><br>";
 		}
		output_str = "[ <font color =blue>" + fnum.toString().replace(/,/g, " ") + "</font> ] 的所有<a href=\"http://www.4shu.net/theory/\"   target=\"_blank\">独立解</a> 是:<br><br> <font color = green>" + f_str + "</font> "; 
        solution_F = 1;

	}

	document.getElementById("outputs").innerHTML = output_str;  //"<font color =blue> solutions for </font>" +  fnum  + " " + end1 + " " + begin1 + " are <br>";    // display the inputs

} 


function go_to( x ) 
{
	if (x == -1)  // backspace
	{
		if (total_click >0)
		{
			total_click --;
			input_data.pop( );
		}
	}
	else
	{
		total_click ++;
		input_data.push(x);
		if (total_click == 1)
			document.getElementById("outputs").innerHTML =" ";
		if (total_click == 4)
		{
			find_solution(input_data);
			input_data  = [];
			total_click = 0;
		}
	}

	var str1 = input_data.toString().replace(/,/g, " ");
	document.getElementById("inputs").innerHTML =  str1  + "<br>";    // display the inputs
}
 