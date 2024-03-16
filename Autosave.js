function autosave(){
	//general variables that need to be saved
	localStorage.setItem("cheats",cheats)
	localStorage.setItem("curBase",curBase)
	//points variables that need to be saved
	localStorage.setItem("score",score.decimal)
	localStorage.setItem("pointGainBase",pointGainBase)
	localStorage.setItem("pointGainCost",pointGainCost)
	localStorage.setItem("initPointsUpgradeCostStep",initPointsUpgradeCostStep)
	localStorage.setItem("pointsUpgradeTimesBought",pointsUpgradeTimesBought)
	//base variables that need to be saved
	localStorage.setItem("enterCostForm",enterCostForm)
	localStorage.setItem("ipsiAmount",ipsiAmount)
	localStorage.setItem("baseMulti",baseMulti)
	localStorage.setItem("ipsiBonus",ipsiBonus)
	localStorage.setItem("bestBase",bestBase)
	localStorage.setItem("initIpsiAmt",initIpsiAmt)
	localStorage.setItem("baseUpgrades",baseUpgrades)
	//log variables that need to be saved
	localStorage.setItem("logUnlocked",logUnlocked)
	localStorage.setItem("logPoints",logPoints)
	localStorage.setItem("unspentPaths",unspentPaths)
	localStorage.setItem("totalPaths",totalPaths)
	localStorage.setItem("logPointBoost",logPointBoost)
	localStorage.setItem("ipsiMax",ipsiMax)
	localStorage.setItem("selfSyn",selfSyn)
	localStorage.setItem("ipsiPointMulti",ipsiPointMulti)
	localStorage.setItem("bestBaseMulti",bestBaseMulti)
	localStorage.setItem("freeIpsi",freeIpsi)
	localStorage.setItem("pointsUpgradeBoost",pointsUpgradeBoost)
	localStorage.setItem("startWithLogPointsPoints",startWithLogPointsPoints)
	//bitwise variables that need to be stored
	localStorage.setItem("bitwisePoints",bitwisePoints)
	//THE ENTIRE WEBPAGE OH MY GOODNESS!!!
	localStorage.setItem("webpageState",htmlContent.innerHTML)
	console.log("saving")
	//Earlygame variables added in v1.2.0
	localStorage.setItem("cheaperPointUpgrade",cheaperPointUpgrade)
	localStorage.setItem("pointsUpgradeEffect",pointsUpgradeEffect)
	localStorage.setItem("selfSynLog",selfSynLog)
	localStorage.setItem("selfSynRoot",selfSynRoot)
	localStorage.setItem("freePointsBuyable",freePointsBuyable)
	localStorage.setItem("passiveLog",passiveLog)
	localStorage.setItem("distanceMulti",distanceMulti)
	localStorage.setItem("pathMulti",pathMulti)
	//hyperspace variables from v1.2.0
	localStorage.setItem("hyperEnergy",hyperEnergy)
	localStorage.setItem("totalHyperspace",totalHyperspace)
	localStorage.setItem("effectiveHyperspace",effectiveHyperspace)
	localStorage.setItem("space",space)
	localStorage.setItem("planes",planes)
	localStorage.setItem("lines",lines)
	localStorage.setItem("unspentHyperspace",unspentHyperspace)
	localStorage.setItem("spaceLoss",spaceLoss)
	localStorage.setItem("planeLoss",planeLoss)
	localStorage.setItem("lineLoss",lineLoss)
	localStorage.setItem("maxBase",maxBase)
	localStorage.setItem("unboughtHyperUpgrades",unboughtHyperUpgrades)
	localStorage.setItem("hyperLogMulti",hyperLogMulti)
	localStorage.setItem("strongPassiveLog",strongPassiveLog)
	localStorage.setItem("incompleteBranchChallenges",incompleteBranchChallenges)
	localStorage.setItem("bestLineProd",bestLineProd)
	localStorage.setItem("bestLines",bestLines)
	localStorage.setItem("hyperIpsis",hyperIpsis)
	localStorage.setItem("hyperMaxBase",hyperMaxBase)
	localStorage.setItem("hyperMulti",hyperMulti)
	
	localStorage.setItem("version",version)
	
	//checkpoint
	if(totalPaths >= 8 || hyperEnergy >= 1 || totalHyperspace >= 1){
		localStorage.setItem("checkpoint","hyper")
	}else if(logUnlocked){
		localStorage.setItem("checkpoint","log")
	}else{
		localStorage.setItem("checkpoint","base")
	}
}
setInterval(autosave,30000)
