//Lookie here, I don't want any of you retrobates screaming at me for my messy code, I don't care that I'm using var instead of let, I don't care that I only sometimes use semicolons, I don't care that the game is very easily hackable. Let me live my life. (I'm gonna turn this into a news ticker, aren't I?)

if(localStorage){
	var localStorageWorks = true
	console.log("local storage works")
}
else{
	var localStorageWorks = false
	console.log("local storage does not works")
}

//Really unnecesary but if I removed the function I would have to fix a few things and I don't feel like doing that
function getElement(elementName){
	return document.getElementById(elementName)
}

//Multiplies an int by every term in a list
function multiplyThru(initial,list){
	for(let i of list){
		initial*=i
	}
	return Math.round(initial)
}

//A better version of the log function, with the ability to set the base. The one caviot is that I had it set log(0,x) to 0 no matter what when it should be -infinity, I did this to prevent infinite recursion with the base class.
function log(x,logBase=Math.E){
	if(x == 0){
		return 0
	}
	if(logBase == Math.E){
		return Math.log(x)
	}
	else{
		return Math.log(x)/Math.log(logBase)
	}
}

//Two functions very related. Factorial is just x! why "my factorial" (actually called double factorial, didn't know that at the time, and I don't want to bug fix right now) is every other factorial term.
function factorial(x){
	result = 1
	for (let i = 1; i <= x; i++){
		result *= i
	}
	return result
}
function myFactorial(x){
	return factorial((x*2)-1)
}

//bitwiseOr(5,6) = 7, too complicated to explain in depth
function bitwiseOr(p,q){
	p=new base(p,2).value
	q=new base(q,2).value
	
	while(q.length < p.length){
		q="0"+q
	}
	while(p.length < q.length){
		p="0"+p
	}
	
	result = []
	
	for(let i = 0; i < p.length; i++){
		result.push(String(Number(p[i])||Number(q[i])))
	}
	
	value = 0
	
	for(let i = result.length-1; i >= 0; i--){
		if(result[i]=='1'){
			value += 2**(result.length-(i+1))
		}
	}
	return value
	
}

//Plurralizer function, it's what causes the game to say "1 point" and "2 points".
function plural(amt,what){
	if(amt != 1){
		return amt+" "+what+'s'
	}
	else{
		return amt+" "+what
	}
}

//Destroys your save file, name is a bit dramatic
function ruinSave(){
	localStorage.setItem(2,1)
}

//Converts string to bool
function Bool(inputString){
	if(inputString == "true"){
		return true
	}else{
		return false
	}
}


if(!localStorageWorks){
	confirm("uh oh! local storage doesn't work on your browser, so the game won't be able to save data. That means every time you close the tab, your progress will reset. Either export your save every now and then or switch to a browser that supports saving.") //there is literally no way to export your save
}

//Updates the ipsiClicker interval when you buy them. Also updates the passive log gen interval if you have log upgrade 101
function reloadIpsi(){
	if(ipsiKey != -1){
		clearInterval(ipsiKey)
	}
	if(ipsiAmount > 0){
		ipsiKey = setInterval(ipsiClick,1000/(ipsiAmount))
	}
	
	if(passiveLog && ipsiAmount > 0){
		clearInterval(passiveLogKey)
		passiveLogKey = setInterval(passiveLogGen,1000/Math.ceil(ipsiAmount/1000))
	}
	if(strongPassiveLog && ipsiAmount > 0){
		clearInterval(strongPassiveLogKey)
		strongPassiveLogKey = setInterval(strongPassiveLogGen,Math.max(1000/Math.ceil(ipsiAmount/10000),10))
	}
	
}

//Updates the hyperspatial ipsi-interval when you buy them.
function reloadHyperIpsi(){
	if(HC2.disabled = true){
		clearInterval(baseAutomatorKey)
		baseAutomatorKey = setInterval(baseAutomator,Math.max(10,1000/log(hyperIpsis+2,2)))
	}
	//if(ipsiGenKey == -1){
	//	ipsiGenKey = setInterval(passiveIpsiGen,Math.max(10,1000/hyperIpsis))
	//}else{
	//	clearInterval(ipsiGenKey)
	//	ipsiGenKey = setInterval(passiveIpsiGen,Math.max(10,1000/hyperIpsis))
	//}
}

var ipsiKey = -1
var passiveLogKey = -1;

//For testing
//localStorage.clear()


setInterval(pointsAuto,0)
setInterval(ipsiAuto,0)

//IDK what these do, I forgot, all I know is the game crashes without them, what can you do (you could remove the dependancies, stupid)
var bestLogPoints = 0
var bestLogMaxBase = false

//All variables in local storage
if(localStorage.length == 57){
	//general variables
	var curBase = Number(localStorage.getItem("curBase"));
	var cheats = Bool(localStorage.getItem("cheats"));

	//points variables
	var score = new base(Number(localStorage.getItem("score")),Number(curBase));
	var pointGainBase = Number(localStorage.getItem("pointGainBase"));
	var pointGainCost = Number(localStorage.getItem("pointGainCost"));
	var initPointsUpgradeCostStep = Number(localStorage.getItem("initPointsUpgradeCostStep"))
	var pointsUpgradeTimesBought = Number(localStorage.getItem("pointsUpgradeTimesBought"))

	//base variables
	var enterCostForm = Number(localStorage.getItem("enterCostForm"))
	var ipsiAmount = Number(localStorage.getItem("ipsiAmount"))
	var baseMulti = Bool(localStorage.getItem("baseMulti"))
	var ipsiBonus = Bool(localStorage.getItem("ipsiBonus"))
	var bestBase = Number(localStorage.getItem("bestBase"))
	var initIpsiAmt = Number(localStorage.getItem("initIpsiAmt"))
	var baseUpgrades = localStorage.getItem("baseUpgrades")

	//log variables
	var logUnlocked = Bool(localStorage.getItem("logUnlocked"))
	var logPoints = Number(localStorage.getItem("logPoints"))
	var logUpgrades = {1:false,10:false,11:false,100:false,101:false,110:false,111:false,1000:false,1001:false,1010:false,1011:false,1100:false,1101:false,1110:false,1111:false}
	var unspentPaths = Number(localStorage.getItem("unspentPaths"))
	var totalPaths = Number(localStorage.getItem("totalPaths"))
	var logPointBoost = Bool(localStorage.getItem("logPointBoost"))
	var ipsiMax = Bool(localStorage.getItem("ipsiMax"));
	var selfSyn = Bool(localStorage.getItem("selfSyn"));
	var ipsiPointMulti = Bool(localStorage.getItem("ipsiPointMulti"));
	var safeFastEnter = Bool(localStorage.getItem("safeFastEnter"));
	var bestBaseMulti = Bool(localStorage.getItem("bestBaseMulti"));
	var freeIpsi = Bool(localStorage.getItem("freeIpsi"));
	var pointsUpgradeBoost = Bool(localStorage.getItem("pointsUpgradeBoost"));
	var startWithLogPointsPoints = Bool(localStorage.getItem("startWithLogPointsPoints"));

	//bitwise variables
	var bitwisePoints = Number(localStorage.getItem("bitwisePoints"))
	
	//v1.2.0 base-log variables
	var cheaperPointUpgrade = Bool(localStorage.getItem("cheaperPointUpgrade"))
	var pointsUpgradeEffect = +localStorage.getItem("pointsUpgradeEffect")
	var selfSynLog = Bool(localStorage.getItem("selfSynLog"))
	var selfSynRoot = Bool(localStorage.getItem("selfSynRoot"))
	var freePointsBuyable = Bool(localStorage.getItem("freePointsBuyable"))
	var passiveLog = Bool(localStorage.getItem("passiveLog"))
	var distanceMulti = Bool(localStorage.getItem("distanceMulti"))
	var pathMulti = Bool(localStorage.getItem("pathMulti"))
	
	//v1.2.0 hyperspace variables
	var hyperEnergy = +localStorage.getItem("hyperEnergy")
	var totalHyperspace = +localStorage.getItem("totalHyperspace")
	var effectiveHyperspace = +localStorage.getItem("effectiveHyperspace")
	var space = +localStorage.getItem("space")
	var planes = +localStorage.getItem("planes")
	var lines = +localStorage.getItem("lines")
	var unspentHyperspace = +localStorage.getItem("unspentHyperspace")
	var spaceLoss = +localStorage.getItem("spaceLoss")
	var planeLoss = +localStorage.getItem("planeLoss")
	var lineLoss = +localStorage.getItem("lineLoss")
	var maxBase = +localStorage.getItem("maxBase")
	var unboughtHyperUpgrades = localStorage.getItem("unboughtHyperUpgrades")
	var hyperLogMulti = Bool(localStorage.getItem("hyperLogMulti"))
	var logDrainKey = -1
	var strongPassiveLog = Bool(localStorage.getItem("strongPassiveLog"))
	var strongPassiveLogKey = -1
	var incompleteBranchChallenges = localStorage.getItem("incompleteBranchChallenges")
	var bestLineProd = Bool(localStorage.getItem("bestLineProd"))
	var bestLines = +localStorage.getItem("bestLines")
	var hyperIpsis = +localStorage.getItem("hyperIpsis")
	var baseAutomatorKey = -1
	var hyperMaxBase = Bool(localStorage.getItem("hyperMaxBase"))
	var hyperMulti = Bool(localStorage.getItem("hyperMulti"))
	var ipsiGenKey = -1
	
	
	htmlContent.innerHTML = localStorage.getItem("webpageState")
	
	if(HC1.disabled){
		setInterval(logPathAuto,0)
	}
	if(HC3.disabled){
		setInterval(baseUpgradeAuto,0)
	}
	
	reloadIpsi()
	reloadHyperIpsi()
}
else{
	if(localStorage.length != 0){
		alert("Oh noes! Either your save file is from a previous version, or it has been incompatibly tampered with. Your progress needs to be set back to the previous checkpoint.")
		
		if(localStorage.getItem("checkpoint") != null){
			var progress = localStorage.getItem("checkpoint")
		}else{
			var progress = "base"
		}
		localStorage.clear()
	}
	else{
		console.log("no save data to load")
		var progress = "base"
	}
	//general variables
	var curBase = 2;
	var cheats = false;

	//points variables
	var score = new base(0,2);
	var pointGainBase = 1;
	var pointGainCost = curBase;
	var initPointsUpgradeCostStep = 1
	var pointsUpgradeTimesBought = 0

	//base variables
	var enterCostForm = 1
	var ipsiAmount = 0
	var ipsiKey = -1
	var baseMulti = false
	var ipsiBonus = false
	var bestBase = 2
	var initIpsiAmt = 0
	var baseUpgrades = "123456789"

	//log variables
	var logUnlocked = false
	var logPoints = 0
	var logUpgrades = {1:false,10:false,11:false,100:false,101:false,110:false,111:false,1000:false,1001:false,1010:false,1011:false,1100:false,1101:false,1110:false,1111:false}
	var unspentPaths = 0
	var totalPaths = 0
	var logPointBoost = false
	var ipsiMax = true;
	var selfSyn = false;
	var ipsiPointMulti = false;
	var safeFastEnter = false;
	var bestBaseMulti = false;
	var freeIpsi = false;
	var pointsUpgradeBoost = false;
	var startWithLogPointsPoints = false;

	//bitwise variables
	var bitwisePoints = 0
	
	//
	var cheaperPointUpgrade = false
	var pointsUpgradeEffect = 1
	var selfSynLog = false;
	var selfSynRoot = false;
	var freePointsBuyable = false;
	var passiveLog = false;
	var passiveLogKey = -1;
	var distanceMulti = false
	var pathMulti = false;



	var hyperEnergy = 0;
	var totalHyperspace = 0;
	var effectiveHyperspace = 0;
	var space = 0;
	var planes = 0;
	var lines = 0;
	var unspentHyperspace = 0;
	var spaceLoss = 1;
	var planeLoss = 1;
	var lineLoss = 1;
	var maxBase = 60;
	var unboughtHyperUpgrades = "123456789"
	var hyperLogMulti = false;
	var logDrainKey = -1
	var strongPassiveLog = false
	var strongPassiveLogKey = -1
	var incompleteBranchChallenges = "12345678"
	var bestLineProd = false
	var bestLines = 0
	var hyperIpsis = 0
	var baseAutomatorKey = -1
	var hyperMaxBase = false
	var hyperMulti = false;
	var ipsiGenKey = -1
	
	checkpoint(progress)
	
}

//Variables not yet added to local storage (Please let the dev know if there are any below here, as after pushing an update all variables should be added to local storage unless it's commented out, that means it's a scrapped thing that may be part of a future update.)

//let lesserBitwisePoints = 0



//Things that need to update constantly
function updatePage(){
	
	
	//update page elements
	scoreTrack.innerHTML = plural(score.value,"point");
	score.convert(curBase);
	pointGainLabel.innerHTML = plural(new base(pointGainCost,curBase).value,"point");
	pointButton.innerHTML = "+"+plural(new base(multipliers((pointsUpgradeTimesBought*pointsUpgradeEffect)+1),curBase).value,"point");
	scoreBase.innerHTML = "Base "+curBase;
	baseScore.innerHTML = "You are in base "+curBase+"."
	ipsiAmt.innerHTML = "You have "+plural(new base(ipsiAmount,10).value,"ipsiclicker")
	pointGainPower.innerHTML = new base((pointsUpgradeTimesBought+1)-pointsUpgradeTimesBought,curBase).value

	//buttons
	//Enter next base button
	var baseResetRequirement = curBase**(6+Math.floor((curBase-1)/60))
	if(score.ge(baseResetRequirement)){
		if(logUnlocked){
			logPointMidStore = (log(score.decimal,curBase)**(((curBase**0.5))**logPointBoost))
			let L = log(logPoints,10)*20/3
			if(selfSynRoot){
				if(curBase <= L){
					logPointMidStore**=curBase/360+1
				}
			}
			if(pathMulti){
				logPointMidStore *= 2**unspentPaths
			}
			if(hyperLogMulti){
				logPointMidStore *= 2**totalHyperspace
			}
			
			basePrestButton.innerHTML = "Reset for "+new base(Math.round(logPointMidStore)).value+" log points"
			basePrestButton.disabled = false
		}
		else{
			basePrestButton.innerHTML = "Reset to enter base "+(curBase+1)
			basePrestButton.disabled = false
		}
	}
	else{
		basePrestButton.innerHTML = "Reach "+new base(baseResetRequirement,curBase).value+" points"
		basePrestButton.disabled = true
	}
	
	//increase point gain button
	if(score.ge(pointGainCost)){
		pointGainButton.disabled = false;
	}
	else{
		pointGainButton.disabled = true;
	}
	
	//base upgrade buttons
	for(let upgrade of baseUpgrades){
		if((curBase-2)>=getElement("baseUpgrade"+upgrade).getAttribute("cost")){
			getElement("baseUpgrade"+upgrade).disabled = false;
		}
		else{
			getElement("baseUpgrade"+upgrade).disabled = true;
			
		}
	}
	
	//hyperspace upgrade buttons
	for(let upgrade of unboughtHyperUpgrades){
		if((hyperEnergy)>=getElement("HU"+upgrade).getAttribute("cost")){
			getElement("HU"+upgrade).disabled = false;
		}
		else{
			getElement("HU"+upgrade).disabled = true;
			
		}
	}
	
	//ipsiClicker button
	if(ipsiAmount != 100 || ipsiMax == false){
		if(ipsiAmount >= 100){
			if(curBase-2 >= Number(buyIpsi.getAttribute("cost"))){
				buyIpsi.disabled = false;
				getElement("buyIpsi").innerHTML = "Buy " + plural(new base((Math.round((ipsiAmount*((curBase-1)-Number(buyIpsi.getAttribute("cost"))))**0.5+1+(ipsiBonus*2))),10).value,"ipsiclicker")+". Cost: "+plural(Number(getElement("buyIpsi").getAttribute("cost"))+2,"base")
			}
			else{
				buyIpsi.disabled = true;
				getElement("buyIpsi").innerHTML = "Buy " + plural(new base((Math.round((ipsiAmount)**0.5+1+(ipsiBonus*2))),10).value,"ipsiclicker")+". Cost: "+plural(Number(getElement("buyIpsi").getAttribute("cost"))+2,"base")
			}
		}
		else{
			if(curBase-2 >= Number(buyIpsi.getAttribute("cost"))){
				buyIpsi.disabled = false;
				getElement("buyIpsi").innerHTML = "Buy " + plural(new base(((ipsiAmount*(curBase-Number(buyIpsi.getAttribute("cost")))+1+(ipsiBonus*2))-ipsiAmount),10).value,"ipsiclicker")+". Cost: "+plural(Number(getElement("buyIpsi").getAttribute("cost"))+2,"base")
			}
			else{
				buyIpsi.disabled = true;
				getElement("buyIpsi").innerHTML = "Buy " + plural(new base(((ipsiAmount*(2)+1+(ipsiBonus*2))-ipsiAmount),10).value,"ipsiclicker")+". Cost: "+plural(Number(getElement("buyIpsi").getAttribute("cost"))+2,"base")
			}
		}
	}
	else{
		buyIpsi.disabled = true;
		getElement("buyIpsi").innerHTML = "At max ipsiclickers."
		
	}
	
	//log ipsiClicker button
	if(logPoints > buyIpsiLog.getAttribute("cost")){
		buyIpsiLog.disabled = false;
		buyIpsiLog.innerHTML = "Buy "+ plural(new base(Math.round(logPoints**0.5),10).value,"ipsiclicker")+". Cost: "+ plural(new base(buyIpsiLog.getAttribute("cost"),10).value,"log point")
	}
	else{
		buyIpsiLog.disabled = true;
		buyIpsiLog.innerHTML = "Buy "+ plural(new base(Math.round(buyIpsiLog.getAttribute("cost")**0.5),10).value,"ipsiclicker")+". Cost: "+ plural(new base(buyIpsiLog.getAttribute("cost"),10).value,"log point")
	}
	
	//log path button
	if(logPoints >= buyLogPath.getAttribute("cost")){
		buyLogPath.disabled = false;
		
		
	}
	else{
		buyLogPath.disabled = true;
	}
	
	logAmount.innerHTML="You have "+plural(new base(logPoints,10).value,"log point")
	pathAmount.innerHTML = "You have "+plural(unspentPaths,"unused branch")
	
	//galaxy button
	if(!pointsUpgradeTimesBought >= pointGalaxButton.getAttribute("cost")){
		pointGalaxButton.innerHTML = "Reach "+pointGalaxButton.getAttribute("cost")+" buys of the points buyable."
		pointGalaxButton.disabled = true
	}
	else{
		pointGalaxButton.innerHTML = "Buy a point galaxy (hover for details)"
		pointGalaxButton.disabled = false
	}
	
	//hyperspace
	hyperEnergyAmount.innerHTML = hyperEnergy
	if(hyperEnergy >= hyperspaceBuyable.getAttribute("cost")){
		hyperspaceBuyable.disabled = false
	}else{
		hyperspaceBuyable.disabled = true
	}
	
	if(hyperEnergy >= HB1.getAttribute("cost") && unspentHyperspace >= 1 && HB1.getAttribute("amt") < 5){
		HB1.disabled = false
	}else{
		HB1.disabled = true
	}
	if(hyperEnergy >= HB2.getAttribute("cost") && unspentHyperspace >= 1 && HB2.getAttribute("amt") < 5){
		HB2.disabled = false
	}else{
		HB2.disabled = true
	}
	if(hyperEnergy >= HB3.getAttribute("cost") && unspentHyperspace >= 1 && HB3.getAttribute("amt") < 5){
		HB3.disabled = false
	}else{
		HB3.disabled = true
	}
	if(hyperEnergy >= HB4.getAttribute("cost") && unspentHyperspace >= 1 && HB4.getAttribute("amt") < 5){
		HB4.disabled = false
	}else{
		HB4.disabled = true
	}
	if(hyperEnergy >= HB5.getAttribute("cost") && unspentHyperspace >= 1 && HB5.getAttribute("amt") < 5){
		HB5.disabled = false
	}else{
		HB5.disabled = true
	}
	if(hyperEnergy >= HB6.getAttribute("cost") && unspentHyperspace >= 1 && HB6.getAttribute("amt") < 5){
		HB6.disabled = false
	}else{
		HB6.disabled = true
	}
	
	unspentHyperspaceAmt.innerHTML = unspentHyperspace
	
	if(unspentHyperspace >= 1 && hyperEnergy >= 1){
		hyperIpsiBuyable.disabled = false
	}else{
		hyperIpsiBuyable.disabled = true
	}
	
	
	if(hyperMaxBase){
		if(!HC2.classList.contains("running")){
			maxBase = 60+(totalHyperspace*6)
		}else{
			maxBase = 10+(totalHyperspace)
		}
	}else{
		if(!HC2.classList.contains("running")){
			if(bestLogMaxBase){
				maxBase = Math.max(60,log(bestLogPoints,10)*20/3)
			}
			else{
				maxBase = 60
			}
		}else{
			maxBase = 10
		}
	}
	
	if(hyperIpsiBuyable.getAttribute("cost") <= hyperEnergy){
		hyperIpsiBuyAmt.innerHTML = plural(hyperIpsis*Math.round((hyperEnergy - hyperIpsiBuyable.getAttribute("cost"))**(1/6)) + 1, "hyperspatial ipsiclicker")
		hyperIpsiBuyable.disabled = false
	}else{
		hyperIpsiBuyAmt.innerHTML = plural(1, "hyperspatial ipsiclicker")
		hyperIpsiBuyable.disabled = true
	}
	
	hyperIpsiCost.innerHTML = hyperIpsiBuyable.getAttribute("cost")
	
	//Bitwise reset button
	
	if(ipsiAmount >= 60**3){
		bitwisePrestigeButton.innerHTML = "Reset everything up to this point for "+((Math.round(log(ipsiAmount,60)*100)/100)-2)+" (floored) bitwise points."
		
		bitwisePrestigeButton.disabled=false
	}
	else{
		bitwisePrestigeButton.innerHTML = "Reach base 60 and 60^3 ipsiclickers (currently 60^"+(Math.round(log(ipsiAmount,60)*100)/100)+")."
		
		bitwisePrestigeButton.disabled=true
	}
	bitwiseAmount.innerHTML=bitwisePoints
	
	
}

//when you click the +_points button
function addPoint(){
	var gain = multipliers((pointsUpgradeTimesBought*pointsUpgradeEffect)+1)
	score = score.add(gain);
	
}

//when you base reset
function prestige(){
	if(logUnlocked){
		logPointMidStore = (log(score.decimal,curBase)**(((curBase**0.5))**logPointBoost))
		let L = log(logPoints,10)*20/3
		if(selfSynRoot){
			if(curBase <= L){
				logPointMidStore**=curBase/360+1
			}
		}
		if(pathMulti){
			logPointMidStore *= 2**unspentPaths
		}
		if(hyperLogMulti){
			logPointMidStore *= 2**totalHyperspace
		}
		
		logPoints += Math.round(logPointMidStore)
		
	}
	if(bestBase == curBase){
		if(curBase==maxBase){
			bestBase = maxBase + 1
			baseSlider.max = maxBase
			curBase = maxBase
		}else{
			bestBase += 1
			baseSlider.max = Number(baseSlider.max)+1
			curBase ++;
			baseTabButton.hidden=false;
		}
	}else{
		if(enterCostForm != 3 || !logUnlocked){
			if(curBase == maxBase){
				curBase = maxBase
			}
			else{
				curBase ++;
			}
		}
	}
	pointsUpgradeTimesBought = 0;
	score = score.sub(score);
	if(startWithLogPointsPoints){
		score = score.add(logPoints)
	}
	pointGalaxButton.setAttribute("cost",6)
	pointGalaxAmount = 0
	
	
	document.getElementById("scoreBase").innerHTML = "Base "+curBase;
	pointGainCost = (Math.max(Math.round(curBase/(2**cheaperPointUpgrade)),2))**initPointsUpgradeCostStep;
	pointGainBase = 1;
	reloadIpsi()
	basePrestButton.disabled = true
	
	pointGalaxAmount = 0
	effectiveHyperspace = unspentHyperspace;
	bestLines = 0
}

//when you bitwise reset
function bitwiseReset(){
	bitwiseMilestones += 1
	console.log("you are preforming a bitwise reset...")
	
	bitwisePrestigeButton.hidden = true
	
	bitwisePoints += (Math.floor(log(ipsiAmount,60))-2)**3
	bitwiseTabButton.hidden=false
	
	curBase = 2
	//points variables
	score = new base(0,2);
	pointGainBase = 1;
	pointGainCost = 2;
	initPointsUpgradeCostStep = 1
	pointsUpgradeTimesBought = 0
	basePrestButton.classList.remove("logButton")
	
	//base variables
	enterCostForm = 1
	ipsiAmount = 0
	clearInterval(ipsiKey)
	ipsiKey = -1
	baseMulti = false
	ipsiBonus = false
	bestBase = 2
	initIpsiAmt = 0
	factorialPoints = false;
	cheaperPointUpgrade = false;
	baseSlider.max = 2
	baseSlider.hidden = true
	baseChange.hidden = true
	buyIpsi.style = ""
	
	//log variables
	logUnlocked = false
	logPoints = 0
	unspentPaths = 0
	totalPaths = 0
	logPointBoost = false
	ipsiMax = true;
	selfSynLog = false;
	selfSynRoot = false;
	ipsiPointMulti = false;
	freePointsBuyable = false;
	passiveLog = false;
	clearInterval(passiveLogKey);
	passiveLogKey = -1;
	safeFastEnter = false;
	bestBaseMulti = false;
	freeIpsi = false;
	pointsUpgradeBoost = false;
	startWithLogPointsPoints = false;
	
	baseAutoEnabled.checked=false
	pointAutoEnabled.checked=false
	baseIpsiAutoEnabled.checked=false
	logIpsiAutoEnabled.checked=false
	autoTab.hidden=true
	baseAutobuyer.hidden=true
	pointAutobuyer.hidden=true
	ipsiAutobuyer.hidden=true
	logIpsiAutobuyer.hidden=true
	
	buyIpsiLog.hidden=true
	
	baseUpgrades = "123456789"
	baseUpgrade1.innerHTML="Divides the cost of the points upgrade by your current base. Cost: 3 base"
	baseUpgrade2.innerHTML="Decreses the requirement for entering the next base. Cost: 7 bases"
	baseUpgrade3.innerHTML="Multiplies point gain by your current base. Cost: 7 bases"
	baseUpgrade4.innerHTML="Multiplies your current ipsiclickers by 3 and you gain two extra ipsiclickers whenever you buy them. Cost: 4 bases"
	baseUpgrade5.innerHTML="Unlock log points, gained on base reset, and the log tab. Cost: 10 bases"
	baseUpgrade6.innerHTML="The points buyable cost scales as if your base is half as small. Cost: 5 bases"
	baseUpgrade8.innerHTML="The points buyable effect scales, factorialy. Cost: 30 bases"
	baseUpgrade9.innerHTML="Multiplies point gain by the distance between your best base and your current base. Cost: 4 bases"
	
	logNumbers=[1,10,11,100,101,110,111,1000,1001,1010,1011,1100,1101,1110,1111]
	for(let i of logNumbers){
		getElement("log"+i).classList.remove("logButton")
	}
	
	buyLogPath.setAttribute("cost",60)
	buyLogPath.innerHTML = "Unlock another branch of the log tree. Cost: "+new base(buyLogPath.getAttribute("cost"),10).value+" log points"
	
}

function hyperPrest(){
	hyperEnergy += Math.max((Math.floor(totalPaths/4)-1),0) * unspentHyperspace**hyperMulti
	hyperResetButton.hidden = true
	hyperTabButton.hidden = false
	
	if(logPoints > bestLogPoints){
		bestLogPoints = logPoints
	}
	
	curBase = 2
	//points variables
	score = new base(0,2);
	pointGainBase = 1;
	pointGainCost = 2;
	initPointsUpgradeCostStep = 1
	pointsUpgradeTimesBought = 0
	basePrestButton.classList.remove("logButton")
	
	//base variables
	enterCostForm = 1
	ipsiAmount = 0
	clearInterval(ipsiKey)
	ipsiKey = -1
	baseMulti = false
	ipsiBonus = false
	bestBase = 2
	initIpsiAmt = 0
	factorialPoints = false;
	cheaperPointUpgrade = false;
	baseSlider.max = 2
	baseSlider.hidden = true
	baseChange.hidden = true
	buyIpsi.style = ""
	
	//log variables
	logUnlocked = false
	logPoints = 0
	unspentPaths = 0
	totalPaths = 0
	logPointBoost = false
	ipsiMax = true;
	selfSynLog = false;
	selfSynRoot = false;
	ipsiPointMulti = false;
	freePointsBuyable = false;
	passiveLog = false;
	clearInterval(passiveLogKey);
	passiveLogKey = -1;
	safeFastEnter = false;
	bestBaseMulti = false;
	freeIpsi = false;
	pointsUpgradeBoost = false;
	startWithLogPointsPoints = false;
	distanceMulti = false
	pathMulti = false;
	
	
	
	autoTab.hidden=true
	baseAutobuyer.hidden=true
	pointAutobuyer.hidden=true
	ipsiAutobuyer.hidden=true
	logIpsiAutobuyer.hidden=true
	
	buyIpsiLog.hidden=true
	
	baseSlideVal.innerHTML = "2"
	baseUpgrades = "123456789"
	baseUpgrade1.innerHTML="Divides the cost of the points upgrade by your current base. Cost: 3 base"
	baseUpgrade2.innerHTML="Decreses the requirement for entering the next base. Cost: 7 bases"
	baseUpgrade3.innerHTML="Multiplies point gain by your current base. Cost: 7 bases"
	baseUpgrade4.innerHTML="Multiplies your current ipsiclickers by 3 and you gain two extra ipsiclickers whenever you buy them. Cost: 4 bases"
	baseUpgrade5.innerHTML="Unlock log points, gained on base reset, and the log tab. Cost: 10 bases"
	baseUpgrade6.innerHTML="The points buyable cost scales as if your base is half as small. Cost: 5 bases"
	baseUpgrade8.innerHTML="The points buyable effect scales, factorialy. Cost: 30 bases"
	baseUpgrade9.innerHTML="Multiplies point gain by the distance between your best base and your current base. Cost: 4 bases"
	
	logNumbers=[1,10,11,100,101,110,111,1000,1001,1010,1011,1100,1101,1110,1111]
	for(let i of logNumbers){
		getElement("log"+i).classList.remove("logButton")
	}
	
	buyLogPath.setAttribute("cost",60)
	buyLogPath.innerHTML = "Unlock another branch of the log tree. Cost: "+new base(buyLogPath.getAttribute("cost"),10).value+" log points"
	
	ipsiAmount = initIpsiAmt
	getElement("buyIpsi").setAttribute("cost",1)
	buyIpsiLog.setAttribute("cost",1)
	buyIpsiLog.setAttribute("timesBought",0)
	getElement("buyIpsi").innerHTML = "Buy 1 ipsiclicker. Cost: "+getElement("buyIpsi").getAttribute("cost")+" bases"
	reloadIpsi()
	
	effectiveHyperspace = unspentHyperspace;
	lines = 0
	planes = 0
	space = 0
	bestLines = 0
	
	effectiveHyperAmount.innerHTML = effectiveHyperspace.toFixed(2)
	spaceAmount.innerHTML = space.toFixed(2)
	planeAmount.innerHTML = planes.toFixed(2)
	lineAmount.innerHTML = lines.toFixed(2)
	lineProduction.innerHTML = new base(multipliers(lines**0.5/6)*(pointsUpgradeTimesBought+1),curBase).value
	
	for(let i = 1; i <= 8; i++){
		if(!incompleteBranchChallenges.includes(i)){
			unspentPaths += 1
			logUpgrade(+(new base(i+7,2).value))
		}
	}
	
	//Challenge completions
	for(let i = 1; i <= 5; i++){
		if(getElement("HC"+i).classList.contains("running")){
			switch(i){
				case 1:
					setInterval(logPathAuto,0)
					break
				case 2:
					baseAutomatorKey = setInterval(baseAutomator,Math.max(10,1000/((hyperIpsis+(hyperIpsis == 0))**0.5)))
				case 3:
					setInterval(baseUpgradeAuto,0)
					break
				case 4:
					strongPassiveLog = true
					reloadIpsi()
					break
				case 5:
					logNumbers=[1,10,11,100,101,110,111,1000,1001,1010,1011,1100,1101,1110,1111]
					for(let i of logNumbers){
						getElement("log"+i).disabled = false
					}
					incompleteBranchChallenges = incompleteBranchChallenges.replace(challengeSlider.value-7,"")
			}
			getElement("HC"+i).disabled = true
			getElement("HC"+i).onclick()
		}
	}
	
	
	
}

//The hyperspace buyable
function buyHyperspace(){
	totalHyperspace += 1
	unspentHyperspace += 1
	hyperEnergy -= hyperspaceBuyable.getAttribute("cost")
	hyperspaceBuyable.setAttribute("cost",Math.round(Number(hyperspaceBuyable.getAttribute("cost")) * 1.5))
	hyperspaceCost.innerHTML = hyperspaceBuyable.getAttribute("cost")
	effectiveHyperspace = unspentHyperspace;
	totalHyperAmount.innerHTML = totalHyperspace
	unspentHyperspaceAmt.innerHTML = unspentHyperspace
}

//The only pre-base upgrade
function pointGain(){
	//pointGainBase += Math.max(1,(curBase**0.25)**pointsUpgradeBoost)+pointGalaxAmount;
	if(freePointsBuyable == false){
		score = score.sub(pointGainCost);
	}
	pointGainCost *= Math.max(Math.round(curBase/(2**cheaperPointUpgrade)),2);
	pointsUpgradeTimesBought ++;
}

//switch tabs
function tab(tab){
	var tabs = [document.getElementById("baseTab"),document.getElementById("pointsTab"),getElement("logTab"),getElement("autoTab"),getElement("optionsTab"),getElement("bitwiseTab"),getElement("achievementsTab"),getElement("hyperTab"),getElement("lesserBitwiseTab")]
	
	for(let i of tabs){
		i.hidden = true
	}
	document.getElementById(tab+"Tab").hidden = false
	
}

function bitwiseSubtab(tab){
	var tabs = [getElement("lootboxesTab"),getElement("dropChancesTab"),getElement("arrangementTab")]
	
	for(let i of tabs){
		i.hidden = true
	}
	getElement(tab+"Tab").hidden = false
}

//buying base upgrades
function baseUpgrade(number){
	//upgrade 1
	if(number == 1){
		//curBase -= 1;
		initPointsUpgradeCostStep = 0;
		getElement("baseUpgrade1").innerHTML = "Divides the cost of the points upgrade by your current base. Bought"
	}
	//upgrade 2
	if(number == 2){
		//curBase -= 5;
		if(enterCostForm != 3){
			enterCostForm = 2
		}
			
		getElement("baseUpgrade2").innerHTML = "Decreses the requirement for entering the next base. Bought"
	}
	//upgrade 3
	if (number == 3){
		//curBase -= 3;
		baseMulti = true;
		getElement("baseUpgrade3").innerHTML = "Multiplies point gain by your current base. Bought"
	}
	//upgrade 4
	if(number == 4){
		//curBase -= 3;
		ipsiBonus = true
		if(ipsiAmount != 100 || ipsiMax == false){
			ipsiAmount *= 3;
		}
		getElement("baseUpgrade4").innerHTML = "Multiplies your current ipsiclickers by 3 and you gain two extra ipsiclickers whenever you buy them. Bought"
	}
	//upgrade 5
	if(number == 5){
		logUnlocked = true;
		getElement("baseUpgrade5").innerHTML = "Unlock log points, gained on base reset, and the log tab. Bought"
		logTabButton.hidden = false
		baseChange.hidden = false
		basePrestButton.classList.add("logButton")
	}
	//upgrade 6
	if(number == 6){
		cheaperPointUpgrade = true;
		getElement("baseUpgrade6").innerHTML = "The points buyable cost scales as if your base is half as small. Bought"
	}
	//upgrade 7
	if(number == 7){
		
		pointGalaxButton.hidden = false
		baseResetNoGainButton.hidden = false
		getElement("baseUpgrade7").innerHTML = "Unlock point galaxies. Bought"
		basePrestButton.style.float = "left"
		pointGainButton.style.float = "left"
	}
	//upgrade 8
	if(number == 8){
		distanceMulti = true
		getElement("baseUpgrade8").innerHTML = "The points buyable effect scales, factorialy. Bought"
	}
	
	if(number == 9){
		distanceMulti = true
		getElement("baseUpgrade9").innerHTML = "Multiplies point gain by the distance between your best base and your current base. Bought"
	}
	
	curBase -= getElement("baseUpgrade"+number).getAttribute("cost")
	pointGainBase = 1;
	pointGainCost = (Math.max(Math.round(curBase/(2**cheaperPointUpgrade)),2))**initPointsUpgradeCostStep;
	baseUpgrades = baseUpgrades.replace(number,'');
	getElement("baseUpgrade"+number).disabled = true;
	reloadIpsi()
}

//buying log upgrades
function logUpgrade(number){
	if(number == 0){
		unspentPaths += 1
		totalPaths += 1
		if(!pathMulti){
			logPoints -= buyLogPath.getAttribute("cost")
		}
		buyLogPath.setAttribute("cost",buyLogPath.getAttribute("cost")*(6))
		pathAmount.innerHTML = "You have "+plural(unspentPaths,"unused branch")
		if(totalPaths == 2 || totalPaths == 4 || totalPaths == 6){
			buyLogPath.setAttribute("cost",buyLogPath.getAttribute("cost")*(6))
		}
		if(totalPaths == 8){
			hyperResetButton.hidden = false
		}
		hyperResetAmt.innerHTML=Math.floor((totalPaths/4)-1) * unspentHyperspace**hyperMulti
		forNextHyper.innerHTML=(Math.floor(totalPaths/4)+1)*4
		
		
		buyLogPath.innerHTML = "Unlock another branch of the log tree. Cost: "+new base(buyLogPath.getAttribute("cost"),10).value+" log points"
		
		return
	}
	if(getElement("log"+number).classList.contains("logButton") == true){
		return
	}
	
	if(unspentPaths >= 1){
		if(getElement("log"+number).classList.contains("logButton")){
			return
		}
		getElement("log"+number).classList.add("logButton")
		
	}
	if(number == 1){
		logPointBoost = true
		
	}
	if(number == 10){
		logUpgrade(1)
		baseSlider.hidden = false
	}
	if(number == 11){
		logUpgrade(1)
		ipsiMax = false;
	}
	if(number == 100){
		logUpgrade(10)
		if(!log100.disabled){
			selfSynRoot = true;
		}
	}
	if(number == 101){
		logUpgrade(10)
		if(!log101.disabled){
			enterCostForm = 3
		}
	}
	if(number == 110){
		logUpgrade(11)
		if(!log110.disabled){
			initIpsiAmt = 100
			ipsiAmount = initIpsiAmt
			getElement("buyIpsi").setAttribute("cost",1)
			getElement("buyIpsi").innerHTML = "Buy 1 ipsiclicker. Cost: "+getElement("buyIpsi").getAttribute("cost")+" bases"
			reloadIpsi()
		}
	}
	if(number == 111){
		logUpgrade(11)
		if(!log111.disabled){
			passiveLog = true;
			reloadIpsi()
		}
		autoTabButton.hidden = false
		
	}
	if(number == 1000){
		if(unspentPaths >= 1){
			logUpgrade(100)
			unspentPaths -= 1
			selfSynLog = true;
		}
	}
	if(number == 1001){
		if(unspentPaths >= 1){
			logUpgrade(100)
			unspentPaths -= 1
			ipsiPointMulti = true
		}
	}
	if(number == 1010){
		if(unspentPaths >= 1){
			logUpgrade(101)
			unspentPaths -= 1
			pathMulti = true
		}
	}
	if(number == 1011){
		if(unspentPaths >= 1){
			logUpgrade(101)
			unspentPaths -= 1
			freePointsBuyable = true;
		}
	}
	if(number == 1100){
		if(unspentPaths >= 1){
			logUpgrade(110)
			unspentPaths -= 1
			freeIpsi = true;
		}
	}
	if(number == 1101){
		if(unspentPaths >= 1){
			logUpgrade(110)
			unspentPaths -= 1
			buyIpsiLog.hidden = false
			buyIpsi.style="float: left;"
			logIpsiAutobuyer.hidden = false
		}
	}
	if(number == 1110){
		if(unspentPaths >= 1){
			logUpgrade(111)
			unspentPaths -= 1
			pointAutobuyer.hidden = false
			
		}
	}
	if(number == 1111){
		if(unspentPaths >= 1){
			logUpgrade(111)
			unspentPaths -= 1
			ipsiAutobuyer.hidden = false
			
			
		}
	}
	
}

//buying hyper upgrades
function hyperUpgrade(number){
	switch(number){
		case 1:
			hyperEnergy -= 2
			hyperLogMulti = true
			HU1.innerHTML = "Multiply log points by 2 for each hyperspace. Bought"
			HU1.disabled = true
			break
		case 2:
			hyperEnergy -= 2
			hyperSliderDiv.hidden = false
			HU2.innerHTML = "Unlock a slider that multiplies the output and loss for dimensions. Bought"
			HU2.disabled = true
			break
		case 3:
			hyperEnergy -= 3
			hyperChalenges.hidden = false
			HU3.innerHTML = "Unlock hyperspace challenges. Bought"
			HU3.disabled = true
			break
		case 4:
			hyperEnergy -= 10
			bestLineProd = true
			HU4.innerHTML = "Line to point production is based on your best lines in this base reset. Bought"
			HU4.disabled = true
			break
		case 5:
			hyperEnergy -= 100
			hyperspatialIpsi.hidden = false
			
			ipsiNewLoc.appendChild(ipsiclickers)
			ipsiExplain.hidden = true
			HU5.innerHTML = "Unlock hyperspatial ipsiclickers. Also move the ipsiclicker section from the base tab to the ipsimation tab. Bought"
			HU5.disabled = true
			break
		case 6:
			hyperEnergy -= 15
			hyperMaxBase = true
			HU6.innerHTML = "Increase max base by 6 for each hyperspace. Bought"
			HU6.disabled = true
			break
		case 7:
			hyperEnergy -= 15
			hyperMulti = true
			HU7.innerHTML = "Multiply hyperspace energy gain by your unspent hyperspace. Bought"
			HU7.disabled = true
			break
		case 8:
			hyperEnergy -= 200
			bestLogMaxBase = true
			HU8.innerHTML = "Increase max base to log<sub>10</sub>(log points)*20/3. (best log points only increase on hyper reset) Bought"
			HU8.disabled = true
			break
		case 9:
			hyperEnergy -= 1000
			lesserBitwiseTabButton.hidden = false;
			HU9.innerHTML = "Unlock bitwise, a side layer that helps you gain more hyperspatial ipsiclickers and give them more effects. Bought"
			HU9.disabled = true
	}
	unboughtHyperUpgrades = unboughtHyperUpgrades.replace(number,'')
}

//buying hyper buildings
function hyperBuilding(number){
	switch(number){
		case 1:
			hyperEnergy -= HB1.getAttribute("cost")
			HB1.setAttribute("amt",Number(HB1.getAttribute("amt"))+1)
			switch(HB1.getAttribute("amt")){
				case "1":
					HB2.hidden = false
					break
				case "2":
					HB3.hidden = false
					break
				case "3":
					HB4.hidden = false
					break
				case "4":
					HB5.hidden = false
					break
				case "5":
					HB6.hidden = false
					break
			}
			HB1.setAttribute("cost",HB1.getAttribute("cost")*7)
			primaryHBCost.innerHTML = HB1.getAttribute("cost")
			primaryHBAmt.innerHTML = HB1.getAttribute("amt")
			unspentHyperspace -= 1
			break
			
		case 2:
			hyperEnergy -= HB2.getAttribute("cost")
			HB2.setAttribute("amt",Number(HB2.getAttribute("amt"))+1)
			spaceLoss/=2
			HB2.setAttribute("cost",HB2.getAttribute("cost")*6)
			secondaryHBCost.innerHTML = HB2.getAttribute("cost")
			secondaryHBAmt.innerHTML = HB2.getAttribute("amt")
			unspentHyperspace -= 1
			break
			
		case 3:
			hyperEnergy -= HB3.getAttribute("cost")
			HB3.setAttribute("amt",Number(HB3.getAttribute("amt"))+1)
			planeLoss/=2
			HB3.setAttribute("cost",HB3.getAttribute("cost")*5)
			tertiaryHBCost.innerHTML = HB3.getAttribute("cost")
			tertiaryHBAmt.innerHTML = HB3.getAttribute("amt")
			unspentHyperspace -= 1
			break
			
		case 4:
			hyperEnergy -= HB4.getAttribute("cost")
			HB4.setAttribute("amt",Number(HB4.getAttribute("amt"))+1)
			lineLoss/=2
			HB4.setAttribute("cost",HB4.getAttribute("cost")*4)
			quatrinaryHBCost.innerHTML = HB4.getAttribute("cost")
			quatrinaryHBAmt.innerHTML = HB4.getAttribute("amt")
			unspentHyperspace -= 1
			break
			
		case 5:
			hyperEnergy -= HB5.getAttribute("cost")
			HB5.setAttribute("amt",Number(HB5.getAttribute("amt"))+1)
			maxBase += 60
			HB5.setAttribute("cost",HB5.getAttribute("cost")*3)
			quinaryHBCost.innerHTML = HB5.getAttribute("cost")
			quinaryHBAmt.innerHTML = HB5.getAttribute("amt")
			unspentHyperspace -= 1
			break
			
		case 6:
			hyperEnergy -= HB6.getAttribute("cost")
			HB6.setAttribute("amt",Number(HB6.getAttribute("amt"))+1)
			pointsUpgradeEffect*= 2
			HB6.setAttribute("cost",HB6.getAttribute("cost")*2)
			senaryHBCost.innerHTML = HB6.getAttribute("cost")
			senaryHBAmt.innerHTML = HB6.getAttribute("amt")
			unspentHyperspace -= 1
			break
		
	}
}

//hyper chalenges
function HC(number){
	//toggles the running class on the challenge
	if(getElement("HC"+number).classList.contains('running')){
		getElement("HC"+number).classList.remove('running')
		hyperPrest()
		switch(number){
			case 1:
				break
			case 2:
				maxBase = 60
				break
			case 3:
				break
			case 4:
				clearInterval(logDrainKey)
			case 5:
				logNumbers=[1,10,11,100,101,110,111,1000,1001,1010,1011,1100,1101,1110,1111]
				for(let i of logNumbers){
					getElement("log"+i).disabled = false
				}
				challengeSlider.disabled = false
		}
	}else{
		for(let i = 1; i <= 5; i++){
			if(getElement("HC"+i).classList.contains("running")){
				HC(i)
			}
		}
		hyperPrest()
		switch(number){
			case 1:
				buyLogPath.setAttribute("cost",360)
				buyLogPath.innerHTML = "Unlock another branch of the log tree. Cost: "+new base(buyLogPath.getAttribute("cost"),10).value+" log points"
				break
			case 2:
				maxBase = 10
				break
			case 3:
				curBase = 10
				baseUpgrade(5)
				baseUpgrades = ""
				break
			case 4:
				logDrainKey = setInterval(logPointDrain,1000)
				break
			case 5:
				challengeSlider.disabled = true
				switch(+challengeSlider.value){
					case 8:
						log1000.disabled = true
						log100.disabled = true
						selfSynRoot = false
						break
					case 9:
						log1001.disabled = true
						log100.disabled = true
						selfSynRoot = false
						break
					case 10:
						log1010.disabled = true
						log101.disabled = true
						enterCostForm = 1
						break
					case 11:
						log1011.disabled = true
						log101.disabled = true
						enterCostForm = 1
						break
					case 12:
						log1100.disabled = true
						log110.disabled = true
						initIpsiAmt = 0
						ipsiAmount = initIpsiAmt
						reloadIpsi()
						break
					case 13:
						log1101.disabled = true
						log110.disabled = true
						initIpsiAmt = 0
						ipsiAmount = initIpsiAmt
						reloadIpsi()
						break
					case 14:
						log1110.disabled = true
						log111.disabled = true
						passiveLog = false
						clearInterval(passiveLogKey)
						reloadIpsi()
						break
					case 15:
						log1111.disabled = true
						log111.disabled = true
						passiveLog = false
						clearInterval(passiveLogKey)
						reloadIpsi()
						break
				}
		}
		getElement("HC"+number).classList.add('running')
	
	}
}

baseSlider.oninput = function(){
	baseSlideVal.innerHTML = baseSlider.value
}
function fastEnterBase(){
	
	
	score = new base(0,baseSlider.value)
	pointsUpgradeTimesBought = 0;
	pointGainCost = (Math.max(Math.round(curBase/(2**cheaperPointUpgrade)),2))**initPointsUpgradeCostStep;
	pointGainBase = 1;
	pointGalaxAmount = 0
	pointGalaxButton.setAttribute("cost",6)
	pointsUpgradeEffect = 1
	
	curBase = baseSlider.value
	document.getElementById("scoreBase").innerHTML = "Base "+curBase;
	effectiveHyperspace = unspentHyperspace;
}

//buying ipsiClickers
function ipsiClicker(currency){
	
	switch(currency){
		case "base":
			var cost = getElement("buyIpsi").getAttribute("cost")
			var pre100 = ipsiAmount < 100
			
			if(ipsiAmount >= 100){
				ipsiAmount = ipsiAmount + Math.round((ipsiAmount*(curBase-1-Number(cost)))**0.5)+1+(ipsiBonus*2)
			}
			else{
				ipsiAmount *= curBase-Number(cost)
				ipsiAmount += 1+(ipsiBonus*2)
			}
			if(!freeIpsi){
				curBase -= Number(cost)
				pointGainBase = 1;
				pointGainCost = (Math.max(Math.round(curBase/(2**cheaperPointUpgrade)),2))**initPointsUpgradeCostStep;
			}
			if(ipsiAmount > 100 && ipsiMax){
				ipsiAmount = 100
			}
			
			if(pre100){
				if(ipsiAmount >= 100){
					ipsiAmount = 100
				}
			}
			getElement("buyIpsi").setAttribute("cost",Number(cost)+1)
			
			cost = getElement("buyIpsi").getAttribute("cost")
			getElement("buyIpsi").innerHTML = "Buy 1 ipsiclicker. Cost: "+cost+" bases"
			reloadIpsi()
			break
		case "log":
			var cost = buyIpsiLog.getAttribute("cost")
			var timesBought = buyIpsiLog.getAttribute("timesBought")
			buyIpsiLog.setAttribute("timesBought",Number(timesBought)+1)
			ipsiAmount += Math.round(logPoints ** 0.5)
			if(!freeIpsi){
				logPoints -= cost
			}
			buyIpsiLog.setAttribute("cost",myFactorial(buyIpsiLog.getAttribute("timesBought")))
			break
		case "hyperspace":
			
			
			
			hyperIpsis += hyperIpsis*Math.round((hyperEnergy - hyperIpsiBuyable.getAttribute("cost"))**(1/6)) + 1
			hyperEnergy -= hyperIpsiBuyable.getAttribute("cost")
			hyperIpsiBuyable.setAttribute("cost",+hyperIpsiBuyable.getAttribute("cost")*6)
			
			hyperIpsiAmt.innerHTML = plural(hyperIpsis,"hyperspatial ipsiclicker")
			reloadHyperIpsi()
	}

}

//respec ipsiClickers to try for better multipliers
function respecIpsi(){
	var response = confirm("Are you sure you want to reset your ipsiclickers? This is only useful if you want to try for better multipliers!")
	if(response){
		ipsiAmount = initIpsiAmt
		
		getElement("buyIpsi").setAttribute("cost",1)
		buyIpsiLog.setAttribute("cost",1)
		buyIpsiLog.setAttribute("timesBought",0)
		getElement("buyIpsi").innerHTML = "Buy 1 ipsiclicker. Cost: "+getElement("buyIpsi").getAttribute("cost")+" bases"
		buyIpsiLog.innerHTML = "Buy 1 ipsiclicker. Cost: "
		reloadIpsi()
	}
}

//respec log tree for better upgrades/arrangements
function respecLog(){
	var response = confirm("Are you sure you want to respec the log tree? This is only helpful if you feel stuck and want to try a different loadout! Also, this will reset your ipsiclickers.")
	if(response){
		selfSynLog = false
		selfSynRoot = false
		ipsiPointMulti = false
		freePointsBuyable = false
		freeIpsi = false
		buyIpsiLog.hidden = true
		buyIpsi.style=""
		pointAutobuyer.hidden = true
		ipsiAutobuyer.hidden = true
		logIpsiAutobuyer.hidden = true
		enterCostForm = 1
		passiveLog = false
		clearInterval(passiveLogKey)
		passiveLogKey = -1
		initIpsiAmt = 0
		ipsiAmount = initIpsiAmt
		getElement("buyIpsi").setAttribute("cost",1)
		getElement("buyIpsi").innerHTML = "Buy 1 ipsiclicker. Cost: "+getElement("buyIpsi").getAttribute("cost")+" bases"
		buyIpsiLog.setAttribute("cost",1)
		buyIpsiLog.setAttribute("timesBought",0)
		reloadIpsi()
		baseAutobuyer.hidden = true
		baseSlider.hidden = true
		ipsiMax = true
		logPointBoost = false
		pathMulti = false
		
		unspentPaths = totalPaths
		
		logNumbers=[1,10,11,100,101,110,111,1000,1001,1010,1011,1100,1101,1110,1111]
		for(let i of logNumbers){
			getElement("log"+i).classList.remove("logButton")
		}
		for(let i = 1; i <= 8; i++){
			if(!incompleteBranchChallenges.includes(i)){
				unspentPaths += 1
				logUpgrade(+(new base(i+7,2).value))
			}
		}
	}
}

//contains the code for possible multipliers
function multipliers(baseAmt){
	multis = [];
	multis.push(Math.min(Math.max(curBase,bestBase**bestBaseMulti)**baseMulti,60))
	//multis.push(1000000000000**cheats)
	if(ipsiAmount > 100){
		multis.push(ipsiAmount/100)
	}
	//multis.push(((log(score.decimal+1)/log(curBase))+1)**selfSyn)
	multis.push(Math.max((log(ipsiAmount)/log(2))**ipsiPointMulti,1))
	multis.push(freex2.value)
	multis.push((log(score.decimal+1,62-(Math.min(curBase,60)))+1)**selfSynLog)
	
	multis.push(((bestBase-curBase)+2)**distanceMulti)
	
	return multiplyThru(baseAmt,multis);
}

//cheats
function enableCheats(){
	cheats = true
	
	/*
	ipsiAmount = 100;
	reloadIpsi();
	baseUpgrade(1)
	baseUpgrade(9)
	baseUpgrade(6)
	baseUpgrade(3)
	baseUpgrade(5)
	baseTabButton.hidden = false;
	curBase = 2;
	bestBase = 10;
	baseSlider.max = "10"
	
	logPoints=60
	
	
	curBase = 60
	bestBase = 61
	baseSlider.max = "60"
	
	
	for(let i = 0; i < 8; i++){
		logUpgrade(0)
	}
	
	logUpgrade(1000)
	logUpgrade(1001)
	logUpgrade(1010)
	logUpgrade(1011)
	logUpgrade(1100)
	logUpgrade(1101)
	logUpgrade(1110)
	logUpgrade(1111)
	logPoints = 0
	
	ipsiAmount = 60**3
	*/
	
	baseTabButton.hidden = false
	logTabButton.hidden = false
	hyperTabButton.hidden = false
	hyperEnergy += 26
	hyperUpgrade(1)
	hyperUpgrade(2)
	buyHyperspace()
	buyHyperspace()
	hyperUpgrade(3)
	HC(3)
	hyperPrest()
	HC(4)
	hyperPrest()
	buyHyperspace()
	HC(1)
	hyperPrest()
	for(let i = 8;i<=16;i++){
		challengeSlider.value = i
		HC(5)
		hyperPrest()
	}
	buyHyperspace()
	buyHyperspace()
	HC(2)
	hyperPrest()
	hyperEnergy += 10368
	hyperUpgrade(5)
	hyperUpgrade(7)
	for(let i = 0; i < 10; i++){
		buyHyperspace()
	}
	ipsiClicker("hyperspace")
	ipsiClicker("hyperspace")
	ipsiClicker("hyperspace")
	hyperIpsis = 13
	reloadHyperIpsi()
	hyperEnergy = 1000
}

function checkpoint(progress){
	switch(progress){
		case "log":
			curBase = 21
			baseUpgrade(1)
			baseUpgrade(9)
			baseUpgrade(6)
			baseUpgrade(3)
			baseUpgrade(5)
			buyIpsi.setAttribute("cost", 6)
			ipsiAmount = 100
			reloadIpsi()
			baseTabButton.hidden = false
			break
		case "hyper":
			ipsiAmount = 100;
			reloadIpsi();
			baseUpgrade(1)
			baseUpgrade(9)
			baseUpgrade(6)
			baseUpgrade(3)
			baseUpgrade(5)
			baseTabButton.hidden = false;
			curBase = 60
			bestBase = 61
			baseSlider.max = "60"
			
			for(let i = 0; i < 8; i++){
				logUpgrade(0)
			}
			
			logUpgrade(1000)
			logUpgrade(1001)
			logUpgrade(1010)
			logUpgrade(1011)
			logUpgrade(1100)
			logUpgrade(1101)
			logUpgrade(1110)
			logUpgrade(1111)
			logPoints = 0
	}
}

//dimension generation
function dimension(){
	if(bestLineProd){
		score = score.add(Math.round(multipliers(bestLines**0.5/6)*(pointsUpgradeTimesBought+1)*10**hyperSlider.value))
		lineProduction.innerHTML = new base(multipliers(bestLines**0.5/6)*((pointsUpgradeTimesBought*pointsUpgradeEffect)+1),curBase).value
	}else{
		score = score.add(Math.round(multipliers(lines**0.5/6)*(pointsUpgradeTimesBought+1)*10**hyperSlider.value))
		lineProduction.innerHTML = new base(multipliers(lines**0.5/6)*((pointsUpgradeTimesBought*pointsUpgradeEffect)+1),curBase).value
	}
	
	lines += planes*10**hyperSlider.value
	lines *= 1-((lineLoss*10**hyperSlider.value)/100)
	planes += space*10**hyperSlider.value
	planes *= 1-((planeLoss*10**hyperSlider.value)/100)
	space += effectiveHyperspace*10**hyperSlider.value
	space *= 1-((spaceLoss*10**hyperSlider.value)/100)
	effectiveHyperspace *= 1-((0.01*10**hyperSlider.value))
	
	if(lines > bestLines){
		bestLines = lines
	}
	
	effectiveHyperAmount.innerHTML = effectiveHyperspace.toFixed(2)
	spaceAmount.innerHTML = space.toFixed(2)
	planeAmount.innerHTML = planes.toFixed(2)
	lineAmount.innerHTML = lines.toFixed(2)
	
}

//automation functions
function baseAuto(){
	if(baseAutoAmt.value < baseAutoAmt.min){
		baseAutoAmt.value = baseAutoAmt.min
	}
	if(Math.round((log(score.decimal)/log(curBase))**((curBase**0.5)**logPointBoost)) >= baseAutoAmt.value){
		if(basePrestButton.disabled == false){
			if(baseAutoEnabled.checked && (baseAutobuyer.hidden == false)){
				prestige()
			}
		}
	}
}
function pointsAuto(){
	
	if(score.ge(pointGainCost)){
		if(pointAutoEnabled.checked && (pointAutobuyer.hidden == false)){
			pointGain()
		}
	}
}
function ipsiAuto(){
	
	if(logPoints > buyIpsiLog.getAttribute("cost")){
		
		if(logIpsiAutoEnabled.checked && (logIpsiAutobuyer.hidden == false && ipsiAutobuyer.hidden == false)){
			ipsiClicker("log")
			return
		}
	}
	
	if(curBase-2 >= buyIpsi.getAttribute("cost")){
		if(baseIpsiAutoEnabled.checked && (ipsiAutobuyer.hidden == false)){
			ipsiClicker("base")
		}
	}
}
function ipsiClick(){
	addPoint()
	dimension()
}
function baseUpgradeAuto(){
	if(baseUpgrade1.disabled == false){
		let saveBase = curBase
		baseUpgrade(1)
		curBase = saveBase
	}
	if(baseUpgrade9.disabled == false){
		let saveBase = curBase
		baseUpgrade(9)
		curBase = saveBase
	}
	if(baseUpgrade6.disabled == false){
		let saveBase = curBase
		baseUpgrade(6)
		curBase = saveBase
	}
	if(baseUpgrade3.disabled == false){
		let saveBase = curBase
		baseUpgrade(3)
		curBase = saveBase
	}
	if(baseUpgrade5.disabled == false){
		let saveBase = curBase
		baseUpgrade(5)
		curBase = saveBase
	}
}
function logPathAuto(){
	if(buyLogPath.disabled == false){
		logUpgrade(0)
	}
}
function baseAutomator(){
	if(bestBase > 10){
		if(selfSynRoot){
			let goalBase = Math.floor((log(logPoints,10)/3)*20)
			if(curBase == goalBase){
				return
			}
			if(baseSlider.hidden == false){
				if(bestBase > goalBase){
					baseSlider.value = goalBase
					baseSlider.oninput()
					fastEnterBase()
				}else{
					if(curBase < bestBase){
						if(curBase != maxBase){
							baseSlider.value = baseSlider.max
							baseSlider.oninput()
							fastEnterBase()
						}
					}else{
						if(basePrestButton.disabled == false){
							prestige()
						}
					}
				}
			}else{
				if(basePrestButton.disabled == false){
					prestige()
				}
			}
		}else{
			if(baseSlider.hidden == false){
				baseSlider.value = baseSlider.max
				baseSlider.oninput()
				fastEnterBase()
			}else{
				if(basePrestButton.disabled == false){
					prestige()
				}
			}
		}
	}else{
		if(basePrestButton.disabled == false){
			prestige()
		}
	}
}

//passive log point genteration
function passiveLogGen(){
	if(!basePrestButton.disabled){
		let logPointMidStore = (log(score.decimal,curBase)**(((curBase**0.5))**logPointBoost))
		let L = log(logPoints,10)*20/3
		if(selfSynRoot){
			if(curBase <= L){
				logPointMidStore**=curBase/360+1
			}
		}
		if(pathMulti){
			logPointMidStore *= 2**unspentPaths
		}
		if(hyperLogMulti){
			logPointMidStore *= 2**totalHyperspace
		}
		
		
		logPoints += Math.round(logPointMidStore**0.5)
		
		
	}
}
function strongPassiveLogGen(){
	if(!basePrestButton.disabled){
		let logPointMidStore = (log(score.decimal,curBase)**(((curBase**0.5))**logPointBoost))
		let L = log(logPoints,10)*20/3
		if(selfSynRoot){
			if(curBase <= L){
				logPointMidStore**=curBase/360+1
			}
		}
		if(pathMulti){
			logPointMidStore *= 2**unspentPaths
		}
		if(hyperLogMulti){
			logPointMidStore *= 2**totalHyperspace
		}
		
		
		logPoints += Math.round(logPointMidStore*0.01)
		
	}
}
function passiveIpsiGen(){
	if(hyperIpsis >= 100){
		ipsiAmount += Math.round(lines)*hyperIpsis*(hyperIpsis/100)
	}else{
		ipsiAmount += Math.round(lines)*hyperIpsis
	}
}

function logPointDrain(){
	logPoints -= Math.round(log(logPoints))
}
setInterval(updatePage,0)

//enableCheats()

